import pandas as pd
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Load and preprocess data
df = pd.read_csv("spam.csv", encoding="latin-1")
df.drop(['Unnamed: 2', 'Unnamed: 3', 'Unnamed: 4'], axis=1, inplace=True)
df['label'] = df['class'].map({'ham': 0, 'spam': 1})
X = df['message']
y = df['label']

# Feature extraction
cv = CountVectorizer()
X = cv.fit_transform(X)

# Train the model
clf = MultinomialNB()
clf.fit(X, y)

# Save the model and vectorizer
with open('model/spam_classifier.pkl', 'wb') as model_file:
    pickle.dump((clf, cv), model_file)

print("Model and vectorizer saved successfully.")