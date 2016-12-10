/*
(default) run        Obtain & install a cert in your current webserver 
certonly             Obtain cert, but do not install it (aka "auth")
install              Install a previously obtained cert in a server
renew                Renew previously obtained certs that are near expiry
revoke               Revoke a previously obtained certificate
register             Perform tasks related to registering with the CA
rollback             Rollback server configuration changes made during install
config_changes       Show changes made to server config during installation
plugins              Display information about installed plugins
*/

var assert = require('assert')

var childProcess = require('child_process')
var exists = require('command-exists')
var toFlags = require('to-flags')
var xtend = require('xtend')

module.exports = function certbotWrapper (config) {
  if (typeof config === 'string') {
    config = { cmd: config }
  }

  config = config || {}
  const cmd = config.cmd || 'certbot'

  run.run = run
  run.certonly = run.certOnly = certonly
  run.install = install
  run.renew = renew
  run.revoke = revoke
  run.register = register
  run.config_changes = run.configChanges = config_changes
  run.plugins = plugins
  return run

  function run (options, callback) {
    exec(cmd, 'run', options, callback)
  }

  function certonly (options, callback) {
    exec(cmd, 'certonly', options, callback)
  }

  function install (options, callback) {
    exec(cmd, 'install', options, callback)
  }

  function renew (options, callback) {
    exec(cmd, 'renew', options, callback)
  }

  function revoke (options, callback) {
    exec(cmd, 'revoke', options, callback)
  }

  function register (options, callback) {
    exec(cmd, 'register', options, callback)
  }

  function config_changes (options, callback) {
    exec(cmd, 'config_changes', options, callback)
  }

  function plugins (options, callback) {
    exec(cmd, 'plugins', options, callback)
  }

  function exec (command, subcommand, options, callback) {
    assert.equal(typeof subcommand, 'string', 'subcommand string is required')
    assert.equal(typeof options, 'object', 'options object is required')
    assert.equal(typeof options.args, 'object', 'options.args object is required')

    console.log(command, subcommand, options)
    exists(command, function (err, ok) {
      if (err || !ok) return callback(new Error('Error: cerbot command must be installed. Find instructions at https://certbot.eff.org/'))
      var args = toFlags(options.args).join(' ')
      console.log('args', args)
      const execOpts = xtend(options)
      delete execOpts.args
      childProcess.exec(`${cmd} ${subcommand} ${args}`, execOpts, callback)
    })
  }
}
