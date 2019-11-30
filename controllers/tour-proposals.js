const express = require("express");

const { TourProposal } = require("../models/TourProposal");
const { Location } = require("../models/Location");

const router = express.Router();

router.get("/all", async (req, res) => {
  const tourproposals = await TourProposal.query();
  res.json(tourproposals);
});

// router.get("/cards", async (req, res) => {
//   const tourproposals = await TourProposal.query()
//     .eager("[requester, location]")
//     .modifyEager("requester", builder => {
//       builder.select("first_name");
//     });
//   res.json(tourproposals);
// });

router.post("/", async (req, res) => {
  const newTourProposalRaw = req.body;
  console.log(newTourProposalRaw);

  //   const location_id_record = await Location.query().where(
  //     "name",
  //     "=",
  //     newTourProposalRaw["city"]
  //   );
  const newTourProposal = {
    prop_tour_request_id: newTourProposalRaw["tour_request_id"],
    prop_guide_id: newTourProposalRaw["prop_guide_id"],
    price: parseInt(newTourProposalRaw["charge"], 10),
    description: newTourProposalRaw["description"],
    theme: newTourProposalRaw["theme"],
    start_time: newTourProposalRaw["start_time"],
    end_time: newTourProposalRaw["end_time"]
  };

  const tourproposal = await TourProposal.query().insert(newTourProposal);

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
  console.log(customerId);
  const tourproposals = await TourProposal.query()
    .joinEager("[application, guide]")
    .modifyEager("application", builder => {
      builder.select("requester_id", "budget", "pax", "description");
      // builder.where("requester_id", "=", customerId); // All this does is omitting application part if customerId not correct, still keeps proposal/guide parts
    })
    .modifyEager("guide", builder => {
      builder.select(
        "guide_id",
        "first_name",
        "picture_path",
        "age",
        "sex",
        "guide_location_id"
      );
      // builder.where("requester_id", "=", customerId); // All this does is omitting application part if customerId not correct, still keeps proposal/guide parts
    })

    .where("requester_id", customerId);
  res.json(tourproposals);
  console.log(tourproposals);
});
module.exports = router;
