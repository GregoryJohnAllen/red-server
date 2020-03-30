module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profiletype: DataTypes.STRING
  })
}