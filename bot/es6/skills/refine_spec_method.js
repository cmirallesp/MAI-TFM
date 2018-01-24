// @flow

import SkillsBase from "./skills_base";
import { RefineSpecMethodFsm } from "../lib/fsm/refine_spec_method_fsm";
import { SelectSpecificationFsm } from "../lib/fsm/select_specification_fsm";
import RefineSpecOneModel from "./refine_spec_one_model";

export default class RefineSpecMethod extends RefineSpecOneModel{

  script_name(){
    return "refine_spec_method"
  }

  fsm(): RefineSpecMethodFsm{
    return (this._fsm: any)
  }

  create_fsm() {
    this._fsm = new RefineSpecMethodFsm(this.script_name(),true)
  }

  set_names_and_values(entities: *[]){
    this.log("namessssss=>",entities)
    let values =entities.filter((o,_,__) =>{
      console.log(o.entity)
      return o.entity === 'sym_value'
    })
    this.log("1) method values =>",values)
    values = values.map((o,_,__)=>o.value)
    this.log("2) method values =>",values)
    this.fsm().set_par_values(values)
  }

}