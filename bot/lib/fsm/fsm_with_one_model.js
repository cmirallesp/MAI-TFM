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

var _array = require("lodash/array");

var _lang = require("lodash/lang");

var _instance = require("../specs/instance");

const INSTANCE_NAME = "o1";

// ******THIS FSM IMPLEMENTS THE NEXT STATES IN THIS ORDER************
// model_name  => ask_method_name => (ask_params => ask_params_values)
// => expected_value => ask_attributes
//
// model_name (Users)-> creates a precondition ie o1 = Users.new(atts)
// ask_method_name-> creates a expectation for o1, ie. o1.method_name(params).to eq expected_value
// *****************************************************************
class FsmWithOneModel extends _fsm_base.FsmBase {

  get_model_under_test() {
    return Array.from(this.spec.get_preconditions())[0];
  }

  async build_spec() {
    let spec = this.create_spec();
    let klass = await _klass.Klass.new_model(this.fsm.model_name);
    //model under the test (mut)
    let mut = klass.new_instance(INSTANCE_NAME); //TODO: without passing a name o1,o2,.. 

    // intial state of the model under the test (new(param1:...,param2:...))
    let s = (0, _array.zip)(this.fsm.att_names, this.fsm.att_values);
    s.forEach(([name, value], idx) => {
      mut.add_attribute(name, value);
    });
    this.spec.add_precondition(mut);

    // expectation
    let expectation = _expectation.Expectation.new_instance_method(mut, this.fsm.method_name, this.fsm.expected_value);
    //initial values
    s = (0, _array.zip)(this.fsm.param_names, this.fsm.param_values);
    s.forEach(([name, value], idx) => {
      expectation.add_parameter(name, value);
    });
    this.spec.add_expectation(expectation);
    return [mut, expectation];
  }

  async get_spec() {
    let bdd = new _bdd_constructions.BddConstructions();
    let mut;
    let expect;

    [mut, expect] = await this.build_spec();

    let before = `before {${bdd.instance_str(mut)}}\n`;
    let it = `it {${bdd.expectation_str(expect)}}`;
    return Promise.resolve(`${before}${it}`);
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

  set_method_name(method_name) {
    this.log("set_method name=>", method_name);
    this.get_fsm().method_name = method_name;
  }

  set_expected_value(expected_value) {
    this.log("set_expected_value =>", expected_value);
    this.get_fsm().expected_value = expected_value;
  }

  set_model_name(model_name) {
    this.log(`set_model_name ${model_name}`);
    this.get_fsm().model_name = model_name;
  }

  create_spec() {
    throw new Error("Abstract method `create_spec` must be over written");
  }

  constructor(script_name, method_with_params = false) {
    super(script_name);
    this.spec = this.create_spec();
    this.add_props({
      data: {
        spec: this.spec,
        model_name: '', // current model name ()
        method_name: '', // current expectation method name 
        expected_value: '',
        att_names: [],
        att_values: [],
        ask_att_values: true,
        unprocessed: [],
        current_unprocessed: '',
        param_names: [],
        param_values: [],
        ask_param_values: true,
        with_params: method_with_params
      },

      transitions: [{ name: 'next',
        from: ['default', 'error', 'ask_method_name', 'ask_params', 'ask_param_values', 'ask_method_value', 'ask_model_name'],
        to: function () {
          return this.decide_next_to_ask();
        }
      }, { // ask_attributes => ask_values 
        name: 'next',
        from: 'ask_attributes',
        to: function (att) {
          this.log("asking attributes");
          // if (!att) return 'ask_attributes' //loop if empty
          let [pn, av] = this.split_names(att);
          this.att_names = pn;
          this.ask_att_values = av;
          this.att_values = [];
          return this.decide_next_to_ask();
        }
      }, { // ask_values
        name: 'next',
        from: 'ask_values',
        to: function (value) {
          this.att_values.push(value);
          // this.log(`ask_values: [value => ${value}]. [values => $att_{this.values}]. [unprocessed => $att_{this.unprocessed}]`)
          this.current_unprocessed = this.unprocessed.shift();
          return this.decide_next_to_ask();
        }
      }, { // ask_params =>ask_param_values: 
        name: 'next',
        from: 'ask_params',
        to: function (params) {
          this.log("asking params:", params);
          // if (!params) return 'ask_params' //loop if empty
          let [pn, av] = this.split_names(params);
          this.param_names = pn;
          this.ask_param_values = av;
          //[this.param_names,this.ask_param_values] = this.split_names(params)
          this.param_values = [];
          return this.decide_next_to_ask();
        }
      }, { // ask_param_values => ask_param_values => ...=>
        name: 'next',
        from: 'ask_param_values',
        to: function (value) {
          this.param_values.push(value);
          // this.log(`ask_param_values: [value => ${value}]. [param_values => ${this.param_values}]. [unprocessed => ${this.unprocessed}]`)
          this.current_unprocessed = this.unprocessed.shift();
          return this.decide_next_to_ask();
        }
      }],

      methods: {
        //given a list of name, split into an array and move to the next state (ask_values)
        split_names(v) {
          let r = [];
          let ask_values = true;
          this.unprocessed = [];
          if (v.toUpperCase() === 'NONE') {
            ask_values = false;
          } else {
            let aValue = Array.from(v.split(/[.,;]/));
            r = aValue.map(value => {
              return value.trim().replace(/ /g, '_');
            });
            this.unprocessed = (0, _lang.cloneDeep)(r);
            //first attr to be asked
            this.current_unprocessed = this.unprocessed.shift();
          }
          this.log("returning =>", [r, ask_values]);
          return [r, ask_values];
        },

        decide_next_to_ask() {
          // NOTE: order of if MATTERS!!
          // model_name => ask_method_name => (ask_params => ask_params_values)
          // => expected_value => ask_attributes
          let result = '';
          if (!this.model_name) return 'ask_model_name';
          if (!this.method_name) return 'ask_method_name';
          if (this.with_params && this.ask_param_values) {
            if (this.param_names.length == 0) return 'ask_params';
            if (this.param_values.length == 0) return 'ask_param_values';
          }
          if (!this.expected_value) return 'ask_method_value';
          if (this.ask_att_values) {
            if (this.att_names.length == 0) return 'ask_attributes';
            if (this.att_values.length == 0) return 'ask_values';
          }
          //once we get show_spec => reset boolean parameters for the future
          this.ask_param_values = true;
          this.ask_att_values = true;
          return 'show_spec';
        }
      }
    });
  }
}
exports.FsmWithOneModel = FsmWithOneModel;