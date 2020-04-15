const suffixes = ['', '2', '\''];
const rndEl = x => x[Math.floor(Math.random() * x.length)];

module.exports = function (Scramblers) {
	const megaScramble = function (turns, len) {
		let scramble = '';
		let donemoves = [];

		for(let i = 0;i < 1; i++) {
			let s = '';
			let lastaxis = -1;
			for (let j = 0; j < len; j++){
		 		var done = 0;
		 		do {
					var first = Math.floor(Math.random() * turns.length);
					var second = Math.floor(Math.random() * turns[first].length);
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

	let MU = megaScramble.bind(this, [['U'],['M']], 20);
	let RU = megaScramble.bind(this, [['R'],['U']], 20);
  let LU = megaScramble.bind(this, [['L'],['U']], 20);
  let RUD = megaScramble.bind(this, [['R'], ['U', 'D']], 24);
  let RUL = megaScramble.bind(this, [['R', 'L'], ['U']], 24);

	Scramblers
		.register('LSE', () => {}, MU)
		.register('RU', () => {}, RU)
    .register('LU', () => {}, LU)
    .register('RUD', () => {}, RUD)
    .register('RUL', () => {}, RUL);
}
