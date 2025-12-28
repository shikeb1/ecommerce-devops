FROM python:3.11-slim
WORKDIR  /app
copy . .
RUN pip install flask psycopg2-binary
EXPOSE 5001
CMD ["python","app.py"]
