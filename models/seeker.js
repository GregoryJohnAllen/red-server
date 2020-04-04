module.exports = function (sequelize, DataTypes) {
  return sequelize.define('seeker', {
    predisktraits: DataTypes.STRING,
    prevjobs: DataTypes.STRING, //checkboxes
    prefskills: DataTypes.STRING,
    companies: DataTypes.STRING,
    userid: DataTypes.INTEGER
  })
}