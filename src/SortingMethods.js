const selectionSort = (arr, compare) => {
  const tempArr = arr.slice();
  for (let i = 0; i < tempArr.length; i++) {
    let selectedIDX = i;
    for (let j = i + 1; j < tempArr.length; j++) {
      if (compare(tempArr[selectedIDX], tempArr[j])) {
        selectedIDX = j;
      }
    }
    if (selectedIDX !== i) {
      [tempArr[i], tempArr[selectedIDX]] = [tempArr[selectedIDX], tempArr[i]];
    }
  }
  return tempArr;
};

const nextSelectStage = (arr, currentIDX, compare) => {
  const tempArr = arr.slice();
  let selectedIDX = currentIDX;
  for (let j = currentIDX + 1; j < tempArr.length; j++) {
    if (compare(tempArr[selectedIDX], tempArr[j])) {
      selectedIDX = j;
    }
  }
  if (selectedIDX !== currentIDX) {
    [tempArr[currentIDX], tempArr[selectedIDX]] = [
      tempArr[selectedIDX],
      tempArr[currentIDX],
    ];
    tempArr[selectedIDX].setOutlineColor("goldenRod");
  }
  tempArr[currentIDX].setOutlineColor("mediumSeaGreen");
  console.log(tempArr[currentIDX]);
  return tempArr;
};

const nextInsertStage = (arr, currentIDX, compare) => {
  const tempArr = arr.slice();
  let j = currentIDX;
  while (j > 0 && compare(tempArr[j - 1], tempArr[j])) {
    [tempArr[j - 1], tempArr[j]] = [tempArr[j], tempArr[j - 1]];
    j = j - 1;
  }
  return tempArr;
};

const mergeSort = (arr, compare) => {
  if (arr.length <= 1) {
    return arr;
  }

  //Find the middle of the array
  const midIDX = Math.floor(arr.length / 2);

  //split the array in halves
  const left = arr.slice(0, midIDX);
  const right = arr.slice(midIDX);

  //Recursively combine the halves
  return merge(mergeSort(left, compare), mergeSort(right, compare), compare);
};

const merge = (left, right, compare) => {
  let mergedArr = [];
  while (left.length > 0 && right.length > 0) {
    if (compare(left[0], right[0])) {
      mergedArr.push(right.shift());
    } else {
      mergedArr.push(left.shift());
    }
  }
  while (left.length > 0) {
    mergedArr.push(left.shift());
  }

  while (right.length > 0) {
    mergedArr.push(right.shift());
  }
  return mergedArr;
};

const nextBoggoStage = (arr, compare) => {
  console.log(arr.slice());
  let randIDX,
    isSorted = true;
  for (let i = 0; i < arr.length; i++) {
    randIDX = Math.floor(Math.random() * arr.length);
    [arr[randIDX], arr[i]] = [arr[i], arr[randIDX]];
  }
  console.log(arr.slice());
  for (let i = 1; i < arr.length; i++) {
    if (compare(arr[i - 1], arr[i])) {
      isSorted = false;
    }
  }
  console.log(arr.slice());
  return [arr, isSorted];
};

export {
  selectionSort,
  nextSelectStage,
  nextInsertStage,
  mergeSort,
  nextBoggoStage,
};
