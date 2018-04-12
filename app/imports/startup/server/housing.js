import { Meteor } from 'meteor/meteor';
import { Housings } from '../../api/housing/housing.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.streetaddress} (${data.unitnumber})`);
  Housings.insert(data);
}

/** Initialize the collection if empty. */
if (Housings.find().count() === 0) {
  if (Meteor.settings.defaultHousing) {
    console.log('Creating default data.');
    console.log('In Housing');
    Meteor.settings.defaultHousing.map(data => addData(data));
  }
}

Meteor.publish('Housing', function publish() {
  return Housings.find();
});
