const env = process.env.NODE_ENV || 'development'

var config = {}
if(env === 'test' || env === 'development') {
  config = require('./config.json')
  const envConfig = config[env]

  // eslint-disable-next-line
  Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key])
}
