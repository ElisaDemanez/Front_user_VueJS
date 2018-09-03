import Api from '@/services/Api'

export default {
  fetchPoints () {
    return Api().get('points.json')
  },
  postDescription(params) {
    return Api().post('points_descriptions', params)
  }
  
}
