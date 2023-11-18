const get = (dataResponse) => ({
  code: 200,
  message: 'Berhasil mendapatkan data',
  ...dataResponse,
});

const updated = (dataResponse) => ({
  code: 200,
  message: 'Berhasil ubah data',
  ...dataResponse,
});

module.exports = { get, updated };
