import Taro, { Component } from '@tarojs/taro'
import { View, Input, Icon, Text } from '@tarojs/components'
import { host } from '../../config/config'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '搜索'
  }

  constructor() {
    super(...arguments)
    this.state = {
      keywords: '',
      list: []
    }
  }

  navigateTo (url) {
    Taro.navigateTo({url})
  }

  searchInput(e) {
    this.setState({
      keywords: e.detail.value
    })
  }

  search() {
    const { keywords } = this.state

    if (!keywords) {
      Taro.showToast({
        title: '请输入要搜索的歌曲',
        icon: 'none',
        duration: 2000
      })
      return
    }

    Taro.showLoading({title: '正在加载'})

    Taro.request({
      url: `${host}/search?keywords=${keywords}&limit=30&offset=0`
    }).then(res => {
      Taro.hideLoading()
      this.setState({
        list: res.data.result.songs
      })
    })
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { keywords, list } = this.state

    const songList = list.map((song, index) => {
      return (
        <View className='song' key={song.id} onClick={this.navigateTo.bind(this, '/pages/playMusic/index?id=' + song.id)}>
          <Text className='song-index'>{index+1}</Text>
          <View className='song-info'>
            <View className='song-name'>{song.name}</View>
            <View>
              <Text>{song.artists[0].name}</Text> -
              <Text>{song.album.name}</Text>
            </View>
          </View>
        </View>
      )
    })

    return (
      <View className='search'>
        <View className='search-form'>
          <Input
            className='search-inp'
            value={keywords}
            focus
            placeholder='请输入你要搜索的歌曲'
            placeholderStyle='color: #e8e8e8'
            onInput={this.searchInput.bind(this)}
            onConfirm={this.search.bind(this)}
          />
          <Icon type='search' size='20' onClick={this.search.bind(this)} className='search-btn' />
        </View>

        <View className='song-list'>
          {songList}
        </View>
      </View>
    )
  }
}
