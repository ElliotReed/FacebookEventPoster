var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var Client = sequelize.define("Client", {
      firstname: {
        type: DataTypes.STRING,
        notEmpty: true
      },

      lastname: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      // Client's page ID
      pageId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        }
      },

      localPassword: {
        type: DataTypes.STRING,
        required: true
      }
    },
    {
      freezeTableName: true
    }
  );
  // methods ======================
  // generating a hash
  Client.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  Client.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.localPassword);
  };

  Client.associate = function(models) {
    // Associating Client with Posts
    // When an Client is deleted, also delete any associated Posts
    Client.hasMany(models.Event, {
      onDelete: "cascade"
    });
  };

  Client.sync(function() {
    force: false;
  });

  return Client;
};
