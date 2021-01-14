import request from '@/utils/request'

export function queryContract(data) {
  return request({
    url: 'contract/queryContract',
    method: 'post',
    data: data
  })
}

export function getContractInfo(data) {
  return request({
    url: 'contract/getContractInfo',
    method: 'post',
    data: data
  })
}

export function contractSign(data) {
  return request({
    url: 'contract/contractSign',
    method: 'post',
    data: data
  })
}

export function showDecisionContract(data) {
  return request({
    url: 'shareholder/showDecisionContract',
    method: 'post',
    data: data
  })
}
