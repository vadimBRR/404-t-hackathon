import React, { useState } from 'react'

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div
        className={`border-2 border-dashed rounded-lg w-full p-6 text-center cursor-pointer transition ${
          dragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {file ? (
          <div className="text-gray-700">
            <p className="font-semibold">Завантажений файл:</p>
            <p className="truncate">{file.name}</p>
          </div>
        ) : (
          <div>
            <p className="font-semibold text-gray-500">Перетягніть файл сюди</p>
            <p className="text-sm text-gray-400">або натисніть для вибору</p>
          </div>
        )}
      </div>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="*"
      />
      {file && (
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={() => setFile(null)}
        >
          Видалити файл
        </button>
      )}
    </div>
  )
}

export default FileUploader