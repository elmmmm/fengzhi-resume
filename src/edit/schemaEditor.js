// 右侧的json编辑器
import JSONEditor from 'jsoneditor'
import { getSessionStorage, setSessionStorage, updataCVPart } from './public' 

class SchemaEditor {
  constructor(id, mode) {
    this.init(id, mode)
  }

  init(id, mode = 'form') {
    const timer = null
    this.editor = new JSONEditor(document.getElementById(id), {
      onChange: () => {  //编辑器内容改变时触发的回调
        if (timer) {
          clearTimeout(timer)
        }
        // console.log('onChange this: ', this) 此处的this是SchemaEditor，this.editor才是我们组件中保存的编辑器
        const curCV = getSessionStorage('curCV')
        let payload = null
        if(curCV === 'cvOne'){
          payload = [true, this.partkey, this.desindex, this.editor.get()]
        }else{
          payload = [true, this.pathkey, this.editor.get()]
        }
        console.log('jsonChange ',payload)
        setTimeout(updataCVPart, 700, payload)
      },
      limitDragging: true,
      name: 'cv',
      onEvent(data, e) {
        if (e.type === 'click' && document.activeElement.id === 'domContext') {
          setSessionStorage('valuePath', data.path)
        }
      },
      search: false,
      mode,
    })
    this.editor.mode = mode
  }

  get() {
    return this.editor.get()  //返回的类型是对象，不是json字符串
  }

  set(json) {
    this.editor.set(json)
  }

  setName(val){  //设置编辑器根节点的名称
    this.editor.setName(val)
  }

  expand(){  //展开所有字段
    this.editor.expandAll()  
  }

  get mode() {
    return this.editor.mode
  }

  refresh() {
    this.editor.refresh()
  }

  static getInstance() {
    if (!SchemaEditor.instance) {
      SchemaEditor.instance = new SchemaEditor('clickEditor')
    }
    return SchemaEditor.instance
  }
}

// 好像是单例模式
// export default SchemaEditor.getInstance()
export default SchemaEditor
