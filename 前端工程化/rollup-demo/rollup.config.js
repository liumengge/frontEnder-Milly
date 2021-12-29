const mode = process.env.MODE

const isLocal = mode === 'local' ? true : false

export default {
  input: 'index.js',
  output: {
    file: "dist1.js",
    format: isLocal ? 'es' : 'umd',
    name: 'Index'
  }
}