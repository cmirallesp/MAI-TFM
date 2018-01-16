'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Spec = undefined;

var _instance = require('./instance');

var _expectation = require('./expectation');

var _bdd_constructions = require('./bdd_constructions');

class Spec {
    //TODO: Instance[] (for multiple preconditions per instance name)
    constructor(kindOfSpec) {
        this.kindOfSpec = kindOfSpec;
        this.preconditions = new Map();
        this.expectations = new Map();
    } //TODO: Expectation[] (for multiple expectations per instance name)

    //preconditions: hash instance_name,instance => 2 instances same name == same instance <klass_name,<instance_name,klass>>


    static new_model_validation() {
        return new Spec("ModelValidation");
    }

    static new_method_validation() {
        return new Spec("ModelMethod");
    }

    add_precondition(k) {
        this.preconditions.set(k.name, k);
        return this;
    }

    get_preconditions() {
        return this.preconditions.values();
    }

    get_precondition(name) {
        let r = this.preconditions.get(name);
        if (r) return r;else {
            let e = new Error(`Instance "${name}" doesn't exist in preconditions`);
            this.log(e.stack);
            throw e;
        }
    }

    add_expectation(e) {
        this.expectations.set(e.get_instance_name(), e);
        return this;
    }

    get_expectations() {
        return this.expectations.values();
    }

    get_expectation(name) {
        let e = this.expectations.get(name);
        if (e) return e;else {
            let ex = new Error(`Expectation "${name}" doesn't exist in expectations`);
            this.log(ex.stack);
            throw ex;
        }
    }

    get_preconditions_str() {
        let r = [];
        let bdd_constructors = new _bdd_constructions.BddConstructions();
        for (let [_, m] of this.preconditions) {
            r.push(bdd_constructors.instance_str(m));
        }
        return r.join('\n');
    }

    get_expectations_str() {
        let r = [];
        let bdd_constructors = new _bdd_constructions.BddConstructions();
        for (let [_, e] of this.expectations) {
            r.push(bdd_constructors.expectation_str(e));
        }
        return r.join('\n');
    }

    log(msg = '') {
        console.log(`[SPEC] ${msg} preconditions => ${this.get_preconditions_str()}, expectations => ${this.get_expectations_str()}`);
    }
}
exports.Spec = Spec;