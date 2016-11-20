module.exports.shift = (a, v) => a.concat(a).slice(v,v + a.length);

module.exports.permConvert = function(arr) {
  // arr contains array e.g. [0,1,2,4,3]
  let deltaArr = [];
  for (let i=1; i<arr.length; i++) {
    let offset = 0;
    for (let j=0; j<i; j++) {
      if (arr[j] > arr[i]) offset++;
    }
    deltaArr.push(offset);
  }

  let result = 0;
  for (let i = arr.length - 1; i > 0; i--) {
    result = i * (deltaArr[i-1] + result);
  }
  return result;
}

const swap = (a,i,j) => {
  let tmp = a[i];
  a[i] = a[j];
  a[j] = tmp; 
}

module.exports.randomizeArr = function(arr, pos) {
  // randomize elements of arr at positions pos
  let newarr = [];
  for (let i = 0; i < pos.length; i++) {
    newarr.push(arr[pos[i]]);
  }

  for (let i = 0; i < newarr.length; i++) {
    let rnd = i + rn(newarr.length - i);
    if (rnd > i) {
      swap(newarr, rnd, i);
    }
  }

  for (let i = 0; i < pos.length; i++) {
    arr[pos[i]] = newarr[i];
  }
  return arr;
}