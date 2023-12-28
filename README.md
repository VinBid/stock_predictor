# Stock Predictor

This project predicts the stock price of a stock using an XGBoost training model and Machine Learning. I utilized a Django Backend and a React Frontend. In the backend I call the Yahoo Finance API and run a script on the historical information of a stock. The user enters the date they want to predict from and the model utilizes all dates before the date to train the machine learning model. Then it uses all elements after as a testing set to compare values of the model and the actual result. These results are compared and a percentage accuracy is calculated.

In the frontend the user puts information like the stock ticker they want to predict and the date they want to predict from (YYYY-MM-DD). The model then is called in the backend with this information from the frontend and a prediction is made.

Testing is utilizing Postman.

Backend Link : https://github.com/VinBid/Stock_Predictor_Backend_Django_React
