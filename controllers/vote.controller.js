const { Voter, Candidate, Vote } = require('../models');

module.exports = {
  async castVote(req, res) {
    const { voter_id, candidate_id } = req.body;

    try {
      const voter = await Voter.findByPk(voter_id);
      const candidate = await Candidate.findByPk(candidate_id);

      if (!voter) return res.status(404).json({ error: 'Votante no encontrado' });
      if (!candidate) return res.status(404).json({ error: 'Candidato no encontrado' });
      if (voter.has_voted) return res.status(400).json({ error: 'Este votante ya ha votado' });

      // Se registra el voto
      await Vote.create({ voter_id, candidate_id });

      // Se actualiza el estado del votante y el conteo de votos del candidato
      voter.has_voted = true;
      await voter.save();

      candidate.votes += 1;
      await candidate.save();

      res.status(201).json({ message: 'Voto registrado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar el voto', details: error.message });
    }
  },

  async getAllVotes(req, res) {
    try {
      const votes = await Vote.findAll({ include: ['Voter', 'Candidate'] });
      res.json(votes);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los votos' });
    }
  },

  async getStatistics(req, res) {
    try {
      const candidates = await Candidate.findAll();
      const totalVotes = await Vote.count();
      const votersCount = await Voter.count({ where: { has_voted: true } });

      const stats = candidates.map(candidate => {
        const percentage = totalVotes > 0
          ? ((candidate.votes / totalVotes) * 100).toFixed(2)
          : '0.00';

        return {
          candidate: candidate.name,
          party: candidate.party,
          votes: candidate.votes,
          percentage: `${percentage}%`
        };
      });

      res.json({
        total_votes: totalVotes,
        total_voters_voted: votersCount,
        results: stats
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al generar estadísticas' });
    }
  }
};
