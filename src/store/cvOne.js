// 我重新设计的模板的默认数据(分成几个部分)
import {getSessionStorage} from '../edit/public'
const state = {
  icons: {
  phone: 'shouji',
  email: 'youxiang',
  school: 'xuexiao',
  major: 'jisuanjikaifa'
},
// 基本信息
base: {
  name: '蜡笔小新',
  position: '求职意向: Web前端工程师',
  tips: {
    phone: '12345678910',
    email: 'abcabcabc@qq.com',
    school: '珞珈山职业技术学院（硕士）',
    major: '电子科学与技术'
  }
},
// 经历描述（分成几方面）
exps: {
  skill: {
    title: '专业技能',
    des: [ //description
      {
        introduce: [
          '熟悉HTML、JS、CSS，熟悉ES5，了解ES6；熟悉Vue开发，了解其核心原理',
        ]
      },
      {
        introduce: [
          '熟悉常用的数据结构；熟悉计算机网络、操作系统等',
        ]
      },
      {
        introduce: [
          '了解Node，有后端开发经验，熟悉MySql，了解Redis、MongoDB',
        ]
      }
    ]
  },
  award: {
    title: '获奖荣誉',
    des: [
      {
        tips: { time: '2020年03月', honor: '国家奖学金' },
      },
      {
        tips: { time: '2019年12月', honor: '国家励志奖学金' },
      },
      {
        tips: { time: '2018年06月', honor: '数学建模大赛银牌' },
      },
    ]
  },
  education: {
    title: '校园经历',
    des: [
      {
        tips: {
          time: '2020.09 – 2023.06',
          school: '珞珈山职业技术学院',
          degree: '硕士',
          major: '电子科学与技术'
        },
        introduce: [
          '担任(加入)XXX实验室/团队 （职称），负责了实验室门户网站的维护，带领团队成员参加了XXX大赛，获得XXX荣誉',
          '担任XXX，负责了XXX工作，收获了XX技能（如Adobe系列）',
        ]
      },
      {
        tips: {
          time: '2016.09 - 2020.06',
          school: '双鸭山大学',
          degree: '本科',
          major: '电子信息工程'
        },
        introduce: [
          '担任(加入)XXX实验室/团队 （职称），负责了实验室门户网站的维护，带领团队成员参加了XXX大赛，获得XXX荣誉',
          '担任XXX，负责了XXX工作，收获了XX技能（如Adobe系列）',
        ]
      }
    ]
  },
  practice: {
    title: '实习经历',
    des: [
      {
        tips: {
          time: '2019.12 - 2020.03',
          company: '美团',
          position: 'Web前端工程师',
        },
        introduce: [
          '参与XXX项目的研发，解决了XXX难题',
          '开发了XXX插件/工具，解决了XXX问题，提升了XXX效率',
        ]
      },
    ]
  },
  project: {
    title: '项目经验',
    des: [
      {
        tips: {
          time: '2021.09 - 2022.02',
          site: 'github.com/xxxx/xxxx',
        },
        introduce: [
          '现有的XXX方式处理XXX情况存在XXX问题',
          '前端部分使用Vue，服务端使用Node/TS/MySQL',
        ]
      },
      {
        tips: {
          time: '2020.03 - 2020.06',
          site: 'github.com/xxxx/xxxx',
        },
        introduce: [
          '简介：校园二手交易平台',
          '难点：图片压缩，大量图片加载，级联选择组件',
          '技术栈：Vue/Express/ElementUI/TS/MySQL',
        ]
      }
    ]
  }
}
}

const mutations = {
  initState(state, payload){
      Object.assign(state, payload)  //把本地数据更新到state
  },
  updateCVPart(state, payload){
      let isJsonEditor = payload[0]
      if(isJsonEditor){  //json编辑器的载荷：[isJsonEditor,partkey, desindex, newvalue]
          let [,partkey, desindex, newvalue] = payload  
          if(partkey==='base'){
              state.base = newvalue
          }else{
              state.exps[partkey]['des'].splice(parseInt(desindex), 1, newvalue) //使用指定的7个数组方法才会更新视图
              // Vue.set(state.exps[partkey]['des'], parseInt(desindex),newvalue) 
          }
      }else{ //文本框编辑单个标签的载荷：[false, keypath, this.edittext]
          let [,keypath, newvalue] = payload  
          keypath = keypath.split("-")
          let dataObj = keypath.reduce(function(preObj, cur, index, arr){ //返回层级最深那个对象（不是值）
              if(index < arr.length-1){
                  return preObj[cur]
              }else{
                  return preObj
              }
          }, state)
          if(Array.isArray(dataObj)){ //introduce为数组，使用指定的7个数组方法才会检测到变化
              const introIndex = parseInt(keypath[keypath.length-1])
              dataObj.splice(introIndex, 1, newvalue) 
          }else{
              dataObj[keypath[keypath.length-1]] = newvalue
          }
          getSessionStorage('clickDom').click()
      }
      
      localStorage.setItem('cvOne', JSON.stringify(state))
      // state = null
      // state = JSON.parse(localStorage.getItem('cvOne'))
      console.log('cvOne-state  ', state)
  },

  addPartItem(state, partkey){
      let newvalue = state.exps[partkey]['des'].slice(-1)[0] //复制最后一个元素
      newvalue = JSON.parse(JSON.stringify(newvalue)) //深拷贝
      state.exps[partkey]['des'].push(newvalue) //在该分块添加一项（文本复制上一项的）
      if(getSessionStorage('clickDom')) getSessionStorage('clickDom').click()
  },

  addIntroduce(state, payload){
      let [partkey, desindex, introindex] = payload  
      if(partkey==='base' || !state.exps[partkey]['des'][desindex]['introduce']){
          return 
      }else{
          if(!introindex) introindex = state.exps[partkey]['des'][desindex]['introduce'].length-1
          // let newvalue = state.exps[partkey]['des'][desindex]['introduce'].slice(-1)[0]
          // newvalue = JSON.parse(JSON.stringify(newvalue)) //深拷贝
          // state.exps[partkey]['des'][desindex]['introduce'].push(newvalue) //添加一项描述（文本复制上一项的）
          let newvalue = state.exps[partkey]['des'][desindex]['introduce'][introindex]
          state.exps[partkey]['des'][desindex]['introduce'].splice(parseInt(introindex), 0, newvalue)
          if(getSessionStorage('clickDom')) getSessionStorage('clickDom').click()
      }
  },

  delIntroduce(state, payload){  //删除一项描述
      let [partkey, desindex, introindex] = payload
      if(partkey==='base' || !state.exps[partkey]['des'][desindex]['introduce']){
          return 
      }else{
          state.exps[partkey]['des'][desindex]['introduce'].splice(parseInt(introindex), 1)
          if(getSessionStorage('clickDom')) getSessionStorage('clickDom').click()
      }
  },

  delDesItem(state, payload){ //删除分块中的一项
      let [partkey, desindex,] = payload
      if(partkey==='base' || !state.exps[partkey]['des']){
          return 
      }else{
          state.exps[partkey]['des'].splice(desindex, 1)
          if(getSessionStorage('clickDom')) getSessionStorage('clickDom').click()
      }
  }

}
export default {
  namespaced: true,
  state,
  mutations
}
  