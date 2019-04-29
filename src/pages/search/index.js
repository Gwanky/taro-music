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
      list: [],
      isFocus: true,
      hotSearch: []
    }
  }

  navigateTo (url) {
    Taro.navigateTo({url})
  }

  searchInput(e) {
    let keywords = e.detail.value

    if(!keywords) {
      this.setState({
        isFocus: true
      })
    }

    this.setState({
      keywords
    })
  }

  setFocus(b) {
    this.setState({
      isFocus: b
    })
  }

  search(val) {

    const keywords  = typeof val === 'string' ? val : this.state.keywords

    if (!keywords && !this.isFocus) {
      Taro.showToast({
        title: '请输入要搜索的歌曲',
        icon: 'none',
        duration: 2000
      })
      return
    }

    this.setState({
      keywords
    })

    Taro.showLoading({title: '正在加载'})

    Taro.request({
      url: `${host}/search?keywords=${keywords}&limit=30&offset=0`
    }).then(res => {
      Taro.hideLoading()
      this.setState({
        isFocus: false,
        list: res.data.result.songs
      })
    })
  }

  componentWillMount () {

  }

  componentDidMount () {
    Taro.request({url: host + '/search/hot'}).then(res => {
      this.setState({
        hotSearch: res.data.result.hots
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { keywords, list, hotSearch, isFocus } = this.state

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

    const hots = hotSearch.map(item => {
      return (
        <Text onClick={this.search.bind(this, item.first)} className='hot-search-txt' key={item.first}>{item.first}</Text>
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
            onFocus={this.setFocus.bind(this, true)}
          />
          <Icon type='search' size='20' onClick={this.search.bind(this)} className='search-btn' />
        </View>

        {isFocus
          ? <View className='hot-search'>{hots}</View>
          : <View className='song-list'>{songList}</View>
        }
      </View>
    )
  }
}
