export const heapSort = async (
  array,
  setArray,
  setComparing,
  setSorted,
  speed,
  signal
) => {
  const arrayCopy = [...array];
  const sortedIndices = new Set();

  const maxHeapify = async (n, i) => {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Compare with left child
    if (left < n) {
      setComparing([largest, left]);
      await new Promise((resolve) => setTimeout(resolve, 101 - speed));
      if (arrayCopy[left] > arrayCopy[largest]) {
        largest = left;
      }
    }

    // Compare with right child
    if (right < n) {
      setComparing([largest, right]);
      await new Promise((resolve) => setTimeout(resolve, 101 - speed));
      if (arrayCopy[right] > arrayCopy[largest]) {
        largest = right;
      }
    }

    // If largest is not root
    if (largest !== i) {
      [arrayCopy[i], arrayCopy[largest]] = [arrayCopy[largest], arrayCopy[i]];
      setArray([...arrayCopy]);
      await maxHeapify(n, largest);
    }
  };

  // Build max heap
  const n = arrayCopy.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await maxHeapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    setComparing([0, i]);
    await new Promise((resolve) => setTimeout(resolve, 101 - speed));

    // Move current root to end
    [arrayCopy[0], arrayCopy[i]] = [arrayCopy[i], arrayCopy[0]];
    setArray([...arrayCopy]);

    // Mark as sorted
    sortedIndices.add(i);
    setSorted([...sortedIndices]);

    // Call max heapify on reduced heap
    await maxHeapify(i, 0);
  }

  // Mark all indices as sorted
  setSorted([...Array(n).keys()]);
  return arrayCopy;
};
