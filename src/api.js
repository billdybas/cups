import express from 'express'
import knex from 'knex'

import knexfile from '../knexfile'

const db = knex(knexfile[process.env.NODE_ENV || 'development'])

const router = express.Router()

const countCups = async () => {
  const result = await db.withSchema('app')
    .from('cups')
    .count('created_at')
    .whereRaw(`EXTRACT(year FROM "created_at") = '${new Date().getFullYear()}'`)

  return Number(result[0].count)
}

router.get('/cups', async (req, res, next) => {
  const count = await countCups()

  return res.status(200).json({ count })
})

router.post('/cups.create', async (req, res, next) => {
  const secret = req.header('X-Cups-Secret')
  if (secret !== process.env.CUPS_SECRET) {
    return req.status(401).send('Unauthorized')
  }

  await db.withSchema('app')
    .from('cups')
    .insert({})

  const count = await countCups()

  return res.status(201).json({ success: true, count })
})

router.get('/*', (req, res, next) => {
  res.redirect('/')
})

export default router
