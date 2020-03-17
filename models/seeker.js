module.exports = function (sequelize, DataTypes) {
  return sequelize.define('seeker', {
    preDiskTraits: DataTypes.STRING,
    prevJobs: DataTypes.STRING, //checkboxes
    prefSkills: DataTypes.STRING,
    companies: DataTypes.STRING
    //office image
    //STRETCH: api import of company info
  })
}