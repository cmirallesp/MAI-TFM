// @flow

import {Instance} from './instance'
import {type Symbol, type SymbolType} from './symbol'
import { DB } from './db';
import * as pl from 'pluralize';
import { inspect } from 'util';

export const EXP_SEPARATOR = "__eq__"

export class Step {
    instance: string
    symbol: Symbol
    members_sparator: string

    //for symbols.type 'method'
    parameters: Map<string, Symbol>
    constructor(instance: string, symbol: Symbol, members_sparator: '.' | '->' | ':'='.') {
        this.instance = instance
        this.symbol= symbol
        this.members_sparator =members_sparator
        this.parameters = new Map()
    }

    static new_method(instance: string, method_name: string): Step{
        let s : Symbol ={
            name: method_name,
            type: "method",
            value: ""
        }

        return new Step( instance,s)
    }
	
    add_parameter(name: string, value: string, reference: boolean = false){
        if (!this.symbol.type === 'method'){
            throw new Error("only methods have parameters")
        }

        if(name===''){
            throw new Error("name cannot be blank") ;
        }

        let sym: Symbol={
            name: name,
            value: value,
            type: this.infer_type(name,value,reference)
        }
        this.parameters.set(name,sym)
        return this;
    }

    
    get_type_of_expected_value(): SymbolType{
        return this.symbol.type
    }

    toString(): string{
        let caller_str = ''
        if (this.symbol.type ==='method'){
            let parameters_str = ''
            this.parameters.forEach((val: Symbol, key: string, _: *) =>{
                let type_symbol = val.type === 'string' ?  '"' : ''
                if(parameters_str){
                    parameters_str += `, ${key}: ${type_symbol}${val.value}${type_symbol}`
                }
                else{
                    parameters_str += `${key}: ${type_symbol}${val.value}${type_symbol}`
                }
            })
            caller_str= `(${parameters_str})`
        }
        return `${this.instance}${this.members_sparator}${this.symbol.name}${caller_str}`

    }

    infer_type(name: string, value: string, reference: boolean = false): SymbolType{
        let r: SymbolType="null";
      if (reference){
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
