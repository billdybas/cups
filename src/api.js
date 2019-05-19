import express from 'express'
import knex from 'knex'
import cors from 'cors';

import knexfile from '../knexfile'

const db = knex(knexfile[process.env.NODE_ENV || 'development'])

const router = express.Router()

router.use(cors());
// Accept 'application/json' request bodies
router.use(express.json({ limit: '5mb' }))
// Accept 'application/x-www-form-urlencoded' request bodies
router.use(express.urlencoded({ extended: true, limit: '5mb' }))

const countCups = async (name) => {
  const builder =
    db.withSchema('app')
      .from('cups')
      .count('cups.id')
      .whereRaw(`EXTRACT(year FROM "cups"."created_at") = '${new Date().getFullYear()}'`)

  if (name) {
    builder
      .innerJoin('drinks', 'cups.drink_id', 'drinks.id')
      .where('drinks.name', name)
  }

  const result = await builder
  return Number(result[0].count)
}

const authorize = (req, res, next) => {
  const secret = req.header('X-Cups-Secret')
  if (secret !== process.env.CUPS_SECRET) {
    res.status(401).send('Unauthorized')
    return
  }
  next()
}

router.get('/cups', async (req, res, next) => {
  const count = await countCups()

  res.status(200).json({ count })
  return
})

router.get('/cups.filter', async (req, res, next) => {
  const { drink } = req.query

  if (!drink) {
    res.status(400).send('Missing Drink')
    return
  }

  const count = await countCups(drink)

  res.status(200).json({ count })
  return
})

router.get('/drinks', async (req, res, next) => {
  const rows = await db.withSchema('app')
    .from('drinks')
    .select('name')
  const drinks = rows.map((row) => row.name)

  res.status(200).json({ drinks })
  return
})

router.post('/cups.create', authorize, async (req, res, next) => {
  const { drink } = req.body

  if (!drink) {
    res.status(400).send('Missing Drink')
    return
  }

  db.transaction((trx) =>
    trx.withSchema('app')
      .from('drinks')
      .where('name', drink)
      .then((rows) => {
        // Create a drink if one doesn't exist
        if (rows.length === 0) {
          return trx
            .withSchema('app')
            .insert({ name: drink })
            .into('drinks')
            .returning('*')
        }
        return rows
      })
      .then((rows) => trx // Create a new cup for that drink
        .withSchema('app')
        .insert({ drink_id: rows[0].id })
        .into('cups'))
  ).then(async () => {
    const count = await countCups()

    res.status(201).json({ success: true, count })
    return
  }).catch((e) => {
    res.status(500).end()
  })
})

router.post('/drinks.create', authorize, async (req, res, next) => {
  const { drink } = req.body

  if (!drink) {
    res.status(400).send('Missing Drink')
    return
  }

  db.transaction((trx) =>
    trx.withSchema('app')
      .from('drinks')
      .where('name', drink)
      .then((rows) => {
        // Create a drink if one doesn't exist
        if (rows.length === 0) {
          return trx
            .withSchema('app')
            .insert({ name: drink })
            .into('drinks')
            .returning('*')
        }
        return rows
      })
      .then(rows => rows[0])
  ).then(async (row) => {
    delete row.id

    res.status(201).json({ success: true, drink: row })
    return
  }).catch((e) => {
    res.status(500).end()
  })
})

router.get('/*', (req, res, next) => {
  res.redirect('/')
})

export default router
