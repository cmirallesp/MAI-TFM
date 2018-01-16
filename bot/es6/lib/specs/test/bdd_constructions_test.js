// @flow

// Import chai.
let chai = require('chai');
var expect = chai.expect;

import { describe, it, beforeEach, before } from "mocha";

import { Instance } from "../instance";
import { Klass } from "../Klass";
import { type Symbol } from "../symbol";
import { BddConstructions } from '../bdd_constructions';
import { Expectation } from '../expectation';

describe('BddConstructions', () => {
  let bdd_cons: BddConstructions
  let m1: Klass
  let ins: Instance;

  before(async () => {
    m1 = await Klass.new_model("user")
    ins = m1.new_instance("u1");
    bdd_cons = new BddConstructions()
  })

  describe('#instance_str', () => {

    before('', () => {
      ins.add_attribute("att1", "1").add_attribute("at2", "hello");
    })
    
    it('with new returns a new instance', () => {
      expect(bdd_cons.instance_str(ins)).to.eq(`u1 = User.new(att1: 1,\nat2: "hello")`);
    })

    it('with create returns a create instance', () => {
      ins.builder = 'create';
      expect(bdd_cons.instance_str(ins)).to.eq(`u1 = User.create(att1: 1,\nat2: "hello")`);
    })
  })

  describe('#expectation_str',()=>{
    let ex: Expectation
    let sym: Symbol

    before(()=>{
      sym = { name:"valid?", type:"method", value:"true" };
      ex = new Expectation(ins,sym)
    })

    it('..',()=>{
      expect(bdd_cons.expectation_str(ex)).to.eq('expect( u1.valid?() ).to eq true')
    })
  })
})