const {ini, customScramble, getCustomScramble} = require('./333.js');

const rn = (n) => Math.floor(Math.random() * n);

const shift = (a, v) => a.concat(a).slice(v,v+a.length);

let swap = (a,i,j) => {
  let tmp = a[i];
  a[i] = a[j];
  a[j] = tmp; 
}

const shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    swap(array, i, j)
  }
  return array;
}


const getRandomScramble   = () => customScramble([0,1,2,3,4,5,6,7],[0,1,2,3,4,5,6,7,8,9,10,11],[0,1,2,3,4,5,6,7],[0,1,2,3,4,5,6,7,8,9,10,11]);
const getEdgeScramble     = () => customScramble([],[0,1,2,3,4,5,6,7,8,9,10,11],[],[0,1,2,3,4,5,6,7,8,9,10,11]);
const getCornerScramble   = () => customScramble([0,1,2,3,4,5,6,7],[],[0,1,2,3,4,5,6,7],[]);
const getLLScramble       = () => customScramble([4,5,6,7],[8,9,10,11],[3,4,5,6],[0,1,2,3]);
const getCMLLScramble     = () => customScramble([4,5,6,7],[4,6,8,9,10,11],[3,4,5,6],[0,1,2,3,5,7]);
const getLSLLScramble     = () => customScramble([3,4,5,6,7],[3,8,9,10,11],[2,3,4,5,6],[0,1,2,3,8]);
const getZZLSLLScramble   = () => customScramble([3,4,5,6,7],[3,8,9,10,11],[2,3,4,5,6],[]);
const getZZL2SLLScramble  = () => customScramble([2,3,4,5,6,7],[2,3,8,9,10,11],[1,2,3,4,5,6],[]);
const getZBLLScramble     = () => customScramble([4,5,6,7],[8,9,10,11],[3,4,5,6],[]);
const get2GLLScramble     = () => customScramble([],[8,9,10,11],[3,4,5,6],[]);
const getPLLScramble      = () => customScramble([4,5,6,7],[8,9,10,11],[],[]);
const getZZLSScramble     = () => customScramble([3,4,5,6,7],[3,8,9,10,11],[2,3,4,5,6],[])
const getMultiSlotting    = () => customScramble([2,3,4,5,6,7],[2,3,8,9,10,11],[1,2,3,4,5,6],[])

const CO = {
  BLD: 0,
  FLD: 1,
  FRD: 2,
  BRU: 3,
  BLU: 4,
  FLU: 5,
  FRU: 6,
  BRD: 7
};

const CP = {
  BDR: 0,
  BLD: 1,
  FLD: 2,
  DFR: 3,
  BRU: 4,
  BLU: 5,
  FLU: 6,
  FRU: 7
};

const EP = {
  BR: 0,
  BL: 1,
  FL: 2,
  FR: 3,
  DB: 4,
  DL: 5,
  DF: 6,
  DR: 7,
  UB: 8,
  UL: 9,
  UF: 10,
  UR: 11
};

const EO = {
  UR: 0,
  UF: 1,
  UL: 2,
  UB: 3,
  DL: 4,
  DF: 5,
  DR: 6,
  DB: 7,
  FR: 8,
  FL: 9,
  BL: 10,
  BR: 11
};

/*     0   1   2   3   4   5   6   7
 * co: BLD FLD FRD BRU BLU FLU FRU BRD
 * cp: BDR BLD FLD DFR BRU BLU FLU FRU
 *
 *     0  1  2  3  4  5  6  7  8  9  10 11
 * ep: BR BL FL FR DB DL DF DR UB UL UF UR 
 * eo: UR UF UL UB DL DF DR DB FR FL BL BR
 *
 * cori: 
 * */

const sum = (arry)=> arry.reduce((a,b) => a + b);

