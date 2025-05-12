import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from config import TILE_FOLDER

def search_by_text(query, data_file="tile_data.json", top_k=5):
    with open(data_file, 'r') as f:
        tile_data = json.load(f)

    image_names = list(tile_data.keys())
    descriptions = list(tile_data.values())

    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(descriptions)
    query_vector = vectorizer.transform([query])

    similarities = cosine_similarity(query_vector, tfidf_matrix).flatten()
    matched_indices = similarities.argsort()[::-1][:top_k]

    results = []
    for idx in matched_indices:
        if similarities[idx] > 0.1:  # filter weak matches
            results.append((image_names[idx], similarities[idx]))

    return results
