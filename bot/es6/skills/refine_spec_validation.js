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
}
  