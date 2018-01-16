"use strict";

var _mocha = require("mocha");

var _instance = require("../instance");

var _Klass = require("../Klass");

require("../symbol");

// Import chai.
let chai = require('chai');
var expect = chai.expect;

(0, _mocha.describe)('Klass', () => {
    let m1;
    let ins;

    (0, _mocha.describe)('#add_attribute', () => {
        let sym;
        const sym1_str = "attr1";

        (0, _mocha.before)(async () => {
            m1 = await _Klass.Klass.new_model("user");
            ins = m1.new_instance("u1");
        });

        (0, _mocha.describe)('empty name', () => {
            (0, _mocha.it)('must fail', () => {
                expect(() => ins.add_attribute('', "1")).to.throw("name cannot be blank");
            });
        });

        (0, _mocha.describe)('with number values', () => {
            for (let num_str of ["1", "1111.1"]) {
                (0, _mocha.describe)(`#${num_str}`, () => {
                    (0, _mocha.before)(() => {
                        sym = ins.add_attribute(sym1_str, num_str).get_attribute(sym1_str);
                    });
                    (0, _mocha.it)('returns new symbol with proper value and type', () => {
                        //console.log(num_str,"=>",sym.value);
                        expect(sym.value).to.eq(num_str);
                        expect(sym.type).to.eq("number");
                    });

                    (0, _mocha.it)('symbol in the table symbols', () => {
                        expect(ins.has_attribute(sym1_str)).to.be.true;
                    });
                });
            }
        });

        (0, _mocha.describe)('with string values', () => {
            (0, _mocha.before)(() => {
                sym = ins.add_attribute(sym1_str, "hello").get_attribute(sym1_str);
            });

            (0, _mocha.it)('returns new symbol with proper value and type', () => {
                expect(sym.value).to.eq('hello');
                expect(sym.type).to.eq("string");
            });

            (0, _mocha.it)('symbol in the table symbols', () => {
                expect(ins.has_attribute(sym1_str)).to.be.true;
            });
        }),
        //TODO: think later how to deal with objects containing objects (or collections of objects)
        (0, _mocha.describe)('Klass', () => {
            (0, _mocha.it)('should return a klass instance...or not?');
        }), (0, _mocha.describe)('Klasses', () => {
            (0, _mocha.it)('should return a empty array...or not..');
        });
        // describe('with plural values', () =>{
        //     before(()=>{
        //         sym = m1.add_attribute(sym1_str, "projects");
        //     });

        //     it('returns new symbol with integer representation in value', () =>{
        //         expect(sym.value).to.eq([]);
        //     });

        //     it('symbol in the table symbols', ()=>{
        //         expect(m1.has_attribute(sym1_str)).to.be.true
        //     });
        // })
    });

    (0, _mocha.describe)('#toString', () => {
        (0, _mocha.before)('', async () => {
            m1 = await _Klass.Klass.new_model("User");
            ins = m1.new_instance("u1");
            ins.add_attribute("att1", "1").add_attribute("at2", "hello");
        });
        (0, _mocha.it)('', () => {
            expect(ins.toString()).to.eq(`att1: 1,\nat2: "hello"`);
        });
    });
});