// @flow

import { FsmBase } from "../lib/fsm/fsm_base";

//Botkit Studio Skill module to enhance the "refine_spec_validation" script
export default class SkillsBase {
	controller: *
	_fsm: FsmBase
	_restore_fsm: FsmBase
	_prev: SkillsBase
	stack: SkillsBase[]
	bot: * 
	user: * 
	channel: *

	is_fallback(): boolean{
		//is not possible do instanceOf Fallback since circular references...
		return false
	}
	
	fsm(): FsmBase{
		return this._fsm
	}

	log(...msg: *){
		console.log("[SKILL] ", ...msg)
	}
	
	script_name(): string {
		this.log(new Error('ABSTRACT method script_name MUST be implemented!').stack);
		return ""
	}

	create_fsm() {
		this.log(new Error(`ABSTRACT Method create_fsm MUST be implemented!`).stack);
	}

	save_context(){
		let peak = this.stack.length > 0 ? this.stack[this.stack.length-1] : null
		//add fsm to the stack if not already
		if (!(peak===this)){
			this.log("saving the context" )
			this.stack.push(this) //save the current fsm in the stack
		}
	}

	my_after_script(convo: *, next: *) { }
	
	async next(convo: *, _next?: *, ...args: *){
		if(args) this.fsm().next(...args)
		else this.fsm().next()

		if(this.fsm().in_next_script()){
			this.fsm().next(); //move from next_script state to next
			this.save_context()
			await this.controller.studio.run(this.bot, this.fsm().state(), this.user,this.channel);
		}
		else{
			this.log(`going to ${this.fsm().state()}`)
			await convo.gotoThread(this.fsm().state());
		}
		_next && _next('stop')
	}

	on_normally_started(convo: *, next: *) {
		this._fsm.next()
		next()
	}

	on_fallback_started(convo: *, next: *){
		convo.gotoThread(this._fsm.state())
		next()
	}
	
	// param stack: state used to push the state before leaving
	constructor(controller: *, stack: SkillsBase[]){
		this.stack = stack
		this.controller = controller
		// BEFORE SCRIPT
		controller.studio.before(this.script_name(), (convo,next)=>{
			this.log( `BEFORE: ${this.script_name()}`)
			//save bot, user and channel
			this.bot = convo.context.bot
			this.user= convo.context.user
			this.channel=convo.context.channel
			//restore previous context
			this._prev = this.stack.pop()

			if (this._prev && this._prev.is_fallback()){
				this._fsm = this._prev._fsm
				this.on_fallback_started(convo, next)
			}
			else {
				//create a new and clean fsm only if previous fsm is not fallback (if existence)
				this.create_fsm()
				this.on_normally_started(convo,next) 
			}
			return ; //DON'T ADD CODE AFTER PREVIOUS IF!
		})

		// AFTER SCRIPT
		controller.studio.after(this.script_name(), (convo, next) =>{
			this.log( `AFTER: ${this.script_name()}`)
			this.save_context()
			this.my_after_script(convo,next)
		})
	}

}
