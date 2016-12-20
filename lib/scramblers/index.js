const Scrambler = function (name, init, func) {
	this.name = name;
	this.init = init;
	this.scramble = func;
}

const Scramblers = module.exports = {
	scramblers: [],

	get: function (name) {
		return this.scramblers.find(s => s.name.toString().toLowerCase() === name.toString().toLowerCase());
	},

	register: function (name, init, func) {
		this.scramblers.push(new Scrambler(name, init, func));
		return Scramblers;
	}
};

require('./333.js')(Scramblers);
require('./misc.js')(Scramblers);
