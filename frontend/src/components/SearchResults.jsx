function SearchResults() {
  const results = [
    { name: "Product Name", details: "Additional details", color: "#F5F5DC" },
    { name: "Product Name", details: "Additional details", color: "#D3D3D3" },
    { name: "Product Name", details: "Additional details", color: "#D2691E" },
    { name: "Product Name", details: "Additional details", color: "#FFFFF0" },
    { name: "Product Name", details: "Additional details", color: "#C0C0C0" },
    { name: "Product Name", details: "Additional details", color: "#DEB887" },
    { name: "Product Name", details: "Additional details", color: "#F0E68C" },
    { name: "Product Name", details: "Additional details", color: "#A9A9A9" },
    { name: "Product Name", details: "Additional details", color: "#FFD700" },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Search results</h1>
      <div className="search-result-header">
        <div className="image-placeholder"></div>
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
            <div className="tile-preview" style={{ backgroundColor: result.color }}></div>
            <h3 className="tile-name">{result.name}</h3>
            <p className="tile-detail">{result.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;