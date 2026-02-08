from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

#this is where html stuff goes
@app.route("/blocks")
def blocks():
    return send_from_directory(".", "static/blocks.html")

@app.route("/bow")
def bow():
    return send_from_directory(".", "static/bow.html")

#this is where you make scripts available
@app.route('/block_break.js')
def block_breakJS():
    return send_from_directory('.', './static/block_break.js')

@app.route('/blocks.js')
def blocksJS():
    return send_from_directory('.', './static/blocks.js')

@app.route("/bow.js")
def bowJS():
    return send_from_directory(".", "./static/bow.js")

@app.route('/textures/<path:filename>')
def textures(filename):
    return send_from_directory('.', f'./static/textures/{filename}')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)