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

  set_names_and_values(entities) {
    let idx = entities.findIndex((obj, idx, w) => {
      return obj.entity === 'att_name';
    });
    let N = entities.length;
    let values = [];
    let att_names = [];
    while (idx > -1) {
      let current = entities[idx];
      att_names.push(current.value);
      if (idx < N - 1) {
        let next = entities[idx + 1];
        let val = next.entity === 'sym_value' ? next.value : 'undefined';
        //this.log("1 =>",val)

        //this.log("2 =>",val)
        values.push(val);
      }
      idx = entities.findIndex((o, index, __) => {
        return o.entity === 'att_name' && index > idx;
      });
    }
    this.log("1", att_names);
    this.fsm().set_att_names(att_names);
    this.fsm().set_att_values(values);
  }
}
exports.default = RefineSpecValidation;

// Botkit Studio Skill module to enhance the "refine_spec_validation" script