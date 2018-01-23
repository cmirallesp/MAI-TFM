// @flow

import { Instance, type InstanceBuilders } from './instance';
import { Expectation, EXP_SEPARATOR } from './expectation';
import { Step } from './step'

type languages = "ruby" | "js" | "python";
type object_types = Instance | Expectation;

export class BddConstructions {
  lang: languages

  constructor(lang: languages = "ruby") {
    this.lang = lang
  }

  instance_str(instance: Instance): string {
    let r: string;
    switch (this.lang) {
      case "ruby":
        r = `${instance.name} = ${instance.get_klass_name()}.${instance.builder}(${instance.toString()})`

        break;

      default:
        throw Error(`'instanceStr' not implemented for ${this.lang}`);
    }

    return r
  }

  get_operator(): string {
    //TODO: at the moment only eq but we can do more depending on symbol.type
    return 'eq'
  }

  expectation_str(exp: Expectation): string {
    let r: string 
    let [left,right] = exp.toString().split(EXP_SEPARATOR);

    switch (this.lang) {
      case "ruby":
        r = `expect( ${left} ).to ${this.get_operator()} ${right}`
        break;

      default:
        throw new Error("expectation_str not implemented for ${this.lang}")
    }
    return r;
  }

  step_str(step: Step): string {
    let r:string
    switch (this.lang){
      case "ruby":
        r = step.toString()
        break
      default:
        throw new Error("step_str not implemented for ${this.lang}");
    }
    return r
  }

}