const Scrambler = function (name, init, description, func) {
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

	register: function (name, init, description, func) {
		this.scramblers[name] = new Scrambler(name, init, description, func);
		return this;
	},

	getAll: function () {
		return Object.keys(this.scramblers).map((s) => this.scramblers[s]);
	}
};

require('./333misc.js')(Scramblers);
require('./misc.js')(Scramblers);
require('./sq1.js')(Scramblers);
