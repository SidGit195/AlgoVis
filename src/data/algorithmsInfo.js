// src/data/algorithmsInfo.js
export const algorithmsInfo = {
    bubble: {
        name: "Bubble Sort",
        description: "A simple comparison algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        implementations: {
            cpp: `void bubbleSort(int arr[], int n) {
    for(int i = 0; i < n-1; i++)
      for(int j = 0; j < n-i-1; j++)
        if(arr[j] > arr[j+1])
          swap(arr[j], arr[j+1]);
  }`,
            javascript: `function bubbleSort(arr) {
    for(let i = 0; i < arr.length-1; i++)
      for(let j = 0; j < arr.length-i-1; j++)
        if(arr[j] > arr[j+1])
          [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
  }`,
            python: `def bubble_sort(arr):
      n = len(arr)
      for i in range(n-1):
          for j in range(n-i-1):
              if arr[j] > arr[j+1]:
                  arr[j], arr[j+1] = arr[j+1], arr[j]`
        }
    },

    quick: {
        name: "Quick Sort",
        description: "A divide-and-conquer algorithm that works by selecting a 'pivot' element and partitioning the array around it, such that smaller elements go to the left and larger ones to the right.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(log n)",
        implementations: {
            cpp: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
      int pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }`,
            javascript: `function quickSort(arr, low = 0, high = arr.length-1) {
    if (low < high) {
      let pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
    }
  }`,
            python: `def quick_sort(arr, low, high):
      if low < high:
          pi = partition(arr, low, high)
          quick_sort(arr, low, pi-1)
          quick_sort(arr, pi+1, high)`
        }
    },

    merge: {
        name: "Merge Sort",
        description: "A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        },
        spaceComplexity: "O(n)",
        implementations: {
            cpp: `void mergeSort(int arr[], int l, int r) {
    if (l < r) {
      int m = l + (r - l) / 2;
      mergeSort(arr, l, m);
      mergeSort(arr, m + 1, r);
      merge(arr, l, m, r);
    }
  }`,
            javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  }`,
            python: `def merge_sort(arr):
      if len(arr) <= 1:
          return arr
      mid = len(arr) // 2
      left = merge_sort(arr[:mid])
      right = merge_sort(arr[mid:])
      return merge(left, right)`
        }
    },

    insertion: {
        name: "Insertion Sort",
        description: "Builds the final sorted array one item at a time by repeatedly taking elements from the unsorted portion and inserting them into their correct position in the sorted portion.",
        timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        implementations: {
            cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
      int key = arr[i];
      int j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
    }
  }`,
            javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }`,
            python: `def insertion_sort(arr):
      for i in range(1, len(arr)):
          key = arr[i]
          j = i - 1
          while j >= 0 and arr[j] > key:
              arr[j + 1] = arr[j]
              j -= 1
          arr[j + 1] = key`
        }
    },

    selection: {
        name: "Selection Sort",
        description: "Divides the input array into a sorted and unsorted region. Repeatedly selects the smallest element from the unsorted region and adds it to the sorted region.",
        timeComplexity: {
            best: "O(n²)",
            average: "O(n²)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        implementations: {
            cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n-1; i++) {
      int min_idx = i;
      for (int j = i+1; j < n; j++)
        if (arr[j] < arr[min_idx])
          min_idx = j;
      swap(arr[min_idx], arr[i]);
    }
  }`,
            javascript: `function selectionSort(arr) {
    for (let i = 0; i < arr.length-1; i++) {
      let minIdx = i;
      for (let j = i+1; j < arr.length; j++)
        if (arr[j] < arr[minIdx])
          minIdx = j;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }`,
            python: `def selection_sort(arr):
      for i in range(len(arr)-1):
          min_idx = i
          for j in range(i+1, len(arr)):
              if arr[j] < arr[min_idx]:
                  min_idx = j
          arr[i], arr[min_idx] = arr[min_idx], arr[i]`
        }
    },

    shell: {
        name: "Shell Sort",
        description: "An optimization of insertion sort that allows the exchange of items that are far apart. The idea is to arrange the list of elements so that all elements a certain gap apart are sorted.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n²)"
        },
        spaceComplexity: "O(1)",
        implementations: {
            cpp: `void shellSort(int arr[], int n) {
    for (int gap = n/2; gap > 0; gap /= 2) {
      for (int i = gap; i < n; i++) {
        int temp = arr[i];
        int j;
        for (j = i; j >= gap && arr[j-gap] > temp; j -= gap)
          arr[j] = arr[j-gap];
        arr[j] = temp;
      }
    }
  }`,
            javascript: `function shellSort(arr) {
    let n = arr.length;
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
      for (let i = gap; i < n; i++) {
        let temp = arr[i];
        let j;
        for (j = i; j >= gap && arr[j-gap] > temp; j -= gap)
          arr[j] = arr[j-gap];
        arr[j] = temp;
      }
    }
  }`,
            python: `def shell_sort(arr):
      n = len(arr)
      gap = n // 2
      while gap > 0:
          for i in range(gap, n):
              temp = arr[i]
              j = i
              while j >= gap and arr[j-gap] > temp:
                  arr[j] = arr[j-gap]
                  j -= gap
              arr[j] = temp
          gap //= 2`
        }
    },

    heap: {
        name: "Heap Sort",
        description: "A comparison-based sorting algorithm that uses a binary heap data structure. It divides the input into a sorted and an unsorted region, and iteratively shrinks the unsorted region by extracting the largest element.",
        timeComplexity: {
            best: "O(n log n)",
            average: "O(n log n)",
            worst: "O(n log n)"
        },
        spaceComplexity: "O(1)",
        implementations: {
            cpp: `void heapSort(int arr[], int n) {
    // Build heap
    for (int i = n/2-1; i >= 0; i--)
      heapify(arr, n, i);
    // Extract elements from heap
    for (int i = n-1; i > 0; i--) {
      swap(arr[0], arr[i]);
      heapify(arr, i, 0);
    }
  }`,
            javascript: `function heapSort(arr) {
    const n = arr.length;
    // Build heap
    for (let i = Math.floor(n/2)-1; i >= 0; i--)
      heapify(arr, n, i);
    // Extract elements
    for (let i = n-1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      heapify(arr, i, 0);
    }
  }`,
            python: `def heap_sort(arr):
      n = len(arr)
      # Build max-heap
      for i in range(n//2 - 1, -1, -1):
          heapify(arr, n, i)
      # Extract elements
      for i in range(n-1, 0, -1):
          arr[i], arr[0] = arr[0], arr[i]
          heapify(arr, i, 0)`
        }
    }
};