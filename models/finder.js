module.exports = function (sequelize, DataTypes) {
  return sequelize.define('finder', {
    diskRank: DataTypes.STRING,
    employType: DataTypes.STRING, //checkbox
    about: DataTypes.STRING,
    skills: DataTypes.STRING,
    salary: DataTypes.INTEGER,  //salary slider
    projects: DataTypes.STRING
    //STRETCH:resumes and projects 
  })
}