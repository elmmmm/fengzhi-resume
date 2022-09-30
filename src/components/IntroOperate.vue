<template>
  <div class="title-operate-icon">
    <div @click.stop="addIntroItem" class="icon-item add-icon">
      <i class="iconfont icon-tianjia"></i>
    </div>
    <div @click.stop="delIntroItem" class="icon-item delete-icon">
      <i class="iconfont icon-shanchu1"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    partkey: {
      type: String,
      default: 'base'
    },
    desindex: {
      type: Number,
      default: 0
    },
    introindex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    addIntroItem(){
      this.$store.commit('cvOne/addIntroduce', [this.partkey, this.desindex, this.introindex])
    },

    delIntroItem(){
      this.$store.commit('cvOne/delIntroduce', [this.partkey, this.desindex, this.introindex])
    }
  }
};
</script>

<style>

</style>