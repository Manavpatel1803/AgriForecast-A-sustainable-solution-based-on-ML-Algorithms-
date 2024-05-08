from flask import Flask,request, render_template,jsonify
from flask_cors import CORS
import numpy as np
import pickle
import joblib
import sklearn
import firebase_admin
from firebase_admin import credentials,db,auth,firestore
from sklearn.tree import DecisionTreeRegressor
print(sklearn.__version__)

import pickle
#loading models
dtr = pickle.load(open('dtr.pkl ','rb'))
preprocessor = pickle.load(open('preprocessor.pkl','rb'))

crop_recommendation=pickle.load(open('RandomForest.pkl','rb'))

#flask app
app = Flask(__name__,static_url_path='/static')
CORS(app, origins=['http://localhost:3000'])


cred = credentials.Certificate("firebase-admin-key.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://fir-auth-5d8c9-default-rtdb.firebaseio.com/'
})
db=firestore.client()

@app.route("/register", methods=['POST'])
def register():
    data = request.json
    if request.method == 'POST':
        # Extract user data from the request
        email = data.get('email')
        password = data.get('password')
        # You may want to add more validation and error handling here

        # Create a new user account with email and password
        user = auth.create_user(email=email, password=password)
        
        # Store additional user data in Firestore
        users_ref = db.reference('/users')
        users_ref.child(user.uid).set({
            'email': email,
            'uid': user.uid
            # Add more user data fields as needed
        })

        return jsonify({'message': 'User registered successfully'})

@app.route('/')
def index():
    return ''
@app.route("/predict",methods=['POST'])
def predict():
    data=request.json
    if request.method == 'POST':
        Year = data.get('Year')
        average_rain_fall_mm_per_year = data.get('average_rain_fall_mm_per_year')
        pesticides_tonnes = data.get('pesticides_tonnes')
        avg_temp = data.get('avg_temp')
        Area = data.get('Area')
        Item = data.get('Item')
        user_id = data.get('user_id')
    
        features = np.array([[Year, average_rain_fall_mm_per_year, pesticides_tonnes, avg_temp, Area, Item]], dtype=object)
        transformed_features = preprocessor.transform(features)
        prediction = dtr.predict(transformed_features).reshape(1, -1)

        save_data_to_firestore(user_id,data, prediction, 'predictions')

        

        return jsonify({'prediction': prediction.tolist()})

@app.route("/recommend",methods=['POST'])

def recommend():
    data=request.json
    if request.method=="POST":
        N = data.get('Nitrogen')
        P = data.get('Phosphorus')
        K = data.get('Potassium')
        temperature = data.get('Temperature')
        humidity = data.get('Humidity')
        ph = data.get('ph')
        rainfall = data.get('Rainfall')
        user_id = data.get('user_id')
        prediction = crop_recommendation.predict([[N,P,K,temperature,humidity,ph,rainfall]])
        
        save_data_to_firestore(user_id,data, prediction, 'recommendations')
    
        return jsonify({'prediction': prediction.tolist()})

def save_data_to_firestore(user_id,data, prediction, collection):
    # Convert prediction numpy array to list
    prediction_list = prediction.flatten().tolist()

    # Create a new document in the specified collection
    doc_ref = db.collection(collection).document()

    # Store data and prediction in the document
    doc_ref.set({
        'user_id': user_id,
        'data': data,
        'prediction': prediction_list
    })

print("Server started")



if __name__=="__main__":
    app.run(debug=True)
