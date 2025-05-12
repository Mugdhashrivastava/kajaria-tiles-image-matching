# feature_utils.py
import cv2
import numpy as np
from PIL import Image
from sklearn.cluster import KMeans

def extract_features(image_path, n_colors=5):
    image = Image.open(image_path).convert('RGB').resize((200, 200))
    pixels = np.array(image).reshape(-1, 3)

    # KMeans for color features
    kmeans = KMeans(n_clusters=n_colors, n_init='auto')
    kmeans.fit(pixels)
    color_features = kmeans.cluster_centers_.flatten()

    # SIFT keypoints
    gray = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2GRAY)
    sift = cv2.SIFT_create()
    _, descriptors = sift.detectAndCompute(gray, None)

    # Handle missing keypoints
    if descriptors is None:
        descriptors = np.zeros((1, 128))
    else:
        descriptors = np.mean(descriptors, axis=0)

    return np.concatenate((color_features, descriptors))

def cosine_similarity(vec1, vec2):
    norm1, norm2 = np.linalg.norm(vec1), np.linalg.norm(vec2)
    if norm1 == 0 or norm2 == 0:
        return 0
    return np.dot(vec1, vec2) / (norm1 * norm2)
