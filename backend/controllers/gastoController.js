const Gasto = require('../models/gasto');

const addGasto = async (req, res) => {
  const { descricao, valor, categoria } = req.body;
  try {
    const novoGasto = await Gasto.create({ descricao, valor, categoria });
    res.status(201).json(novoGasto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar gasto', error });
  }
};

const getGastos = async (req, res) => {
  try {
    const gastos = await Gasto.findAll();
    res.status(200).json(gastos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao listar gastos', error });
  }
};

const updateGasto = async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, categoria } = req.body;
  try {
    const gasto = await Gasto.update(
      { descricao, valor, categoria },
      { where: { id } }
    );
    if (gasto[0] === 0) {
      return res.status(404).json({ message: 'Gasto não encontrado' });
    }
    res.status(200).json({ message: 'Gasto atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar gasto', error });
  }
};

const deleteGasto = async (req, res) => {
  const { id } = req.params;
  try {
    const gasto = await Gasto.destroy({ where: { id } });
    if (gasto === 0) {
      return res.status(404).json({ message: 'Gasto não encontrado' });
    }
    res.status(200).json({ message: 'Gasto excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir gasto', error });
  }
};

module.exports = {
  addGasto,
  getGastos,
  updateGasto,
  deleteGasto,
};
