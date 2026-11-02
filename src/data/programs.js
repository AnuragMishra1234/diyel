export const programs = [
  {
    id: 1,
    number: "01",
    title: "Word Embeddings Using Word2Vec",
    language: "Python",
    tags: ["NLP", "Word2Vec", "Gensim", "Embeddings"],
    description: "Trains a Word2Vec continuous vector space model on sample text corpus to extract semantic word representations and measure word similarity.",
    code: `from gensim.models import Word2Vec

# Sample document corpus
corpus = [
    ["machine", "learning", "is", "fun"],
    ["deep", "learning", "uses", "neural", "networks"],
    ["deep", "learning"]
]

# Train Word2Vec model
model = Word2Vec(
    sentences=corpus,
    vector_size=50,
    window=2,
    min_count=1,
    workers=1
)

# Print embedding vector
print("Embedding for 'learning':")
print(model.wv["learning"])

# Find similar words
print("\\nWords similar to 'learning':")
print(model.wv.most_similar("learning"))`
  },
  {
    id: 2,
    number: "02",
    title: "Deep Neural Network Classification",
    language: "Python",
    tags: ["Dense Network", "Classification", "Iris Dataset", "TensorFlow"],
    description: "Builds a multilayer perceptron (MLP) deep neural network with ReLU and Softmax activations to classify Iris flower species.",
    code: `import numpy as np
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Load Iris dataset
iris = load_iris()
X = iris.data
y = iris.target

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Standardize features
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Build Deep Neural Network
model = Sequential([
    Dense(16, activation='relu', input_shape=(4,)),
    Dense(12, activation='relu'),
    Dense(8, activation='relu'),
    Dense(3, activation='softmax')
])

# Compile model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Display model summary
model.summary()

# Train model
model.fit(X_train, y_train, epochs=50, batch_size=8, verbose=1)

# Evaluate model
loss, accuracy = model.evaluate(X_test, y_test, verbose=0)
print(f"\\nTest Accuracy: {accuracy * 100:.2f}%")

# Predict test data
predictions = model.predict(X_test)
predicted_classes = np.argmax(predictions, axis=1)

print("\\nPredicted Classes:", predicted_classes)
print("Actual Classes :", y_test)`
  },
  {
    id: 3,
    number: "03",
    title: "Convolutional Neural Network (CNN)",
    language: "Python",
    tags: ["CNN", "MNIST", "Computer Vision", "Conv2D"],
    description: "Implements a 2D Convolutional Neural Network with max pooling and dropout layers to recognize handwritten digits from the MNIST dataset.",
    code: `import numpy as np
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

# Load MNIST dataset
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# Reshape and normalize images
x_train = x_train.reshape((-1, 28, 28, 1)).astype('float32') / 255.0
x_test = x_test.reshape((-1, 28, 28, 1)).astype('float32') / 255.0

# One-hot encode labels
y_train = to_categorical(y_train, 10)
y_test = to_categorical(y_test, 10)

# Build CNN model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    MaxPooling2D((2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D((2, 2)),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])

# Compile model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train model
model.fit(x_train, y_train, epochs=10, batch_size=64, verbose=1)

# Evaluate model
loss, acc = model.evaluate(x_test, y_test, verbose=0)
print(f"Test Accuracy: {acc * 100:.2f}%")

# Predict first 10 samples
predictions = model.predict(x_test[:10])

print("Predicted classes:", np.argmax(predictions, axis=1))
print("Actual classes:", np.argmax(y_test[:10], axis=1))`
  },
  {
    id: 4,
    number: "04",
    title: "Image Compression Using Autoencoder",
    language: "Python",
    tags: ["Autoencoder", "Unsupervised", "Image Compression", "Matplotlib"],
    description: "Constructs an encoder-decoder neural network architecture to compress 784-dimensional digit images down to a 32-dimensional latent representation and reconstruct them.",
    code: `import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras import layers, Model

# Load dataset
(x_train, _), (x_test, _) = tf.keras.datasets.mnist.load_data()

# Normalize and flatten
x_train = x_train.astype("float32") / 255
x_test = x_test.astype("float32") / 255

x_train = x_train.reshape(-1, 784)
x_test = x_test.reshape(-1, 784)

# Input layer
input_img = layers.Input(shape=(784,))

# Encoder
encoded = layers.Dense(32, activation="relu")(input_img)

# Decoder
decoded = layers.Dense(784, activation="sigmoid")(encoded)

# Autoencoder model
model = Model(input_img, decoded)

# Compile model
model.compile(optimizer="adam", loss="binary_crossentropy")

# Train model
model.fit(x_train, x_train, epochs=5, batch_size=256)

# Encoder model
encoder = Model(input_img, encoded)

# Compressed images
encoded_imgs = encoder.predict(x_test)

# Reconstructed images
decoded_imgs = model.predict(x_test)

# Display original and reconstructed images
n = 5
plt.figure(figsize=(10, 4))

for i in range(n):
    # Original image
    ax = plt.subplot(2, n, i + 1)
    plt.imshow(x_test[i].reshape(28, 28), cmap='gray')
    plt.title("Original")
    plt.axis('off')

    # Reconstructed image
    ax = plt.subplot(2, n, i + 1 + n)
    plt.imshow(decoded_imgs[i].reshape(28, 28), cmap='gray')
    plt.title("Reconstructed")
    plt.axis('off')

plt.show()

# Display sizes
print("Original size:", x_test.shape)
print("Compressed size:", encoded_imgs.shape)`
  },
  {
    id: 5,
    number: "05",
    title: "Text Document Classification",
    language: "Python",
    tags: ["NLP", "Embedding", "IMDB Dataset", "Binary Classification"],
    description: "Uses embedding layers and global average pooling on the IMDB movie reviews benchmark to classify textual sentiment as positive or negative.",
    code: `import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Embedding, GlobalAveragePooling1D, Dense

# Load IMDB dataset
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.imdb.load_data(
    num_words=10000
)

# Pad reviews to equal length
x_train = tf.keras.preprocessing.sequence.pad_sequences(
    x_train, maxlen=200
)

x_test = tf.keras.preprocessing.sequence.pad_sequences(
    x_test, maxlen=200
)

# Create deep learning model
model = Sequential([
    Embedding(10000, 32),
    GlobalAveragePooling1D(),
    Dense(64, activation='relu'),
    Dense(1, activation='sigmoid')
])

# Compile model
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Train model
model.fit(
    x_train,
    y_train,
    epochs=5,
    batch_size=32,
    validation_split=0.2
)

# Test model
loss, accuracy = model.evaluate(x_test, y_test)
print("Test Accuracy:", accuracy)

# Predict first 5 reviews
predictions = model.predict(x_test[:5])

print("\\nReview Classification:")

for i in range(5):
    if predictions[i][0] >= 0.5:
        result = "Positive"
    else:
        result = "Negative"

    print("Review", i + 1, ":", result)
    print("Probability:", predictions[i][0])`
  },
  {
    id: 6,
    number: "06",
    title: "Time Series Forecasting Using LSTM",
    language: "Python",
    tags: ["LSTM", "RNN", "Time Series", "MinMaxScaler", "Forecasting"],
    description: "Prepares sequential sliding window windows and trains a Long Short-Term Memory (LSTM) recurrent neural network for continuous time-series forecasting.",
    code: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

# Generate synthetic time series data
time = np.arange(0, 200, 0.1)
data = np.sin(time) + 0.1 * np.random.randn(len(time))

plt.plot(time, data)
plt.title("Synthetic Time Series Data")
plt.show()

# Normalize data
scaler = MinMaxScaler(feature_range=(0, 1))
data_scaled = scaler.fit_transform(data.reshape(-1, 1))

# Create sequences
def create_sequences(dataset, seq_length):
    X, y = [], []

    for i in range(len(dataset) - seq_length):
        X.append(dataset[i:i + seq_length, 0])
        y.append(dataset[i + seq_length, 0])

    return np.array(X), np.array(y)

SEQ_LEN = 20
X, y = create_sequences(data_scaled, SEQ_LEN)

# Reshape for LSTM
X = X.reshape((X.shape[0], X.shape[1], 1))

# Train-test split
split = int(len(X) * 0.8)
X_train, X_test = X[:split], X[split:]
y_train, y_test = y[:split], y[split:]

# Build LSTM model
model = Sequential([
    LSTM(50, activation='relu', input_shape=(SEQ_LEN, 1)),
    Dense(1)
])

model.compile(optimizer='adam', loss='mse')

# Train model
history = model.fit(
    X_train,
    y_train,
    epochs=10,
    batch_size=32,
    validation_data=(X_test, y_test),
    verbose=1
)

# Plot training loss
plt.plot(history.history['loss'], label='Train Loss')
plt.plot(history.history['val_loss'], label='Validation Loss')
plt.legend()
plt.show()

# Forecast
predictions = model.predict(X_test)
predictions = scaler.inverse_transform(predictions.reshape(-1, 1))
y_test_actual = scaler.inverse_transform(y_test.reshape(-1, 1))

# Plot predictions vs actual
plt.plot(y_test_actual, label='Actual')
plt.plot(predictions, label='Predicted')
plt.legend()
plt.show()`
  },
  {
    id: 7,
    number: "07",
    title: "Image Classification Using MobileNetV2",
    language: "Python",
    tags: ["Transfer Learning", "MobileNetV2", "CIFAR-10", "Pretrained"],
    description: "Applies transfer learning with a pre-trained MobileNetV2 backbone (frozen ImageNet weights) to classify 10 object classes in the CIFAR-10 dataset.",
    code: `import tensorflow as tf
import matplotlib.pyplot as plt
import numpy as np

# Load CIFAR-10 dataset
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.cifar10.load_data()

# Convert labels to 1D
y_train = y_train.flatten()
y_test = y_test.flatten()

# Resize images
x_train = tf.image.resize(x_train, (96, 96))
x_test = tf.image.resize(x_test, (96, 96))

# Load pre-trained MobileNetV2
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(96, 96, 3),
    include_top=False,
    weights="imagenet"
)

# Freeze pre-trained layers
base_model.trainable = False

# Create model
model = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dense(64, activation="relu"),
    tf.keras.layers.Dense(10, activation="softmax")
])

