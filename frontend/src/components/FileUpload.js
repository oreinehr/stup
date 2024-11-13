import React, { useState } from 'react';
import { Button } from 'shadcn-ui';  // Utilize o componente de botão estilizado do shadcn

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center w-64 h-32 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-white hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4 3a1 1 0 011-1h10a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V3zm1 0v14h10V3H5zm4 10a1 1 0 112 0 1 1 0 01-2 0zM7 9a1 1 0 100-2 1 1 0 000 2zm6 1a1 1 0 10-2 0 1 1 0 002 0zm-6-1a1 1 0 10-2 0 1 1 0 002 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="mt-2 text-sm text-gray-600">Clique ou arraste o arquivo</span>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {selectedFile && (
        <div className="mt-4 p-2 bg-gray-200 rounded-lg">
          <p className="text-gray-700">{selectedFile.name}</p>
        </div>
      )}

      <Button className="mt-4">Upload</Button>
    </div>
  );
}

export default FileUpload;
