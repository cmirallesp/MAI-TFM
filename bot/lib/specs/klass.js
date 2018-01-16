'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Klass = undefined;

require('./symbol');

var _db2 = require('./db');

var _assert = require('assert');

var _instance = require('./instance');

class Klass {
    //<attribute-name,Symbol>
    constructor(name, type) {
        this.instances = new Map();
        this.type = type;
        this.name = name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
        _db2.DB.instance().then(db => {
            this.db = db;
        });
    }

    new_instance(instance_name) {
        let r = this.instances.get(instance_name) || new _instance.Instance(instance_name, this);
        if (!this.instances.has(instance_name)) {
            this.instances.set(instance_name, r);
        }
        return r;
    }

    static async new_model(class_name) {
        let k = new Klass(class_name, "model");
        let _db = await _db2.DB.instance();
        _db.insertKlass(k);
        k.db = _db;
        return k;
    }
}
exports.Klass = Klass;