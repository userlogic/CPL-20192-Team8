const express = require('express')

const { Customer } = require('../models/Customer')
const { Guide } = require('../models/Guide')

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

router.post('/guide', async(req, res) => {
  const newGuideRaw = req.body
  
  const newGuide = {
    'first_name': newGuideRaw['firstName'],
    'last_name': newGuideRaw['lastName'],
    'email': newGuideRaw['email'],
    'password': newGuideRaw['password'],
    'picture_path': newGuideRaw['picture_path'],
    'age': newGuideRaw['age'],
    'sex': newGuideRaw['sex'],
  }
  console.log(newGude);
  const guide = await Guide.query()
                            .insert(newGuide)
                            
  res.send(guide)
})

router.get('/guide', async(req, res) => {
  const guides = await Guide.query()
  res.json(guides)
})

module.exports = router;