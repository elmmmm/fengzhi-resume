<template>
    <section >
        <header class="section-hd all-operate-wrapper">
            <span class=section-title-l></span>
            <h2 :data-path="`${partObj.key}-title`" class="section-title">{{partObj.title}}</h2>
            <span class=section-title-r></span>
            <TitleOperate :partkey="partObj.key"></TitleOperate>
        </header>
        <div class=section-bd>
            <ul v-if="!(typeof partObj.des[0]=='object')" class=section-list>
                <!-- "技能"分块的des数组中存的不是对象，是一个个字符串 -->
                <li v-for="(desItem, i) in partObj.des" :key="i" class="all-operate-wrapper">
                    <i :data-path="`${partObj.key}-des-${i}`" class="iconfont icon-yuandianxiao">
                        {{desItem}}
                    </i>
                    <TipOperate v-if="i > 0" :partkey="partObj.key" :desindex="i"></TipOperate>
                </li>
            </ul>
            <div v-else v-for="(desItem, i) in partObj.des" :key="i" class=item>
                <header class="item-hd all-operate-wrapper">
                    <span v-for="(item, k) in filterIntro(desItem)" :key="k" 
                          :data-path="`${partObj.key}-des-${i}-${k}`"
                     >{{item}}</span>
                    <TipOperate v-if="i > 0" :partkey="partObj.key" :desindex="i"></TipOperate>
                </header>
                <h4 v-if="desItem.stack" :data-path="`${partObj.key}-des-${i}-stack`">{{desItem.stack}}</h4>
                <div class=item-bd v-if="desItem.introduce">
                    <p :data-path="`${partObj.key}-des-${i}-introduce`" class=section-content>{{desItem.introduce}}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import TitleOperate from "./TitleOperate.vue"
import TipOperate from "./TipOperate.vue"
export default {
    props: ["partObj"],
    components: {TitleOperate, TipOperate},
    methods: {
        filterIntro(obj){
            let {introduce,stack, ...params} = obj
            // console.log(introduce)
            return params
        }
    }
}
</script>

<style>

</style>