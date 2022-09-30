<template>
  <div class="title-operate-icon">
    <div @click.stop="delDes" class="icon-item delete-icon">
      <i class="iconfont icon-shanchu1"></i>
    </div>
  </div>
</template>

<script>
import {getSessionStorage} from "../edit/public"
export default {
  props: {
    partkey: {
      type: String,
      default: 'base'
    },
    desindex: {
      type: Number,
      default: 1
    },
  },
  methods: {
    delDes(){
      const curCV = getSessionStorage('curCV')
      this.$store.commit(`${curCV}/delDesItem`, [this.partkey, this.desindex])
    }
  }
};
</script>

<style>

</style>