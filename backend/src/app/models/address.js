const { Schema, model } = require('mongoose');

const AddressSchema = new Schema({
  apelido: {
    type: String,
    required: true,
    unique: true,
  },
  cep: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  numero: {
    type: String,
    required: true,
  },
  bairro: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    required: true,
  },
});

const Address = model('Address', AddressSchema);

module.exports = Address;
