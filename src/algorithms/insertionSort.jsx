export const insertionSort = async (
  array,
  setArray,
  setComparing,
  setSorted,
  speed,
  signal
) => {
  const arrayCopy = [...array];
  const sortedIndices = new Set();

  try {
    for (let i = 1; i < arrayCopy.length; i++) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      const current = arrayCopy[i];
      let j = i - 1;

      // Add first element to sorted portion
      if (i === 1) {
        sortedIndices.add(0);
        setSorted([...sortedIndices]);
      }

      // Compare and shift elements
      while (j >= 0) {
        if (signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }

        setComparing([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, 101 - speed));

        if (arrayCopy[j] > current) {
          arrayCopy[j + 1] = arrayCopy[j];
          setArray([...arrayCopy]);
          j--;
        } else {
          break;
        }
      }

      // Place current element in its correct position
      arrayCopy[j + 1] = current;
      setArray([...arrayCopy]);

      // Mark current index as sorted
      sortedIndices.add(i);
      setSorted([...sortedIndices]);
    }

    // Mark entire array as sorted
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
