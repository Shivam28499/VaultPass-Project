'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Locker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Traveler,{
        foreignKey:'travelerId',
        as:'travelers'
      })
    }
  }
  Locker.init({
    lockerNumber:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true

    },
    location: {
      type: DataTypes.STRING,
      allowNull:false
    },
    isAvailable: {
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    },
    travelerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  documentPath: {
    type: DataTypes.STRING,
    allowNull: true
}
  }, 
  {
    sequelize,
    modelName: 'Locker',
  });
  return Locker;
};