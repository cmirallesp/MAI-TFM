'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Step = undefined;

var _instance = require('./instance');

require('./symbol');

var _db = require('./db');

var _pluralize = require('pluralize');

var pl = _interopRequireWildcard(_pluralize);

var _util = require('util');

var _lemmatizer = require('lemmatizer');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class Step {
    constructor(instance, symbol, members_sparator = '.') {
        this.instance = instance;
        this.symbol = symbol;
        this.members_sparator = members_sparator;
        this.parameters = [];
    }

    //for symbols.type 'method'


    static new_method(instance, method_name) {
        if (method_name.includes(" ")) {
            let r = method_name.split(" ");
            if (r.length == 2) {
                method_name = (0, _lemmatizer.lemmatizer)(r[1]);
            } else {
                console.log("method_name more than one space", method_name);
            }
        }
        console.log("====>", instance, method_name);
        let s = {
            name: method_name,
            type: "method",
            value: ""
        };

        return new Step(instance, s);
    }

    add_parameter(value, reference = false) {
        if (!this.symbol.type === 'method') {
            throw new Error("only methods have parameters");
        }
        console.log("add_parameter =>", value, reference);
        this.parameters.push(value);
        return this;
    }

    get_type_of_expected_value() {
        return this.symbol.type;
    }

    toString() {
        let caller_str = '';
        if (this.symbol.type === 'method') {
            let parameters_str = '';
            this.parameters.forEach((val, _) => {
                if (parameters_str) {
                    parameters_str += `, ${val}`;
                } else {
                    parameters_str += `${val}`;
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