// @flow

import {FsmBase} from './fsm_base'
import { Spec } from "../specs/spec";
import { Instance } from "../specs/instance";
import { Expectation } from "../specs/expectation";
import { Klass } from "../specs/klass"
import { zip} from 'lodash/array'
import { cloneDeep } from 'lodash/lang'
import { BddConstructions } from '../specs/bdd_constructions';
import { FsmWithOneModel } from './fsm_with_one_model';

export class RefineSpecValidationFsm extends FsmWithOneModel{
  
  constructor(script_name: string){
    super(script_name)
    this.set_method_name("valid?")
    this.set_expected_value("true")
  }

  create_spec(): Spec{
    return Spec.new_model_validation()
  }
}