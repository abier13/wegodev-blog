const createdUpload = (dataResponse) => ({
  code: 201,
  message: 'Berhasil menambahkan data',
  ...dataResponse,
});

const created = (dataResponse) => ({
  code: 201,
  message: 'Data berhasil dibuat',
  ...dataResponse,
});

const get = (dataResponse) => ({
  code: 201,
  message: 'Data sudah diterima',
  ...dataResponse,
});

const updated = (dataResponse) => ({
  code: 201,
  message: 'Data berhasil diperbarui',
  ...dataResponse,
});

module.exports = {
  createdUpload, created, get, updated,
};
