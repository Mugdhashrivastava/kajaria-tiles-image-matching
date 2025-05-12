import cv2
import numpy as np
from sklearn.cluster import KMeans
from PIL import Image
import os
from config import TILE_FOLDER

def extract_features(image_path, n_colors=5):
    image = Image.open(image_path).convert('RGB')
    image = image.resize((200, 200))
    pixels = np.array(image).reshape(-1, 3)
    
    kmeans = KMeans(n_clusters=n_colors, n_init='auto')
    kmeans.fit(pixels)
    color_features = kmeans.cluster_centers_.flatten()

    gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
    sift = cv2.SIFT_create()
    keypoints, descriptors = sift.detectAndCompute(gray, None)
    
    if descriptors is None:
        descriptors = np.zeros((1, 128))
    else:
        descriptors = np.mean(descriptors, axis=0)
    
    return np.concatenate((color_features, descriptors))

def cosine_similarity(vec1, vec2):
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    if norm1 == 0 or norm2 == 0:
        return 0
    return np.dot(vec1, vec2) / (norm1 * norm2)

def find_best_matches(uploaded_image_path, threshold=0.9):
    matches = []
    uploaded_features = extract_features(uploaded_image_path)

    for tile_name in os.listdir(TILE_FOLDER):
        tile_path = os.path.join(TILE_FOLDER, tile_name)
        tile_features = extract_features(tile_path)
        similarity = cosine_similarity(uploaded_features, tile_features)
        if similarity >= threshold:
            matches.append((tile_name, similarity))

    matches.sort(key=lambda x: x[1], reverse=True)
    return matches
