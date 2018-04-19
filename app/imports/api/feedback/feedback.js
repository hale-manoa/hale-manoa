import React from 'react';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Feedbacks = new Mongo.Collection('Feedbacks');

/** Create a schema to constrain the structure of documents associated with this collection. */
const FeedbackSchema = new SimpleSchema({
  feedback: String,
  userId: String,
  rating: {
    type: String,
    allowedValues: [ '★', '★★', '★★★', '★★★★', '★★★★★'],
    defaultValue: '★',
  },
  createdAt: Date,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Feedbacks.attachSchema(FeedbackSchema);

/** Make the collection and schema available to other code. */
export { Feedbacks, FeedbackSchema };
