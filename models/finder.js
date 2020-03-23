module.exports = function (sequelize, DataTypes) {
  return sequelize.define('finder', {
    // owner: DataTypes.INTEGER,
    diskrank: DataTypes.STRING,
    employtype: DataTypes.STRING, //checkbox
    about: DataTypes.STRING,
    skills: DataTypes.STRING,
    salary: DataTypes.INTEGER,  //salary slider
    projects: DataTypes.STRING
    //STRETCH:resumes and projects 
  })
}