<template>
  <div  @click="highLightAndEdit($event)" 
        id="page" ref="toPdf" 
        class="page-one cvborder"
        :color-mode="colorMode"
    >
    <header>
        <Infos :infos="base" :icons="icons"></Infos>
    </header>
    <!-- 简历详情 -->
    <Exps :exps="exps"></Exps>
  </div>
</template>

<script>
import Infos from './Infos.vue'
import Exps from './Exps.vue'
import {setSessionStorage} from '../edit/public'

export default {
    components: {
        Infos,
        Exps
    },
    data(){
        return {
          lastDom: null,
          colorMode: 'purple'
        }
    },
    methods: {
        // 高亮点击的选项
        highLightAndEdit(e){
          let dom = e.target
          // if(!dom || dom.children.length || dom.className.indexOf('iconfont')>-1) { 
          //   //无效点击：有子节点（如li）/点击的是图标元素
          //   setSessionStorage('clickDom', null)
          //   return
          // }
          if(!dom || !dom.dataset.path){
            setSessionStorage('clickDom', null)
            return
          } 

          if(this.lastDom) this.lastDom.style.backgroundColor = '' // 清除上一次被点击高亮的元素
          this.lastDom = dom
          setSessionStorage('clickDom', dom)  //记录当前的dom
          const domText = dom.textContent.trim()  //被点击节点的文本（textContent也会返回所有子节点的文本）
          dom.style.backgroundColor = "#c6c6c6"
          // 匹配被点击节点所处数据分块，到state中定位数据给json编辑器
          var domField = ''
          var domIndex = '-1'   //点击到分区标题是没有index（自定义）属性的（设为-1），但有part属性（base单独处理）
          while(dom && dom.dataset){
            //dataset会出现undefined
            if(dom.dataset.part){  //存在这个自定义属性-分块字段名
              domField = dom.dataset.part
              break;
            }
            if(dom.dataset.index){  //所属des的索引
              domIndex = dom.dataset.index
            }
            dom = dom.parentNode  //向上搜索
          }
          // 同步到右侧编辑
          this.$emit('clickText', domText, [domField, domIndex])
        },
        
    },
    computed: {
      //从vuex中获取简历数据
      base(){
        return this.$store.state.cvOne.base
      },
      icons(){
        return this.$store.state.cvOne.icons
      },
      exps(){
        return this.$store.state.cvOne.exps
      }
    },
    watch: {
      // base(newvalue){
      //   console.log('cvnewbase  ', this.base, newvalue)
      // }
    },
    mounted(){
        setSessionStorage('curCV', 'cvOne')
    }
}
</script>

<style lang="less">
.page-one {
  display: block;
  header .base{
    text-align: center;
    h1 {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.5rem;
      font-weight: bold;
      margin-top: 8px;
      &::before,
      &::after {
        content: '';
        display: block;
        height: 0.2rem;
        background-color: var(--themeColor);
        width: 20%;
      }
      &::before {
        margin-right: 4rem;
      }
      &::after {
        margin-left: 4rem;
      }
    }
    h2 {
      font-weight: lighter;
      font-size: 0.8rem;
      margin-top: 0.2rem;
    }
    .infos {
      display: flex;
      justify-content: space-around;
      list-style: none;
      margin-top: 0.6rem;
      li {
        display: flex;
        align-items: center;
      }
      i {
        margin-right: 0.5rem;
        height: 1.6rem;
      }
      i::before {
        width: 1rem;
        height: 1rem;
        color: white;
        font-size: 18px;
        // vertical-align: -0.15rem;
        fill: currentColor;
        overflow: hidden;
        background-color: var(--themeColor);
        border-radius: 50%;
        padding: 0.3rem;
      }
      span {
        color: var(--themeColor);
        font-size: 0.8rem;
      }
    }
  }

  div .exps {
    list-style: none;
    margin-top: 0.6rem;
    li {
      border-top: 0.2rem solid var(--themeColor);
      padding: 0.3rem 0.5rem 0.4rem 0.5rem;
      h3 {
        color: var(--themeColor);
        font-weight: bold;
        font-size: 1.1rem;
      }
      p {
        font-size: 14px;
      }
      .des {
        margin-top: 4px;
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        span {
          min-width: 20%;
          margin-right: 2rem;
        }
        .time {
          color: var(--themeColor);
          min-width: 15%;
        }
      }
      .introduce {
        margin-top: 3px;
      }
    }
  }
}


</style>