from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import cv2
import numpy as np
from tiles_data import tiles_db
import io
import os
from PIL import Image
import imagehash


app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # update if frontend is hosted elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static "tiles" directory
if not os.path.exists("tiles"):
    os.makedirs("tiles")  # ensure it exists
app.mount("/tiles", StaticFiles(directory="tiles"), name="tiles")



# def get_image_hash(image_path):
#     try:
#         img = Image.open(image_path)
#         return str(imagehash.phash(img))  # perceptual hash (phash)
#     except Exception as e:
#         print(f"Error hashing {image_path}: {e}")
#         return None


# Extract dominant color
def get_dominant_color(image):
    image = cv2.resize(image, (150, 150))
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pixels = image_rgb.reshape((-1, 3))
    pixels = np.float32(pixels)
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    _, _, center = cv2.kmeans(pixels, 1, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    dominant_color = center[0].astype(int)
    return dominant_color.tolist()

# Calculate texture (grayscale variance)
def get_texture(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    return np.var(gray)



def match_tiles(dominant_color, texture):
    matched_tiles = []
    seen_images = set()  # Track unique image names

    for tile in tiles_db:
        image_name = tile["image"]
        if image_name in seen_images:
            continue  # Skip duplicates based on image name

        color_diff = np.sqrt(sum((a - b) ** 2 for a, b in zip(dominant_color, tile["color"])))
        texture_diff = abs(texture - tile["texture"])
        score = color_diff + texture_diff * 0.1

        matched_tiles.append((score, tile))
        seen_images.add(image_name)  # Mark this image as seen

    matched_tiles.sort(key=lambda x: x[0])
    return [tile for _, tile in matched_tiles[:9]]


# def match_tiles(dominant_color, texture):
#     matched_tiles = []
#     seen_hashes = set()

#     for tile in tiles_db:
#         tile_path = os.path.join("tiles", tile["image"])
#         if not os.path.exists(tile_path):
#             continue

#         img_hash = get_image_hash(tile_path)
#         if not img_hash or img_hash in seen_hashes:
#             continue  # Skip duplicate or unreadable image

#         color_diff = np.sqrt(sum((a - b) ** 2 for a, b in zip(dominant_color, tile["color"])))
#         texture_diff = abs(texture - tile["texture"])
#         score = color_diff + texture_diff * 0.1

#         matched_tiles.append((score, tile))
#         seen_hashes.add(img_hash)

#     matched_tiles.sort(key=lambda x: x[0])
#     return [tile for _, tile in matched_tiles[:9]]





# Analyze uploaded image
@app.post("/analyze-image/")
async def analyze_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if image is None:
            return JSONResponse(status_code=400, content={"message": "Invalid image file"})
        dominant_color = get_dominant_color(image)
        texture = get_texture(image)
        matched_tiles = match_tiles(dominant_color, texture)

        # Convert image names to full URLs
        for tile in matched_tiles:
            tile["image_url"] = f"http://localhost:8000/tiles/{tile['image']}"

        return {"matched_tiles": matched_tiles}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"Error processing image: {str(e)}"})

# Root endpoint
@app.get("/")
async def root():
    return {"message": "Tile Recommendation Backend"}
