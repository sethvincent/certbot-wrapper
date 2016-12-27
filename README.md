# certbot-wrapper

Create Let's Encrypt SSL certificates from Node.js using the certbot command-line tool.

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]
[![conduct][conduct]][conduct-url]

[npm-image]: https://img.shields.io/npm/v/certbot-wrapper.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/certbot-wrapper
[travis-image]: https://img.shields.io/travis/sethvincent/certbot-wrapper.svg?style=flat-square
[travis-url]: https://travis-ci.org/sethvincent/certbot-wrapper
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard
[conduct]: https://img.shields.io/badge/code%20of%20conduct-contributor%20covenant-green.svg?style=flat-square
[conduct-url]: CONDUCT.md

## About

A Node.js wrapper around the [certbot command-line tool](https://certbot.eff.org/).

This module was built for [staticland](https://github.com/staticland) and related projects.

## Work in progress

This module is a minimal wrapper around the `certbot` command, so should be reliable, but it has also only seen minimal testing.

## What works?

Only the `certonly` and `renew` methods have been tested and used regularly. Other methods should work, but haven't been used regularly yet.

This module has only been tested and used on recent versions of Ubuntu. We recommend Ubuntu 16.10.

## Requirements

- Use Ubuntu 16.10 or newer
- Use certbot version // TODO: ???????
- Use nginx version // TODO: ???????

## Why this module?

I tried using a couple different Node.js clients for ACME (the cert issuer that Let's Encrypt uses), but found them difficult to use, and in one case ended up getting invalid certs because of something not working correctly that was very difficult to debug.

Running commands from Node has drawbacks as well, but at least this way the complicated logic is left up to the official `certbot` command that is recommended for use and well-maintained. This module's job is just to run that command.

It currently is used by [static.land](https://static.land) to request certs.

## Install

### First install the `certbot` command

TODO: certbot install instructions

```sh
npm install --save certbot-wrapper
```

## Usage

All arguments are passed to the command-line tool.

Property keys in `camelCase` format will be converted to `--camel-case` for the `certbot` command.

```js
var certbotWrapper = require('certbot-wrapper')

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
```

## Documentation
- [Getting started](docs/getting-started.md)
- [Related modules](docs/related-modules.md)
- [API](docs/api.md)
- [Tests](tests/)

### Examples
- [Basic example](examples/basic-usage.js)

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## Conduct

It's important that this project contributes to a friendly, safe, and welcoming environment for all, particularly for folks that are historically underrepresented in technology. Read this project's [code of conduct](CONDUCT.md)

## Change log

Read about the changes to this project in [CHANGELOG.md](CHANGELOG.md). The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## Contact

- **chat** – You can chat about this project at [http://gitter.im/sethvincent/ask](http://gitter.im/sethvincent/ask)
- **issues** – Please open issues in the [issues queue](https://github.com/sethvincent/certbot-wrapper/issues)
- **twitter** – [@sethdvincent](https://twitter.com/sethdvincent)
- **email** – Need in-depth support via paid contract? Send an email to sethvincent@gmail.com

## License

[ISC](LICENSE.md)
