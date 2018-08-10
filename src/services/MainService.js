import Api from '@/services/Api'

export default {
  fetchPoints () {
    return Api().get('points.json')
  },
  
}
