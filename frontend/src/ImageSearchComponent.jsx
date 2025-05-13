import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';

const ImageSearchComponent = () => {
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgUrl = URL.createObjectURL(file);
      setImage(imgUrl);
      console.log('Uploaded image:', file.name);
    }
  };

  const handleSearch = () => {
    console.log('Search text:', searchQuery);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 text-center font-sans">
      <h2 className="text-4xl font-semibold text-gray-900 mb-2">Search by image</h2>
      <p className="text-gray-500 text-base mb-8">
        Upload an image to find matching products, or search by keyword.
      </p>

      {/* Upload Box */}
      <label
        htmlFor="imageUpload"
        className="border-2 border-dashed border-gray-300 rounded-lg p-10 mb-5 cursor-pointer hover:bg-gray-100 transition-all duration-200 w-80 flex flex-col items-center"
      >
        <FiCamera className="text-4xl text-gray-500 mb-3" />
        <span className="text-gray-700 font-medium text-base">Upload an image</span>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>

      {/* Small Image Preview */}
    {image && (
  <div className="mb-6 w-20 h-20 rounded overflow-hidden border border-gray-300 shadow">
    <img
      src={image}
      alt="Preview"
      className="w-full h-full object-cover"
    />
  </div>
)}


      <div className="text-gray-400 text-sm mb-4">or</div>

      {/* Search Bar */}
      <div className="flex w-80">
        <input
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gray-400 text-base"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-600 text-white px-5 py-3 rounded-r-md hover:bg-gray-700 transition duration-200 text-base font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ImageSearchComponent;
