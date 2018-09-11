import Api from '@/services/Api'

export default {
  fetchPoints() {
    return Api().get('points.json')
  },
  fetchPointsOnType(type) {
    return Api().get('points?type=' + type)
  },
  fetchPoint(id) {
    return Api().get('points/' + id + '.json')
  },
  postPoint(params) {
    return Api().post('points', params)
  },
  putPoint(id, params) {
    return Api().put('points/' + id, params)
  },
  deletePoint(id) {
    return Api().delete('points/' + id)
  },
  postDescription(params) {
    return Api().post('points_descriptions', params)
  }

}
