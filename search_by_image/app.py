from flask import Flask, request, render_template
import os
from werkzeug.utils import secure_filename
from config import UPLOAD_FOLDER, MAX_CONTENT_LENGTH
from utils import allowed_file
from image_matcher import find_best_matches
from text_matcher import search_by_text  # <- added import

# Ensure folders exist
os.makedirs('uploads', exist_ok=True)
os.makedirs('static/tiles', exist_ok=True)

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH


@app.route('/', methods=['GET', 'POST'])
def index():
    matches = []

    if request.method == 'POST':
        # If image is uploaded
        if 'image' in request.files and request.files['image'].filename != '':
            file = request.files['image']
            if file and allowed_file(file.filename):
                # Clear the uploads directory
                for f in os.listdir(app.config['UPLOAD_FOLDER']):
                    os.remove(os.path.join(app.config['UPLOAD_FOLDER'], f))

                # Save the new file
                filename = secure_filename(file.filename)
                path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(path)

                # Perform image-based matching
                matches = find_best_matches(path)

        # If text is entered
        elif 'description' in request.form:
            query = request.form['description'].strip()
            if query:
                matches = search_by_text(query)

    return render_template('index.html', matches=matches)


if __name__ == '__main__':
    app.run(debug=True)
