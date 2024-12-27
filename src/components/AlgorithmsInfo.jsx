import { useState } from "react";
import { algorithmsInfo } from "../data/algorithmsInfo";


export default function AlgorithmInfo({ algorithm }) {
  const info = algorithmsInfo[algorithm];
  const [activeTab, setActiveTab] = useState("cpp");

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{info.name}</h3>
      <p className="text-gray-600 mb-4">{info.description}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium mb-2">Time Complexity</h4>
          <ul className="text-sm">
            <li>Best: {info.timeComplexity.best}</li>
            <li>Average: {info.timeComplexity.average}</li>
            <li>Worst: {info.timeComplexity.worst}</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Space Complexity</h4>
          <p className="text-sm">{info.spaceComplexity}</p>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-2">Implementation</h4>
        <div className="flex gap-2 mb-2">
          {Object.keys(info.implementations).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-3 py-1 rounded ${
                activeTab === lang ? "bg-primary text-white" : "bg-gray-200"
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
          <code>{info.implementations[activeTab]}</code>
        </pre>
      </div>
    </div>
  );
};
