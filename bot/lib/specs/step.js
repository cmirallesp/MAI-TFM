'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Step = exports.EXP_SEPARATOR = undefined;

var _instance = require('./instance');

require('./symbol');

var _db = require('./db');

var _pluralize = require('pluralize');

var pl = _interopRequireWildcard(_pluralize);

var _util = require('util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const EXP_SEPARATOR = exports.EXP_SEPARATOR = "__eq__";

class Step {
    constructor(instance, symbol, members_sparator = '.') {
        this.instance = instance;
        this.symbol = symbol;
        this.members_sparator = members_sparator;
        this.parameters = new Map();
    }

    //for symbols.type 'method'


    static new_method(instance, method_name) {
        let s = {
            name: method_name,
            type: "method",
            value: ""
        };

        return new Step(instance, s);
    }

    add_parameter(name, value, reference = false) {
        if (!this.symbol.type === 'method') {
            throw new Error("only methods have parameters");
        }

        if (name === '') {
            throw new Error("name cannot be blank");
        }

        let sym = {
            name: name,
            value: value,
            type: this.infer_type(name, value, reference)
        };
        this.parameters.set(name, sym);
        return this;
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
        return `${this.instance}${this.members_sparator}${this.symbol.name}${caller_str}`;
    }

    infer_type(name, value, reference = false) {
        let r = "null";
        if (reference) {
            r = "reference";
        } else if (!isNaN(value)) {
            r = "number";
        } else {
            r = "string";
        }
        return r;
    }
}
exports.Step = Step;