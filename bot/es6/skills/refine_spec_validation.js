// @flow


// Botkit Studio Skill module to enhance the "refine_spec_validation" script

import SkillsBase from "./skills_base"
import { RefineSpecValidationFsm } from "../lib/fsm/refine_spec_validation_fsm";
import { FsmBase } from "../lib/fsm/fsm_base";
import { Spec } from "../lib/specs/spec";
import { Instance } from "../lib/specs/instance";
import { Expectation } from "../lib/specs/expectation";
import { Klass } from "../lib/specs/klass"
import { SelectSpecificationFsm } from "../lib/fsm/select_specification_fsm";
import RefineSpecOneModel from "./refine_spec_one_model";

export default class RefineSpecValidation extends RefineSpecOneModel{

  script_name() {
    return 'refine_spec_validation'
  }

  fsm(): RefineSpecValidationFsm {
    return (this._fsm: any)
  }

  create_fsm() {
    this._fsm = new RefineSpecValidationFsm(this.script_name())
  }


  set_names_and_values(entities: *[]){
    let idx = entities.findIndex((obj,idx,w)=>{
      return obj.entity==='att_name'
    })
    let N = entities.length
    let values = []
    let att_names=[]
    while(idx > -1){
      let current=entities[idx]
      att_names.push(current.value)
      if (idx<N-1){
        let next = entities[idx+1]
        let val = (next.entity==='sym_value')? next.value : 'undefined'
        //this.log("1 =>",val)
        
        //this.log("2 =>",val)
        values.push(val)
      }
      idx = entities.findIndex((o,index,__) =>{ 
        return ((o.entity==='att_name') && (index > idx))
      })
    }
    this.log("1",att_names)
    this.fsm().set_att_names(att_names)
    this.fsm().set_att_values(values)
  }
}
  