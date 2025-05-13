import { useLocation } from 'react-router-dom';

// Import all tile images
import tile1 from '../assets/tile1.jpg';
import tile2 from '../assets/tile2.jpg';
import tile3 from '../assets/tile3.jpg';
import tile4 from '../assets/tile4.jpg';
import tile5 from '../assets/tile5.jpg';
import tile6 from '../assets/tile6.jpg';
import tile7 from '../assets/tile7.jpg';
import tile8 from '../assets/tile8.jpg';
import tile9 from '../assets/tile9.jpg';

// Map image filenames to imported images
const imageMap = {
  'tile1.jpg': tile1,
  'tile2.jpg': tile2,
  'tile3.jpg': tile3,
  'tile4.jpg': tile4,
  'tile5.jpg': tile5,
  'tile6.jpg': tile6,
  'tile7.jpg': tile7,
  'tile8.jpg': tile8,
  'tile9.jpg': tile9,
};

function SearchResults() {
  const location = useLocation();
  const uploadedImage = location.state?.image || null;
  const matchedTiles = location.state?.matchedTiles || [];

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
        {matchedTiles.length > 0 ? (
          matchedTiles.map((tile) => (
            <div key={tile.id} className="grid-item">
            <img src={tile.image_url} alt={tile.name} className="tile-preview" />

              <h3 className="tile-name">{tile.name}</h3>
              <p className="tile-detail">{tile.material}</p>
              <p className="tile-detail">{tile.size}</p>
              <p className="tile-detail">{tile.finish}</p>
            </div>
          ))
        ) : (
          <p>No matching tiles found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchResults;