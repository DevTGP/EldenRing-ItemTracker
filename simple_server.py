import json

from flask import Flask, render_template, jsonify
from pathlib import Path

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def main():
    path = Path(__file__).parent / '..\\EldenRing-ItemTracker\\static\\data.json'
    with open(path, 'r') as file:
        data = file.read()
        data = json.loads(data)
    return render_template('main.html', data=data)


# ssl_context = ('/etc/ssl/unstoppable-empire_com/unstoppable-empire_com.crt',
# '/etc/ssl/unstoppable-empire_com/unstoppable-empire_com.key') app.run(debug=True, host='localhost', port=4321,
# ssl_context=ssl_context)
app.run(debug=True, port=4321, host='0.0.0.0', threaded=True)
