const { Voter, Candidate } = require('../models');
const { Op } = require('sequelize');

// Verificar si el correo ya existe en Voter o Candidate
const isEmailTaken = async (email) => {
  const voterExists = await Voter.findOne({ where: { email } });
  const candidateExists = await Candidate.findOne({ where: { email } });
  return voterExists || candidateExists;
};

module.exports = {
  async createVoter(req, res) {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
    }

    try {
      const emailTaken = await isEmailTaken(email);
      if (emailTaken) {
        return res.status(400).json({ error: 'El correo ya está registrado como votante o candidato' });
      }

      const newVoter = await Voter.create({ name, email });
      res.status(201).json(newVoter);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear votante', details: error.message });
    }
  },

  async getAllVoters(req, res) {
    const { page = 1, limit = 10, name } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    try {
      const { rows, count } = await Voter.findAndCountAll({
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
      res.status(500).json({ error: 'Error al obtener votantes' });
    }
  },

  async getVoterById(req, res) {
    const { id } = req.params;

    try {
      const voter = await Voter.findByPk(id);
      if (!voter) {
        return res.status(404).json({ error: 'Votante no encontrado' });
      }
      res.json(voter);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar el votante' });
    }
  },

  async deleteVoter(req, res) {
    const { id } = req.params;

    try {
      const deleted = await Voter.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Votante no encontrado' });
      }
      res.json({ message: 'Votante eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el votante' });
    }
  }
};
