const express = require("express");

const { Customer } = require("../models/Customer");
const { Guide } = require("../models/Guide");

const router = express.Router();

router.post("/", async (req, res) => {
  const credentials = req.body;

  const customer = await Customer.query()
    .where("email", "=", credentials["email"])
    .where("password", "=", credentials["password"])
    .first();
  console.log(customer);
  if (customer)
    res.send({
      success: 1,
      user_id: customer["customer_id"],
      user_type: "tourist",
      first_name: customer["first_name"]
    });
  else res.send({ success: 0 });
});

router.get("/", async (req, res) => {
  const customers = await Customer.query();
  res.json(customers);
});

router.post("/guide", async (req, res) => {
  const credentials = req.body;

  // console.log(credentials);

  const guide = await Guide.query()
    .where("email", "=", credentials["email"])
    .where("password", "=", credentials["password"])
    .first();
  console.log(guide);
  if (guide)
    res.send({
      success: 1,
      user_id: guide["guide_id"],
      user_type: "guide",
      first_name: guide["first_name"]
    });
  else res.send({ success: 0 });
});

router.get("/guide", async (req, res) => {
  const guides = await Guide.query();
  // console.log(guides);
  res.json(guides);
});

module.exports = router;
