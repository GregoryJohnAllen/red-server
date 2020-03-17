module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    fName: DataTypes.STRING,
    lName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  })
}