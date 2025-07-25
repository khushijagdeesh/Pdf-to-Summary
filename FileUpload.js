import React, { useState } from "react";

const FileUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      onUpload(file); // Send file to parent
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      onUpload(file); // Send file to parent
    } else {
      alert("Only PDF files are allowed.");
    }
  };

  return (
    <div
      className={`border-2 rounded-xl p-6 cursor-pointer transition-all text-center ${
        dragActive
          ? "border-blue-500 bg-blue-50"
          : "border-dashed border-gray-400"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileInput"
      />
      <label htmlFor="fileInput" className="block text-gray-600">
        {selectedFile ? (
          <p className="font-medium text-green-600">📄 {selectedFile.name}</p>
        ) : (
          <>
            <p className="text-lg">Drag & drop a PDF file here</p>
            <p className="text-sm text-gray-500 mt-1">
              or click to select from device
            </p>
          </>
        )}
      </label>
    </div>
  );
};

export default FileUpload;
