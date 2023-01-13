const amqp = require('amqplib/callback_api');

class QueueHandler {
  constructor() {
  }
  vhost = 'vjibybay';
  password = 'nFjJmsci4nMvVBdTqu-e6_YE9hmHUA8z';
  port = 5672;
  url = 'amqps://vjibybay:nFjJmsci4nMvVBdTqu-e6_YE9hmHUA8z@cow.rmq2.cloudamqp.com/vjibybay';

  sendMessage(queue, message) {
    
    amqp.connect(this.url, (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }
        channel.assertQueue(queue, {
          durable: false
        });

        channel.sendToQueue(queue, Buffer.from(message));

        console.log(" [x] Sent %s", message);
      });
      setTimeout(() => {
        connection.close();
      }, 500);
    });
  }

  receiveMessages(queue,callback) {
    amqp.connect(this.url, (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        channel.assertQueue(queue, {
          durable: false
        });

        console.log(' [x] Waiting for messages. To exit press CTRL+C');

        channel.consume(queue, (msg) => {
          console.log(" [x] Received %s", msg.content.toString());
          if(callback)callback(msg.content.toString());
        }, {
          noAck: true
        });
      });
    });
  }
}

module.exports = QueueHandler;