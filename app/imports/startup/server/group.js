import { Meteor } from 'meteor/meteor';
import { Groups } from '../../api/group/group.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.streetaddress} (${data.unitnumber})`);
  Groups.insert(data);
}

/** Initialize the collection if empty. */
if (Groups.find().count() === 0) {
  if (Meteor.settings.defaultGroups) {
    console.log('Creating default data.');
    console.log('In Groups');
    Meteor.settings.defaultGroups.map(data => addData(data));
  }
}

Meteor.publish('Groups', function publish() {
  return Groups.find({members:  Meteor.user().username});
});
