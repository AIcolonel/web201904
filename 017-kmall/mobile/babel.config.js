module.exports = {
  presets: [
    '@vue/app'
  ],
  //引入vant组件,UI界面
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
