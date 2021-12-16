const { QueryTypes } = require('sequelize');
const sequelize = require('../database/connection');

module.exports.searchPoint = async (req, res) => {
  const query = '(SELECT * FROM points WHERE description LIKE :descriptionQuery AND s_id LIKE :s_idQuery AND org_id LIKE :org_idQuery AND category LIKE :categoryQuery AND added_by LIKE :added_byQuery AND IFNULL(approved_by,1) LIKE :approved_byQuery)';
  const result = await sequelize.query(query, {
    replacements: {
      descriptionQuery: `%${req.body.description}%`,
      s_idQuery: `%${req.body.s_id}%`,
      org_idQuery: `%${req.body.org_id}%`,
      categoryQuery: `%${req.body.category}%`,
      added_byQuery: `%${req.body.added_by}%`,
      approved_byQuery: `%${req.body.approved_by}%`
    },
    type: QueryTypes.SELECT
  });
  res.send(result);
}