# Compile model
model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

# Train model
history = model.fit(
    x_train,
    y_train,
    epochs=5,
    batch_size=32,
    validation_split=0.2
)

# Test model
loss, accuracy = model.evaluate(x_test, y_test)
print("Test Accuracy:", accuracy * 100, "%")

# Predict one image
prediction = model.predict(x_test[:1])

classes = [
    "airplane", "automobile", "bird", "cat", "deer",
    "dog", "frog", "horse", "ship", "truck"
]

predicted_class = np.argmax(prediction)

print("Actual:", classes[y_test[0]])
print("Predicted:", classes[predicted_class])

# Print training and validation accuracy
train_accuracy = history.history["accuracy"][-1]
val_accuracy = history.history["val_accuracy"][-1]

print("Training Accuracy:", train_accuracy * 100, "%")
print("Validation Accuracy:", val_accuracy * 100, "%")

# Test accuracy
loss, test_accuracy = model.evaluate(x_test, y_test, verbose=0)
print("Test Accuracy:", test_accuracy * 100, "%")

# Accuracy graph
plt.figure(figsize=(8, 5))

plt.plot(history.history["accuracy"], label="Training Accuracy")
plt.plot(history.history["val_accuracy"], label="Validation Accuracy")

plt.xlabel("Epoch")
plt.ylabel("Accuracy")
plt.title("Training and Validation Accuracy")
plt.legend()
plt.grid()
plt.show()`
  },
  {
    id: 8,
    number: "08",
    title: "Sentiment Analysis Using TF-IDF",
    language: "Python",
    tags: ["Scikit-Learn", "TF-IDF", "Logistic Regression", "Sentiment"],
    description: "Vectorizes customer and movie reviews with Term Frequency-Inverse Document Frequency (TF-IDF) and trains a Logistic Regression classifier for polarity detection.",
    code: `from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Dataset
