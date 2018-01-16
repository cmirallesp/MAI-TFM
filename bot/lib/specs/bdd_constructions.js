'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BddConstructions = undefined;

var _instance = require('./instance');

var _expectation = require('./expectation');

class BddConstructions {

  constructor(lang = "ruby") {
    this.lang = lang;
  }

  instance_str(instance) {
    let r;
    switch (this.lang) {
      case "ruby":
        r = `${instance.name} = ${instance.get_klass_name()}.${instance.builder}(${instance.toString()})`;

        break;

      default:
        throw Error(`'instanceStr' not implemented for ${this.lang}`);
    }

    return r;
  }

  get_operator() {
    //TODO: at the moment only eq but we can do more depending on symbol.type
    return 'eq';
  }

  expectation_str(exp) {
    let r;
    let [left, right] = exp.toString().split(_expectation.EXP_SEPARATOR);

    switch (this.lang) {
      case "ruby":
        r = `expect( ${left} ).to ${this.get_operator()} ${right}`;
        break;

      default:
        throw new Error("expectation_str not implemented for ${this.lang}");
    }
    return r;
  }

}
exports.BddConstructions = BddConstructions;