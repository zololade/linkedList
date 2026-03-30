export function fibs(range: number): number[] {
  let arr: number[] = [];

  for (let i = 0; i <= range; i++) {
    if (i === 0) {
      arr.push(0);
      continue;
    } else if (i === 1) {
      arr.push(1);
      continue;
    }

    let oneStep = arr[i - 1];
    let twoStep = arr[i - 2];

    if (typeof oneStep !== "number" || typeof twoStep !== "number") {
      break;
    }

    arr = [...arr, oneStep + twoStep];
  }
  return arr;
}

export function fibsRec(range: number): number[] {
  if (range === 1) return [0, 1];

  const prevArr = fibsRec(range - 1);
  const oneStep = prevArr[prevArr.length - 1] ?? 0;
  const twoStep = prevArr[prevArr.length - 2] ?? 0;

  return [...prevArr, oneStep + twoStep];
}
