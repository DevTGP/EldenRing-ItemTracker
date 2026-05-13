import json
from pathlib import Path

from flask import Flask, render_template, redirect, url_for

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def main():
    path = Path(__file__).parent / 'static/data.json'
    with open(path, 'r') as file:
        data = file.read()
        data = json.loads(data)
    return render_template('main.html', data=data)
    
@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for("main"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
