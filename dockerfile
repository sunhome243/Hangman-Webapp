FROM python:3.9-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy application files
COPY app.py /app/
COPY index.html /app/ 
COPY style.css /app/
COPY script4.js /app/
COPY player_data.json /app/

# Expose the port your Flask app listens on
EXPOSE 5200

# Mount the Persistent Disk
VOLUME ["/data"]
RUN mkdir /data
COPY player_data.json /data/player_data.json 

# Run the Flask app using 'flask run'
CMD ["flask", "run", "--host=0.0.0.0", "--port=5200"]