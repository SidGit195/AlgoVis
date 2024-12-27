export const selectionSort = async (
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
    for (let i = 0; i < arrayCopy.length - 1; i++) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      let minIndex = i;

      // Find minimum element in unsorted portion
      for (let j = i + 1; j < arrayCopy.length; j++) {
        if (signal?.aborted) {
          throw new DOMException("Aborted", "AbortError");
        }

        // Visualize comparison
        setComparing([minIndex, j]);
        await new Promise((resolve) => setTimeout(resolve, 101 - speed));

        if (arrayCopy[j] < arrayCopy[minIndex]) {
          minIndex = j;
        }
      }

      // Swap if minimum element is not at current position
      if (minIndex !== i) {
        [arrayCopy[i], arrayCopy[minIndex]] = [
          arrayCopy[minIndex],
          arrayCopy[i],
        ];
        setArray([...arrayCopy]);
      }

      // Mark current position as sorted
      sortedIndices.add(i);
      setSorted([...sortedIndices]);
    }

    // Mark last element as sorted
    sortedIndices.add(arrayCopy.length - 1);
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
