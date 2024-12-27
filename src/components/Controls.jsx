// src/components/Controls.jsx
import { useState, useRef } from "react";
import { useArray } from "../context/ArrayContext";
import { bubbleSort } from "../algorithms/bubbleSort";
import { quickSort } from "../algorithms/quickSort";
import { mergeSort } from "../algorithms/mergeSort";
import { insertionSort } from "../algorithms/insertionSort";
import { selectionSort } from "../algorithms/selectionSort";
import { shellSort } from "../algorithms/shellSort";
import { heapSort } from "../algorithms/heapSort";
import AlgorithmInfo from './AlgorithmsInfo';

const Controls = () => {
  const {
    generateArray,
    isSorting,
    setIsSorting,
    array,
    setArray,
    setComparing,
    setSorted,
  } = useArray();

  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");
  const [isActive, setIsActive] = useState(false);
  const abortController = useRef(null);

  const algorithms = {
    bubble: bubbleSort,
    heap: heapSort,
    insertion: insertionSort,
    merge: mergeSort,
    quick: quickSort,
    selection: selectionSort,
    shell: shellSort,
  };

  const handleSortToggle = async () => {
    if (isActive) {
      abortController.current?.abort();
      setIsActive(false);
      setIsSorting(false);
    } else {
      setIsActive(true);
      setIsSorting(true);
      abortController.current = new AbortController();

      try {
        await algorithms[selectedAlgorithm](
          array,
          setArray,
          setComparing,
          setSorted,
          speed,
          abortController.current.signal
        );
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Sorting stopped");
        }
      } finally {
        setIsActive(false);
        setIsSorting(false);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Controls */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Algorithm Settings</h3>
            
            {/* Algorithm Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Algorithm
              </label>
              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                disabled={isSorting}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                {Object.keys(algorithms).map((algo) => (
                  <option key={algo} value={algo}>
                    {algo.charAt(0).toUpperCase() + algo.slice(1)} Sort
                  </option>
                ))}
              </select>
            </div>

            {/* Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Array Size Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Array Size: {arraySize}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={arraySize}
                  onChange={(e) => setArraySize(parseInt(e.target.value))}
                  disabled={isSorting}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Speed Control */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Speed: {speed}
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={speed}
                  onChange={(e) => setSpeed(parseInt(e.target.value))}
                  disabled={isSorting}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => generateArray(arraySize)}
                disabled={isSorting}
                className="flex-1 px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50 transition-all duration-200 min-w-[120px]"
              >
                Generate Array
              </button>
              <button
                onClick={handleSortToggle}
                disabled={isSorting && !isActive}
                className={`flex-1 px-4 py-2 text-white rounded-md transition-all duration-200 min-w-[120px] ${
                  isActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-secondary hover:bg-secondary/90"
                } disabled:opacity-50`}
              >
                {isActive ? "Stop" : "Sort"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Algorithm Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Algorithm Information</h3>
          <AlgorithmInfo algorithm={selectedAlgorithm} />
        </div>
      </div>
    </div>
  );
};

export default Controls;