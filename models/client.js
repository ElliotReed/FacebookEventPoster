module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
    // Client entered name (can be full name, user-name...)
    name: {
      type: DataTypes.STRING,
      validate: {
        allowNull: false
      }
    },
    // Client's page ID
    pageId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Client's email
    // isEmail valiation checks for email format
    email: {
      type: DataTypes.STRING, 
      validate: {
        isEmail: true,
        allowNull: false
      }
    },
    // Client's password
    password: {
      type: DataTypes.STRING,
      validate: {
        allowNullNull: false
      }
    }
  },
  {
      freezeTableName: true
  });

  Client.associate = function(models) {
    // Associating Client with Posts
    // When an Client is deleted, also delete any associated Posts
    Client.hasMany(models.Event, {
      onDelete: "cascade"
    });
  };

  return Client;
};
