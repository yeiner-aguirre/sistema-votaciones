const app = require('./app');
const sequelize = require('./config/database');

const PORT = process.env.PORT || 3000;

async function main() {
  try {
    await sequelize.sync({ alter: true }); // sincroniza los modelos
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

main();
