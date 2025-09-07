FROM python:3.9-slim

WORKDIR /app

# copy only required files first (cache pip layer)
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

CMD ["python", "app.py"]
