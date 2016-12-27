var certbotWrapper = require('./index')

var certbot = certbotWrapper({
  command: '/path/to/certbot/command'
})

var args = {
  staging: true,
  standalone: true,
  domains: ['faketest.static.land'],
  agreeTos: true,
  email: 'hi@static.land',
  text: true
}

certbot.certonly(args, function (err, stdout, stderr) {
  console.log(err, stdout, stderr)
})
