const getAddresses = async () => {
  const response = await axios.get('http://localhost:4567/address/');
  const data = response.data;
  return data;
};

const getOneAddress = async id => {
  const response = await axios.get(`http://localhost:4567/address/${id}`);
  const data = response.data;
  return data;
};

const deleteAddress = async id => {
  try {
    await axios.delete(`http://localhost:4567/address/${id}`);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
