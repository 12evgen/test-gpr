const shell = require('shelljs')

shell.echo('Cleaning up old files...')
shell.exec('rimraf _build_prod/')
shell.mkdir('_build_prod')
shell.mkdir('_build_prod/server')
shell.mkdir('_build_prod/server/static')

shell.echo('\nCompiling...')

shell.echo('[1/2]\twebpack/server.prod.js')
shell.exec(
  './node_modules/webpack/bin/webpack.js --progress --config webpack/server.prod.js'
)

shell.echo('[2/2]\twebpack/client.prod.js')
shell.exec(
  './node_modules/webpack/bin/webpack.js --progress -p --config webpack/client.prod.js'
)

shell.echo('\nCopying files...')
shell.cp('bin/server.prod.js', '_build_prod/')
shell.cp('-R', 'src/server/static', '_build_prod/server')
shell.cp('-R', 'src/client/assets', '_build_prod/client')
shell.cp('-R', 'package.json', '_build_prod')
shell.cp('-R', 'package-lock.json', '_build_prod')
shell.cp('-R', 'README.md', '_build_prod')
shell.cp('-R', 'LICENSE', '_build_prod')

shell.echo('\nDone!!')
