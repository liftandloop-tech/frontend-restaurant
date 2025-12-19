import React, { useState } from 'react';

/**
 * Component for uploading item photos
 * Allows drag and drop or click to browse functionality
 */
const ItemPhotoUpload = ({ onImageUpload }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // Process the selected file
  const handleFile = (file) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        if (onImageUpload) onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">Item Photo</label>
      <div 
        className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 bg-gray-50 h-40
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt="Item preview" 
            className="h-full object-contain"
          />
        ) : (
          <>
            <div className="mb-3 bg-blue-100 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-center">
              <label htmlFor="file-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
                Upload Item Photo
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Drag and drop or click to browse<br />JPG, PNG up to 5MB
              </p>
            </div>
          </>
        )}
        <input 
          id="file-upload" 
          name="file-upload" 
          type="file" 
          className="sr-only" 
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ItemPhotoUpload;