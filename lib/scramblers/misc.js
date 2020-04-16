const suffixes = ['', '2', '\''];

module.exports = function (Scramblers) {
	let randomSrc = Math;
	const rndEl = x => x[Math.floor(randomSrc.random() * x.length)];
	const megaScramble = function (turns, len) {
		let scramble = '';
		let donemoves = [];

		for(let i = 0;i < 1; i++) {
			let s = '';
			let lastaxis = -1;
			for (let j = 0; j < len; j++){
		 		var done = 0;
		 		do {
					var first = Math.floor(randomSrc.random() * turns.length);
					var second = Math.floor(randomSrc.random() * turns[first].length);
					if (first != lastaxis) {
						for(let k = 0; k < turns[first].length; k++){
							donemoves[k] = 0;
						}
						lastaxis = first;
					}
					if (donemoves[second] == 0) {
						donemoves[second] = 1;
						if (typeof turns[first][second] === 'array') {
							s += rndEl(turns[first][second]) + rndEl(suffixes) + ' ';
						} else {
							s += turns[first][second] + rndEl(suffixes) + ' ';
						}
						done = 1;
					}
				} while (done == 0);
			}
			scramble += s;
		}
		return scramble;
	}

	const initialize = function (src) {
		src && setRandomSrc(src);
	}

	const setRandomSrc = function (src) {
		randomSrc = src;
	}

	let MU = megaScramble.bind(this, [['U'],['M']], 20);
	let RU = megaScramble.bind(this, [['R'],['U']], 20);
  let LU = megaScramble.bind(this, [['L'],['U']], 20);
  let RUD = megaScramble.bind(this, [['R'], ['U', 'D']], 24);
  let RUL = megaScramble.bind(this, [['R', 'L'], ['U']], 24);

	Scramblers
		.register('LSE', src => initialize(src), '', MU)
		.register('RU', src => initialize(src), '', RU)
    .register('LU', src => initialize(src), '', LU)
    .register('RUD', src => initialize(src), '', RUD)
    .register('RUL', src => initialize(src), '', RUL);
}
