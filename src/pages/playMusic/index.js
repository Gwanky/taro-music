import Taro, { Component } from '@tarojs/taro'
import { View, Image, Audio, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '云音乐'
  }

  constructor () {
    super(...arguments)
    this.state = {
      songId: this.$router.params.id,
      song: {},
      songUrl: ''
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
    Taro.request({
      url: 'http://localhost:3000/song/detail?ids=' + this.state.songId
    }).then(res => {
      this.setState({
        song: res.data.songs[0]
      })
    })

    Taro.request({
      url: 'http://localhost:3000/song/url?id=' + this.state.songId
    }).then(res => {
      this.setState({
        songUrl: res.data.data[0].url
      })
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { song }  = this.state
    const al = song.al || {}
    return (
      <View className='music'>
        <Image className='music-bg' src={al.picUrl} />
        <Text className='music-name'>{song.name}</Text>
        <Image className='music-img' src={al.picUrl} />
        <Audio
          className='audio'
          src={this.state.songUrl}
          controls
          autoplay
          loop={false}
          muted={false}
          initialTime='30'
          id='video'
        />
      </View>
    )
  }
}
