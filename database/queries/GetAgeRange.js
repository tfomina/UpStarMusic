const Artist = require("../models/artist");

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  return Artist.aggregate([
    {
      $group: {
        _id: null,
        min: { $min: "$age" },
        max: { $max: "$age" },
      },
    },
  ]).then((groups) => ({
    min: groups[0].min,
    max: groups[0].max,
  }));

  // Решение из лекции
  // const minQuery = Artist.find({})
  //   .select("age")
  //   .sort({ age: 1 })
  //   .limit(1)
  //   .then((artist) => artist[0].age);

  // const maxQuery = Artist.find({})
  //   .select("age")
  //   .sort({ age: -1 })
  //   .limit(1)
  //   .then((artist) => artist[0].age);

  // return Promise.all([minQuery, maxQuery]).then((result) => ({
  //   min: result[0],
  //   max: result[1],
  // }));
};
