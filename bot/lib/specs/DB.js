'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DB = undefined;

require('./klass');

var _mongodb = require('mongodb');

var mdb = _interopRequireWildcard(_mongodb);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const DB_STRING = 'mongodb://localhost:27017/bot';

class DB {
  //<class_name, type>
  constructor(db_connection, data) {
    this.klasses = new Map();
    this.db_connection = db_connection;
    for (let { klass_name, type } of data) {
      this.klasses.set(klass_name, type);
    }
  }

  static async instance() {
    if (DB._instance) {
      return DB._instance;
    } else {
      let con = await mdb.connect(DB_STRING);
      //preload klasses
      let col = con.collection('klasses');
      let data = await col.find({}).toArray();
      DB._instance = new DB(con, data);
      return DB._instance;
    }
  }

  inDB(value) {
    return this.klasses.has(value);
  }

  async insertKlass(klass) {
    //asyncrhonous update mongodb
    this.klasses.set(klass.name, klass.type);
    let con = this.db_connection;
    let col = con.collection('klasses');
    let data = await col.findOne({ name: klass.name });
    if (!data) {
      data = await col.insertOne({ name: klass.name, type: klass.type });
    }
    return data;
  }
}
exports.DB = DB;