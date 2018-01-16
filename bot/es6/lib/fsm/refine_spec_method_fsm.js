// @flow

import { FsmWithOneModel } from "./fsm_with_one_model";
import { Spec } from "../specs/spec";
export class RefineSpecMethodFsm extends FsmWithOneModel {
  create_spec(): Spec{
    return Spec.new_method_validation()
  }
}