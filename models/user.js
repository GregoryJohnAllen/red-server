module.exports = function (sequelize, DataTypes) {
  return sequelize.define('user', {
<<<<<<< HEAD
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phonenumber: DataTypes.INTEGER
    //need to add upper limit for the integer so that a phone
    //number can be inputted
=======
    fName: DataTypes.STRING,
    lName: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
>>>>>>> origin/tre
  })
}