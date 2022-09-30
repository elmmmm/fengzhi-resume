<template>
  <div data-part='base' class="base">
    <!-- 姓名 -->
    <h1 data-path="base-name">{{infos.name}}</h1>
    <!-- 求职意向 -->
    <h2 data-path="base-position">{{infos.position}}</h2>
    <ul class="infos">
        <li v-for="(value, k) in infos.tips" :key="k">
            <!-- 图标 -->
            <i :class="['iconfont',`icon-${icons[k]}`]"></i>
            <!-- 内容 -->
            <span :data-path="`base-tips-${k}`">{{value}}</span>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    props:{
        infos: {
            type: Object,
            default: function(){
                return {}
            }
        },
        icons: {
            type: Object,
            default: function(){
                return {}
            }
        }
    },
    data(){
        return {

        }
    },
    watch:{
        // infos(newvalue){
        //     console.log('newbase  ', newvalue)
        // }
    }
}
</script>

<style>

</style>