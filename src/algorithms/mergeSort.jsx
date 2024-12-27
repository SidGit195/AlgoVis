export const mergeSort = async (
  array,
  setArray,
  setComparing,
  setSorted,
  speed,
  signal
) => {
  const arrayCopy = [...array];
  const sortedIndices = new Set();

  const merge = async (left, middle, right) => {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    const leftArray = arrayCopy.slice(left, middle + 1);
    const rightArray = arrayCopy.slice(middle + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    while (i < leftArray.length && j < rightArray.length) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      // Visualize comparison
      setComparing([left + i, middle + 1 + j]);
      await new Promise((resolve) => setTimeout(resolve, 101 - speed));

      if (leftArray[i] <= rightArray[j]) {
        arrayCopy[k] = leftArray[i];
        i++;
      } else {
        arrayCopy[k] = rightArray[j];
        j++;
      }
      setArray([...arrayCopy]);
      k++;
    }

    // Copy remaining elements
    while (i < leftArray.length) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }
      arrayCopy[k] = leftArray[i];
      setArray([...arrayCopy]);
      i++;
      k++;
    }

    while (j < rightArray.length) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }
      arrayCopy[k] = rightArray[j];
      setArray([...arrayCopy]);
      j++;
      k++;
    }

    // Mark merged portion as sorted
    for (let idx = left; idx <= right; idx++) {
      sortedIndices.add(idx);
    }
    setSorted([...sortedIndices]);
  };

  const mergeSortHelper = async (left, right) => {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      await mergeSortHelper(left, middle);
      await mergeSortHelper(middle + 1, right);
      await merge(left, middle, right);
    }
  };

  try {
    await mergeSortHelper(0, arrayCopy.length - 1);
    setSorted([...Array(arrayCopy.length).keys()]);
    return arrayCopy;
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }
    console.error("Sorting error:", error);
    throw error;
  }
};
