import json

from flask import Flask, render_template, jsonify
from pathlib import Path

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def main():
    path = Path(__file__).parent / 'static/data.json'
    with open(path, 'r') as file:
        data = file.read()
        data = json.loads(data)
    return render_template('main.html', data=data)
    
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
