import React, { useState } from "react";
import FileUpload from "../PROJECT/FileUpload";
import QuestionList from "../PROJECT/QuestionList";
import axios from "axios";

const QuestionGeneratorPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setLoading(true);
    setQuestions([]); // Clear previous questions

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("/api/questions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setQuestions(response.data.questions || []);
    } catch (error) {
      console.error("Question generation failed:", error);
      alert("Failed to generate questions. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-2">
          🧠 Question Generator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Upload a PDF and automatically generate questions for your revision!
        </p>

        {/* File Upload Component */}
        <FileUpload onUpload={handleUpload} />

        {/* Loading Indicator */}
        {loading && (
          <div className="text-center mt-6 text-purple-500 font-medium">
            ⏳ Generating questions...
          </div>
        )}

        {/* Question List */}
        {!loading && questions.length > 0 && (
          <div className="mt-6">
            <QuestionList questions={questions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionGeneratorPage;
