#!/usr/bin/env python3
"""Chat server"""

import argparse
import logging
import socket
import threading
import os

import colorama
from colorama import Fore, Back, Style

ENCODING = 'utf-8'
log_level = logging.INFO

# if args.debug:
#     log_level = logging.DEBUG
logging.basicConfig(format="[%(asctime)s]  %(levelname)s - %(message)s", datefmt="%Y-%m-%d %H:%M:%S", level=log_level)
colorama.init()

# parse command line arguments
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('-p', '--port', required=True, help="Specify port number")

args = parser.parse_args()
PORT = int(args.port)


class ServerNode:
    def __init__(self):
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        ip_port = ('0.0.0.0', PORT)
        self.socket.bind(ip_port)
        self.socket.listen(1)
        logging.info(f"{Fore.GREEN}Started listening on {ip_port[0]}:{ip_port[1]}{Style.RESET_ALL}")
        self.connection, self.address = self.socket.accept()
        logging.info(f"{Fore.GREEN}New connection from {self.address}{Style.RESET_ALL}")

    

    def receive_msg(self):
        while True:
            data = self.connection.recv(4096).decode(ENCODING)
            if not data:
                self.socket.close()
                logging.info(f"{Fore.RED}Connection '{self.address[0]}:{self.address[1]}' Closed.{Style.RESET_ALL}")
                os._exit(0)
            print(f"{Fore.CYAN}{self.address[0]}:{self.address[1]}: {Fore.YELLOW}{data}")

            host = data.split("\n")[1].split(" ")[1]
            print('HOST',host)
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect(( "example.com", 80))
            # f"{host.strip()}"
            print("replaced: ", data.replace("CONNECT", "GET"))
            s.sendall(data.replace("CONNECT", "GET").encode(ENCODING))
            self.connection.sendall(s.recv(4096))

    def main(self):
        while True:
            message = input()
            if message == "exit()":
                logging.info(f"{Fore.RED}Terminating{Style.RESET_ALL}")
                os._exit(0)
            else:
                self.send_msg(message)


server = ServerNode()

# always_receive = threading.Thread(target=server.receive_msg)
# always_receive.daemon = True
# always_receive.start()
# server.main()

server.receive_msg()
# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# s.connect(("example.com", 443))
# s.sendall("GET / HTTP/1.1\r\nHost: example.com\r\nUser-Agent: curl/7.77.0\r\nAccept: */*\r\nProxy-Connection: Keep-Alive\r\n\r\n".encode(ENCODING))
#
# print(s.recv(4096).decode(ENCODING))
