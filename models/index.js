const Voter = require('./Voter');
const Candidate = require('./Candidate');
const Vote = require('./Vote');

// Relación: un votante emite un solo voto
Voter.hasOne(Vote, { foreignKey: 'voter_id', onDelete: 'CASCADE' });
Vote.belongsTo(Voter, { foreignKey: 'voter_id' });

// Relación: un candidato puede recibir muchos votos
Candidate.hasMany(Vote, { foreignKey: 'candidate_id', onDelete: 'CASCADE' });
Vote.belongsTo(Candidate, { foreignKey: 'candidate_id' });

module.exports = {
  Voter,
  Candidate,
  Vote
};
