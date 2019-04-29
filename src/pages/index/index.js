import Taro, { Component } from '@tarojs/taro'
import { View, Image, Input, Icon, Text, Swiper, SwiperItem  } from '@tarojs/components'
import { host } from '../../config/config'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '云音乐'
  }

  constructor () {
    super(...arguments)
    this.state = {
      playList: [],
      searchVal: '',
      songs: [],
      banners: []
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
    Taro.request({url: host + '/personalized/newsong'}).then(res => {
      Taro.hideLoading()
      this.setState({
        songs: res.data.result
      })
    })

    Taro.request({
      url: host + '/personalized'
    }).then(res => {
      this.setState({
        playList: res.data.result
      })
    })

    Taro.request({
      url: host + '/banner'
    }).then(res => {
      this.setState({
        banners: res.data.banners
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { playList, searchVal, songs, banners } = this.state

    const personalizedPlayList = playList.slice(0, 6).map(item => {
      return (
        <View className='item' key={item.id} onClick={this.navigateTo.bind(this, '/pages/playListDetail/index?id=' + item.id)}>
          <Image lazyLoad className='item-img' src={item.picUrl} />
          <View className='item-name'>{item.name}</View>
        </View>
      )
    })

    const personalizedSongs = songs.slice(0, 6).map(song => {
      return (
        <View
          className='item' key={song.id}
          onClick={this.navigateTo.bind(this, '/pages/playMusic/index?id=' + song.id)}
        >
          <Image lazyLoad className='item-img' src={song.song.album.picUrl} />
          <View className='item-name song-name'>{song.name}</View>
        </View>
      )
    })

    const swipers = banners.map(banner => {
      return(
        <SwiperItem className='banner-item' key={banner.imageUrl}>
          <Image style='width: 100%; height: 100%;' lazyLoad className='banner-img' src={banner.imageUrl} />
        </SwiperItem>
      )
    })

    return (
      <View className='index'>
        <View className='search' onClick={this.navigateTo.bind(this, '/pages/search/index')}>
          <Input
            className='search-inp'
            value={searchVal}
            placeholder='请输入你要搜索的歌曲'
            placeholderStyle='color: #e8e8e8'
            disabled
          />
          <Icon type='search' size='20' onClick={this.navigateTo.bind(this, '/pages/search/index?keywords=' + searchVal)} className='search-btn' />
        </View>

        <View className='banner'>
          <Swiper
            indicatorColor='rgba(255,255,255,.8)'
            indicatorActiveColor='#fff'
            circular
            indicatorDots
            autoplay
          >
          {swipers}
          </Swiper>
        </View>

        <View className='plays'>
          <View className='plays-title'>
            <Text>推荐歌曲</Text>
            <Text className='more'>更多</Text>
          </View>
          <View className='plays-content'>
            {personalizedSongs}
          </View>
        </View>


        <View className='plays'>
          <View className='plays-title'>
            <Text>推荐歌单</Text>
            <Text className='more'>更多</Text>
          </View>
          <View className='plays-content'>
            {personalizedPlayList}
          </View>
        </View>
      </View>
    )
  }
}
