const express = require('express')

const { Customer } = require('../models/Customer')

const router = express.Router()

router.post('/', async (req, res) => {
    const newCustomerRaw = req.body

    const newCustomer = {
      'first_name': newCustomerRaw['firstName'],
      'last_name': newCustomerRaw['lastName'],
      'email': newCustomerRaw['email'],
      'password': newCustomerRaw['password']
    }
    console.log(newCustomer);
    const customer = await Customer.query()
                           .insert(newCustomer)
  
    res.send(customer)
  })

  router.get('/', async (req, res) => {
    const customers = await Customer.query()
    res.json(customers)
  })

module.exports = router;