const express = require("express");

const { TourProposal } = require("../models/TourProposal");
const { Location } = require("../models/Location");

const router = express.Router();

router.get("/all", async (req, res) => {
  const tourproposals = await Tourproposal.query();
  res.json(tourproposals);
});

router.get("/cards", async (req, res) => {
  const tourproposals = await Tourproposal.query()
    .eager("[requester, location]")
    .modifyEager("requester", builder => {
      builder.select("first_name");
    });
  res.json(tourproposals);
});

router.post("/", async (req, res) => {
  const newTourproposalRaw = req.body;
  console.log(newTourproposalRaw);

  //   const location_id_record = await Location.query().where(
  //     "name",
  //     "=",
  //     newTourproposalRaw["city"]
  //   );
  const newTourproposal = {
    prop_tour_request_id: newTourproposalRaw["prop_tour_request_id"],
    prop_guide_id: newTourproposalRaw["prop_guide_id"],
    price: parseInt(newTourproposalRaw["price"], 10),
    description: newTourproposalRaw["description"],
    theme: newTourproposalRaw["theme"],
    start_time: newTourproposalRaw["start_time"],
    end_time: newTourproposalRaw["end_time"]
  };

  const tourproposal = await Tourproposal.query().insert(newTourproposal);

  res.send(tourproposal);
});

router.patch("/:id", async (req, res) => {
  let proposalId = req.params.id;
  const numberOfAffectedRows = await TourProposal.query()
    .patch({ final_match: true })
    .findById(proposalId);
});

router.get("/:id", async (req, res) => {
  let customerId = req.params.id;
  const tourproposals = await Tourproposal.query()
    .eager("[application, guide]")
    .modifyEager("application", builder => {
      builder.select("requester_id");
    })
    .where("requester_id", "=", customerId);
  res.json(tourproposals);
});
module.exports = router;
