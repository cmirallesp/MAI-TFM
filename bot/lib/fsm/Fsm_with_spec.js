"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FsmWithOneModel = undefined;

var _fsm_base = require("./fsm_base");

var _spec = require("../specs/spec");

var _bdd_constructions = require("../specs/bdd_constructions");

var _klass = require("../specs/klass");

var _expectation = require("../specs/expectation");

class FsmWithOneModel extends _fsm_base.FsmBase {

  get_spec() {
    let bdd = new _bdd_constructions.BddConstructions();
    let mut = Array.from(this.spec.get_preconditions())[0];
    let e = this.spec.get_expectations()[0];

    return `${bdd.instance_str(mut)}\n${bdd.expectation_str(e)}`;
  }

  current_unprocessed() {
    return this.get_fsm().current_unprocessed;
  }

  get_model_name() {
    return this.get_fsm().model_name;
  }

  get_att_names() {
    return this.get_fsm().att_names;
  }

  set_model_name(model_name) {
    this.log(`set_model_name ${model_name}`);
    this.get_fsm().model_name = model_name;
    return _klass.Klass.new_model(model_name).then(model => {
      let model_under_test = model.new_instance("o1");
      this.spec.add_precondition(model_under_test);
      this.spec.add_expectation(_expectation.Expectation.new_instance_method(model_under_test, "valid?", "true"));
      this.spec.log("1.");
    });
  }

  constructor(script_name) {
    super(script_name);
    this.add_props({
      data: {
        spec: this.spec,
        model_name: '',
        att_names: [],
        values: [],
        unprocessed: [],
        current_unprocessed: ''

      }
    });
  }

}
exports.FsmWithOneModel = FsmWithOneModel;