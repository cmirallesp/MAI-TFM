'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Expectation = exports.EXP_SEPARATOR = undefined;

var _instance = require('./instance');

require('./symbol');

var _db = require('./db');

var _pluralize = require('pluralize');

var pl = _interopRequireWildcard(_pluralize);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const EXP_SEPARATOR = exports.EXP_SEPARATOR = "__eq__";

class Expectation {
    constructor(model, symbol, members_sparator = '.') {
        this.model = model;
        this.symbol = symbol;
        this.members_sparator = members_sparator;
        this.parameters = new Map();
        this.db = model.db;
    }

    //for symbols.type 'method'


    static new_instance_method(model, method_name, expected_value = "") {
        let s = {
            name: method_name,
            type: "method",
            value: expected_value
        };

        return new Expectation(model, s);
    }

    add_parameter(name, value) {
        if (!this.symbol.type === 'method') {
            throw new Error("only methods have parameters");
        }

        if (name === '') {
            throw new Error("name cannot be blank");
        }

        let sym = {
            name: name,
            value: value,
            type: this.infer_type(name, value)
        };
        this.parameters.set(name, sym);
        return this;
    }

    get_instance_name() {
        return this.model.name;
    }

    get_symmbol_name() {
        return this.symbol.name;
    }

    set_symbol_name(name) {
        this.symbol.name = name;
    }

    get_expected_value() {
        return this.symbol.value;
    }

    set_expected_value(value) {
        this.symbol.value = value;
    }

    get_type_of_expected_value() {
        return this.symbol.type;
    }

    toString() {
        let caller_str = '';
        if (this.symbol.type === 'method') {
            let parameters_str = '';
            this.parameters.forEach((val, key, _) => {
                let type_symbol = val.type === 'string' ? '"' : '';
                if (parameters_str) {
                    parameters_str += `, ${key}: ${type_symbol}${val.value}${type_symbol}`;
                } else {
                    parameters_str += `${key}: ${type_symbol}${val.value}${type_symbol}`;
                }
            });
            caller_str = `(${parameters_str})`;
        }
        return `${this.model.name}${this.members_sparator}${this.symbol.name}${caller_str}${EXP_SEPARATOR}${this.symbol.value}`;
    }

    inDB(value) {
        if (this.db == undefined) throw Error("sync error (db has not been loaded yet");
        return this.db.inDB(pl.singular(value));
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
}
exports.Expectation = Expectation;