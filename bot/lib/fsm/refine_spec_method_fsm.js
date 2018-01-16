"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefineSpecMethodFsm = undefined;

var _fsm_with_one_model = require("./fsm_with_one_model");

var _spec = require("../specs/spec");

class RefineSpecMethodFsm extends _fsm_with_one_model.FsmWithOneModel {
  create_spec() {
    return _spec.Spec.new_method_validation();
  }
}
exports.RefineSpecMethodFsm = RefineSpecMethodFsm;