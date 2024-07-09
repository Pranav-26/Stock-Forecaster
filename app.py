import numpy as np
import pandas as pd
from datetime import date
import yfinance as yf
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS from flask_cors module

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes in the Flask app

start = '2006-01-01'
end = date.today().strftime("%Y-%m-%d")

@app.route('/stock_forecaster', methods=['GET'])
def stock_forecaster():
    stock = request.args.get('stock', default='AAPL')
    future_days = int(request.args.get('future_days', default=5))
    
    df = load_data(stock)
    if df.empty:
        return jsonify({"error": "Enter a valid stock"})

    model = load_model('keras_model1.h5')

    # Preprocess data
    scaler = MinMaxScaler(feature_range=(0, 1))
    data_training = df['Close'][:int(len(df) * 0.70)].values.reshape(-1, 1)
    scaler.fit(data_training)
    data_scaled = scaler.transform(df['Close'].values.reshape(-1, 1))

    # Initialize the input data with the last 100 days of known data
    m = data_scaled[-100:].reshape(-1, 1)

    # List to store predicted prices
    z = []

    # Iterate for each future day
    for i in range(future_days):
        # Predict the next day's price
        pred = model.predict(m.reshape(1, -1, 1))
        z.append(pred[0][0])
        # Update m to include the predicted price for the next iteration
        m = np.append(m, pred).reshape(-1, 1)

    # Inverse transform the predicted prices to their original scale
    future_prices = scaler.inverse_transform(np.array(z).reshape(-1, 1))

    # Create a date range
    future_dates = pd.date_range(start=end, periods=future_days)
    
    # Create a DataFrame for the predicted future prices
    future_prices_df = pd.DataFrame(data=future_prices, index=future_dates, columns=['Predicted Price'])

    # Convert Timestamp index to string
    future_prices_df.index = future_prices_df.index.astype(str)

    # Convert DataFrame to dictionary
    future_prices_dict = future_prices_df.to_dict()

    # Convert Timestamp keys to strings in the dictionary
    future_prices_dict = {str(key): value for key, value in future_prices_dict['Predicted Price'].items()}

    response_data = {"predicted_future_prices": future_prices_dict}
    return jsonify(response_data)

def load_data(stock):
    df = yf.download(stock, start, end)
    df.reset_index(inplace=True)
    return df

if __name__ == '__main__':
    app.run(debug=True)
