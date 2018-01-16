// @flow

// Import chai.
let chai = require('chai');
var expect = chai.expect;

import { describe, it, beforeEach, before } from "mocha";
import {SelectSpecificationFsm} from '../select_specification_fsm'
import { FsmBase } from '../fsm_base';

describe('KindOfSpec', () => {
  let fsm: SelectSpecificationFsm 
  describe('next', () => {
    before(()=>{
      fsm = new SelectSpecificationFsm('_');
    })
    it('state == default',() =>{
      expect(fsm.state()).to.eq('default');
    })
    it('next',()=>{
      expect(fsm.next().state()).to.eq('offer_help')
    })
   it('next',()=>{
      expect(fsm.next("MODEL_VALIDATION",0.6).state()).to.eq('request_spec')
    })
    it('next',()=>{
      expect(fsm.next('MODEL_VALIDATION') .state()).to.eq('next_script')
    })
    it('next_script',()=>{
      expect(fsm.next().state()).to.eq('refine_spec_validation')
    })
  })
})