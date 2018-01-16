// @flow

// Import chai.
let chai = require('chai');
var expect = chai.expect;

import {describe, it, beforeEach, before} from "mocha";

import {Instance}  from "../instance";
import {Klass}  from "../Klass";
import {type Symbol} from "../symbol";

describe('Klass', () =>{
    let m1: Klass;
    let ins: Instance;

    describe('#add_attribute', () =>{
        let sym: Symbol ;
        const sym1_str="attr1";

        before(async () => { 
            m1= await Klass.new_model("user");
            ins = m1.new_instance("u1");
        });

        describe('empty name',()=>{
            it('must fail',() =>{
                expect(() => ins.add_attribute('', "1")).to.throw("name cannot be blank");
            })
        })
        
        describe('with number values', () =>{
            for(let num_str of ["1","1111.1"]){
                describe(`#${num_str}`,()=>{
                    before(()=>{
                        sym = ins.add_attribute(sym1_str, num_str).get_attribute(sym1_str);
                    })
                    it('returns new symbol with proper value and type', () =>{
                        //console.log(num_str,"=>",sym.value);
                        expect(sym.value).to.eq(num_str);
                        expect(sym.type).to.eq("number")
                    });

                    it('symbol in the table symbols', ()=>{
                        expect(ins.has_attribute(sym1_str)).to.be.true
                    });
                })
            }
        })

        describe('with string values', () =>{
            before(()=>{
                sym = ins.add_attribute(sym1_str, "hello").get_attribute(sym1_str);
            });

            it('returns new symbol with proper value and type', () =>{
                expect(sym.value).to.eq('hello');
                expect(sym.type).to.eq("string");
            });

            it('symbol in the table symbols', ()=>{
                expect(ins.has_attribute(sym1_str)).to.be.true
            });
        }),
        //TODO: think later how to deal with objects containing objects (or collections of objects)
        describe('Klass', ()=>{
            it('should return a klass instance...or not?');
        }),

        describe('Klasses',()=>{
            it('should return a empty array...or not..');
        })
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

    describe('#toString', ()=>{
        before('',async ()=>{
            m1 = await Klass.new_model("User")
            ins = m1.new_instance("u1");
            ins.add_attribute("att1", "1").add_attribute("at2", "hello");
        })
        it('', ()=>{
            expect(ins.toString()).to.eq(`att1: 1,\nat2: "hello"`);
        })
    })


})