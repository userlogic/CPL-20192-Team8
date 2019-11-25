const express = require("express");

const { TourRequest } = require("../models/TourRequest");
const { Location } = require("../models/Location");

const router = express.Router();

router.get("/all", async (req, res) => {
  const tourRequests = await TourRequest.query();
  res.json(tourRequests);
});

router.get("/cards", async (req, res) => {
  const tourRequests = await TourRequest.query()
    .eager("[requester, location]")
    .modifyEager("requester", builder => {
      builder.select("first_name");
    });
  res.json(tourRequests);
});

router.get("/:id", async (req, res) => {
  let userId = req.params.id;
  const tourrequest = await TourRequest.query()
    .where("requester_id", userId)
    .eager("[location]")
    .first();
  res.json(tourrequest);
});

router.post("/", async (req, res) => {
  const newTourRequestRaw = req.body;
  console.log(newTourRequestRaw);

  const location_id_record = await Location.query().where(
    "name",
    "=",
    newTourRequestRaw["city"]
  );
  const newTourRequest = {
    tour_date: newTourRequestRaw["tourDate"],
    pax: parseInt(newTourRequestRaw["count"], 10),
    budget: parseInt(newTourRequestRaw["budget"], 10),
    description: newTourRequestRaw["details"],
    requester_id: newTourRequestRaw["requester_id"],
    tour_location_id: location_id_record[0]["location_id"]
  };

  const tourRequest = await TourRequest.query().insert(newTourRequest);

  res.send(tourRequest);
});

module.exports = router;
