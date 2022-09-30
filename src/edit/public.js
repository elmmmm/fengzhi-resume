// 临时会话数据用Map保存（当前点击节点、当前使用的简历模板） 
const sessionMap = new Map() 
export function setSessionStorage(key, value) {
  if (value === null || value === undefined) {
    sessionMap.delete(key)
    return
  }
  sessionMap.set(key, value)
}

export function getSessionStorage(key) {
  return sessionMap.get(key)
}

// 更新简历数据（编辑器中对应分块）
export function updataCVPart(payload){
  const curCV = getSessionStorage('curCV')
  window.editTool.$store.commit(`${curCV}/updateCVPart`, payload)
  // window.editTool.$forceUpdate()
}

