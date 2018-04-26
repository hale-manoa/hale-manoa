import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Housings = new Mongo.Collection('Housings');

/** Create a schema to constrain the structure of documents associated with this collection. */
const HousingsSchema = new SimpleSchema({
  streetaddress: String,
  city: String,
  image: String,
  state: String,
  zipcode: Number,
  longitude: Number,
  latitude: Number,
  unitnumber: String,
  propertytype: {
    type: String,
    allowedValues: ['CONDO', 'HOUSE', 'TOWNHOUSE'],
    defaultValue: 'CONDO',
  },
  rentprice: Number,
  beds: Number,
  baths: Number,
  squarefeet: Number,
  description: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Housings.attachSchema(HousingsSchema);

/** Make the collection and schema available to other code. */
export { Housings, HousingsSchema };
