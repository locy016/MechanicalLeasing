/* eslint-disable quote-props */
module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: 'ml616rwist',
        productName: '工程机械设备租赁管理', // 项目名，也是生成的安装文件名
        copyright: 'Copyright © 2021', // 版权信息
        win: {
          icon: 'public/favicon.ico',
          'extraResources': [
            {
              'from': 'db/database.db',
              'to': 'db/database.db'
            },
            {
              'from': 'template/notice.docx',
              'to': 'template/notice.docx'
            }
          ]
        },
        nsis: {
        // 是否一键安装，建议为 false，可以让用户点击下一步、下一步、下一步的形式安装程序，如果为true，当用户双击构建好的程序，自动安装程序并打开，即：一键安装（one-click installer）
          oneClick: false,
          // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowElevation: false,
          // 允许修改安装目录，建议为 true，是否允许用户改变安装目录，默认是不允许
          allowToChangeInstallationDirectory: false,
          // 安装图标
          installerIcon: 'public/favicon.ico',
          // 卸载图标
          uninstallerIcon: 'public/favicon.ico',
          // 安装时头部图标
          installerHeaderIcon: 'public/favicon.ico',
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true
        }
      }
    }
  }
}
