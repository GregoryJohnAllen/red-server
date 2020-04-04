module.exports = function (sequelize, DataTypes) {
  return sequelize.define('finder', {
    diskrank: DataTypes.STRING,
    employtype: DataTypes.STRING, //checkbox
    about: DataTypes.STRING,
    skills: DataTypes.STRING,
    salary: DataTypes.INTEGER,  //salary slider
    projects: DataTypes.STRING,
    userid: DataTypes.INTEGER
  })
}