const clsSubsets = {
  '-': (num) => {
    let cpa = shuffle([4,5,6,7]);

    let c = [];
    if (num < 0) {
      c = [rn(3), rn(3), rn(3)];
    } else {
      c = [
        num > 0 ? rn(2) + 1 : 0,
        num > 1 ? rn(2) + 1 : 0,
        num > 2 ? rn(2) + 1 : 0
      ]
    }

    let co = shift(c, rn(3)); // BRU BLU FLU

    process.stdout.write(`${co[0]}, ${co[1]}, ${co[2]}: `)

    let cori = [0,0,0, co[0], co[1], co[2], 2, 0];
    cori[2] = (3 - sum(cori) % 3) % 3;
    cori.reverse();

    return {
      cp: [3,4,5,6],
      cpa: [0,1,2, cpa[0], cpa[1], cpa[2], cpa[3], 3],
      ep: [8,9,10,11],
      cori: parseInt(cori.join(''), 3)
    };
  },
  '+': () => {
    let cpa = shuffle([4,5,6,7]);

    let co = shift([rn(3), rn(3), rn(3)], rn(1)); // BRU BLU FLU
    let cori = [0,0,0, co[0], co[1], co[2], 1, 0];
    cori[2] = (3 - sum(cori) % 3) % 3;
    cori.reverse();

    return {
      cp: [3,4,5,6],
      cpa: [0,1,2, cpa[0], cpa[1], cpa[2], cpa[3], 3],
      ep: [8,9,10,11],
      cori: parseInt(cori.join(''), 3)
    };
  },
  'O': () => {
    let cpa = shuffle([4,5,6,7]);

    let co = shift([rn(3), rn(3), rn(3)], rn(1)); // BRU BLU FLU
    let cori = [0,0,0, co[0], co[1], co[2], 0, 0];
    cori[2] = (3 - sum(cori) % 3) % 3;
    cori.reverse();

    return {
      cp: [3,4,5,6],
      cpa: [0,1,2, cpa[0], cpa[1], cpa[2], cpa[3], 3],
      ep: [8,9,10,11],
      cori: parseInt(cori.join(''), 3)
    };
  },
  'i': () => {
    let cpa = shuffle([4,5,6,7]);

    let co = shift([rn(3), rn(3), rn(3)], rn(4)); // BRU BLU FLU
    let cori = [0,0,1, co[0], co[1], co[2], 0, 0];
    cori[6] = (3 - sum(cori) % 3) % 3;
    cori.reverse();

    return {
      cp: [3,4,5,6],
      cpa: [0,1,2, 3, cpa[0], cpa[1], cpa[2], cpa[3]],
      ep: [8,9,10,11],
      cori: parseInt(cori.join(''), 3)
    };
  },
  'im': () => {
    let cpa = shuffle([4,5,6,7]);

    let co = shift([rn(3), rn(3), rn(3)], rn(4)); // BRU BLU FLU
    let cori = [0,0,2, co[0], co[1], co[2], 0, 0];
    cori[6] = (3 - sum(cori) % 3) % 3;
    cori.reverse();

    return {
      cp: [3,4,5,6],
      cpa: [0,1,2, 3, cpa[0], cpa[1], cpa[2], cpa[3]],
      ep: [8,9,10,11],
      cori: parseInt(cori.join(''), 3)
    };
  }
}


const coSubsets = {
  U: [2,0,0,1],
  T: [1,0,0,2],
  L: [1,0,2,0],
  S: [2,2,2,0],
  As: [1,1,1,0],
  Pi: [1,2,2,1],
  H: [1,2,1,2]
};

const getRandomCO = function (args) {
  if (!args.length) {
    let subsets = Object.keys(coSubsets);
    return coSubsets[subsets[rn(subsets.length)]];
  } else {
    let subsets = args.filter(a => !!coSubsets[a]);
    return coSubsets[subsets[rn(args.length)]];
  }
}

const TSLE = {
  twoGen: () => {
    let cp = shift([4,5,6,7], rn(4));

    return {
      cpa: [0,1,2, cp[0], 3, cp[2], cp[1], cp[3]], // DFR FRU BLU FLU FRU
      ep: [8,9,10,11]
    };
  }
}

