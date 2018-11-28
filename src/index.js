const express = require('express')
const knex = require('knex')

const PORT = process.env.PORT || 3000

const app = express()

app.use('/', (req, res, next) => {
  res.json({ hello: 'world' })
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
