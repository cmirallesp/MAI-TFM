// @flow

import { Instance } from './instance'
import { Expectation } from './expectation'
import { BddConstructions } from './bdd_constructions'

type KindOfSpec = "ModelValidation" | "ModelMethod" | "Functionality";


export class Spec {
    //preconditions: hash instance_name,instance => 2 instances same name == same instance <klass_name,<instance_name,klass>>
    preconditions: Map<string, Instance>; //TODO: Instance[] (for multiple preconditions per instance name)
    expectations: Map<string,Expectation>; //TODO: Expectation[] (for multiple expectations per instance name)
    kindOfSpec: KindOfSpec;

    constructor(kindOfSpec: KindOfSpec) {
        this.kindOfSpec = kindOfSpec;
        this.preconditions = new Map();
        this.expectations = new Map();
    }

    static new_model_validation() {
        return new Spec("ModelValidation");
    }

    static new_method_validation() {
        return new Spec("ModelMethod");
    }

    add_precondition(k: Instance): Spec {
        this.preconditions.set(k.name, k);
        return this;
    }

    get_preconditions(): Iterator<Instance> {
        return this.preconditions.values();
    }

    get_precondition(name: string): Instance{
        let r = this.preconditions.get(name)  
        if (r) return r
        else{
            let e = new Error(`Instance "${name}" doesn't exist in preconditions`)
            this.log(e.stack)
            throw e
        }
    }

    add_expectation(e: Expectation): Spec {
        this.expectations.set(e.get_instance_name(), e);
        return this
    }

    get_expectations(): Iterator<Expectation> {
        return this.expectations.values();
    }

    get_expectation(name: string): Expectation {
        let e = this.expectations.get(name)
        if (e) return e
        else{
            let ex = new Error(`Expectation "${name}" doesn't exist in expectations`)
            this.log(ex.stack)
            throw ex
        }
    }
    
    get_preconditions_str(): string {
        let r = [];
        let bdd_constructors:BddConstructions = new BddConstructions()
        for (let [_, m: Instance] of this.preconditions) {
            r.push(bdd_constructors.instance_str(m))
        }
        return r.join('\n')
    }

    get_expectations_str(): string {
        let r = [];
        let bdd_constructors:BddConstructions = new BddConstructions()
        for(let [_,e: Expectation] of this.expectations){
            r.push(bdd_constructors.expectation_str(e))
        }
        return r.join('\n')
    }

    log(msg: string='') {
        console.log(`[SPEC] ${msg} preconditions => ${this.get_preconditions_str()}, expectations => ${this.get_expectations_str()}`)
    }
}
