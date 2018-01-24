// Dictionary <kind_of_spec,{description, refine_thread}> wher
// kind_of_spec: types of specs that the bot knows
// description: textual descriptions
// refine_thread: thread to refine parameters
const specs_mappings = new Map()
	.set("MODEL_VALIDATION",
		{ description: "model validation specification",
			refine_thread: "refine_spec_validation"  })
	.set("MODEL_METHOD_TEST",
		{ description: "model method specification",
			refine_thread: "refine_spec_method"})
	.set("SERVICE_TEST",
		{ description:"functionality specification",
			refine_thread: "spec_service"})
	.set("MODEL_TEST",
		{ description: "model specification",
			refine_thread: "refine_model"
		});
export function description(key){
	return specs_mappings.get(key).description;
}

export function refine_thread(key){
	return specs_mappings.get(key).refine_thread;
}

export function has_key(key){
	return specs_mappings.has(key);
}
