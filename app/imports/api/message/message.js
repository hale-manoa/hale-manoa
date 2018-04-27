import React from 'react';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Messages = new Mongo.Collection('Messages');

/** Create a schema to constrain the structure of documents associated with this collection. */
const MessageSchema = new SimpleSchema({
  username: String,
  image: String,
  message: String,
  members: [String],
  groupId: String,
  createdAt: Date,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Messages.attachSchema(MessageSchema);

/** Make the collection and schema available to other code. */
export { Messages, MessageSchema };
