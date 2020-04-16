const hashCode = require('../util').hashCode;

const Scrambler = function (name, init, description, func) {
	this.name = name;
	this.init = init;
	this.scramble = func;
  this.description = description;
}

const Scramblers = {
	scramblers: {},

	randomSrc: Math,

	get: function (name) {
		return this.scramblers[name.toString().toLowerCase()];
	},

	register: function (name, init, description, func) {
		this.scramblers[name.toString().toLowerCase()]
			= new Scrambler(name, () => init(this.randomSrc), description, func);
		return this;
	},

	getAll: function () {
		return Object.keys(this.scramblers).map((s) => this.scramblers[s]);
	},

	setSeed: function (seed) {
		if (seed === undefined) {
			return;
		}
		const seedStr = seed.toString();
		let hash = hashCode(seedStr);
		
		this.randomSrc = {
			random: function() {
				const x = Math.sin(hash++) * 10000;
				return x - Math.floor(x);
			}
		}
	}
};

require('./333misc.js')(Scramblers);
require('./333misc.js')(Scramblers);
require('./misc.js')(Scramblers);
require('./sq1.js')(Scramblers);

module.exports = Scramblers;
