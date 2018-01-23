"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _skills_base = require("./skills_base");

var _skills_base2 = _interopRequireDefault(_skills_base);

var _select_specification_fsm = require("../lib/fsm/select_specification_fsm");

var _fsm_with_one_model = require("../lib/fsm/fsm_with_one_model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SpecService extends _skills_base2.default {

  script_name() {
    return 'spec_validations';
  }

  create_fsm() {}

  on_normally_started(convo, next) {
    //casting from FsmBase
    let peak = this._prev.fsm();
    this.log("peak =>", peak.detected_entities());
    this.entities = peak.detected_entities();
    this.log("entities=>", this.entities);
    this.next(convo, next);
  }
  get_spec() {
    return "www";
  }

  constructor(controller, stack) {
    super(controller, stack);

    //before get_spec
    controller.studio.beforeThread(this.script_name(), 'show_spec', async (convo, next) => {
      let spec = this.get_spec();
      convo.setVar("spec", spec);
      next();
    });
  }
}
exports.default = SpecService;