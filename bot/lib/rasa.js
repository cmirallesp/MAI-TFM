'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rasa_query = rasa_query;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const request = require('request-promise');
function rasa_query(text, model, project = '') {
	if (!process.env.RASA_URI) {
		console.error(new Error("RASA_URI must be defined in env file").stack);
	}

	process.on('unhandledRejection', error => {
		// Will print "unhandledRejection err is not defined"
		console.log('unhandledRejection', error.message);
	});

	console.log(`Calling RASA. Project: ${project} model: ${model}`);
	return new Promise((resolve, reject) => {

		const rasa_uri = process.env.RASA_URI || 'http://localhost:5000';

		const options = {
			method: 'POST',
			uri: `${rasa_uri}/parse`,
			body: {
				q: text,
				model: model,
				project: project
			},
			json: true
		};
		console.log("sending a message to resa");
		request(options).then(response => {
			console.log('Rasa response: ', response);
			resolve([response.intent, response.entities]);
		}).catch(error => {
			console.log('Rasa error: ', error.message);
			reject(error);
		});
	});
}