const arr = [1, 2, 3, 4];

console.log(arr[0]);

const arr2 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(arr2[2][3]);

for (let row of arr2) {
  console.log(row);
  for (let col of row) {
    console.log(col);
  }
}
