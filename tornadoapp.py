import tornado.ioloop
import tornado.web
import tornado.websocket
import datetime
import msgpack

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")


class WebSocket(tornado.websocket.WebSocketHandler):
    def open(self):
        print("WebSocket opened")
        # packed = msgpack.packb([b'spam', u'egg'], use_bin_type=True)
        self.write_message("hi")

    def on_message(self, message):
        self.write_message("You said: " + message)

    def on_close(self):
        print("WebSocket closed")

    def check_origin(self, origin):
        return True


application = tornado.web.Application([
    (r"/ws/", WebSocket),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.current().start()