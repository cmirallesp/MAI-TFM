// @flow

// Import chai.
let chai = require('chai');
var expect = chai.expect;

import { describe, it, beforeEach, before } from "mocha";
import {RefineSpecValidationFsm} from '../refine_spec_validation_fsm'

describe('RefineSpecValidationFsm', () => {
  let fsm: RefineSpecValidationFsm;""
  describe('#new', () => {
    describe('without modelname',()=>{
      before(()=>{
        fsm = new RefineSpecValidationFsm("")
      })

      it('next == ask_attributes',()=>{
        expect(fsm.next().state()).to.eq('ask_model_name')
      })
      it('modelname==user',()=>{
        expect(fsm.get_model_name()).to.eq('')
      })
    })
  })

  describe('#set_model_name', () =>{
    before(()=>{
      fsm = new RefineSpecValidationFsm("");
      fsm.goto_state('ask_model_name');
      fsm.set_model_name('project')
    })

    it('next state ask_attributes', ()=>{
      expect(fsm.next().state()).to.eq('ask_attributes')
    })

    it('model_name is stored', () =>{
      expect(fsm.get_model_name()).to.eq('project')
    })
  })

  describe('#next from ask_attributes', () =>{
    before(()=>{
      fsm = new RefineSpecValidationFsm("");
      fsm.goto_state('ask_attributes')
    })

    it('next state ask_values', ()=>{
      expect(fsm.next('first name, last_name; email. addresses').state()).to.eq('ask_values')
    })

    it('att_names stores proper names', () =>{
      expect(fsm.get_att_names()).has.members(["first_name","last_name","email","addresses"])
    })
  })

  describe('#get_spec',async ()=>{
    before(async ()=>{
      fsm = new RefineSpecValidationFsm("")
      fsm.goto_state('ask_model_name')
      await fsm.set_model_name('user')
      fsm.next()
      expect(fsm.state()).to.eq('ask_attributes')
      fsm.next('first name, last_name; email')
      expect(fsm.state()).to.eq('ask_values')
      fsm.next("john").next("smith").next("john_smith@gmail.com")
    })

    it("returns preconditions and expectations",async ()=>{
      let spec = await fsm.get_spec()
      expect(spec).to.eq('before {o1 = User.new(first_name: "john",\nlast_name: "smith",\nemail: "john_smith@gmail.com")}\nit {expect( o1.valid?() ).to eq true}')
    })
  })
})