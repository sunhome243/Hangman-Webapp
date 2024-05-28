FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py /app/
COPY index.html /app/ 
COPY style.css /app/
COPY script4.js /app/
COPY player_data.json /app/

EXPOSE 5400

CMD ["flask", "run", "--host=0.0.0.0", "--port=5200"]