import { useLocation } from 'react-router-dom';

import tile1 from '../assets/tile1.jpg';
import tile2 from '../assets/tile2.jpg';
import tile3 from '../assets/tile3.jpg';
import tile4 from '../assets/tile4.jpg';
import tile5 from '../assets/tile5.jpg';
import tile6 from '../assets/tile6.jpg';
import tile7 from '../assets/tile7.jpg';
import tile8 from '../assets/tile8.jpg';
import tile9 from '../assets/tile9.jpg';

function SearchResults() {
  const location = useLocation();
  const uploadedImage = location.state?.image || null;

  const results = [
    { name: "Product Name", details: "Additional details", image: tile1 },
    { name: "Product Name", details: "Additional details", image: tile2 },
    { name: "Product Name", details: "Additional details", image: tile3 },
    { name: "Product Name", details: "Additional details", image: tile4 },
    { name: "Product Name", details: "Additional details", image: tile5 },
    { name: "Product Name", details: "Additional details", image: tile6 },
    { name: "Product Name", details: "Additional details", image: tile7 },
    { name: "Product Name", details: "Additional details", image: tile8 },
    { name: "Product Name", details: "Additional details", image: tile9 },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Search results</h1>
      <div className="search-result-header">
        {uploadedImage ? (
          <img
            src={uploadedImage}
            alt="Uploaded Tile"
            className="uploaded-image"
          />
        ) : (
          <div className="image-placeholder"></div>
        )}
        <p className="header-text">Here are some products that match the image you uploaded.</p>
      </div>
      <div className="filter-container">
        <select className="filter-dropdown">
          <option>Material</option>
          <option>Ceramic</option>
          <option>Porcelain</option>
        </select>
        <select className="filter-dropdown">
          <option>Size</option>
          <option>600x600</option>
          <option>300x300</option>
        </select>
        <select className="filter-dropdown">
          <option>Finish</option>
          <option>Matte</option>
          <option>Glossy</option>
        </select>
        <select className="filter-dropdown">
          <option>Search for</option>
          <option>Color</option>
          <option>Texture</option>
        </select>
      </div>
      <div className="grid-container">
        {results.map((result, index) => (
          <div key={index} className="grid-item">
            <img
              src={result.image}
              alt={result.name}
              className="tile-preview"
            />
            <h3 className="tile-name">{result.name}</h3>
            <p className="tile-detail">{result.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;