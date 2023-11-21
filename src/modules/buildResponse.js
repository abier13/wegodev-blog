const created = (dataResponse) => ({
  code: 201,
  message: 'Data berhasil dibuat',
  ...dataResponse,
});

const get = (dataResponse) => ({
  code: 200,
  message: 'Data sudah diterima',
  ...dataResponse,
});

const createdUpload = (dataResponse) => ({
  code: 201,
  message: 'Berhasil menambahkan data',
  ...dataResponse,
});


module.exports = { created, get, createdUpload };
