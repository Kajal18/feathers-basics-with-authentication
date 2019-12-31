// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const movie = sequelizeClient.define('movie', {
    poster: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    directedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    producedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
      hooks: {
        beforeCount(options) {
          options.raw = true;
        }
      }
    });

  // eslint-disable-next-line no-unused-vars
  movie.associate = function (models) {
    movie.belongsTo(models.user, { as: "director", foreignKey: "directedBy", targetKey: 'id' })
    movie.belongsTo(models.user, { as: "producer", foreignKey: "producedBy", targetKey: 'id' })
  };

  return movie;
};
