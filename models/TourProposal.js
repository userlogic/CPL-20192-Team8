const { BaseModel } = require('./BaseModel');

class TourProposal extends BaseModel {
  
  // Table name is the only required property.
  static get tableName() {
    return 'tour_proposal';
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return 'tour_proposal_id';
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
  static get jsonSchema () {
    return {
      type: 'object',
      required: ['tour_proposal_id', 'final_match', 'prop_customer_id', 'prop_tour_request_id', 'prop_guide_id'], 
      properties: {
        tour_proposal_id: {type: 'integer'},
        final_match: {type: 'boolean'},
        prop_customer_id: {type: 'integer'},
        prop_tour_request_id: {type: 'integer'},
        prop_guide_id: {type: 'integer'},
        // Properties defined as objects or arrays are
        // automatically converted to JSON strings when
        // writing to database and back to objects and arrays
        // when reading from database. To override this
        // behaviour, you can override the
        // Model.jsonAttributes property.
      }
    };
  }
}

module.exports = {TourProposal};