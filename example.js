var certbotWrapper = require('./index')

var certbot = certbotWrapper('letsencrypt')

var options = {
  args: {
    staging: true,
    standalone: true,
    domains: [process.argv[2]],
    agreeTos: true,
    email: 'sethvincent@gmail.com',
    text: true
  }
}

certbot.certonly(options, function (err, stdout, stderr) {
  console.log(err, stdout, stderr)
})
