const Artist = require("../models/artist");

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
// Код из комментариев
// module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
//   let artists;

//   // Building the query...
//   const query = Artist.find(buildFilterQuery(criteria))
//     .sort({ [sortProperty]: 1 })
//     .skip(offset)
//     .limit(limit);

//   // Running the query...
//   query
//     .then((documents) => {
//       artists = { ...documents };
//       return Artist.estimatedDocumentCount();
//     })
//     .then((count) => {
//       return {
//         all: artists,
//         count: count,
//         offset: offset,
//         limit: limit,
//       };
//     });
// };

module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  const query = Artist.find(buildFilterQuery(criteria))
    .sort({ [sortProperty]: 1 })
    .skip(offset)
    .limit(limit);

  return Promise.all([
    query,
    Artist.find(buildFilterQuery(criteria)).count(),
  ]).then((results) => ({
    all: results[0],
    count: results[1],
    offset,
    limit,
  }));
};

const buildFilterQuery = (criteria) => {
  const { name, age, yearsActive } = criteria;

  const query = {};

  if (name) {
    query.$text = {
      $search: name,
    };
  }

  if (age) {
    query.age = { $gte: age.min, $lte: age.max };
  }

  if (yearsActive) {
    query.yearsActive = { $gte: yearsActive.min, $lte: yearsActive.max };
  }

  return query;
};
