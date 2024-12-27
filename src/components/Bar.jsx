const Bar = ({ height, isComparing, isSorted }) => {
  let backgroundColor = "#1a73e8";
  if (isComparing) backgroundColor = "#ffeb3b";
  if (isSorted) backgroundColor = "#4caf50";

  // Scale down the height by dividing by 3 (or adjust factor as needed)
  const scaledHeight = height / 2;

  return (
    <div
      className="w-2 mx-[1px] transition-all duration-100"
      style={{
        height: `${scaledHeight}px`,
        backgroundColor,
      }}
    ></div>
  );
};

export default Bar;
