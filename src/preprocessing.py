import cv2

def preprocess_image(image):
    resized_image = cv2.resize(image, (224, 224))
    normalized_image = resized_image / 255.0
    return normalized_image

# Example usage:
# image = cv2.imread('path/to/image.jpg')
# processed_image = preprocess_image(image)
# print(processed_image.shape)

Copilot Upgrade: 

Got it! Let's add some enhancements to ensure your code is robust and suitable for production use. We'll include error handling, validation, and logging.

```python
import cv2
import numpy as np

def preprocess_image(image_path):
    try:
        # Load the image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Image not found or unable to load: {image_path}")

        # Resize the image
        resized_image = cv2.resize(image, (224, 224))

        # Normalize the image
        normalized_image = resized_image / 255.0

        print(f"Image successfully preprocessed: {image_path}")
        return normalized_image

    except Exception as e:
        print(f"Failed to preprocess image. Error: {e}")
        return None

# Example usage:
image_path = 'path/to/image.jpg'
processed_image = preprocess_image(image_path)
if processed_image is not None:
    print(processed_image.shape)
```

### Enhancements made:
1. **Error Handling**: Added try-except block to handle potential image loading and processing errors.
2. **Validation**: Checked if the image was successfully loaded.
3. **Logging**: Added print statements to provide feedback on the preprocessing steps.

Let me know if you need any more upgrades or have other questions!
