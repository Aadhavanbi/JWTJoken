'use strict'
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class MacModel  extends Model {
  }

  MacModel.init(
    {
      licency_key: {type: DataTypes.STRING},
      mac_id:{type: DataTypes.TEXT },
      mail: {type: DataTypes.STRING},
      company_name: {type: DataTypes.STRING},
      activation_date: {type: DataTypes.STRING,},
      expiry_type: { type: DataTypes.STRING, defaultValue: 'One Year' },
      expiry_date: {type: DataTypes.STRING},
      isActive: {type: DataTypes.BOOLEAN,allowNull: false,defaultValue: false, },
      app_version: { type: DataTypes.STRING, },
      createdAt: {type: DataTypes.DATE,allowNull: true},
      updatedAt: {type: DataTypes.DATE,allowNull: true}
    },
    {
      sequelize,
      tableName: 'macmodels',
      modelName: 'MacModel',
    }
  
  )

  
  return MacModel 
}
