import rpi_resolve from '@rollup/plugin-node-resolve'
import rpi_replace from '@rollup/plugin-replace'
import rpi_commonjs from '@rollup/plugin-commonjs'
import { terser as rpi_terser } from 'rollup-plugin-terser'

const _cfg_ = {
  plugins: [
    rpi_resolve(),

    rpi_commonjs(), // allow use of deepmerge

    rpi_replace({
      preventAssignment: true,
      values: { // fix redux use of process.env.NODE_ENV
        'process.env.NODE_ENV': JSON.stringify('production')
      },
    }),
  ]}

const _cfg_min_ = { ... _cfg_,
  plugins: [... _cfg_.plugins, rpi_terser()] }

export default [
  { ... _cfg_, input: 'dist/index.js',
    output: [
      { file: `esm/choices-esm.js`, format: 'esm', sourcemap: true},
    ]},

  { ... _cfg_min_, input: 'dist/index.js',
    output: [
      { file: `esm/choices-esm.min.js`, format: 'esm', sourcemap: false},
    ]},
]
