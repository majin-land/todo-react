const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'entry',
    },
  ],
  '@babel/preset-react',
]

const plugins = [
  '@babel/plugin-transform-runtime',
  [
    '@babel/plugin-proposal-decorators',
    { legacy: true },
  ],
  [
    '@babel/plugin-proposal-class-properties',
    { loose: true },
  ],
]

if (process.env.NODE_ENV === 'production') {
  plugins.push('@babel/plugin-transform-react-constant-elements')
  plugins.push('@babel/plugin-transform-react-inline-elements')
  plugins.push('transform-react-remove-prop-types')
} else {
  plugins.unshift('react-hot-loader/babel')
}

module.exports = { presets, plugins }
