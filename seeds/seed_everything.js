exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tour_proposal")
    .del()
    .then(() => {
      return knex("tour_request").del();
    })
    .then(() => {
      return knex("guide").del();
    })
    .then(() => {
      return knex("customer").del();
    })
    .then(() => {
      return knex("location").del();
    })
    .then(() => {
      // Inserts seed entries
      return knex("location").insert([
        { name: "Seoul" },
        { name: "Daegu" },
        { name: "Busan" },
        { name: "Jeju" },
        { name: "Jeonju" },
        { name: "Gyeongju" }
      ]);
    })
    .then(() => {
      return knex("customer").insert([
        {
          first_name: "Taylor",
          last_name: "Swift",
          email: "a@a.com",
          password: "abcdef"
        },
        {
          first_name: "Bob",
          last_name: "Builder",
          email: "f@f.com",
          password: "abcdef"
        },
        {
          first_name: "Lionel",
          last_name: "Nessi",
          email: "f@f.com",
          password: "abcdef"
        }
      ]);
    })
    .then(() => {
      let customerIds;
      return knex("customer")
        .pluck("customer_id")
        .then(ids => {
          customerIds = ids;
          return knex("location").pluck("location_id");
        })
        .then(locationIds => {
          return { locations: locationIds, customers: customerIds };
        });
    })
    .then(idObject => {
      console.log(idObject);
      return knex("tour_request").insert([
        {
          tour_date: "2018-01-01",
          pax: 3,
          budget: 1000,
          description: "A fun tour!",
          requester_id: idObject["customers"][0],
          tour_location_id: idObject["locations"][0]
        },
        {
          tour_date: "2015-05-05",
          pax: 4,
          budget: 2000,
          description: "A super-duper fun tour!",
          requester_id: idObject["customers"][1],
          tour_location_id: idObject["locations"][1]
        }
      ]);
    })
    .then(() => {
      return knex("location").pluck("location_id");
    })
    .then(locationIds => {
      return knex("guide").insert([
        {
          first_name: "Bob",
          last_name: "Dail",
          email: "cd@cd.com",
          password: "abcdef",
          age: 19,
          sex: "M",
          guide_location_id: locationIds[0],
          picture_path: "avatars/man_20.png"
        },
        {
          first_name: "Jennifer",
          last_name: "Thompson",
          email: "dd@dd.com",
          password: "abcdef",
          age: 23,
          sex: "F",
          guide_location_id: locationIds[1],
          picture_path: "avatars/woman_20.png"
        }
      ]);
    })
    .then(() => {
      let tourrequestIds;
      return knex("tour_request")
        .pluck("tour_request_id")
        .then(ids => {
          tourrequestIds = ids;
          return knex("guide").pluck("guide_id");
        })
        .then(guideIds => {
          return { guides: guideIds, tour_requests: tourrequestIds };
        });
    })
    .then(idObject => {
      console.log(idObject);
      return knex("tour_proposal").insert([
        {
          theme: "Kpop",
          description:
            "From 10:00-12:00 we will visit the SM building in Gangnam.",
          price: 1000,
          start_time: "10:00",
          end_time: "12:00",
          prop_tour_request_id: idObject["tour_requests"][0],
          prop_guide_id: idObject["guides"][0]
        },
        {
          theme: "Cooking",
          description:
            "From 13:00-21:00 we will have a traditional kimchi-making experience.",
          price: 200,
          start_time: "13:00",
          end_time: "21:00",
          prop_tour_request_id: idObject["tour_requests"][1],
          prop_guide_id: idObject["guides"][1]
        },
        {
          theme: "Kpop",
          description:
            "From 9:00-15:00 we will visit the JYP building in Gangnam.",
          price: 900,
          start_time: "9:00",
          end_time: "15:00",
          prop_tour_request_id: idObject["tour_requests"][0],
          prop_guide_id: idObject["guides"][1]
        }
      ]);
    });
};
