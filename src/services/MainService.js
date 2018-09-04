import Api from '@/services/Api'

export default {
  fetchPoints() {
    return Api().get('points.json')
  },
  fetchPoint(id) {
    return Api().get('points/' + id + '.json')
  },
  postDescription(params) {
    return Api().post('points_descriptions', params)
  }

}
