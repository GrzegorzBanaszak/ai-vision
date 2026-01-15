"use client";

import AzureAnalysisResponse from "@/types/AzureAnalysisResponse";
import { useState } from "react";

export default function ImageAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AzureAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1. Obsługa wyboru pliku i tworzenie podglądu
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Tworzy tymczasowy adres URL zdjęcia
      setAnalysis(null); // Resetujemy wynik poprzedniej analizy
    }
  };

  // 2. Wysyłka zdjęcia po kliknięciu przycisku
  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null); // Resetuj błędy przed nową próbą

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: selectedFile,
      });

      const data = await res.json();

      if (!res.ok) {
        // Tutaj wyłapujemy błąd, który wysłaliśmy z API Route
        throw new Error(data.error || "Coś poszło nie tak");
      }

      setAnalysis(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          AI Image Vision 🤖
        </h1>

        <div className="space-y-6">
          {/* Wybór pliku */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
          />

          {/* Podgląd zdjęcia */}
          {previewUrl && (
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-dashed border-gray-300">
              <img
                src={previewUrl}
                alt="Podgląd"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* Przycisk wysyłki */}
          <button
            onClick={handleUpload}
            disabled={!selectedFile || loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white transition-all
              ${
                !selectedFile || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 active:scale-95"
              }`}
          >
            {loading ? "Analizowanie..." : "Analizuj obraz w Azure"}
          </button>
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              <strong>Błąd:</strong> {error}
            </div>
          )}
        </div>

        {/* Wyniki */}
        {analysis && (
          <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
            <h2 className="text-xl font-bold text-green-800 mb-2">
              Wynik z Azure AI:
            </h2>
            <p className="text-lg text-gray-700 italic">
              "{analysis.captionResult.text}"
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${analysis.captionResult.confidence * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-green-700 mt-1 text-right">
              Pewność: {(analysis.captionResult.confidence * 100).toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
