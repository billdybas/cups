import express from 'express'
import { render } from '@jaredpalmer/after'
import axios from 'axios'

import Document from './Document'

import routes from './routes'
import api from './api'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()
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
        axios,
        API_URL: process.env.API_URL
      })
      res.send(html)
    } catch (error) {
      res.json(error)
    }
  })

export default server
