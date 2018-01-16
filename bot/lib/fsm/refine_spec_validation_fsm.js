"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefineSpecValidationFsm = undefined;

var _fsm_base = require("./fsm_base");

var _spec = require("../specs/spec");

var _instance = require("../specs/instance");

var _expectation = require("../specs/expectation");

var _klass = require("../specs/klass");

var _array = require("lodash/array");

var _lang = require("lodash/lang");

var _bdd_constructions = require("../specs/bdd_constructions");

var _fsm_with_one_model = require("./fsm_with_one_model");

class RefineSpecValidationFsm extends _fsm_with_one_model.FsmWithOneModel {

  constructor(script_name) {
    super(script_name);
    this.set_method_name("valid?");
    this.set_expected_value("true");
  }

  create_spec() {
    return _spec.Spec.new_model_validation();
  }
}
exports.RefineSpecValidationFsm = RefineSpecValidationFsm;