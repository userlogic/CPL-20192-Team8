const { BaseModel } = require("./BaseModel");

class TourProposal extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "tour_proposal";
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return "tour_proposal_id";
  }

  // Methods can be defined for model classes just as you would for
  // any JavaScript class. If you want to include the result of these
  // method in the output json, see `virtualAttributes`.
  //   fullName() {
  //     return this.firstName + ' ' + this.lastName;
  //   }

  // Optional JSON schema. This is not the database schema!
  // No tables or columns are generated based on this. This is only
  // used for input validation. Whenever a model instance is created
  // either explicitly or implicitly it is checked against this schema.
  // See http://json-schema.org/ for more info.
  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "prop_tour_request_id",
        "prop_guide_id",
        "theme",
        "description",
        "price",
        "start_time",
        "end_time"
      ],
      properties: {
        tour_proposal_id: { type: "integer" },
        final_match: { type: "boolean" },
        theme: { type: "string" },
        description: { type: "string" },
        price: { type: "integer" },
        start_time: { type: "date" },
        end_time: { type: "date" },
        // prop_customer_id: {type: 'integer'},
        prop_tour_request_id: { type: "integer" },
        prop_guide_id: { type: "integer" }
        // Properties defined as objects or arrays are
        // automatically converted to JSON strings when
        // writing to database and back to objects and arrays
        // when reading from database. To override this
        // behaviour, you can override the
        // Model.jsonAttributes property.
      }
    };
  }

  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const path = require("path");

    return {
      application: {
        relation: BaseModel.BelongsToOneRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one. We use a model
        // subclass constructor `Animal` here.
        modelClass: path.join(__dirname, "TourRequest"),
        join: {
          from: "tour_proposal.prop_tour_request_id",
          to: "tour_request.tour_request_id"
        }
      },
      guide: {
        relation: BaseModel.BelongsToOneRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one. We use a model
        // subclass constructor `Animal` here.
        modelClass: path.join(__dirname, "Guide"),
        join: {
          from: "tour_proposal.prop_guide_id",
          to: "guide.guide_id"
        }
      }
    };
  }
}

module.exports = { TourProposal };
