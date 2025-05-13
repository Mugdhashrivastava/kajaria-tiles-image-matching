import tile1 from '../assets/tile1.jpg';
import tile2 from '../assets/tile2.jpg';
import tile3 from '../assets/tile3.jpg';
import tile4 from '../assets/tile4.jpg';
import tile5 from '../assets/tile5.jpg';
import tile6 from '../assets/tile6.jpg';

function Recommendations() {
  const tiles = [
    { name: "Marble White", material: "Ceramic", size: "600x600", finish: "Matte", image: tile1 },
    { name: "Rustic Brown", material: "Porcelain", size: "600x600", finish: "Matte", image: tile2 },
    { name: "Beige Sandstone", material: "Ceramic", size: "600x600", finish: "Matte", image: tile3 },
    { name: "Granite Gray", material: "Ceramic", size: "600x600", finish: "Matte", image: tile4 },
    { name: "Wood Plank", material: "Porcelain", size: "600x600", finish: "Matte", image: tile5 },
    { name: "Textured Ivory", material: "Ceramic", size: "600x600", finish: "Matte", image: tile6 },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Recommendation</h1>
      <div className="grid-container">
        {tiles.map((tile, index) => (
          <div key={index} className="grid-item">
            <img
              src={tile.image}
              alt={tile.name}
              className="tile-preview"
            />
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