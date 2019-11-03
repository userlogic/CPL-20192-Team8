const { BaseModel } = require('./BaseModel');

class TourRequest extends BaseModel {
  
  // Table name is the only required property.
  static get tableName() {
    return 'tour_request';
  }

  // Each model must have a column (or a set of columns) that uniquely
  // identifies the rows. The column(s) can be specified using the `idColumn`
  // property. `idColumn` returns `id` by default and doesn't need to be
  // specified unless the model's primary key is something else.
  static get idColumn() {
    return 'tour_request_id';
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
      required: ['tour_date', 'pax', 'budget', 'description', 'requester_id', 'tour_location_id'],

      properties: {
        tour_request_id: {type: 'integer'},
        pax: {type: 'integer'},
        budget: {type: 'integer'},
        description: {type: 'string', minLength: 3, maxLength: 300},
        requester_id: {type: 'integer'},
        tour_location_id: {type: 'integer'},
        tour_date: {type: 'date'}

        // Properties defined as objects or arrays are
        // automatically converted to JSON strings when
        // writing to database and back to objects and arrays
        // when reading from database. To override this
        // behaviour, you can override the
        // Model.jsonAttributes property.
      }
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.
    const path = require('path');

    return {
      requester: {
        relation: BaseModel.BelongsToOneRelation,
        // The related model. This can be either a Model
        // subclass constructor or an absolute file path
        // to a module that exports one. We use a model
        // subclass constructor `Animal` here.
        modelClass: path.join(__dirname, 'Customer'),
        join: {
          from: 'tour_request.requester_id',
          to: 'customer.customer_id'
        }
      },

      location: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: path.join(__dirname, 'Location'),        
        join: {
          from: 'tour_request.tour_location_id',
          to: 'location.location_id'
        }
      },
    };
  }
}

module.exports = {TourRequest};