import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
const google = require('googleapis');
const books = google.books('v1');

function googleBookSearchByTitle(title, callback) {
  books.volumes.list({
    auth: Meteor.settings.google.api_key,
    q: title,
    maxResults: 20
  }, callback);
}
const wrappedGoogleBookSearchByTitle = Meteor.wrapAsync(googleBookSearchByTitle);

export function bookSearchByTitle(titleSearch) {
  const results = wrappedGoogleBookSearchByTitle(titleSearch);

  let resultsList = [];

  if (results && results.items) {
    resultsList = results.items.map(item => {
      const id = item.id;
      const volume = item.volumeInfo;
      const title = volume.title;
      const author = volume.authors[0];
      const description = volume.description;
      const publisher = volume.publisher;
      const pageCount = volume.pageCount;

      let thumbnail = '';

      if (volume.imageLinks && volume.imageLinks.thumbnail) {
        thumbnail = volume.imageLinks.thumbnail;
      }

      return {
        _id: new Mongo.ObjectID(),
        title,
        author,
        thumbnail,
        description,
        publisher,
        pageCount
      };
    });
  }

  return resultsList;
}
