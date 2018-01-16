'use strict';

var _mocha = require('mocha');

var _refine_spec_validation_fsm = require('../refine_spec_validation_fsm');

// Import chai.
let chai = require('chai');
var expect = chai.expect;

(0, _mocha.describe)('RefineSpecValidationFsm', () => {
  let fsm;"";
  (0, _mocha.describe)('#new', () => {
    (0, _mocha.describe)('without modelname', () => {
      (0, _mocha.before)(() => {
        fsm = new _refine_spec_validation_fsm.RefineSpecValidationFsm("");
      });

      (0, _mocha.it)('next == ask_attributes', () => {
        expect(fsm.next().state()).to.eq('ask_model_name');
      });
      (0, _mocha.it)('modelname==user', () => {
        expect(fsm.get_model_name()).to.eq('');
      });
    });
  });

  (0, _mocha.describe)('#set_model_name', () => {
    (0, _mocha.before)(() => {
      fsm = new _refine_spec_validation_fsm.RefineSpecValidationFsm("");
      fsm.goto_state('ask_model_name');
      fsm.set_model_name('project');
    });

    (0, _mocha.it)('next state ask_attributes', () => {
      expect(fsm.next().state()).to.eq('ask_attributes');
    });

    (0, _mocha.it)('model_name is stored', () => {
      expect(fsm.get_model_name()).to.eq('project');
    });
  });

  (0, _mocha.describe)('#next from ask_attributes', () => {
    (0, _mocha.before)(() => {
      fsm = new _refine_spec_validation_fsm.RefineSpecValidationFsm("");
      fsm.goto_state('ask_attributes');
    });

    (0, _mocha.it)('next state ask_values', () => {
      expect(fsm.next('first name, last_name; email. addresses').state()).to.eq('ask_values');
    });

    (0, _mocha.it)('att_names stores proper names', () => {
      expect(fsm.get_att_names()).has.members(["first_name", "last_name", "email", "addresses"]);
    });
  });

  (0, _mocha.describe)('#get_spec', async () => {
    (0, _mocha.before)(async () => {
      fsm = new _refine_spec_validation_fsm.RefineSpecValidationFsm("");
      fsm.goto_state('ask_model_name');
      await fsm.set_model_name('user');
      fsm.next();
      expect(fsm.state()).to.eq('ask_attributes');
      fsm.next('first name, last_name; email');
      expect(fsm.state()).to.eq('ask_values');
      fsm.next("john").next("smith").next("john_smith@gmail.com");
    });

    (0, _mocha.it)("returns preconditions and expectations", async () => {
      let spec = await fsm.get_spec();
      expect(spec).to.eq('before {o1 = User.new(first_name: "john",\nlast_name: "smith",\nemail: "john_smith@gmail.com")}\nit {expect( o1.valid?() ).to eq true}');
    });
  });
});