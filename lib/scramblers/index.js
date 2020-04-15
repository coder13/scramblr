const Scrambler = function (name, init, func, description) {
	this.name = name;
	this.init = init;
	this.scramble = func;
  this.description = description;
}

const Scramblers = module.exports = {
	scramblers: {},

	get: function (name) {
		return this.scramblers[name.toString().toLowerCase()];
	},

	register: function (name, init, func, description) {
		Object.defineProperty(
			this.scramblers,
			name.toString().toLowerCase(),
			{
				value: new Scrambler(name, init, func, description),
				enumerable: true
			}
		);
		return Scramblers;
	}
};

require('./333misc.js')(Scramblers);
require('./misc.js')(Scramblers);
require('./sq1.js')(Scramblers);
