'use strict';

const limparCamposDeEndereco = () => {
  document.getElementById('endereco').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
};

const limparFormulario = () => {
  document.getElementById('apelido').value = '';
  document.getElementById('cep').value = '';
  document.getElementById('endereco').value = '';
  document.getElementById('numero').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
};

const preencherCamposDeEndereco = endereco => {
  document.getElementById('endereco').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
};
const eNumero = numero => /^[0-9]+$/.test(numero);

const cepValido = cep => cep.length === 8 && eNumero(cep);

const pesquisarCep = async () => {
  limparCamposDeEndereco();

  const cep = document.getElementById('cep').value;
  const url = `http://viacep.com.br/ws/${cep}/json/`;

  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.hasOwnProperty('erro')) {
      document.getElementById('endereco').value = 'CEP não encontrado!';
    } else {
      preencherCamposDeEndereco(endereco);
    }
  } else {
    document.getElementById('endereco').value = 'CEP inválido!';
  }
};

document.getElementById('cep').addEventListener('focusout', pesquisarCep);

const btn = document.querySelector('#salvar');

btn.addEventListener('click', async e => {
  e.preventDefault();
  const apelido = document.querySelector('#apelido');
  const cep = document.querySelector('#cep');
  const endereco = document.querySelector('#endereco');
  const numero = document.querySelector('#numero');
  const bairro = document.querySelector('#bairro');
  const cidade = document.querySelector('#cidade');
  const estado = document.querySelector('#estado');

  const enderecoSalvo = {
    apelido: apelido.value,
    cep: cep.value,
    endereco: endereco.value,
    numero: numero.value,
    bairro: bairro.value,
    cidade: cidade.value,
    estado: estado.value,
  };

  const urlString = new URL(window.location.href);
  const id = urlString.searchParams.get('id');
  const isEditing = !!parseInt(urlString.searchParams.get('isEditing'));

  try {
    let statusCode = '';
    if (isEditing) {
      const { data, status } = await axios.patch(
        `http://localhost:4567/address/${id}`,
        enderecoSalvo
      );
      statusCode = status;
    } else {
      const { data, status } = await axios.post('http://localhost:4567/address/', enderecoSalvo);
      statusCode = status;
    }

    limparFormulario();

    isEditing ? alert('Endereço alterado com sucesso!') : alert('Endereço cadastrado com sucesso!');
  } catch (error) {
    console.log(error);
    isEditing ? alert('Ops! Houve algum problema ao tentar cadastrar o endereço'): alert('Ops! Houve algum problema ao tentar editar o endereço!')
  }
});
