export const shellSort = async (
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
    // Generate gap sequence using Knuth's formula
    let gap = 1;
    while (gap < arrayCopy.length / 3) {
      gap = 3 * gap + 1;
    }

    // Sort with decreasing gaps
    while (gap > 0) {
      if (signal?.aborted) {
        throw new DOMException("Aborted", "AbortError");
      }

      for (let i = gap; i < arrayCopy.length; i++) {
        const temp = arrayCopy[i];
        let j = i;

        // Compare and shift elements with gap
        while (j >= gap && arrayCopy[j - gap] > temp) {
          if (signal?.aborted) {
            throw new DOMException("Aborted", "AbortError");
          }

          // Visualize comparison
          setComparing([j - gap, j]);
          await new Promise((resolve) => setTimeout(resolve, 101 - speed));

          arrayCopy[j] = arrayCopy[j - gap];
          setArray([...arrayCopy]);
          j -= gap;
        }

        // Place element in its correct position
        arrayCopy[j] = temp;
        setArray([...arrayCopy]);

        // Track partially sorted elements
        sortedIndices.add(j);
        setSorted([...sortedIndices]);
      }

      gap = Math.floor(gap / 3);
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