reviews = [
    "I loved this movie, it was fantastic",
    "The product is excellent and very useful",
    "Amazing experience, I really enjoyed it",
    "The service was wonderful",
    "Very happy with my purchase",
    "This product is terrible",
    "I hated this movie",
    "Very disappointing experience",
    "The product broke after one day",
    "Poor quality and bad service"
]

# Labels: 1 = Positive, 0 = Negative
labels = [
    1, 1, 1, 1, 1,
    0, 0, 0, 0, 0
]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    reviews,
    labels,
    test_size=0.2,
    random_state=42,
    stratify=labels
)

# Convert text into TF-IDF features
vectorizer = TfidfVectorizer()
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Train model
model = LogisticRegression()
model.fit(X_train_tfidf, y_train)

# Predict test data
y_pred = model.predict(X_test_tfidf)

# Test new reviews
new_reviews = [
    "The movie was amazing and I loved it",
    "The product was awful and disappointing",
    "I am very happy with this purchase"
]

new_reviews_tfidf = vectorizer.transform(new_reviews)
predictions = model.predict(new_reviews_tfidf)

# Display results
for review, prediction in zip(new_reviews, predictions):
    sentiment = "Positive" if prediction == 1 else "Negative"

    print("\\nReview:", review)
    print("Sentiment:", sentiment)`
  }
];
