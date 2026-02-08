from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/block_break.js')
def block_break():
    return send_from_directory('.', './static/block_break.js')

@app.route('/blocks.js')
def blocks():
    return send_from_directory('.', './static/blocks.js')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)