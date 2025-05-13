function Recommendations() {
  const tiles = [
    { name: "Marble White", material: "Ceramic", size: "600x600", finish: "Matte", color: "#ffffff" },
    { name: "Rustic Brown", material: "Porcelain", size: "600x600", finish: "Matte", color: "#8B4513" },
    { name: "Beige Sandstone", material: "Ceramic", size: "600x600", finish: "Matte", color: "#F5F5DC" },
    { name: "Granite Gray", material: "Ceramic", size: "600x600", finish: "Matte", color: "#808080" },
    { name: "Wood Plank", material: "Porcelain", size: "600x600", finish: "Matte", color: "#D2691E" },
    { name: "Textured Ivory", material: "Ceramic", size: "600x600", finish: "Matte", color: "#FFFFF0" },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Recommendation</h1>
      <div className="grid-container">
        {tiles.map((tile, index) => (
          <div key={index} className="grid-item">
            <div className="tile-preview" style={{ backgroundColor: tile.color }}></div>
            <h3 className="tile-name">{tile.name}</h3>
            <p className="tile-detail">{tile.material}</p>
            <p className="tile-detail">{tile.size}</p>
            <p className="tile-detail">{tile.finish}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;