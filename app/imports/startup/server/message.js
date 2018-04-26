import { Meteor } from 'meteor/meteor';
import { Messages } from '../../api/message/message';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Messages', function publish() {
  if (this.userId) {
    return Messages.find({ members:  Meteor.user().username });
  }
  return this.ready();
});
