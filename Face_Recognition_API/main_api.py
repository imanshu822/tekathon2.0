import cv2
import numpy as np
import face_recognition
import os
from flask import Flask, request, jsonify, Response
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = r'/home/nipun/Desktop/Python/Projects/02_face_recognition/IMAGE_FILES'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the uploaded image for verification
uploaded_image = None

@app.route('/upload', methods=['POST'])
def upload_file():
    global uploaded_image
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'message': 'No image selected for uploading'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        uploaded_image = face_recognition.load_image_file(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'message': 'Image successfully uploaded'}), 200
    else:
        return jsonify({'message': 'Allowed image types are -> png, jpg, jpeg, gif'}), 400

@app.route('/verify_face', methods=['GET'])
def verify_face():
    global uploaded_image
    if uploaded_image is None:
        return jsonify({'message': 'No uploaded image for verification'}), 400

    cap = cv2.VideoCapture(0)

    while True:
        success, img = cap.read()
        imgc = cv2.resize(img, (0, 0), None, 0.25, 0.25)
        imgc = cv2.cvtColor(imgc, cv2.COLOR_BGR2RGB)

        # Perform face recognition on the live video frame
        face_locations = face_recognition.face_locations(imgc)
        if len(face_locations) > 0:
            live_face_encoding = face_recognition.face_encodings(imgc, face_locations)[0]

            # Compare the live face with the uploaded image
            results = face_recognition.compare_faces([face_recognition.face_encodings(uploaded_image)[0]], live_face_encoding)

            if results[0]:
                return jsonify({'message': 'Match'}), 200
            else:
                return jsonify({'message': 'No match'}), 200

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
