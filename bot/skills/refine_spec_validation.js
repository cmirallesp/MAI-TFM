"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _skills_base = require("./skills_base");

var _skills_base2 = _interopRequireDefault(_skills_base);

var _refine_spec_validation_fsm = require("../lib/fsm/refine_spec_validation_fsm");

var _fsm_base = require("../lib/fsm/fsm_base");

var _spec = require("../lib/specs/spec");

var _instance = require("../lib/specs/instance");

var _expectation = require("../lib/specs/expectation");

var _klass = require("../lib/specs/klass");

var _select_specification_fsm = require("../lib/fsm/select_specification_fsm");

var _refine_spec_one_model = require("./refine_spec_one_model");

var _refine_spec_one_model2 = _interopRequireDefault(_refine_spec_one_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RefineSpecValidation extends _refine_spec_one_model2.default {

  script_name() {
    return 'refine_spec_validation';
  }

  fsm() {
    return this._fsm;
  }

  create_fsm() {
    this._fsm = new _refine_spec_validation_fsm.RefineSpecValidationFsm(this.script_name());
  }
}
exports.default = RefineSpecValidation;

// Botkit Studio Skill module to enhance the "refine_spec_validation" script