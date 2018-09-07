import Api from '@/services/Api'

export default {
  fetchPoints() {
    return Api().get('points.json')
  },
  fetchPoint(id) {
    return Api().get('points/' + id + '.json')
  },
  putPoint(id, params) {
    return Api().put('points/' + id, params)

  },
  postPoint(params) {
    return Api().post('points', params)
  },
  postDescription(params) {
    return Api().post('points_descriptions', params)
  }

}
