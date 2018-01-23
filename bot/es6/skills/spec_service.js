// @flow

import SkillsBase from "./skills_base";
import { SelectSpecificationFsm } from "../lib/fsm/select_specification_fsm";
import { FsmWithOneModel } from "../lib/fsm/fsm_with_one_model";

export default class SpecService extends SkillsBase{
  entities: *[]

  script_name() {
    return 'spec_validations'
  }

  create_fsm() {
    
  }

  on_normally_started(convo: *, next: *) {
    //casting from FsmBase
    let peak: SelectSpecificationFsm = (this._prev.fsm(): any) 
    this.log("peak =>", peak.detected_entities())
    this.entities = peak.detected_entities()
    this.log("entities=>",this.entities)
    this.next(convo,next)
  }
  get_spec(): string{
    return "www"
  }

  constructor(controller: *, stack: SkillsBase[]){
    super(controller, stack);

    //before get_spec
    controller.studio.beforeThread(this.script_name(),'show_spec',
      async (convo, next) =>{
        let spec = this.get_spec()
        convo.setVar("spec",spec)
        next()
      }
    )
  }
 }