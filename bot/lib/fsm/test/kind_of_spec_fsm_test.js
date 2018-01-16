'use strict';

var _mocha = require('mocha');

var _select_specification_fsm = require('../select_specification_fsm');

var _fsm_base = require('../fsm_base');

// Import chai.
let chai = require('chai');
var expect = chai.expect;

(0, _mocha.describe)('KindOfSpec', () => {
  let fsm;
  (0, _mocha.describe)('next', () => {
    (0, _mocha.before)(() => {
      fsm = new _select_specification_fsm.SelectSpecificationFsm('_');
    });
    (0, _mocha.it)('state == default', () => {
      expect(fsm.state()).to.eq('default');
    });
    (0, _mocha.it)('next', () => {
      expect(fsm.next().state()).to.eq('offer_help');
    });
    (0, _mocha.it)('next', () => {
      expect(fsm.next("MODEL_VALIDATION", 0.6).state()).to.eq('request_spec');
    });
    (0, _mocha.it)('next', () => {
      expect(fsm.next('MODEL_VALIDATION').state()).to.eq('next_script');
    });
    (0, _mocha.it)('next_script', () => {
      expect(fsm.next().state()).to.eq('refine_spec_validation');
    });
  });
});