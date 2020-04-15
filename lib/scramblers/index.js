const Scrambler = function (name, init, func) {
	this.name = name;
	this.init = init;
	this.scramble = func;
}

const Scramblers = module.exports = {
	scramblers: {},

	get: function (name) {
		return this.scramblers[name.toString().toLowerCase()];
	},

	register: function (name, init, func) {
		Object.defineProperty(
			this.scramblers,
			name.toString().toLowerCase(),
			{ value: new Scrambler(name, init, func) }
		);
		return Scramblers;
	}
};

require('./333misc.js')(Scramblers);
require('./misc.js')(Scramblers);
require('./sq1.js')(Scramblers);
