export const quickSort = async (
  array,
  setArray,
  setComparing,
  setSorted,
  speed,
  signal
) => {
  const arrayCopy = [...array];
  const sortedIndices = new Set();

  const partition = async (low, high) => {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    const pivot = arrayCopy[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      // Visualize comparison
      setComparing([j, high]);
      await new Promise((resolve) => setTimeout(resolve, 101 - speed));

      if (arrayCopy[j] <= pivot) {
        i++;
        // Swap elements
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
        setArray([...arrayCopy]);
      }
    }

    // Place pivot in correct position
    [arrayCopy[i + 1], arrayCopy[high]] = [arrayCopy[high], arrayCopy[i + 1]];
    setArray([...arrayCopy]);

    return i + 1;
  };

  const quickSortHelper = async (low, high) => {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    if (low < high) {
      const pivotIndex = await partition(low, high);

      // Mark pivot as sorted
      sortedIndices.add(pivotIndex);
      setSorted([...sortedIndices]);

      // Recursively sort sub-arrays
      await quickSortHelper(low, pivotIndex - 1);
      await quickSortHelper(pivotIndex + 1, high);
    } else if (low === high) {
      // Single element is already sorted
      sortedIndices.add(low);
      setSorted([...sortedIndices]);
    }
  };

  try {
    await quickSortHelper(0, arrayCopy.length - 1);
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
