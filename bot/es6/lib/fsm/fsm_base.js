//  @flow

//DON'T USE IMPORT DOESN'T WORK
const visualize = require('javascript-state-machine/lib/visualize');
const StateMachine = require('javascript-state-machine');
const INIT_STATE='default'

export class FsmBase {
	fsm: StateMachine
	script_name: string

	log(...params: *){
		console.log("[FSM]:", ...params)
	}

	dot(): string  {
		return visualize(this.fsm, { name: 'threads', orientation: 'horizontal' });
	}

	state(): string{
		return this.fsm.state;
	}

	error_var() {
		return this.fsm.error_var
	}

	error_val() {
		return this.fsm.error_val
	}

	next(...args: any) {
		this.fsm.next(...args);
		return this;
	}

	back() {
		this.fsm.back();
		return this;
	}

	error(...args: any) {
		this.fsm.gotoError(args);
	}

	add_props(props: *){
		//apply for some strange reason is not copied in apply
		if(!props.init){
			props.init= INIT_STATE
		}

		//transitions is an array so to preserve base transition we must concatenate
		let base_transitions = this.fsm._fsm.config.options.transitions
		props.transitions = props.transitions ? 
			props.transitions.concat(base_transitions) : base_transitions

		this.fsm = StateMachine.apply(this.fsm,props);
	}

	get_fsm(): *{
		return this.fsm
	}

	get_data(): *{
		return this.fsm._fsm.config.options.data
	}

	goto_state(state: string){
		this.fsm.goto(state)
	}

	in_next_script(): boolean{
		return this.fsm.state==='next_script'
	}

	get_my_script_name(): string{
		return this.script_name
	}

	constructor(script_name: string){
		this.script_name = script_name
		this.fsm = new StateMachine({
			init: INIT_STATE, 
			data: {
				error_counter: 0,
				max_errors: 2,
				error_var: undefined,
				error_val: undefined,
				next_script_str: undefined, //used in end state to return next script to load
				prev_state: undefined 	// prev_state used to go back when error. I use this instead of
				// returning `false` in some event because events doesn't
				// allow to jump forward (that is needed when too many errors)
			},

			transitions: [
				{ name: 'goto_error',
					from: '*',
					to: function(...error) {
						this.log("error =>",error)
						if (this.error_counter < this.max_errors) {
							this.error_var = 'error_msg';
							this.error_val = error;
							this.error_counter +=1;
							return this.prev_state;
						}
						else { //come back to state I'm comming
							this.error_var = 'too_many_errors';
							this.error_val = true;
							return 'end';
						}
					}
				},

				{ name: 'goto',
					from: '*',
					to: function(s) { return s }
				},

				{	name: 'next',
					from: 'next_script',
					to: function () {
						// this.data.keys().forEach(k => this.log("KEY=>", k))
						this.error_counter = 0;
						this.error_var = undefined;
						this.error_val = undefined;
						return this.next_script_str;
					}
				}
			],

			methods: {
				log: function(...msg: *){
					console.log("[FSM] ",...msg)
				},

				onEnterState: function(e)  {
					this.log(`entering: STATE=>${this.state}, FROM =>${e.from} TO =>${e.to}`) ;
					e.fsm.prev_state = e.from;
				},

				onLeaveState: function (e) {
					this.log(`leaving: STATE=>${this.state}, FROM =>${e.from} TO =>${e.to}`) ;
				},
			}
		})
	}
}
