// 简历模板2的store
import {getSessionStorage} from '../edit/public'
const state = {
    icons: {
        phone: 'shouji',
        email: 'youxiang',
        github: 'github4',
        address: 'dashaxiaoqudizhi01',
        other: 'linkedin-fill'
    },
    // 基本信息
    base: {
        name: '蜡笔小新',
        avatarUrl: 'https://pic3.zhimg.com/v2-538bbb1e3f8a8943fa869b44f8b289aa_r.jpg?source=1940ef5c',
        position: 'Web前端工程师',
    },
    infos: [
         '珞珈山职业技术学院',
         '硕士',
         '电子科学与技术',
         '点击编辑',
         '点击编辑',
    ],
    contacts: {
        phone: '12345678910',
        address: '湖北武汉',
        email: 'abcabcabc@qq.com',
        github: 'https://xxxxxxxx.github.io',
        other: '其他社交账号'
    },

    // 分块描述
    practice: {
        key: 'practice',
        title: '实践经历',
        des: [
            {
                time: `2021.07 ~ 2021.10`,
                company: `ABC技术有限公司`,
                position: 'JAVA开发实习生',
                introduce: `负责XXX业务相关服务的开发和重构及维护，负责线上产品端服务的同步；日常XXX业务的分析和方案的设计；负责XXX内部SSO单点登录系统后端的架构与开发。`,
            },
            {
                time: `2020.06 ~ 2021.09`,
                company: `XYZ技术有限公司`,
                position: 'JAVA开发实习生',
                introduce: `负责XXX业务相关服务的开发和重构及维护，负责线上产品端服务的同步；日常XXX业务的分析和方案的设计；负责XXX内部SSO单点登录系统后端的架构与开发。`,
            },
        ]
    },
    project: {
        key: 'project',
        title: '项目经验',
        des: [
            {
                time: `2021.12 ~ 2022.03`,
                name: `电商购物系统`,
                link: 'https://xxxxxx.github.com',
                stack: '技术栈：SSM， MySQL， Redis， Nginx， Mycat',
                introduce: `是一个完整的电商购物系统。主要功能是XXXX，在其中负责服务器架构、后端开发。主要功能是XXXX，在其中负责服务器架构、后端开发。`,
            },
            {
                time: `2020.02 ~ 2020.09`,
                name: `财务系统`,
                link: 'https://yyyyyyy.github.com',
                stack: '技术栈：SSM， MySQL， Redis， Nginx， Mycat',
                introduce: `负责分析业务逻辑，完成凭证查询功能的开发、测试工作；完成固定资产盘点的接口开发和往来对账的接口开发；与前端开发伙伴合作，完成财务报表的展示功能。`,
            }
        ]
    },
    skill: {
        key: 'skill',
        title: '专业技能',
        des: [
            "Java基础：熟悉Java基础知识，熟悉多线程并发，熟悉JVM原理",
            "数据库：熟练使用MySQL、Redis及常见的优化手段",
            "框架：熟悉Spring Boot、MyBatis等主流开发框架，熟悉消息队列Kafka、Zookeeper的使用和原理",
            "分布式：了解分布式系统的设计与应用，了解常见的CAP、Paxos算法",
            "工具：熟悉Git、Maven等项目管理及构建工具",
        ]
    },
    prize: {
        key: 'prize',
        title: '校园经历',
        des: [
            {
                time: "2021.11",
                honor: "xx大学专业二等奖学金 · 多次获得",
            },
            {
                time: "2020.07",
                honor: "xx大学首届数学建模大赛 · 二等奖",
            },
            {
                time: "2019.08",
                honor: "华为软件精英挑战赛 · 三等奖",
            },
            {
                time: "点击编辑",
                honor: "点击编辑",
            },
        ]
    },
}

const mutations = {
  initState(state, payload){
      Object.assign(state, payload)  //把本地数据更新到state
  },
  updateCVPart(state, payload){
      let isJsonEditor = payload[0]
      if(isJsonEditor){  //json编辑器的载荷：[true, this.pathkey, this.editor.get()]
          let [,pathkey,newvalue] = payload
          const keypath = pathkey.split("-")
          if(pathkey.includes('base') || pathkey.includes('infos')|| pathkey.includes('contacts')){
            state[keypath[0]] = newvalue
            return
          }
          //处理des数组中的元素
          state[keypath[0]].des.splice(parseInt(keypath[2]), 1, newvalue)

      }else{ //文本框编辑单个标签的载荷：[false, keypath, this.edittext]
          let [,keypath, newvalue] = payload  
          keypath = keypath.split("-")
          let dataObj = keypath.reduce(function(preObj, cur, index, arr){ 
              //返回层级最深那个对象（不是值，是倒数第二个）
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
      const curCV = getSessionStorage('curCV')
      localStorage.setItem(curCV, JSON.stringify(state))
      // state = null
      // state = JSON.parse(localStorage.getItem('cvOne'))
      console.log('cv-state  ', state)
  },

  addPartItem(state, partkey){
      console.log(state[partkey])
      let newvalue = state[partkey]['des'].slice(-1)[0] //复制最后一个元素
      newvalue = JSON.parse(JSON.stringify(newvalue)) //深拷贝
      state[partkey]['des'].push(newvalue) //在该分块添加一项（内容复制上一项的）
      if(getSessionStorage('clickDom')) getSessionStorage('clickDom').click()
  },

  addIntroduce(state, payload){
      let [partkey, desindex, introindex] = payload  
      return 
     
  },

  delIntroduce(state, payload){  //删除一项描述
      let [partkey, desindex, introindex] = payload
      return 
  },

  delDesItem(state, payload){ //删除分块中的一项
      let [partkey, desindex,] = payload
      state[partkey]['des'].splice(desindex, 1)
      if(getSessionStorage('clickDom')) getSessionStorage('clickDom').click()
  }

}
export default {
  namespaced: true,
  state,
  mutations
}
  