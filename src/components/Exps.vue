<template>
  <div>
    <ul class="exps">
        <li v-for="(part, iPart) in partKey" :key="iPart" :data-part='part'>
            <h3 :data-path="`exps-${part}-title`" class="all-operate-wrapper">
                {{exps[part].title}}
                <TitleOperate :partkey="part"></TitleOperate>
            </h3> 
            <!-- des是数组，每个元素都是一条分块相关的记录（一次实习、一份学历） -->
            <div v-for="({tips, introduce}, index) in exps[part].des" 
                :key="index" 
                :data-index='index' 
                :class="{'all-operate-wrapper': !tips}"
            >
                <!-- 每一项顶行概览 -->
                <p v-if="tips" class="des all-operate-wrapper">
                    <!-- v-for="(value,key) in obj" tips是对象 -->
                    <span v-for="(str, k) in tips" :key="k" :data-path='`exps-${part}-des-${index}-tips-${k}`'>{{str}}</span>
                    <TipOperate v-if="index > 0" :partkey="part" :desindex="index"></TipOperate>
                </p>
                
                <!-- 展开详情描述 introduce是数组 -->
                <div v-if="introduce" class="introduce">  
                    <p v-for="(str, i) in introduce" :key="i" 
                       :data-path='`exps-${part}-des-${index}-introduce-${i}`'
                       class="all-operate-wrapper"
                    >
                        {{str}}
                        <IntroOperate v-if="i > 0" :partkey="part" :desindex="index" :introindex="i"></IntroOperate>
                    </p>
                </div>
                <TipOperate v-if="!tips" :partkey="part" :desindex="index"></TipOperate>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import TitleOperate from '../components/TitleOperate.vue'
import IntroOperate from './IntroOperate.vue'
import TipOperate from '../components/TipOperate.vue'
export default {
    components: {TitleOperate, IntroOperate, TipOperate},
    props:{
        exps: {
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    computed: {
        partKey: function(){
            return Object.keys(this.exps)
        }
    },
    watch: {
        // exps: {
        //     deep: true,  //要开启deep才会监视到层级更深的变化
        //     handler(newvalue){
        //         console.log('newexps   ',newvalue)
        //     }
        // }
    }
}
</script>

<style>

</style>