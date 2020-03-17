module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phonenumber: DataTypes.INTEGER
    //need to add upper limit for the integer so that a phone
    //number can be inputted
  })
}