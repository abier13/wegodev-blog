const created = (dataResponse) => ({
  code: 201,
  message: 'Data berhasil dibuat',
  ...dataResponse,
});

const createdUpload = (dataResponse) => ({
  code: 201,
  message: 'Berhasil menambahkan data',
  ...dataResponse,
});

module.exports = { created, createdUpload };
