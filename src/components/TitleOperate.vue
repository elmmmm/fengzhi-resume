<template>
  <div class="title-operate-icon ">
    <div @click="addPartItem" class="icon-item add-icon">
      <i class="iconfont icon-tianjia"></i>
    </div>
  </div>
</template>

<script>
import {getSessionStorage} from "../edit/public"
export default {
    props:{
      partkey: {
        type: String,
        default: 'base'
      },
    },
    methods: {
        addPartItem(){
            const curCV = getSessionStorage('curCV')
            this.$store.commit(`${curCV}/addPartItem`, this.partkey)
        }
    }
};
</script>

<style scoped>

</style>