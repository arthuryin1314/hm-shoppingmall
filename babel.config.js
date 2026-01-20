module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 新增 plugins 配置，用于 Element UI 按需引入
  plugins: [
    [
      'component',
      {
        // 指定要按需引入的组件库名称
        libraryName: 'element-ui',
        // 指定 Element UI 样式库的名称（固定值）
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
