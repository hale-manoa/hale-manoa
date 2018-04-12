import { Meteor } from 'meteor/meteor';
import { Feedback } from '../../api/feedback/feedback.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Feedback', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Feedback.find({ owner: username });
  }
  return this.ready();
});