export const bubbleSort = async (
  array,
  setArray,
  setComparing,
  setSorted,
  speed,
  signal
) => {
  const arrayCopy = [...array];
  const n = arrayCopy.length;
  const sortedIndices = new Set();

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Check for abort signal
      if (signal?.aborted) {
        throw new DOMException('Aborted', 'AbortError');
      }

      // Visualize comparison
      setComparing([j, j + 1]);
      await new Promise(resolve => setTimeout(resolve, 101 - speed));

      // Compare and swap if needed
      if (arrayCopy[j] > arrayCopy[j + 1]) {
        const temp = arrayCopy[j];
        arrayCopy[j] = arrayCopy[j + 1];
        arrayCopy[j + 1] = temp;
        setArray([...arrayCopy]);
        swapped = true;
      }
    }

    // Mark the last element as sorted
    sortedIndices.add(n - i - 1);
    setSorted([...sortedIndices]);

    // If no swapping occurred, array is sorted
    if (!swapped) {
      break;
    }
  }

  // Mark all elements as sorted when complete
  setSorted([...Array(n).keys()]);
};