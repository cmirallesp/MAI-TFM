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

}