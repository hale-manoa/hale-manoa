import { Meteor } from 'meteor/meteor';
import { Groups } from '../../api/group/group.js';


Meteor.publish('Groups', function publish() {
  if (this.userId) {
    return Groups.find({ members: Meteor.user().username });
  }
});
