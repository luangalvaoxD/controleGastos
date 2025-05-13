const express = require('express');
const cors = require('cors');
const sequelize = require('./models');
const gastoRoutes = require('./routes/gastoRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/gastos', gastoRoutes);

sequelize.authenticate()
  .then(() => console.log('Conexão com PostgreSQL estabelecida'))
  .catch(err => console.log('Erro na conexão com PostgreSQL: ', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
