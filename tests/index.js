var test = require('tape')

var certbotWrapper = require('./index')

test('certonly', function (t) {
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
    t.notOk(err)
    console.log(`
      
      stdout
      ${stdout}
      
      
      `)
    
      console.log(`
        
        stderr
        ${stderr}
        
        
        `)
    t.end()
  })
})
