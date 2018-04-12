import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Feedback = new Mongo.Collection('Feedback');

/** Create a schema to constrain the structure of documents associated with this collection. */
const FeedbackSchema = new SimpleSchema({
  feedback: String,
  userId: String,
  createdAt: Date,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Feedback.attachSchema(FeedbackSchema);

/** Make the collection and schema available to other code. */
export { Feedback, FeedbackSchema };
