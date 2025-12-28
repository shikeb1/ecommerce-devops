import psycopg2
from flask import Flask, jsonify

app = Flask(__name__)

conn = psycopg2.connect(
    host="db",
    database="ecommerce",
    user="admin",
    password="admin123"
)

@app.route("/products")
def products():
    cur = conn.cursor()
    cur.execute("SELECT name FROM products")
    rows = cur.fetchall()
    return jsonify([r[0] for r in rows])

app.run(host="0.0.0.0", port=5001)
