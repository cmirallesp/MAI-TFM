// @flow

import {type Klass} from './klass'
import * as mdb from 'mongodb';

const DB_STRING = 'mongodb://localhost:27017/bot';

export class DB  {
  klasses: Map<string, string>; //<class_name, type>
  db_connection: mdb.Db;
  static _instance: DB;

  constructor(db_connection: mdb.Db, data: []){
    this.klasses = new Map();
    this.db_connection = db_connection;
    for(let {klass_name, type} of data){
      this.klasses.set(klass_name,type);
    }
  }

  static async instance(){
    if(DB._instance){
      return DB._instance;
    }
    else{
      let con = await mdb.connect(DB_STRING);
      //preload klasses
      let col = con.collection('klasses');
      let data = await col.find({}).toArray();
      DB._instance = new DB(con,data);
      return DB._instance;
    }
  }    

  inDB(value: string): boolean{
    return this.klasses.has(value);
  }

  async insertKlass(klass: Klass){
    //asyncrhonous update mongodb
    this.klasses.set(klass.name, klass.type);
    let con = this.db_connection;
    let col = con.collection('klasses');
    let data = await col.findOne({name:klass.name});
    if(!data){ 
      data = await col.insertOne({name:klass.name, type: klass.type});
    }
    return data;
  }
}
