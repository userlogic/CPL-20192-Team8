const { BaseModel } = require("./BaseModel");

class Customer extends BaseModel {
  // Table name is the only required property.
  static get tableName() {
    return "guide";
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return "guide_id";
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
      required: ["first_name", "last_name", "email", "password", "age", "sex"],
      properties: {
        first_name: { type: "string" },
        last_name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        picture_path: { type: "string" },
        age: { type: "integer" },
        sex: { type: "string" }
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
    const TourRequest = require("./TourRequest");

    return {
      requester: {
        relation: BaseModel.ManyToManyRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one. We use a model
        // subclass constructor `Animal` here.
        modelClass: TourRequest,
        join: {
          from: "guide.id",
          through: {
            from: "tour_proposal.guide_id",
            to: "tour_proposal.tour_request_id"
          },
          to: "tour_request.id"
        }
      }
    };
  }
}

module.exports = { Guide };
