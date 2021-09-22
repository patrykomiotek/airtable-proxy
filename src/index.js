require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3000;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

app.use(
  '/',
  createProxyMiddleware({
    target: `https://api.airtable.com/v0/${process.env.AIRTABLE_DATABASE_ID}`,
    changeOrigin: true,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
    },
    pathRewrite: {
      '^/api' : ''
    },
    logLevel: 'debug',
  })
);

app.get('/', (_req, res) => {
  res.send('Airtable Node.js proxy is using /api/** endpoint');
})

app.listen(PORT, (error) => {
  if (error) {
    logger.error('Error: ', error);
    throw error;
  } else {
    logger.info(`Listening on port ${PORT}`);
  }
});

