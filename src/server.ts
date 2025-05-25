import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from 'http';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.uri as string);
    console.log('db connected');
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });

    // handle unhandled rejections
    process.on('unhandledRejection', (err) => {
      console.error('Unhandled rejection is detected:', err);
      if (server) {
        server.close(() => {
          console.error('Server closed due to unhandled rejection');
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
    // handle uncaught exceptions
    process.on('uncaughtException', (err) => {
      console.error('Uncaught exception is detected:', err);
      if (server) {
        server.close(() => {
          console.error('Server closed due to uncaught exception');
          process.exit(1);
        });
      } else {
        process.exit(1);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
main();
