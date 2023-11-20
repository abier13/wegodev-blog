const { createClient } = require('redis-promisify');

const client = createClient();

const set = async (key, data) => {
  await client.set(key, JSON.stringify(data));
};

const get = async (key) => {
  const result = await client.getAsync(key);
  return JSON.parse(result);
};

const del = async (key) => {
  await client.del(key);
};

module.exports = { set, get, del };
