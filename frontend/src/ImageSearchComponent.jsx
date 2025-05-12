import React, { useState } from 'react';

const ImageSearchComponent = () => {
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      console.log('Uploaded image:', file.name);
    }
  };

  const handleSearch = () => {
    console.log('Search text:', searchQuery);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center font-sans">
      {/* Title: Uppercase, larger, and tighter spacing */}
      <h2 className="text-4xl font-extrabold uppercase tracking-tight mb-1">
        Search by image
      </h2>
      {/* Description: Smaller font, less margin */}
      <p className="text-gray-600 text-sm mb-4">
        Upload an image to find matching products, or search by keyword.
      </p>

      {/* Upload Area: Adjusted border, padding, and icon size */}
      <label
        htmlFor="imageUpload"
        className="border-2 border-dashed border-gray-400 rounded-lg p-12 mb-4 cursor-pointer hover:bg-gray-200 transition-all duration-200"
      >
        {/* Icon: Smaller and gray */}
        <div className="text-3xl text-gray-500 mb-2">📷</div>
        {/* Text: Uppercase, bolder, and slightly larger */}
        <div className="text-gray-700 font-bold uppercase text-base">
          Upload an image
        </div>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>

      {/* "or" Divider: Smaller font, less margin */}
      <div className="text-gray-500 text-sm mb-3">or</div>

      {/* Search Bar: Adjusted width, border, and button styling */}
      <div className="flex w-full max-w-lg">
        <input
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-400 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-gray-500 text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-600 text-white px-6 py-2 rounded-r-lg hover:bg-gray-700 transition-all duration-200 text-sm font-medium"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default ImageSearchComponent;