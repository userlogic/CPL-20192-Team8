const express = require('express')

const { Customer } = require('../models/Customer')

const router = express.Router()

router.post('/', async (req, res) => {
  const credentials = req.body

  const customer = await Customer.query()
    .where('email', '=', credentials['email'])
    .where('password', '=', credentials['password'])
    .first()
  console.log(customer);
  if (customer)
    res.send({ 'success': 1 ,
               'customer_id': customer['customer_id']})
  else
    res.send({ 'success': 0 })
})

router.get('/', async (req, res) => {
  const customers = await Customer.query()
  res.json(customers)
})

module.exports = router;