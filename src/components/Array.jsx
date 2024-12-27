import Bar from "./Bar";
import { useArray } from "../context/ArrayContext";

const Array = () => {
  const { array, comparing, sorted } = useArray();

  // Calculate bar width based on container width and array length
  const barWidth = `calc((100% / ${array.length}) - 2px)`; // -2px accounts for margins

  return (
    <div className="flex items-end justify-center h-[300px] bg-gray-100 p-4">
      {array.map((value, idx) => (
        <Bar
          key={idx}
          height={value}
          width={barWidth}
          isComparing={comparing.includes(idx)}
          isSorted={sorted.includes(idx)}
        />
      ))}
    </div>
  );
};

export default Array;
