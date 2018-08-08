import lazyLoading from './lazyLoading'

export default {
  name: 'Home',
  path: '/home',
  component: lazyLoading('home/Home'),
  meta: {
    default: true,
    title: 'menu.home',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
