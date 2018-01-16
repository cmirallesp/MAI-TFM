// @flow

// Import chai.
let chai = require('chai');
var expect = chai.expect;

import { Spec } from "../spec";
import { describe, before, it, beforeEach, afterEach } from 'mocha';
import { Klass } from '../klass';
import { Instance } from '../instance';
import { Expectation } from '../expectation'
import { NULL_SYMBOL } from '../symbol';
import { BddConstructions } from '../bdd_constructions'


describe('Spec', () => {
    let spec: Spec
    let ku,kp: Klass
    let u1,u2,p: Instance
    let exp,exp2: Expectation

    describe(".new_model_validation", () => {
        before('', () => {
            spec = Spec.new_model_validation();
        });
        it('kindOfSpec has to be ModelValidation', () => {
                expect(spec.kindOfSpec).to.eq("ModelValidation");
        })
    })

    before('create instances', async () => {
        ku = await Klass.new_model("user");
        kp = await Klass.new_model("project");
        u1 = ku.new_instance("u").add_attribute("a1", "1").add_attribute("a2", "hello");
        u2 = ku.new_instance("u2").add_attribute("a1", "1").add_attribute("a", "111.11");
        p = kp.new_instance("p");

        exp = Expectation.new_instance_method(u1, "valid?","true")
        exp.add_parameter("nId", "1").add_parameter("sname", "ca")
        exp2 = Expectation.new_instance_method(u2, "valid?", "false")
     })

    describe('#add_precondition', () => {
        describe('Given 3 preconditions',()=>{
            before('', () => {
                spec = Spec.new_model_validation()
                        .add_precondition(u1)
                        .add_precondition(u2)
                        .add_precondition(p)
            })

            it('return proper references', () => {
                expect(Array.from(spec.get_preconditions())).to.have.members([u1, u2, p]);
            })
        })
    })

    describe('#add_expectations', () => {
        before('', () => {
            spec = Spec.new_model_validation().add_expectation(exp);
        })

        it('a new expectation has been added', () => {
            expect(Array.from(spec.get_expectations())).to.have.members([exp]);
        })
    })

    describe('#get_preconditions_str', () => {
        describe("given 0 precoditions",()=>{
            before(()=>{
                spec = Spec.new_model_validation()
            })
            it('returns nothing',()=>{
                expect(spec.get_expectations_str()).to.eq('')
            })
        })

        describe("given many preconditions", ()=>{
            let preconditions_str: string
            before(() => {
                let bdd_cons: BddConstructions
                bdd_cons = new BddConstructions()
                spec = Spec.new_model_validation().add_precondition(u1).add_precondition(u2).add_precondition(p)
            
                preconditions_str = 'u = User.new(a1: 1,\na2: "hello")\n'
                preconditions_str+= 'u2 = User.new(a1: 1,\na: 111.11)\n'
                preconditions_str+= 'p = Project.new()'
            })
        
            it('returns all the constructors strings', () => {
                expect(spec.get_preconditions_str()).to.eq(preconditions_str)
            })
        })
    })

    describe('#get_expectations_str', () => {
        describe('Given 0 expectations',()=>{
            it('returns empty string',()=>{
                expect(spec.get_expectations_str()).to.eq('')
            })
        })

        describe('Given many expectations some with parameters',()=>{
            let expectations_str: string
            before(() => {
                let bdd_cons = new BddConstructions()

                spec=Spec.new_model_validation().add_expectation(exp).add_expectation(exp2)

                expectations_str = 'expect( u.valid?(nId: 1, sname: "ca") ).to eq true\n'
                expectations_str+= 'expect( u2.valid?() ).to eq false'
            })

            it('returns expectation strings', () => {
                expect(spec.get_expectations_str()).to.eq(expectations_str)
            })
        })
    })

})
