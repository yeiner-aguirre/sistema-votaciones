const { Candidate, Voter } = require('../models');
const { Op } = require('sequelize');

// Se verifica si el correo ya está registrado como candidato o votante
const isEmailTaken = async (email) => {
  const candidateExists = await Candidate.findOne({ where: { email } });
  const voterExists = await Voter.findOne({ where: { email } });
  return candidateExists || voterExists;
};

module.exports = {
  async createCandidate(req, res) {
    const { name, email, party } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
    }

    try {
      const emailTaken = await isEmailTaken(email);
      if (emailTaken) {
        return res.status(400).json({ error: 'El correo ya está registrado como candidato o votante' });
      }

      const newCandidate = await Candidate.create({ name, email, party });
      res.status(201).json(newCandidate);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear candidato', details: error.message });
    }
  },

  async getAllCandidates(req, res) {
    const { page = 1, limit = 10, name, party } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }
    if (party) {
      where.party = { [Op.like]: `%${party}%` };
    }

    try {
      const { rows, count } = await Candidate.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        total: count,
        page: parseInt(page),
        per_page: parseInt(limit),
        data: rows
      });
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener candidatos' });
    }
  },

  async getCandidateById(req, res) {
    const { id } = req.params;

    try {
      const candidate = await Candidate.findByPk(id);
      if (!candidate) {
        return res.status(404).json({ error: 'Candidato no encontrado' });
      }
      res.json(candidate);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar el candidato' });
    }
  },

  async deleteCandidate(req, res) {
    const { id } = req.params;

    try {
      const deleted = await Candidate.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Candidato no encontrado' });
      }
      res.json({ message: 'Candidato eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el candidato' });
    }
  }
};

