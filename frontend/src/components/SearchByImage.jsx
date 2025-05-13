import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchByImage() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setUploadedImage(reader.result);

        // Send the image to the FastAPI backend
        try {
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post('http://localhost:8000/analyze-image/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          const matchedTiles = response.data.matched_tiles;
          navigate('/search-results', { state: { image: reader.result, matchedTiles } });
        } catch (error) {
          console.error('Error analyzing image:', error);
          alert('Failed to analyze image. Please try again.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      navigate('/search-results', { state: { searchQuery: searchText } });
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Search by Image</h1>
      <p className="page-subtitle">Upload an image to find matching products, or search by keyword.</p>
      <div className="upload-container">
        <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7m-9 1l-4 4m0 0l-4-4m4 4V3"></path>
        </svg>
        <p className="upload-text">Upload an Image</p>
        <p className="upload-subtext">JPEG or PNG, up to 5MB</p>
        <input
          type="file"
          accept="image/jpeg, image/png"
          className="upload-input"
          onChange={handleImageUpload}
        />
      </div>
      <p className="or-text">or</p>
      <div className="search-bar-container">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for products"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
    </div>
  );
}

export default SearchByImage;