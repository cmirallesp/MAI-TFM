"use strict";

var _mocha = require("mocha");

var _instance = require("../instance");

var _Klass = require("../Klass");

require("../symbol");

var _bdd_constructions = require("../bdd_constructions");

var _expectation = require("../expectation");

// Import chai.
let chai = require('chai');
var expect = chai.expect;

(0, _mocha.describe)('BddConstructions', () => {
  let bdd_cons;
  let m1;
  let ins;

  (0, _mocha.before)(async () => {
    m1 = await _Klass.Klass.new_model("user");
    ins = m1.new_instance("u1");
    bdd_cons = new _bdd_constructions.BddConstructions();
  });

  (0, _mocha.describe)('#instance_str', () => {

    (0, _mocha.before)('', () => {
      ins.add_attribute("att1", "1").add_attribute("at2", "hello");
    });

    (0, _mocha.it)('with new returns a new instance', () => {
      expect(bdd_cons.instance_str(ins)).to.eq(`u1 = User.new(att1: 1,\nat2: "hello")`);
    });

    (0, _mocha.it)('with create returns a create instance', () => {
      ins.builder = 'create';
      expect(bdd_cons.instance_str(ins)).to.eq(`u1 = User.create(att1: 1,\nat2: "hello")`);
    });
  });

  (0, _mocha.describe)('#expectation_str', () => {
    let ex;
    let sym;

    (0, _mocha.before)(() => {
      sym = { name: "valid?", type: "method", value: "true" };
      ex = new _expectation.Expectation(ins, sym);
    });

    (0, _mocha.it)('..', () => {
      expect(bdd_cons.expectation_str(ex)).to.eq('expect( u1.valid?() ).to eq true');
    });
  });
});