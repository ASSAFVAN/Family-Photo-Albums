// values = [1,2,2,3,4]
// {1 : 1, 2:2, 3:1, 4:1}

const findValues = (arr) => {
  let result = {};
  for (i = 0; i < arr.length; i++) {
    for (const val in result) {
      if (val === i) {
        result[val] += 1;
      }
    }
    // if i exists in result key = > value = value+1
    // else key=i, value=0
  }
};

console.log(findValues([1, 2, 2, 3, 4]));
