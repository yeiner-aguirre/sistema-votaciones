require('dotenv').config();

const basicAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return res.status(401).json({ error: 'Autenticación requerida' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return next(); // Autenticado correctamente
  }

  return res.status(403).json({ error: 'Credenciales inválidas' });
};

module.exports = basicAuth;
