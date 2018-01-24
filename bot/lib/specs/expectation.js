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

const EXP_SEPARATOR = exports.EXP_SEPARATOR = "__##__";
class Expectation {
    constructor(model, symbol, members_sparator = '.') {
        this.model = model;
        this.symbol = symbol;
        this.members_sparator = members_sparator;
        this.parameters = [];
        this.db = model.db;
        this.operator = 'eq';
    }

    //for symbols.type 'method'
    //parameters: Map<string, Symbol>


    static new_instance_method(model, method_name, expected_value = "") {
        let s = {
            name: method_name,
            type: "method",
            value: expected_value
        };

        return new Expectation(model, s);
    }
    //TODO: implement new_instance_attribute to check state expectations
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
            type: this.infer_type(value)
            //this.parameters.set(name,sym)
        };this.parameters.push(sym);
        return this;
    }

    add_parameter(value) {
        if (!this.symbol.type === 'method') {
            throw new Error("only methods have parameters");
        }

        //this.parameters.set(name,sym)
        this.parameters.push(value);
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

    get_operator() {
        return this.operator;
    }
    set_operator(operator) {
        this.operator = operator;
    }
    toString() {
        let caller_str = '';
        if (this.symbol.type === 'method') {
            let parameters_str = '';
            // this.parameters.forEach((val: Symbol, key: string, _: *) =>{
            this.parameters.forEach((val, _) => {
                //let type_symbol = val.type === 'string' ?  '' : ''
                if (parameters_str) {
                    // parameters_str += `, ${key}: ${type_symbol}${val.value}${type_symbol}`
                    parameters_str += `, ${val}`;
                } else {
                    // parameters_str += `${key}: ${type_symbol}${val.value}${type_symbol}`
                    parameters_str += `${val}`;
                }
            });
            caller_str = `(${parameters_str})`;
        }
        return `${this.model.name}${this.members_sparator}${this.symbol.name}${caller_str}${EXP_SEPARATOR}${this.symbol.value}`;
    }

    infer_type(value, is_reference = false) {
        let r = "null";

        if (is_reference) {
            r = "reference";
        } else if (!isNaN(value)) {
            r = "number";
        } else {
            r = "string";
        }
        return r;
    }
}
exports.Expectation = Expectation;