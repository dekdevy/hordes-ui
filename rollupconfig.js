import alias from '@rollup/plugin-alias'

// in order for rollup to understand aliases, we use plugin-alias, and feed it with the alias info from our tsconfig.js
import fs from 'fs'
const tsconfig = JSON.parse(fs.readFileSync('./tsconfig.json'))
const aliasPaths = {}
for(const a in tsconfig.compilerOptions.paths) {
  aliasPaths[a.replace('/*', '')] = './dist/ts/'+tsconfig.compilerOptions.paths[a][0].replace('/*', '')
}

// create plugin chain
const plugins = [alias({entries: aliasPaths})]

// collect all input and output files
const files = [
  {in: 'dist/ts/ui/ui.js', out: 'dist/js/ui/ui.js'},
  {in: 'dist/ts/ui/ui_icon_test.js', out: 'dist/js/ui/ui_icon_test.js'},
  {in: 'dist/ts/server/server.js', out: 'dist/js/server/server.js'}
]

// unroll files for export
export default files.map( f => {
  return {
    input : f.in,
    plugins,
    output: {
      file  : f.out,
      format: 'cjs'
    }
  }
})