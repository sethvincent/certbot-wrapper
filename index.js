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
  const cmd = config.command || 'certbot'

  run.run = run
  run.certonly = run.certOnly = certonly
  run.install = install
  run.renew = renew
  run.revoke = revoke
  run.register = register
  run.config_changes = run.configChanges = config_changes
  run.plugins = plugins
  return run

  function run (args, options, callback) {
    exec(cmd, 'run', args, options, callback)
  }

  function certonly (args, options, callback) {
    exec(cmd, 'certonly', args, options, callback)
  }

  function install (args, options, callback) {
    exec(cmd, 'install', args, options, callback)
  }

  function renew (args, options, callback) {
    exec(cmd, 'renew', args, options, callback)
  }

  function revoke (args, options, callback) {
    exec(cmd, 'revoke', args, options, callback)
  }

  function register (args, options, callback) {
    exec(cmd, 'register', args, options, callback)
  }

  function config_changes (args, options, callback) {
    exec(cmd, 'config_changes', args, options, callback)
  }

  function plugins (args, options, callback) {
    exec(cmd, 'plugins', args, options, callback)
  }

  function exec (command, subcommand, args, options, callback) {
    assert.equal(typeof subcommand, 'string', 'subcommand string is required')
    assert.equal(typeof args, 'object', 'args object is required')

    if (typeof options === 'function') {
      callback = options
      options = {}
    }

    exists(command, function (err, ok) {
      if (err || !ok) return callback(new Error('Error: cerbot command must be installed. Find instructions at https://certbot.eff.org/'))
      args = toFlags(args).join(' ')
      childProcess.exec(`${cmd} ${subcommand} ${args}`, options, callback)
    })
  }
}
