'use strict';

var _spec = require('../spec');

var _mocha = require('mocha');

var _klass = require('../klass');

var _instance = require('../instance');

var _expectation = require('../expectation');

var _symbol = require('../symbol');

var _bdd_constructions = require('../bdd_constructions');

// Import chai.
let chai = require('chai');
var expect = chai.expect;

(0, _mocha.describe)('Spec', () => {
    let spec;
    let ku, kp;
    let u1, u2, p;
    let exp, exp2;

    (0, _mocha.describe)(".new_model_validation", () => {
        (0, _mocha.before)('', () => {
            spec = _spec.Spec.new_model_validation();
        });
        (0, _mocha.it)('kindOfSpec has to be ModelValidation', () => {
            expect(spec.kindOfSpec).to.eq("ModelValidation");
        });
    });

    (0, _mocha.before)('create instances', async () => {
        ku = await _klass.Klass.new_model("user");
        kp = await _klass.Klass.new_model("project");
        u1 = ku.new_instance("u").add_attribute("a1", "1").add_attribute("a2", "hello");
        u2 = ku.new_instance("u2").add_attribute("a1", "1").add_attribute("a", "111.11");
        p = kp.new_instance("p");

        exp = _expectation.Expectation.new_instance_method(u1, "valid?", "true");
        exp.add_parameter("nId", "1").add_parameter("sname", "ca");
        exp2 = _expectation.Expectation.new_instance_method(u2, "valid?", "false");
    });

    (0, _mocha.describe)('#add_precondition', () => {
        (0, _mocha.describe)('Given 3 preconditions', () => {
            (0, _mocha.before)('', () => {
                spec = _spec.Spec.new_model_validation().add_precondition(u1).add_precondition(u2).add_precondition(p);
            });

            (0, _mocha.it)('return proper references', () => {
                expect(Array.from(spec.get_preconditions())).to.have.members([u1, u2, p]);
            });
        });
    });

    (0, _mocha.describe)('#add_expectations', () => {
        (0, _mocha.before)('', () => {
            spec = _spec.Spec.new_model_validation().add_expectation(exp);
        });

        (0, _mocha.it)('a new expectation has been added', () => {
            expect(Array.from(spec.get_expectations())).to.have.members([exp]);
        });
    });

    (0, _mocha.describe)('#get_preconditions_str', () => {
        (0, _mocha.describe)("given 0 precoditions", () => {
            (0, _mocha.before)(() => {
                spec = _spec.Spec.new_model_validation();
            });
            (0, _mocha.it)('returns nothing', () => {
                expect(spec.get_expectations_str()).to.eq('');
            });
        });

        (0, _mocha.describe)("given many preconditions", () => {
            let preconditions_str;
            (0, _mocha.before)(() => {
                let bdd_cons;
                bdd_cons = new _bdd_constructions.BddConstructions();
                spec = _spec.Spec.new_model_validation().add_precondition(u1).add_precondition(u2).add_precondition(p);

                preconditions_str = 'u = User.new(a1: 1,\na2: "hello")\n';
                preconditions_str += 'u2 = User.new(a1: 1,\na: 111.11)\n';
                preconditions_str += 'p = Project.new()';
            });

            (0, _mocha.it)('returns all the constructors strings', () => {
                expect(spec.get_preconditions_str()).to.eq(preconditions_str);
            });
        });
    });

    (0, _mocha.describe)('#get_expectations_str', () => {
        (0, _mocha.describe)('Given 0 expectations', () => {
            (0, _mocha.it)('returns empty string', () => {
                expect(spec.get_expectations_str()).to.eq('');
            });
        });

        (0, _mocha.describe)('Given many expectations some with parameters', () => {
            let expectations_str;
            (0, _mocha.before)(() => {
                let bdd_cons = new _bdd_constructions.BddConstructions();

                spec = _spec.Spec.new_model_validation().add_expectation(exp).add_expectation(exp2);

                expectations_str = 'expect( u.valid?(nId: 1, sname: "ca") ).to eq true\n';
                expectations_str += 'expect( u2.valid?() ).to eq false';
            });

            (0, _mocha.it)('returns expectation strings', () => {
                expect(spec.get_expectations_str()).to.eq(expectations_str);
            });
        });
    });
});