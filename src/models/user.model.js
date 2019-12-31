// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user = sequelizeClient.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDisabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });

  // eslint-disable-next-line no-unused-vars
  user.associate = function (models) {
    user.hasMany(models.movie, { as: "directedMovie", foreignKey: "directedBy", targetKey: "id" })
    user.hasMany(models.movie, { as: "producedMovie", foreignKey: "producedBy", targetKey: "id" })
  };

  return user;
};
