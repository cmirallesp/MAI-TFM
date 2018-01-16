"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _skills_base = require("./skills_base");

var _skills_base2 = _interopRequireDefault(_skills_base);

var _refine_spec_method_fsm = require("../lib/fsm/refine_spec_method_fsm");

var _select_specification_fsm = require("../lib/fsm/select_specification_fsm");

var _refine_spec_one_model = require("./refine_spec_one_model");

var _refine_spec_one_model2 = _interopRequireDefault(_refine_spec_one_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RefineSpecMethod extends _refine_spec_one_model2.default {

  script_name() {
    return "refine_spec_method";
  }

  fsm() {
    return this._fsm;
  }

  create_fsm() {
    this._fsm = new _refine_spec_method_fsm.RefineSpecMethodFsm(this.script_name(), true);
  }

}
exports.default = RefineSpecMethod;