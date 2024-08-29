from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/document', method=['POST','GET'])
def document():
    return render_template('document.html')

    if __name__  == '__main__':
        app.debug = True
        app.run()