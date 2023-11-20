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

const created = (dataResponse) => ({
  code: 201,
  message: 'Data berhasil dibuat',
  ...dataResponse,
});

module.exports = { get, updated, created };
