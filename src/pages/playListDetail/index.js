import Taro, { Component } from '@tarojs/taro'
import { View, Icon, Image, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '歌单详情'
  }

  constructor() {
    super(...arguments)
    this.state = {
      playListId: this.$router.params.id,
      playList: {}
    }
  }

  navigateTo (url) {
    Taro.navigateTo({url})
  }

  componentWillMount () {

  }

  componentDidMount () {
    Taro.showLoading({title: 'Loding'})
    Taro.request({
      url: 'http://localhost:3000/playlist/detail?id=' + this.state.playListId
    }).then(res => {
      Taro.hideLoading()
      this.setState({
        playList: res.data.playlist
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const playList = this.state.playList
    const tracks = playList.tracks || []
    const songs = tracks.map((song, index) => {
      return (
        <View className='song' key={song.id} onClick={this.navigateTo.bind(this, '/pages/playMusic/index?id=' + song.id)}>
          <Text className='song-index'>{index+1}</Text>
          <View className='song-info'>
            <View className='song-name'>{song.name}</View>
            <View>
              <Text>{song.ar[0].name}</Text> -
              <Text>{song.al.name}</Text>
            </View>
          </View>
        </View>
      )
    })

    return (
      <View className='playlist'>
        <View className='head'>
          <Image className='head-bg' src={playList.coverImgUrl} />

          <View className='head-content'>
            <Image lazyLoad className='img' src={playList.coverImgUrl} />
            <View className='info'>
              <View className='name'>{playList.name}</View>
              <View className='desc'>{playList.description}</View>
            </View>
          </View>

          <View className='head-other'>
            <View className='item'><Icon size='20' type='success' color='#fff' /> {playList.subscribedCount}</View>
            <View className='item'><Icon size='20' type='info' color='#fff' />{playList.commentCount}</View>
            <View className='item'><Icon size='20' type='download' color='#fff' />{playList.shareCount}</View>
          </View>
        </View>

        <View className='body'>{songs}</View>
      </View>
    )
  }
}
