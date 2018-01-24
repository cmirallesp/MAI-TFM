// @flow

import {DB} from './db';
import {Klass} from './klass'
import * as pl from 'pluralize';
import {type Symbol, type SymbolType, NULL_SYMBOL} from './symbol'


export type InstanceBuilders = "new" | "create";

export class Instance {
  //<attribute name, symbol>
  attributes: Map<string, Symbol>;
  db: DB;
  name: string;
  builder: InstanceBuilders
  klass: Klass;

  constructor(name: string, klass: Klass, builder: InstanceBuilders='new') {
    this.db = klass.db;
    this.name =name;
    this.klass = klass;
    this.builder = builder
    this.attributes = new Map();
  }

  get_klass_name(): string{
    return this.klass.name;
  }

  add_attribute(name: string, value: string): Instance{
    if(name===''){ 
        throw new Error("name cannot be blank") ;
    }

    let sym: Symbol={
        name: name,
        value: value,
        type: this.infer_type(name,value)
    };
    this.attributes.set(name,sym);
    return this;
  }

  infer_type(name: string, value: string): SymbolType{
    let r: SymbolType="null";
    
    if (this.inDB(name)){
        if (pl.isPlural(name)){
            r = "collection" 
        }
        else{
            r = "klass" 
        }
    }
    else if (!isNaN(value)){
        r = "number" 
    }
    else {
        r = "string" 
    }
    return r;
  }

  inDB(value: string){
    if(this.db==undefined) throw Error ("sync error (db has not been loaded yet")
    return this.db.inDB(pl.singular(value));
  }

  get_attributes(): Symbol[]{
    return Array.from(this.attributes.values());
  }

  get_attribute(att_name: string): Symbol{
    return this.attributes.get(att_name) || NULL_SYMBOL;
  }

  has_attribute(name: string): boolean {
    return this.attributes.has(name);
  }
  
  toString(): string{
    let r:string='';
    let k=[];
    for(let [_,v] of this.attributes){
      let val: string;
      if(v.type==='string'){
        val = `${v.value}`
      }
      else{
        val = v.value
      }
      k.push(`${v.name}: ${val}`);
    }
    r = k.join(",\n");
    return r
  }
}