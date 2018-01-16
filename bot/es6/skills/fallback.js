// @flow

import SkillsBase from "./skills_base";
import { FsmBase } from "../lib/fsm/fsm_base";

export default class Fallback extends SkillsBase{
  
  script_name() {
    return 'fallback'
  }

  create_fsm() {
    //instead of creating a fsm, restore previous one
    this._fsm = this._prev._fsm
    this._fsm.goto_state("from_fallback")
  }

  is_fallback(): boolean{
    return true
  }

  on_normally_started(convo: *, next: *){
    this.log("prev in state =>", this._prev._fsm.state())
    next()
    //this.log("FALLBACK ==>", this._prev.script_name())
  }

  my_after_script(convo: *, next: *) {
    let prev_script_name = this._prev.script_name() 
    this.controller.studio.run(this.bot, prev_script_name, this.user,this.channel)
  }
}
