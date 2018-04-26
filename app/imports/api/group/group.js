import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Groups = new Mongo.Collection('Groups');

/** Create a schema to constrain the structure of documents associated with this collection. */
const GroupSchema = new SimpleSchema({
  name: String,
  members: [String],
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Groups.attachSchema(GroupSchema);

/** Make the collection and schema available to other code. */
export { Groups, GroupSchema };
