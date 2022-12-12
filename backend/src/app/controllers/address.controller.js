const Address = require('../models/address');

const controller = {};

controller.get_one_address_GET = async (req, res) => {
  try {
    const id = req.params.id;
    const address = await Address.find({ _id: id });
    res.status(200).send(address[0]);
  } catch (error) {
    res.status(400).send({ message: 'Erro ao pesquisar endereço' });
  }
};

controller.get_all_addresses_GET = async (req, res) => {
  try {
    const adressAll = await Address.find();
    res.status(200).send(adressAll);
  } catch (error) {
    res.status(400).send({ message: 'Erro ao pesquisar endereços' });
  }
};

controller.save_address_POST = async (req, res) => {
  try {
    const newAddress = await Address.create(req.body);
    return res.status(200).send(newAddress);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: 'Erro ao criar objeto' });
  }
};

controller.delete_address_DELETE = async (req, res) => {
  const id = req.params.id;
  try {
    await Address.findByIdAndDelete(id);
    res.status(200).send({ message: 'Endereço deletado com sucesso!' });
  } catch (error) {
    res.status(400).send({ message: 'Não foi possivel deletar o endereço!' });
  }
};

controller.update_adress_PATCH = async (req, res) => {
  const id = req.params.id;

  try {
    await Address.findByIdAndUpdate(id, req.body);
    res.status(200).send({ message: 'Endereço alterado com sucesso!' });
  } catch (error) {
    res.status(400).send({ message: 'Não foi possivel alterar o endereço' });
  }
};

module.exports = controller;
