import request from '@/utils/request'

export function uploadFaceFile(type, data) { // 人脸文件上传
  let url = 'legalAuth/uploadFaceFile'
  if (type === '3') url = 'shareholder/uploadFaceFile'
  return request({
    url,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: data
  })
}

export function faceCheck(type, data) {
  let url = 'legalAuth/faceCheck'
  if (type === '3') url = 'shareholder/faceCheck'
  return request({
    url,
    method: 'post',
    data: data
  })
}

export function faceActionSequence(data) { // 人脸动作顺序
  return request({
    url: 'legalAuth/faceActionSequence',
    method: 'post',
    data: data
  })
}

export function faceActionSequenceG(data) { // 股东人脸动作顺序
  return request({
    url: 'shareholder/faceActionSequence',
    method: 'post',
    data: data
  })
}

export function getLegalInfo(data) {
  return request({
    url: 'legalAuth/getLegalInfo',
    method: 'post',
    data: data
  })
}

export function getFaceType(data) { // 查询人脸类型
  return request({
    url: 'common/getFaceType',
    method: 'post',
    data: data
  })
}
