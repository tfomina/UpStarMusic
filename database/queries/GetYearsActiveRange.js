const Artist = require("../models/artist");

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  return Artist.aggregate([
    {
      $group: {
        _id: null,
        min: { $min: "$yearsActive" },
        max: { $max: "$yearsActive" },
      },
    },
  ]).then((groups) => ({
    min: groups[0].min,
    max: groups[0].max,
  }));
};
