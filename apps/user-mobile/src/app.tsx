import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss'
import './app.less'

class App extends Component<PropsWithChildren> {
  componentDidMount() {
    // 检查更新
    if (process.env.TARO_ENV === 'weapp') {
      const updateManager = Taro.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            Taro.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: (res) => {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
        }
      })
    }
  }

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return this.props.children
  }
}

export default App