import cv2
from models import load_model

def run_inference(image_path):
    model = load_model('path/to/model')
    image = cv2.imread(image_path)
    processed_image = preprocess_image(image)
    predictions = model.predict(processed_image)
    return predictions

# Example usage:
# result = run_inference('path/to/image.jpg')
# print(result)

