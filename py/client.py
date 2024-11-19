import socket
import sys
import json
import os
import unittest

# Create a socket
def createSocket():
    return socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

# connect to the server
def connectToServer(sock, server_address):
    print('Connecting to {}'.format(server_address))
    try:
        sock.connect(server_address)
    except socket.error as msg:
        print(msg)
        sys.exit(1)

def loadJsonDict(file_path):
    with open(file_path) as json_file:
        return json.load(json_file)

def convertDictToJsonText(text):
    return json.dumps(text)


def sendJsonToServer(sock, json_message):
    print('Sending {}'.format(json_message))
    sock.sendall(json_message.encode())

def receiveJsonFromServer(sock):
    # It's time to receive
    sock.settimeout(2)
    responce = b''
    try:
        # Look for the response
        while True:
            # Receive data from the server 
            data = sock.recv(32)
            data_str = data.decode('utf-8')

            # If data is received, responce will be updated
            if data:
                responce += data
            else:
                break
        return responce
    # if the server does not respond within 2 seconds, a TimeoutError will be raised
    except(TimeoutError):
        print('Timeout error')

def convertResponseJsonToDict(response):
    response_json = response.decode('utf-8')
    return json.loads(response_json)

def displayResponseJson(response):
    print('Received {}'.format(response))

def remoteProcedureCall(server_address, json_path):
    sock = createSocket()

    connectToServer(sock, server_address)

    try:
        # load json message
        json_dict = loadJsonDict(json_path)
        json_message = convertDictToJsonText(json_dict)

        # Send data
        sendJsonToServer(sock, json_message)

        # Receive data
        response = receiveJsonFromServer(sock)

        # Convert response to dict
        response_dict = convertResponseJsonToDict(response)

        # Display response
        displayResponseJson(response)

    # Close the socket
    finally:
        print('Closing socket')
        sock.close()
    return response_dict

def main():
    server_address = ('tmp/socket_file')

    # get test json file path list
    test_json_files = os.listdir('test/input')
    
    for file in test_json_files:
        test_file_path = os.path.join('test/input', file)
        print('- test_json_file: {}'.format(test_file_path))
        remoteProcedureCall(server_address, test_file_path)


if __name__ == '__main__':
    main()