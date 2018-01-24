// @flow

import {Instance} from './instance'
import {type Symbol, type SymbolType} from './symbol'
import { DB } from './db';
import * as pl from 'pluralize';

export const EXP_SEPARATOR = "__##__"
export class Expectation {
    model: Instance
    symbol: Symbol
    members_sparator: string
    operator: string 
    db: DB

    //for symbols.type 'method'
    //parameters: Map<string, Symbol>
    parameters: Array<string>
    constructor(model: Instance, symbol: Symbol, members_sparator: '.' | '->' | ':'='.') {
        this.model = model
        this.symbol= symbol
        this.members_sparator =members_sparator
        this.parameters = []
        this.db = model.db
        this.operator = 'eq'
    }

    static new_instance_method(model: Instance, method_name: string,
        expected_value: string=""): Expectation{
        let s : Symbol ={
            name: method_name,
            type: "method",
            value: expected_value
        }

        return new Expectation( model,s)
    }
		//TODO: implement new_instance_attribute to check state expectations
    add_parameter(name: string, value: string){
        if (!this.symbol.type === 'method'){
            throw new Error("only methods have parameters")
        }

        if(name===''){
            throw new Error("name cannot be blank") ;
        }

        let sym: Symbol={
            name: name,
            value: value,
            type: this.infer_type(value)
        }
        //this.parameters.set(name,sym)
        this.parameters.push(sym)
        return this;
    }

    add_parameter(value: string){
        if (!this.symbol.type === 'method'){
            throw new Error("only methods have parameters")
        }

        //this.parameters.set(name,sym)
        this.parameters.push(value)
        return this;
    }

    get_instance_name(): string{
        return this.model.name
    }

    get_symmbol_name(): string{
        return this.symbol.name
    }

    set_symbol_name(name: string){
        this.symbol.name = name
    }

    get_expected_value(): string{
        return this.symbol.value
    }

    set_expected_value(value: *){
        this.symbol.value = value
    }

    get_type_of_expected_value(): SymbolType{
        return this.symbol.type
    }

    get_operator(){
        return this.operator
    }
    set_operator(operator: string){
        this.operator = operator
    }
    toString(): string{
        let caller_str = ''
        if (this.symbol.type ==='method'){
            let parameters_str = ''
            // this.parameters.forEach((val: Symbol, key: string, _: *) =>{
                this.parameters.forEach((val: string, _: *) =>{
                //let type_symbol = val.type === 'string' ?  '' : ''
                if(parameters_str){
                    // parameters_str += `, ${key}: ${type_symbol}${val.value}${type_symbol}`
                    parameters_str += `, ${val}`
                }
                else{
                    // parameters_str += `${key}: ${type_symbol}${val.value}${type_symbol}`
                    parameters_str += `${val}`
                }
            })
            caller_str= `(${parameters_str})`
        }
        return `${this.model.name}${this.members_sparator}${this.symbol.name}${caller_str}${EXP_SEPARATOR}${this.symbol.value}`

    }


    infer_type(value: string, is_reference: boolean =false): SymbolType{
        let r: SymbolType="null";

        if (is_reference){
            r = "reference"
        }
        else if (!isNaN(value)){
            r = "number"
        }
        else {
            r = "string"
        }
        return r;
    }
}
