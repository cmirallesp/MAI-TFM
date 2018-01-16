"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _skills_base = require("./skills_base");

var _skills_base2 = _interopRequireDefault(_skills_base);

var _select_specification_fsm = require("../lib/fsm/select_specification_fsm");

var _fsm_base = require("../lib/fsm/fsm_base");

var _rasa = require("../lib/rasa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//const rasa = require("../lib/rasa");


// Botkit Studio Skill module to enhance the "select_specification" script

const specs_mappings = require("../lib/fsm/specs_mappings");

class SelectSpecification extends _skills_base2.default {

  script_name() {
    return 'select_specification';
  }

  create_fsm() {
    this._fsm = new _select_specification_fsm.SelectSpecificationFsm(this.script_name());
  }

  constructor(controller, stack) {
    super(controller, stack);
    //SPACY | MITIE
    if (!process.env.RASA_MODEL) {
      throw new Error("Environment variable *RASA_MODEL* must be defined");
    }
    let model_str = process.env.RASA_MODEL || "";
    let model = process.env[model_str] || "";
    if (!model) {
      throw Error(`Environment vairable *${process.env.RASA_MODEL}* must be defined `);
    }
    this.log(`RASA STRING: ${model_str} MODEL: ${model} `);

    //BUTTONS CALLBACK [Validation | Model | Functionality] 
    controller.on('interactive_message_callback', (bot, message) => {
      let { actions: [{ value: intent_type }] } = message;
      bot.replyInteractive(message, `${specs_mappings.description(intent_type)} :white_check_mark: `);
      this.next(null, null, intent_type);
    });

    // controller.studio.beforeThread("select_specification", "offer_help", (_, next) =>{
    //   this.fsm().goto_state("offer_help")
    //   next()
    // })

    // Validate user input: test_request answer given by the user specifiyng the kind of test
    controller.studio.validate('select_specification', 'test_request', (convo, next) => {
      let value = convo.extractResponse('test_request');
      this.log(`VALIDATE select_specification VARIABLE: test_request VALUE: ${value}`);
      //this.call_rasa(value, convo, next)
      let project = "default";
      (0, _rasa.rasa_query)(value, model, project).then(([intent, entities]) => {
        let err = '';
        let intent_type, intent_confidence;
        ({ name: intent_type, confidence: intent_confidence } = intent);
        this.next(convo, next, intent_type, intent_confidence, entities);
      }).catch(e => {
        this.fsm().error(e.message);
        convo.setVar(this.fsm().error_var(), this.fsm().error_val());
        convo.gotoThread(this.fsm().state());
        next('stop');
      });
    });
  }
}
exports.default = SelectSpecification;