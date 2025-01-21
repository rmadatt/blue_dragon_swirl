from tensorflow.keras.models import load_model as keras_load_model

def load_model(model_path):
    model = keras_load_model(model_path)
    return model

def build_model(input_shape):
    # Define your model architecture here
    pass

# Example usage:
# model = build_model(input_shape=(224, 224, 3))
# model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

