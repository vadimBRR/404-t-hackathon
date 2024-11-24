import { Share } from 'lucide-react'
import React, { useState } from 'react'
import { handleOnSubmit } from '../api/index';

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
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto ">
      <div
        className={`border-2 border-dashed rounded-lg w-full p-6 text-center cursor-pointer transition py-20 ${
          dragging ? 'border-blue-500 bg-primary' : 'border-primary bg-gray-50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {file ? (
          <div className="text-gray-700 ">
            <p className="font-semibold">Uploaded File:</p>
            <p className="truncate">{file.name}</p>
          </div>
        ) : (
          <div className='flex flex-col items-center '>
            <div className='w-[70%] flex flex-col items-center gap-5'>
              <Share color='#e10075' size={40} />
              <p className="font-semibold text-gray-500">Drop a file here to upload, or click here to browse</p>
              </div>
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
          <div className=' mt-4 flex w-full gap-2 justify-end'>
            <button
              className="px-4 py-2 bg-red-500 text-[#000000] rounded-lg hover:bg-red-600 transition"
              onClick={() => setFile(null)}
            >
              Delete File
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-[#000000] rounded-lg hover:bg-red-600 transition"
              onClick={(e) => handleOnSubmit(e,file)}
            >
              Submit
            </button>
          </div>
      )}
    </div>
  )
}

export default FileUploader