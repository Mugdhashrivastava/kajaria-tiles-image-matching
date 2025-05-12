# app.py
import os
from feature_utils import extract_features, cosine_similarity
from config import TILE_FOLDER

def find_best_matches(uploaded_image_path, threshold=0.9):
    uploaded_features = extract_features(uploaded_image_path)
    matches = []

    for tile_name in os.listdir(TILE_FOLDER):
        tile_path = os.path.join(TILE_FOLDER, tile_name)
        tile_features = extract_features(tile_path)
        similarity = cosine_similarity(uploaded_features, tile_features)
        if similarity >= threshold:
            matches.append((tile_name, similarity))

    matches.sort(key=lambda x: x[1], reverse=True)
    return matches

if __name__ == "__main__":
    uploaded_path = "input.jpg"  # User uploaded image
    results = find_best_matches(uploaded_path, threshold=0.8)

    if results:
        print("Top Matches:")
        for match in results:
            print(f"{match[0]} - Similarity: {match[1]:.2f}")
    else:
        print("No similar images found.")
