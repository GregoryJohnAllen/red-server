module.exports = function (sequelize, DataTypes) {
  return sequelize.define('seeker', {
    predisktraits: DataTypes.STRING,
    prevjobs: DataTypes.STRING, //checkboxes
    prefskills: DataTypes.STRING,
    companies: DataTypes.STRING,
    photourl:DataTypes.STRING
    //office image
    //STRETCH: api import of company info
  })
}