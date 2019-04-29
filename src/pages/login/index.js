import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'
import { host } from '../../config/config'
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  constructor() {
    super(...arguments)
    this.state = {
      email: '',
      password: ''
    }
  }

  navigateTo (url) {
    Taro.navigateTo({url})
  }

  inpChange(name, e) {
    this.setState({
      [name]: e.detail.value
    })
  }

  login() {
    const { email, password } = this.state

    if (!email || !password) {
      Taro.showToast({
        title: '请输入账号资料',
        icon: 'none',
        duration: 1500
      })
      return
    }

    Taro.showLoading({title: '正在加载'})

    this.navigateTo('/pages/index/index')

    //接口出错

    // Taro.request({
    //   url: `${host}/login?email=${email}&password=${password}`
    // }).then(res => {
    //   Taro.hideLoading()
    //   console.log(res)
    // })
  }

  componentWillMount () {

  }

  componentDidMount () {

  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { email, password } = this.state
    return (
      <View className='login'>
        <Input
          className='login-inp'
          type='text'
          value={email}
          placeholder='请输入邮箱账号'
          onInput={this.inpChange.bind(this, 'email')}
        />
        <Input
          className='login-inp'
          type='password'
          value={password}
          password
          placeholder='请输入密码'
          onInput={this.inpChange.bind(this, 'password')}
        />
        <Button className='login-btn' type='warn' onClick={() => this.login()}>登录</Button>
      </View>
    )
  }
}
