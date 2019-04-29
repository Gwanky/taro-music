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
      songUrl: '',
      isPlaying: false
    }
  }

  setAudioState (status) {
    const audioCtx = Taro.createAudioContext('audio')

    if (!status) {
      audioCtx.pause();
    } else {
      audioCtx.play();
    }
    this.setState({
      isPlaying: status
    })
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
    const { song, songUrl }  = this.state
    const al = song.al || {}
    return (
      <View className='music'>
        <Image className='music-bg' src={al.picUrl} />
        <Text className='music-name'>{song.name}</Text>
        <Image className={this.state.isPlaying ? 'music-img rotating' : 'music-img'} src={al.picUrl} />
        <Audio
          className='audio'
          src={songUrl}
          controls={false}
          autoplay={false}
          loop={false}
          muted={false}
          initialTime='30'
          id='audio'
        />
        {this.state.isPlaying
          ? <Text className='op' onClick={this.setAudioState.bind(this, false)}>暂停 </Text>
          : <Text className='op' onClick={this.setAudioState.bind(this, true)}>播放</Text>
        }
      </View>
    )
  }
}
