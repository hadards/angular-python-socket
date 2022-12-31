from flask import Flask, request
from flask_socketio import SocketIO

app = Flask(__name__)

socketioWithClient = SocketIO(app, cors_allowed_origins="*")

flask_with_client_host = 'localhost'
flask_with_client_port = 3010


@app.route('/')
def home():
    return 'python server works!'


@app.route('/send/', methods=['GET'])
def send():
    socketioWithClient.emit('new-message', {'msg': 'hello from server'})
    return '200'


@socketioWithClient.on('connect')
def on_socket_connect():
    print('socket connected with client');
    socketioWithClient.emit('connected', {'msg': 'connected'})


@socketioWithClient.on('disconnect')
def disconnected():
    print('socket disconnected from client')


@socketioWithClient.on('message')
def handle_message(json):
    msg = str(json)
    print('received message: ' + str(json))
    socketioWithClient.emit('new-message', {'data': 'Server received your message!'+msg})



if __name__ == '__main__':
    print("python flask server is up and running on port "+str(flask_with_client_port))
    try:
        #app.run(host=flask_with_client_host, port=flask_with_client_port)
        socketioWithClient.run(app, host=flask_with_client_host, port=flask_with_client_port, debug=False)
    except Exception as err:
        print(err)
        print("failed")
