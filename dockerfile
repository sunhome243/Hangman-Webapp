FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt  # Remove --no-cache-dir

COPY app.py /app/
COPY index.html /app/
COPY style.css /app/
COPY script4.js /app/

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]