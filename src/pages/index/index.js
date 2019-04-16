import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '云音乐'
  }

  constructor () {
    super(...arguments)
    this.state = {
      playList: []
    }
  }

  navigateTo (url) {
    Taro.navigateTo({
      url
    })
  }

  componentWillMount () {

  }

  componentDidMount () {
    Taro.showLoading({title: 'Loading'})
    Taro.request({
      url: 'http://localhost:3000/personalized'
    }).then(res => {
      Taro.hideLoading()
      this.setState({
        playList: res.data.result
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const personalizedPlayList = this.state.playList.map(item => {
      return (
        <View className='item' key={item.id} onClick={this.navigateTo.bind(this, '/pages/playListDetail/index?id=' + item.id)}>
          <Image className='item-img' src={item.picUrl} />
          <View className='item-name'>{item.name}</View>
        </View>
      )
    })
    return (
      <View className='plays'>
        <View className='plays-title'>推荐歌单</View>
        <View className='plays-content'>
          {personalizedPlayList}
        </View>
      </View>
    )
  }
}
