import express from 'express';
import { render } from '@jaredpalmer/after';
import axios from 'axios';

import Document from './Document';

import routes from './routes';
import api from './api';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use('/api', api)
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        document: Document,
      });
      res.send(html);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(error);
      }
      res.send('Something went wrong.');
    }
  })
  .use('/*', (req, res, next) => {
    res.redirect('/');
  });

export default server;
