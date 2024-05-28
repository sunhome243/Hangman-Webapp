FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py /app/
COPY index.html /app/
COPY style.css /app/
COPY script4.js /app/  
EXPOSE 5200

CMD ["python", "app.py"]