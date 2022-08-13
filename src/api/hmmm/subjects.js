/*
 * @Author: taoshiwei
 * @Date: 2019-04-09 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:53:23
 *
 * 学科
 */

import { createAPI } from '@/utils/request'

// 学科列表
export const list = (data) => createAPI('/subjects', 'get', data)

// 学科简单列表
export const simple = (data) => createAPI('/subjects/simple', 'get', data)
export const simple1111 = (data) => createAPI('/subjects/simple', 'get', data)

// 学科详情
export const detail = (data) => createAPI(`/subjects/${data.id}`, 'get', data)

// addDate: '2022-08-13T04:22:38.000Z'
// creatorID: 2
// id: 30
// isFrontDisplay: 1
// subjectName: '7722玩玩'
// tags: 1
// totals: 0
// twoLevelDirectory: 0
// username: '超级管理员'
// 学科添加
export const add = (data) => createAPI('/subjects', 'post', data)

// 学科修改
export const update = (data) => createAPI(`/subjects/${data.id}`, 'put', data)

// 学科删除
export const remove = (data) =>
  createAPI(`/subjects/${data.id}`, 'delete', data)
export const simpleid = (params) =>
  createAPI('/directorys/simple/', 'get', params)

export const simpleid1 = (params) => createAPI('/tags/simple', 'get', params)
