import app from './app';
import dotenv from 'dotenv';
dotenv.config();



const port = process.env.PORT || 5000;
 app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});


