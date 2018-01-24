// @flow

import {Instance} from './instance'
import {type Symbol, type SymbolType} from './symbol'
import { DB } from './db';
import * as pl from 'pluralize';
import { inspect } from 'util';
import {lemmatizer} from "lemmatizer";



export class Step {
    instance: string
    symbol: Symbol
    members_sparator: string

    //for symbols.type 'method'
    parameters: Array<string>
    constructor(instance: string, symbol: Symbol, members_sparator: '.' | '->' | ':'='.') {
        this.instance = instance
        this.symbol= symbol
        this.members_sparator =members_sparator
        this.parameters = []
    }

    static new_method(instance: string, method_name: string): Step{
        if (method_name.includes(" ")){
            let r = method_name.split(" ")
            if (r.length==2){
                method_name = lemmatizer(r[1])
            }
            else{
                console.log("method_name more than one space", method_name)
            }
        }
        console.log("====>",instance,method_name)
        let s : Symbol ={
            name: method_name,
            type: "method",
            value: ""
        }

        return new Step(instance,s)
    }
	
    add_parameter(value: string, reference: boolean = false){
        if (!this.symbol.type === 'method'){
            throw new Error("only methods have parameters")
        }
        console.log("add_parameter =>",value,reference)
        this.parameters.push(value)
        return this;
    }

    
    get_type_of_expected_value(): SymbolType{
        return this.symbol.type
    }

    toString(): string{
        let caller_str = ''
        if (this.symbol.type ==='method'){
            let parameters_str = ''
            this.parameters.forEach((val: string, _: *) =>{
                if(parameters_str){
                    parameters_str += `, ${val}`
                }
                else{
                    parameters_str += `${val}`
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
