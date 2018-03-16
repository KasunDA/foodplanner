const mysql = require('mysql'),
  getConnection = require(process.env.FOOD_HOME + 'modules/db'),
  log = require(process.env.FOOD_HOME + 'modules/log'),
  { executeQuery, createTransaction } = require(process.env.FOOD_HOME + 'helper/db')

module.exports = {
  createInstance: async ({ name, address, company, subdomain }) => {
    const query = `
        INSERT INTO instances (
          name,
          address,
          company,
          subdomain
        ) VALUES (
          ${mysql.escape(subdomain)},
          ${mysql.escape(address)},
          ${mysql.escape(company)},
          ${mysql.escape(subdomain)}
        );`

    const result = await executeQuery(await getConnection(), query, true)

    log(6, 'inserted new instance with id', result.insertId)

    return {
      id: result.insertId,
      name: subdomain,
      address,
      company,
      subdomain,
      sprache: 'de-DE',
      titel: '',
      gmail_user: '',
      gmail_pass: '',
    }
  },

  getAllInstances: async () => {
    const query = `SELECT * FROM instances;`

    const result = await executeQuery(await getConnection(), query, true)

    log(6, 'got all instances')

    return result
  },

  getInstanceById: async id => {
    const query = `SELECT * FROM instances WHERE id = ${id};`

    const result = await executeQuery(await getConnection(), query, true)

    log(6, 'got all instances')

    return result[0]
  },

  deleteInstanceById: async id => {
    const query = `DELETE FROM instances WHERE id = ${id};`

    const result = await executeQuery(await getConnection(), query, true)

    log(6, 'deleted instance ', id)

    return result[0]
  },
}