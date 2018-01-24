'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Instance = undefined;

var _db = require('./db');

var _klass = require('./klass');

var _pluralize = require('pluralize');

var pl = _interopRequireWildcard(_pluralize);

var _symbol = require('./symbol');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class Instance {

  constructor(name, klass, builder = 'new') {
    this.db = klass.db;
    this.name = name;
    this.klass = klass;
    this.builder = builder;
    this.attributes = new Map();
  }
  //<attribute name, symbol>


  get_klass_name() {
    return this.klass.name;
  }

  add_attribute(name, value) {
    if (name === '') {
      throw new Error("name cannot be blank");
    }

    let sym = {
      name: name,
      value: value,
      type: this.infer_type(name, value)
    };
    this.attributes.set(name, sym);
    return this;
  }

  infer_type(name, value) {
    let r = "null";

    if (this.inDB(name)) {
      if (pl.isPlural(name)) {
        r = "collection";
      } else {
        r = "klass";
      }
    } else if (!isNaN(value)) {
      r = "number";
    } else {
      r = "string";
    }
    return r;
  }

  inDB(value) {
    if (this.db == undefined) throw Error("sync error (db has not been loaded yet");
    return this.db.inDB(pl.singular(value));
  }

  get_attributes() {
    return Array.from(this.attributes.values());
  }

  get_attribute(att_name) {
    return this.attributes.get(att_name) || _symbol.NULL_SYMBOL;
  }

  has_attribute(name) {
    return this.attributes.has(name);
  }

  toString() {
    let r = '';
    let k = [];
    for (let [_, v] of this.attributes) {
      let val;
      if (v.type === 'string') {
        val = `${v.value}`;
      } else {
        val = v.value;
      }
      k.push(`${v.name}: ${val}`);
    }
    r = k.join(",\n");
    return r;
  }
}
exports.Instance = Instance;