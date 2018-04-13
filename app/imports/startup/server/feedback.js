import { Meteor } from 'meteor/meteor';
import { Feedbacks } from '../../api/feedback/feedback.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Feedbacks', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Feedbacks.find({ owner: username });
  }
  return this.ready();
});
