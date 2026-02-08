from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')

#this is where html stuff goes
@app.route("/blocks")
def blocks():
    return send_from_directory(".", "blocks.html")

@app.route("/bow")
def bow():
    return send_from_directory(".", "bow.html")

@app.route("/main")
def main():
    return send_from_directory(".", "main.html")

@app.route("/enchantment")
def enchantment():
    return send_from_directory(".", "enchantment.html")

@app.route("/craft")
def craft():
    return send_from_directory(".", "craft.html")

@app.route("/pick")
def pick():
    return send_from_directory(".", "pick.html")

@app.route("/arrange")
def arrange():
    return send_from_directory(".", "arrange.html")

@app.route("/tame")
def tame():
    return send_from_directory(".", "tame.html")

@app.route("/styles.css")
def styles():
    return send_from_directory(".", "styles.css")

#this is where you make scripts available
@app.route('/block_break.js')
def block_breakJS():
    return send_from_directory('.', 'block_break.js')

@app.route('/blocks.js')
def blocksJS():
    return send_from_directory('.', 'blocks.js')

@app.route("/bow.js")
def bowJS():
    return send_from_directory(".", "bow.js")

@app.route("/tame.js")
def tameJS():
    return send_from_directory(".", "tame.js")

@app.route('/textures/<path:filename>')
def textures(filename):
    return send_from_directory('.', f'./static/textures/{filename}')
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)