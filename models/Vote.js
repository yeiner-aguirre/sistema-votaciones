const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Vote = sequelize.define('Vote', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  voter_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  candidate_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'votes',
  timestamps: false
});

module.exports = Vote;
