"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _skills_base = require("./skills_base");

var _skills_base2 = _interopRequireDefault(_skills_base);

var _fsm_base = require("../lib/fsm/fsm_base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Fallback extends _skills_base2.default {

  script_name() {
    return 'fallback';
  }

  create_fsm() {
    //instead of creating a fsm, restore previous one
    this._fsm = this._prev._fsm;
    this._fsm.goto_state("from_fallback");
  }

  is_fallback() {
    return true;
  }

  on_normally_started(convo, next) {
    this.log("prev in state =>", this._prev._fsm.state());
    next();
    //this.log("FALLBACK ==>", this._prev.script_name())
  }

  my_after_script(convo, next) {
    let prev_script_name = this._prev.script_name();
    this.controller.studio.run(this.bot, prev_script_name, this.user, this.channel);
  }
}
exports.default = Fallback;