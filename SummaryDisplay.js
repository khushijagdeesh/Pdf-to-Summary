import React from "react";

const SummaryDisplay = ({ summary }) => {
  if (!summary) {
    return (
      <div className="text-center text-gray-500 mt-4">
        📄 No summary generated yet.
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h3 className="text-xl font-semibold text-blue-600 mb-4">
        ✨ Generated Summary
      </h3>
      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
        {Array.isArray(summary) ? (
          summary.map((point, idx) => (
            <p key={idx} className="mb-2">
              • {point}
            </p>
          ))
        ) : (
          <p>{summary}</p>
        )}
      </div>
    </div>
  );
};

export default SummaryDisplay;
