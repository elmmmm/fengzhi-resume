<template>
  <div class="input-area">
    <textarea
      id="domContext"
      v-model="edittext"
      @input="changeText"
      placeholder="这里显示点击的内容，修改内容会直接同步"
      rows="3"
    ></textarea>
    <div class="tips" style="background-color: #fff">
      <div style="text-align: center">
        <p>这里显示点击内容对应的区块数据，也可以同步修改</p>
      </div>
    </div>
    <!-- json编辑器 -->
    <div id="clickEditor" style="background-color: #fff"></div>
    <div class="editorOperate">
      <el-button @click="addIntro" icon="el-icon-plus" size="medium" >添加描述</el-button>
      <el-button @click="downJson" icon="el-icon-download" size="medium" >下载JSON</el-button>
    </div>  
  </div>
</template>

<script>
import {mapState} from 'vuex'
import SchemaEditor from "../edit/schemaEditor";
import {getSessionStorage} from '../edit/public'
import {debounce, downloadTxtFile} from '../utils/index'
export default {
  props:{
    curtext: {
      type: String,
      default: ''
    },
    curField: { //当前点击元素所处数据位置
      type: Array,
      default: function(){
        return []
      }
    }
  },
  data() {
    return {
      edittext: this.curtext,  //props数据不可以直接修改
      curpartkey: 'base',
      curindex: '0'
    };
  },
  computed: {
      ...mapState("cvOne",['exps'])  //从vuex获取简历模板数据
  },
  watch: {
    curtext(val){ 
      this.edittext = val
      document.getElementById('domContext').focus()
    },
    curField(val){ //设置json编辑器中的数据
      if(val.length == 2){ //处理简历模板1 
        const domPart = val[0]
        const domIndex = val[1]  
        // js的数组索引可以是字符串 '0'
        this.curpartkey = domPart || 'base'
        this.curindex = domIndex || '0'
        this.editor.partkey = domPart || 'base'
        this.editor.desindex = domIndex || '0'
        if(domIndex === '-1' && domPart != 'base'){ //点击的是分块标题，编辑器不显示
          this.editor.set({})
          this.editor.setName('CV')
          return
        } 
        this.editor.set(domPart == 'base' ? this.$store.state.cvOne.base : this.exps[domPart]['des'][domIndex])  //set接受一个对象（json）
        this.editor.setName(domPart == 'base' ? '基本信息' : this.exps[domPart]['title'])
      }else if(val.length == 1){ //简历2只传递data-path
        const domPath = val[0]
        this.editor.pathkey = domPath || 'base'
        const keypath = domPath.split("-")
        if(domPath.includes('base') || domPath.includes('infos')|| domPath.includes('contacts')){
          this.editor.set(this.$store.state.cvTwo[keypath[0]])
          return
        }
        if(domPath.indexOf('title')!== -1){ //点击的是分块标题，编辑器不显示
          this.editor.set({})
          this.editor.setName('CV')
          return
        } 
        this.editor.set(this.$store.state.cvTwo[keypath[0]].des[keypath[2]])
        this.editor.setName(this.$store.state.cvTwo[keypath[0]].title)

      }
      this.editor.expand()
    }
  },
  methods: {
    // 文本框编辑的回调(添加防抖)
    changeText: debounce(function(){
        // console.log('this',this) //这里this是vue组件
        const curDom = getSessionStorage('clickDom')
        const curCV = getSessionStorage('curCV')
        // curDom.innerText = this.edittext // 把修改的文本同步到简历视图 --store数据更新，视图自动更新
        const keypath = curDom.dataset.path
        this.$store.commit(`${curCV}/updateCVPart`, [false, keypath, this.edittext])  //更新vuex和本地数据
    }, 500),  // debounce会返回一个函数

    //添加一项描述
    addIntro(event){
      let target = event.target
      while(target.nodeName != 'BUTTON') target = target.parentNode
      target.blur() //让按钮点击后失焦
      const curCV = getSessionStorage('curCV')
      if(this.curpartkey == 'base' || this.curpartkey == 'skill') return
      this.$store.commit(`${curCV}/addIntroduce`, [this.curpartkey, this.curindex])
    },

    downJson(event){
      let target = event.target
      while(target.nodeName != 'BUTTON') target = target.parentNode
      target.blur() //让按钮失焦
      const curCV = getSessionStorage('curCV')
      const jsonstr = localStorage.getItem(curCV)
      const suffix = `cv${Date.now()}.json`
      downloadTxtFile(jsonstr, suffix)
    }

  },
  mounted() {
    // 真实dom在mounted阶段才会被创建
    this.editor = SchemaEditor.getInstance();  //这里的this.editor实际上是SchemaEditor对象，不是JSONEditor对象
    this.editor.set({});
    window.editTool = this; // 挂载此组件，为了使用$store对象
  },
};
</script>

<style lang='less' scoped>
.input-area {
  #domContext {
  width: 100%;
  margin: 0 auto;
  padding: 0.8rem;
  box-sizing: border-box;
  resize: none;
  outline: none;
  border-radius: 5px;
  font-size: 16px;
  font-family: "Microsoft YaHei", sans-serif;
    &:focus {
      box-shadow: 0px 1px 10px 1px #a5d1ff;
    }
  }

  .tips {
    padding: 0.4rem 0;
    color: #409eff;
    font-size: 0.8rem;
  }

  // #clickEditor {
  //   border-radius: 0px 0px 6px 6px;
  // }

  .editorOperate {
    margin-top: 6px;
  }

}

</style>