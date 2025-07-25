import React, { useState } from "react";
import FileUpload from "../PROJECT/FileUpload";
import SummaryDisplay from "../PROJECT/SummaryDisplay";
import axios from "axios";

const PdfSummaryPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setLoading(true);
    setSummary(null); // Clear previous summary
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("/api/summary", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Adjust according to backend response format
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Summary generation failed:", error);
      alert("Error generating summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-2">
          PDF to Notes Converter 📘
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Upload your study material and get a smart summary instantly!
        </p>

        {/* File Upload Component */}
        <FileUpload onUpload={handleUpload} />

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center text-blue-500 mt-6 font-medium">
            ⏳ Generating summary...
          </div>
        )}

        {/* Summary Display Component */}
        {!loading && summary && <SummaryDisplay summary={summary} />}
      </div>
    </div>
  );
};

export default PdfSummaryPage;
