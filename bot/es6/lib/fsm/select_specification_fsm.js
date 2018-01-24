// @flow

const LOW_THR1=0.65; //Threshold to ask again
const MED_THR2=0.90; //Threshold to refine the answer

const _specs_mappings = require("./specs_mappings");
import {FsmBase} from './fsm_base';
// USE of fsm to declare neatly threads' transitions
// same threads than describe_specification scripts
export class SelectSpecificationFsm  extends FsmBase{
	detected_entities(): *[]{
		return this.get_fsm().detected_entities
	}	
	constructor(script_name: string){
		super(script_name);
		this.add_props({
			data:{
				detected_entities: []
			},

			transitions: [
				{ name: 'next',
					from: ['default','error'],
					to:   'offer_help'
				},

				{	name: 'next',
					from: 'offer_help',
					//from: 'waiting_user_request',
					to: function (intent_type, intent_confidence, entities) {
						this.log(`intent_type => ${intent_type} intent_confidence => ${intent_confidence}` );
						let r = null;
						let str: string='';
						if ((LOW_THR1 > intent_confidence) && (entities.length==0)){
							str = "low";
							r = 'request_spec';
						}
						//THR1 < intent_confidence OR entities.leng > 0
						else {
							str = (MED_THR2 > intent_confidence) ? "med": "high"
							this.next_script_str= _specs_mappings.refine_thread(intent_type);
							this.detected_entities=entities;
							r = 'next_script';
						}
						this.log(`${str} confidence (${intent_confidence}) next thread: ${r}`);
						return r;
					}
				},

				{	name: 'next',
					from: ['request_spec','from_fallback'],
					to: function(intent_type) {
						this.next_script_str = _specs_mappings.refine_thread(intent_type);
						return 'next_script';
					}
				},
			]}
		);
	}
};
