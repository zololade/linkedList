export function mergeSort(val: number[]): number[] {
  if (val.length <= 1) return val;

  let length = Math.floor(val.length / 2);

  let sortedLeft = mergeSort(val.slice(0, length));
  let sortedRight = mergeSort(val.slice(length));

  let outputArr: number[] = [];
  let sortedLeftIndex = 0;
  let sortedRightIndex = 0;

  while (
    sortedLeftIndex < sortedLeft.length &&
    sortedRightIndex < sortedRight.length
  ) {
    let leftValue = sortedLeft[sortedLeftIndex] ?? 0;
    let rightValue = sortedRight[sortedRightIndex] ?? 0;

    if (leftValue <= rightValue) {
      outputArr.push(leftValue);
      sortedLeftIndex++;
    } else {
      outputArr.push(rightValue);
      sortedRightIndex++;
    }
  }

  while (sortedLeftIndex < sortedLeft.length) {
    let leftValue = sortedLeft[sortedLeftIndex] ?? 0;

    outputArr.push(leftValue);
    sortedLeftIndex++;
  }

  while (sortedRightIndex < sortedRight.length) {
    let rightValue = sortedRight[sortedRightIndex] ?? 0;

    outputArr.push(rightValue);
    sortedRightIndex++;
  }

  return outputArr;
}
