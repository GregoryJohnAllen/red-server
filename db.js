const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
})
// const sequelize = new Sequelize("redbadge", "postgres", "password", {
//   host: "localhost",
//   dialect: "postgres"
// });

sequelize.authenticate().then(
  function() {
    console.log("Connected to finderseeker postgres database");
  },
  function(err) {
    console.log(err);
  }
);

module.exports = sequelize;
