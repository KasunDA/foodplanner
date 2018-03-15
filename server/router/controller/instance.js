const instanceDB = require(process.env.FOOD_HOME + 'modules/db/instance'),
  crypto = require(process.env.FOOD_HOME + 'modules/crypto'),
  userDB = require(process.env.FOOD_HOME + 'modules/db/user'),
  caches = require(process.env.FOOD_HOME + 'modules/cache'),
  request = require('request-promise-native'),
  jwt = require(process.env.FOOD_HOME + 'modules/auth/jwt'),
  proxy = `http://localhost:${process.env.PROXY_PORT}/proxies`,
  cookieOptions = { secure: process.env.DEVELOP ? false : true, httpOnly: true, expires: new Date(Date.now() + 1000 * 3600 * 24 * 365) }

let cache = caches.getCache('users'),
  mailCache = caches.getCache('mail'),
  authCache = caches.getCache('userAuth'),
  userListCache = caches.getCache('userList')

module.exports = {
  checkDomainTaken: async (req, res) => {
    const { subdomain } = req.query
    const subdomains = Object.keys(
      await request({
        uri: proxy,
        json: true,
      }),
    ).map(domain => domain.split('.')[0])

    res.status(200).send(
      !subdomains.includes(subdomain)
        ? {
            isValid: true,
            name: subdomain,
          }
        : { isValid: false },
    )
  },

  createInstance: async (req, res) => {
    const [instance, userCrypt] = await Promise.all([instanceDB.createInstance(req.body), crypto.createUserHash(req.body.hash)])
    const [user, subdomain] = await Promise.all([
      userDB.createUser({ ...req.body, instance: instance.id, admin: true }, userCrypt.hash, userCrypt.salt),
      request({
        uri: proxy,
        method: 'POST',
        json: true,
        body: {
          host: req.body.subdomain + '.fochlac.com',
          proxy: {
            redirect: false,
            url: '/' + instance.id,
            port: 'FOOD_PORT',
          },
        },
      }),
    ])

    mailCache.deleteAll()
    userListCache.deleteAll()

    const token = await jwt.createToken(user)

    res.cookie('jwt', token, cookieOptions)
    res.status(200).send({ user, instance })
  },
}