module.exports = function (Scramblers) {
  Scramblers
    .register('c', ini, '', () => getCustomScramble({cp: [5,6,7]}))
    .register('333', ini, '', getRandomScramble)
    .register('edges', ini, '', getEdgeScramble)
    .register('LL', ini, '', getLLScramble)
    .register('LSLL', ini, '', getLSLLScramble)
    .register('ZZLSLL', ini, '- LSLL with EO solved', getZZLSLLScramble)
    .register('ZZL2SLL', ini, '', getZZL2SLLScramble)
    .register('ZBLL', ini, '', (args) => {
      let co = getRandomCO(args);

      let cori = [0,0,0, ...shift(co, rn(4)), 0].reverse();

      return getCustomScramble({
        ep: [EP.UF, EP.UL, EP.UB, EP.UR],
        cp: [CP.FLU, CP.FRU, CP.BRU, CP.BLU],
        cori: parseInt(cori.join(''),3)
      });
    })
    .register('TRIZBLL', ini, `- Tripod ZBLL\n  args: ${Object.keys(coSubsets).join(', ')}`, (args) => {
      let s = rn(4);

      let EPShift = [
        [EP.UR, EP.UF],
        [EP.UF, EP.UL],
        [EP.UL, EP.UB],
        [EP.UB, EP.UR]
      ];

      let CORIs = {
        T: [[1, 0, 0, 2], [0, 0, 2, 1]],
        U: [[2, 0, 0, 1], [0, 0, 1, 2]],
        L: [[1, 0, 2, 0], [2, 0, 1, 0]],
        S: [[2, 0, 2, 2]],
        As: [[1, 0, 1, 1]],
      }

      let subset;
      if (!args.length) {
        let subsets = Object.keys(CORIs);
        subset = CORIs[subsets[rn(subsets.length)]];
      } else {
        let subsets = args.filter(a => !!CORIs[a]);
        subset = CORIs[subsets[rn(subsets.length)]];
      }

      let co = shift(subset[0], s);
      let cori = [0,0,0, ...co, 0].reverse();

      let cpa = shift([CP.BLU, CP.BRU, CP.FRU, CP.FLU], s); // 5, 4, 7, 6
      let fixed = cpa[0];
      cpa = shuffle(cpa.slice(1,4))
      cpa = [4,5,6,7].map((a,i) => a === fixed ? fixed : cpa.splice(-1)[0]);

      return getCustomScramble({
        ep: EPShift[s],
        cpa: [0,1,2,3, ...cpa],
        cori: parseInt(cori.join(''),3)
      });
    })
    .register('2GLL', ini, `\n  args: ${Object.keys(coSubsets).join(', ')}`, (args) => {
      let co = getRandomCO(args);

      let cori = [0,0,0, ...shift(co, rn(4)), 0].reverse();

      return getCustomScramble({
        ep: [8,9,10,11],
        cori: parseInt(cori.join(''),3)
      });
    })
    .register('TSLE', ini, `\n  args: ${Object.keys(TSLE).join(', ')}`, (args) => {
      if (!args.length) {
        let subsets = Object.keys(TSLE);
        let subset = TSLE[subsets[rn(subsets.length)]];
        return getCustomScramble(subset());
      } else {
        let subsets = args.filter(a => !!TSLE[a]);
        let subset = TSLE[args[rn(args.length)]];

        return getCustomScramble(subset());
      }
    })
    .register('NLS', ini, '', () => {
      return getCustomScramble({
        co: [CO.FLU, CO.FRU, CO.BRU, CO.DFR],
        cp: [CP.FLU, CP.FRU, CP.BRU, CP.DFR],
        ep: [EP.UF, EP.UR, EP.FR],
      });
    })

    .register('PLL', ini, '', getPLLScramble)
    .register('ZZLL', ini, '', getZZLSScramble)
    .register('CMLL', ini, '', getCMLLScramble)
    .register('CMLLSune', ini, '', () => {
      let s = rn(2)+1;
      let co = shift([s,s,s,0], rn(4));
      let cori = [0, 0, 0, co[0], co[1], co[2], co[3], 0].reverse();

      return getCustomScramble({
        cp: [4,5,6,7],
        ep: [4,6,8,9,10,11],
        cori: parseInt(cori.join(''),3),
        eo: [0,1,2,3,5,7]
      });
    })

    .register('BLE', ini, '', () => {
      let ble = function () {
        let a = [0,0,1,rn(3),rn(3),rn(3),0,0];
        a[6] = (3-a.reduce((a,b) => a+b)%3)%3;
        return a;
      }

      let epa = shift([8,9,10,11], rn(4));

      return getCustomScramble({
        cp: [4,5,6,7],
        epa: [0,1,2,epa[0],4,5,6,7, epa[1], epa[2], epa[3], 3],
        cori: parseInt(ble().reverse().join(''), 3)
      })
    })
    .register('LCCP', ini, '', (args) => {
      let cp = shift([4, 6, 5], 1);
      let cpa = [0,1,2,cp[0],cp[1],cp[2],7,3];

      return getCustomScramble({
        ep: [EP.UF, EP.UB],
        cpa: cpa,
        co: [CO.FRU, CO.FRD]
      });
    })
    .register('CLS', ini, `\n args: ${Object.keys(clsSubsets).join(', ')}`, (args) => {
      if (!args.length) {
        let subsets = Object.keys(clsSubsets);
        let subset = clsSubsets[subsets[rn(subsets.length)]];
        return getCustomScramble(subset());
      } else {
        let subsets = args.filter(a => !!clsSubsets[a]);
        let subset = clsSubsets[args[rn(args.length)]];

        return getCustomScramble(subset(2));
      }
    })

    .register('WV', ini, '', (args) => {
      let s = 0;//rn(4);

      let cp = shift([4,5,6,7],s);
      let cpa = [0,1,2, 4, 5, 6, 3, 7];
 
      let ep = shift([8,9,10,11],s);
      let epa = [0, 1, 2, ep[0], 4, 5, 6, 7, ep[1], ep[2], 3, ep[3]];

      let co = [0,0, 0, rn(3), rn(3), 2, rn(3), 0];
      // let co = [0,0, 0, 1, 0, 0, 0, 0];
      co[2] = (3 - sum(co) % 3) % 3;
      let cori = parseInt(co.reverse().join(''), 3);

      return getCustomScramble({cpa,cori,epa});
    })

    .register('ZZ', ini, '\n  args: {number of flipped edges}', (args) => {
      let eo = [0,0,0,0,0,0,0,0,0,0,0,0];
      for (let i = 0; i < args[0]; i++) {
        eo[i] = 1;
      }

      return getCustomScramble({
        cp: [0,1,2,3,4,5,6],
        ep: [0,1,2,3,4,5,6,7,8,9,10,11],
        co: [0,1,2,3,4,5,6],
        eori: parseInt(shuffle(eo).join(''), 2)
    });
  });
};
