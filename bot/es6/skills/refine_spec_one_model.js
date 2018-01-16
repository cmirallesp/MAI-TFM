// @flow

import SkillsBase from "./skills_base";
import { SelectSpecificationFsm } from "../lib/fsm/select_specification_fsm";
import { FsmWithOneModel } from "../lib/fsm/fsm_with_one_model";

export default class RefineSpecOneModel extends SkillsBase{

  fsm(): FsmWithOneModel{
    return (this._fsm: any)
  }

  on_normally_started(convo: *, next: *) {
    //casting from FsmBase
    let peak: SelectSpecificationFsm = (this._prev.fsm(): any) 
    this.log("peak =>", peak.detected_entities())
    let model_names= peak.detected_entities().filter(o => o.entity==='model_name')
    if (model_names.length === 1){
      this.log("model_names =>", model_names)
      let model_name = model_names[0].value
      this.fsm().set_model_name(model_name)
    }
    else{
      this.log("WARNING: multiple model_names detected but only one expected!!")
    }
    let method_names= peak.detected_entities().filter(o => o.entity==='method_name')
    if (method_names.length === 1){
      this.log("method_names =>", method_names)
      let method_name = method_names[0].value
      this.fsm().set_method_name(method_name)
    }
    else{
      this.log("WARNING: multiple methods_names detected but only one expected!!")
    }

    this.next(convo,next)
  }

  constructor(controller: *, stack: SkillsBase[]){
    super(controller, stack);
    //Validation ****METHOD_NAME****
    controller.studio.validate(this.script_name(), 'method_name', (convo, next) => {
      this.log("VALIDATE =>",this.script_name(), "VARIABLE: method_name");

      let value = convo.extractResponse('method_name');
      this.fsm().set_method_name(value);

      this.next(convo,next)
    })

    //Validation ****METHOD_VALUE****
    controller.studio.validate(this.script_name(), 'method_value', (convo, next) => {
      this.log("VALIDATE =>",this.script_name()," VARIABLE: method_value");

      let value = convo.extractResponse('method_value');
      this.fsm().set_expected_value(value);

      this.next(convo,next)
    })

    //Validation ****MODEL_NAME****
    controller.studio.validate(this.script_name(), 'model_name', (convo, next) => {
      this.log("VALIDATE =>", this.script_name()," VARIABLE: model_name");

      let value = convo.extractResponse('model_name');
      this.fsm().set_model_name(value);

      this.next(convo,next)
    })

    //Validation ****ATTRIBUTE NAMES****
    controller.studio.validate(this.script_name(), 'attribute_names', (convo, next) => {
      this.log("VALIDATE =>",this.script_name()," VARIABLE: attribute_names");

      var value = convo.extractResponse('attribute_names');
      this.next(convo,next,value)
      convo.setVar("attribute", this.fsm().current_unprocessed())
    })

    //Validation ****ATTRIBUTE VALUES****
    controller.studio.validate(this.script_name(), 'attribute_value', (convo, next) => {
      this.log("VALIDATE=>",this.script_name()," VARIABLE: attribute_value");

      var value = convo.extractResponse('attribute_value');
      this.next(convo,next,value)
      convo.setVar("attribute", this.fsm().current_unprocessed())
    })

    //Validation ****PARAMS NAMES****
    controller.studio.validate(this.script_name(), 'param_names', (convo, next) => {
      this.log("VALIDATE =>",this.script_name()," VARIABLE: param_names");

      var value = convo.extractResponse('param_names');
      this.next(convo,next,value)
      convo.setVar("param", this.fsm().current_unprocessed())
    })

    //Validation ****PARAMS VALUES****
    controller.studio.validate(this.script_name(), 'param_value', (convo, next) => {
      this.log("VALIDATE=>",this.script_name()," VARIABLE: param_values");

      var value = convo.extractResponse('param_value');
      this.next(convo,next,value)
      convo.setVar("param", this.fsm().current_unprocessed())
    })

    //before get_spec
    controller.studio.beforeThread(this.script_name(),'show_spec',
      async (convo, next) =>{
        let spec = await this.fsm().get_spec()
        convo.setVar("spec",spec)
        next()
      }
    )
  }
 }