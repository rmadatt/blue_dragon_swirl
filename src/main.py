from inference import run_inference
from evaluation import evaluate_model
from preprocessing import preprocess_image
from utils import load_config

def main():
    # Load configuration
    config = load_config('config.json')
    
    # Preprocess image
    image_path = config['image_path']
    image = preprocess_image(cv2.imread(image_path))
    
    # Run inference
    predictions = run_inference(image_path)
    
    # Evaluate model
    true_labels = config['true_labels']
    results = evaluate_model(predictions, true_labels)
    
    print('Evaluation Results:', results)

if __name__ == '__main__':
    main()

