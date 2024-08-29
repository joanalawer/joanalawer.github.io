from flask import Flask, render_template, request, jsonify
import pickle

app = Flask(__name__)

# Load the trained model and vectorizer at startup
with open('model/spam_classifier.pkl', 'rb') as model_file:
    clf, cv = pickle.load(model_file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        message = request.form['message']
        data = [message]
        vect = cv.transform(data).toarray()
        my_prediction = clf.predict(vect)
        return render_template('result.html', prediction=my_prediction)

if __name__ == '__main__':
    app.run(debug=True)
