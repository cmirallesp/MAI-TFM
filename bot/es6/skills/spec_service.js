// @flow

import SkillsBase from "./skills_base";
import { SelectSpecificationFsm } from "../lib/fsm/select_specification_fsm";
import { FsmWithOneModel } from "../lib/fsm/fsm_with_one_model";
import { Spec } from "../lib/specs/spec";
import { Klass } from "../lib/specs/klass"
import { BddConstructions } from "../lib/specs/bdd_constructions";
import { Step } from "../lib/specs/step";
import { Expectation } from "../lib/specs/expectation";

export default class SpecService extends SkillsBase{
  entities: *[]
  spec: string

  script_name() {
    return 'spec_service'
  }

  create_fsm() {
    
  }

  async build_spec(){ 
    let bdd=  new BddConstructions()
    //1) model name and instance
    let spec = Spec.new_service_validation()
    let idx = this.entities.findIndex((obj,idx,w)=> obj.entity==='model_name')
    let N = this.entities.length
    let instances=[]
    let raw_instances =[]
    while(idx > -1){
      this.log("idx=>",idx)
      let model_name= this.entities[idx].value
      
      if (idx<N-1){
        let next = this.entities[idx+1]
        let inst_name = (next.entity==='instance_name')? next.value : model_name[0]
        raw_instances.push(inst_name)
        let klass = await Klass.new_model(model_name)
        instances.push(klass.new_instance(inst_name))

      }
      idx = this.entities.findIndex((o,index,__) =>
        (o.entity==='model_name') && (index > idx)
      )
    }
    for(let instance of instances){
      this.log(bdd.instance_str(instance))
    }
    
    
    //2) steps
    const KEY = 'method'//TODO: change method per and
    let steps = []
    idx = this.entities.findIndex((obj,idx,w) => obj.entity === 'when' )
    let idx_method = this.entities.findIndex((obj,index,_) => obj.entity==='method' && index > idx)
    this.log(idx,idx_method)
    while(idx_method > -1){
      let method = this.entities[idx_method].value
      //following method or service_name
      let idx_method2 = this.entities.findIndex((obj,index,_) => 
        (obj.entity=== KEY && index > idx_method) || (obj.entity==="service_name") 
      )
      let instance = null
      
      let prev = this.entities[idx_method - 1]
      let next = this.entities[idx_method + 1]
      if (prev.entity === "instance_name"){
        //this.log("prev")
        instance = prev.value
      } 
      else if (next.entity==='instance_name'){
        //this.log("next")
        instance = next.value
      }
      else{
        this.log("Error method without instance_name")
      }
      if (instance){
        let step = Step.new_method(instance,method)
        //parse params from when
        let idx_param = idx
        while(true){
          idx_param = this.entities.findIndex((obj,index,_) =>
            (idx_param < index) && (index < idx_method2) && obj.entity==="sym_value"
          )
          if(idx_param == -1 ) break
          let param = this.entities[idx_param].value
          let is_reference = raw_instances.indexOf(param) > -1
          step.add_parameter(param,is_reference)
        }
        steps.push(step)
      }
      this.log(this.entities[idx_method2].entity)
      if  (!(this.entities[idx_method2].entity=== KEY)) {
        idx_method = -1
      }
      else{
        //next method
        idx_method = idx_method = this.entities.findIndex((obj,index,_) => obj.entity==='method' && index > idx_method2)
      }
      
    }
    for(let step of steps){
      this.log(bdd.step_str(step))
    }

    //3)service_name
    idx = this.entities.findIndex((obj,idx,w) => obj.entity === 'service_name' )
    if(idx ==-1){
      this.log("Error, not service name")
      throw new Error("Service_name not found")
    }
    let service_name: string = this.entities[idx].value
    let service = await Klass.new_model(service_name)
    let instance_service=service.new_instance(service_name)
    let expectation = Expectation.new_instance_method(instance_service,"run")
    let idx_end = this.entities.findIndex((obj,idx,w) => obj.entity === 'Then' )
    while(idx > -1){
      idx = this.entities.findIndex((obj,index,_) => obj.entity==='sym_value' && index > idx && index < idx_end)
      if(idx > -1){
        let param = this.entities[idx].value
        expectation.add_parameter(param)
      }
    }
    //4) expected value
    let exp = this.entities.findIndex((obj,idx,_) => obj.entity === "expected_value")
    if(exp==-1){
      this.log("expected_value not found")
      throw new Error("expected_value not found")
    }
    this.log("exp =>",exp)
    let exp_val = this.entities[exp].value
    expectation.set_expected_value(exp_val)
    //5) op
    let op = this.entities.findIndex((obj,idx,_) => obj.entity === "op")
    this.log("op =>",op)
    if (op > -1){
      let op_value = this.entities[op].value
      expectation.set_operator(op_value)
    }
    this.log(bdd.expectation_str(expectation))
    return [instances,steps,expectation]  
  } 


  on_normally_started(convo: *, next: *) {
    //casting from FsmBase
    let peak: SelectSpecificationFsm = (this._prev.fsm(): any) 
    // this.log("peak =>", peak.detected_entities())
    this.entities = peak.detected_entities()
    // this.log("on_normaly_started=>",this.entities)
    this.build_spec()
    next()
  }

  async get_spec(): Promise<string>{
    let bdd=  new BddConstructions()
    let r = await this.build_spec()
    let instances= r[0]
    let steps= r[1]
    let expecation= r[2]

    let i_str = instances.map((value,_,__) => bdd.instance_str(value)).join("\n")
    let s_str = steps.map((v,_,__) => bdd.step_str(v)).join("\n")
    let e_str = bdd.expectation_str(expecation) 
    return Promise.resolve(`${i_str}\n${s_str}\n${e_str}`)
  }

  constructor(controller: *, stack: SkillsBase[]){
    super(controller, stack);

    //before ask_requirement
    controller.studio.beforeThread(this.script_name(),'ask_requirement',
      (convo, next) =>{
        this.spec = convo.extractResponse('spec');
        this.log(this.spec)  
        next()
      }
    )

    //before get_spec
    controller.studio.beforeThread(this.script_name(),'show_spec',
      async (convo, next) =>{
        let spec = await this.get_spec()
        convo.setVar("spec",spec)
        next()
      }
    )
  }
 }