const Scrambler = function (name, init, description, func) {
	this.name = name;
	this.init = init;
  this.description = description;
	this.scramble = func;
}

const Scramblers = module.exports = {
	scramblers: [],

	get: function (name) {
		return this.scramblers.find(s => s.name.toString().toLowerCase() === name.toString().toLowerCase());
	},

	register: function (name, init, description, func) {
		this.scramblers.push(new Scrambler(name, init, func ? description : '', func ? func : description));
		return Scramblers;
	}
};

require('./333misc.js')(Scramblers);
require('./misc.js')(Scramblers);
require('./sq1.js')(Scramblers);
