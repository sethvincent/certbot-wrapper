var certbotWrapper = require('./index')

var certbot = certbotWrapper('certbot')

var options = {
  args: {
    staging: true,
    standalone: true,
    domains: ['faketest.static.land'],
    agreeTos: true,
    email: 'hi@static.land',
    text: true
  }
}

certbot.certonly(options, function (err, stdout, stderr) {
  console.log(err, stdout, stderr)
})
