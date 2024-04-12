const fs = require("fs");

const fileName = __dirname + "/../data/users.json";

/** @type { { items: User[] } } */
let data; //= require('../data/users.json');

fs.access(fileName, fs.constants.F_OK, (err) => {
  if (!err) {
    fs.readFile(fileName, "utf8", (err, content) => {
      if (err) {
        console.error(err);
        return;
      }
      data = JSON.parse(content);
    });
  }
});

function save(callback) {
  fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error(err);
      if (callback) {
        callback(err);
      }
    }
    if (callback) {
      callback();
    }
  });
}

/**
 * @typedef {import('../../client/src/model/users').User} User
 * */

/**
 * @returns {User[]}
 * */

function getAll() {
  return data.items.map((x) => ({
    ...x,
    password: undefined,
    bank: undefined,
    ssn: undefined,
  }));
}

/**
 * @param {number} id
 * @returns {User}
 * */

function get(id) {
  return data.items.find((item) => item.id == id);
}

function search(q) {
  return getAll().filter(
    (item) => (item) =>
      new RegExp(q, "i").test(item.firstName) ||
      new RegExp(q, "i").test(item.lastName) ||
      new RegExp(q, "i").test(item.email)
  );
}

/**
 * @param {User} user
 * @returns {User}
 * */
function add(user) {
  user.id = data.items.length + 1;
  data.items.push(user);
  save();
  return user;
}

/**
 * @param {User} user
 * @returns {User}
 * */
function update(user) {
  const index = data.items.findIndex((item) => item.id == user.id);
  if (index >= 0) {
    data.items[index] = {
      ...data.items[index],
      ...user,
    };
    save();
    return user;
  }
  return null;
}

/**
 * @param {number} id
 * @returns {User | null}
 * */
function remove(id) {
  const index = data.items.findIndex((item) => item.id == id);
  if (index >= 0) {
    const deleted = data.items.splice(index, 1);
    save();
    return deleted[0];
  }
  return null;
}

module.exports = {
  getAll,
  get,
  search,
  add,
  update,
  remove,
};
