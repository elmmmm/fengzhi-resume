<template>
    <div @click="highLightAndEdit($event)" 
         id="page" ref="toPdf"
         class="content-bd cvborder"
         :color-mode="colorMode"
      >
        <header class="content-left content-hd">
            <section class="title">
                <img class="avator" :src="base.avatarUrl">
                <div class="file-container">点击上传头像
                    <input id="file" type="file" @change="$emit('saveImg',$event)" accept="image/*">
                </div>
                <div class="name">
                    <h1 :data-path="`base-name`">{{base.name}}</h1>
                </div>
               <h2 :data-path="`base-position`" class="job">{{base.position}}</h2>
            </section>
            <section class="info">
              <div v-for="(info, i) in infos" :key="i">
                <h2 :data-path="`infos-${i}`">{{info}}</h2>
              </div>
            </section>
            <section class="contact">
              <ul>
                  <li v-for="(contact, k) in contacts" :key="k">  
                    <i :class="['iconfont', `icon-${icons[k]}`]"></i>
                    <span :data-path="`contacts-${k}`" class="contact-link">{{contact}}</span>
                  </li>
              </ul>
            </section>
        </header>

        <div class=content-right>
          <TwoPart :partObj="practice"></TwoPart>
          <TwoPart :partObj="project"></TwoPart>
          <TwoPart :partObj="skill"></TwoPart>
          <TwoPart :partObj="prize"></TwoPart>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import TwoPart from "./TwoPart.vue"
import {setSessionStorage} from '../edit/public'
export default {
  props: [""],
  components: {TwoPart},
  data(){
        return {
          lastDom: null,
          colorMode: 'blue'
        }
    },
  computed: {
    //从vuex中获取简历数据
    ...mapState({
      icons: state => state.cvTwo.icons,
      base: state => state.cvTwo.base,
      infos: state => state.cvTwo.infos,
      contacts: state => state.cvTwo.contacts,
      practice: state => state.cvTwo.practice,
      project: state => state.cvTwo.project,
      skill: state => state.cvTwo.skill,
      prize: state => state.cvTwo.prize,
    }),

  },
  methods: {
    // 高亮点击的选项
    highLightAndEdit(e){
      let dom = e.target
      if(!dom || !dom.dataset.path){ //无效点击
        setSessionStorage('clickDom', null)
        return
      } 

      if(this.lastDom) this.lastDom.style.backgroundColor = '' // 清除上一次被点击高亮的元素
      this.lastDom = dom
      setSessionStorage('clickDom', dom)  //记录当前的dom
      const domText = dom.textContent.trim()  //被点击节点的文本（textContent也会返回所有子节点的文本）
      dom.style.backgroundColor = "#c6c6c6"
      // 匹配被点击节点所处数据分块，到state中定位数据给json编辑器（简历直接传递data-path）
      var domPath = ''
      while(dom && dom.dataset){
        //dataset会出现undefined
        if(dom.dataset.path){  //存在这个自定义属性-分块字段名
          domPath = dom.dataset.path
          break;
        }
        dom = dom.parentNode
      }
      // 同步到右侧编辑
      this.$emit('clickText', domText, [domPath])
    },
  },
  mounted(){
    setSessionStorage('curCV', 'cvTwo')
  }
};
</script>

<style lang="less">
.content-bd {
  display: flex;
  min-width: 200px;
  flex-flow: row wrap;
  overflow: hidden;

  .content-left {
    box-sizing: border-box;
    padding: 20px 30px 50px;
    flex: 3.5;
    background: #eeeeee;
    color: #fff;
    overflow: hidden;
    .title {
      font-weight: 300;
      overflow: hidden;
      padding-bottom: 5px;
      padding-top: 40px;

      .file-container {
        display: none; 
      }
      .avator {
        display: block;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin: 0 auto;
      }
      .name {
        margin-top: 20px;
        text-align: center;
        color: var(--themeColor);
        font-size: 24px;
        h1 {
          font-family: "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", sans-serif;
          font-weight: 600;
        }
      }
      .job {
        text-align: center;
        color: var(--themeColor);
        font-size: 24px;
        font-weight: 500;
      }
    }

    // 技能条
    .skill-level {
      padding-top: 80px;
    }

    .info {
      text-align: center;
      color: #555;
      line-height: 30px;
      h2 {
        margin: 14px 0;
        font-size: 18px;
      }
      h3 {
        font-size: 16px;
        margin-top: 10px;
      }
    }

    .contact {
      padding-top: 110px;
      ul {
        margin: 8px 0 4px;
        &>li {
          height: 22px;
          margin-bottom: 12px;
          position: relative;
          i {
            color: var(--themeColor);
            font-size: 18px;
            margin-right: 6px;
          }
          span{
            color: #555;
            font-size: 18px;
            font-family: "Lucida Grande", "Hiragino Sans GB", "Hiragino Sans GB W3", "Helvetica Neue", Helvetica, Arial, "Microsoft YaHei", sans-serif;
            line-height: 22px;
          }
        }
      }
    }

  }

  .content-right {
    flex: 6.5;
    padding: 20px 30px 50px;
    background: white;
    .section-hd {
      position: relative;
      height: 32px;
      margin: 10px auto 5px;
      overflow: hidden;
      .section-title-l,.section-title-r {
        position: absolute;
        top: 50%;
        display: inline-block;
        width: 33%;
        height: 0;
        vertical-align: middle;
        border-top: 2px solid var(--themeColor);
      }
      .section-title-l {
        left: 0;
      }
      .section-title-r {
        right: 0;
      }
      .section-title {
        position: relative;
        z-index: 1;
        width: 30%;
        min-width: 100px;
        margin: 0 auto;
        padding: 4px 10px;
        border-radius: 32px;
        font-size: 16px;
        text-align: center;
        background-color: #eee;
      }

    }

    .section-bd {
      overflow: hidden;
      .section-list {
        padding: 10px 0 5px;
        li {
          position: relative;
          margin-top: 5px;
          i {
            font-size: 14px;
          }
        }
      }

      .item {
        margin-top: 6px;
        .item-hd {
          display: flex;
          font-weight: 550;
          justify-content: space-between;
        }
        .item-bd{
          margin-top: 5px;
        }
      }
    }
  }

}

</style>