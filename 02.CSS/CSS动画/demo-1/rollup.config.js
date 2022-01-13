import less from 'rollup-plugin-less'

export default {
  input: 'index.js',
  plugins: [
    less({ output: `dist/index.css` }),
  ],
  output: {
    file: 'dist/index.js'
  }
}