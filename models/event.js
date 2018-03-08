module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 64]
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    posted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
    {
      freezeTableName: true
  });

  Event.associate = function(models) {
    Event.belongsTo(models.Client, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  Event.sync(function() {
    force: true;
  });

  return Event;
};
