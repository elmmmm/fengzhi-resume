<template>
  <div class="header">
    <el-dropdown @command="changeCV" type="primary" trigger="click" >
      <el-button size="medium">
        切换模板<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="cvOne">模板一</el-dropdown-item>
        <el-dropdown-item command="cvTwo">模板二</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown @command="handleCommand" type="primary" trigger="click">
      <el-button size="medium">
        切换颜色<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="grey">灰色</el-dropdown-item>
        <el-dropdown-item command="pink">粉色</el-dropdown-item>
        <el-dropdown-item command="blue">蓝色</el-dropdown-item>
        <el-dropdown-item command="purple">紫色</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button @click="downPdf" icon="el-icon-s-promotion" round size="medium">导出简历</el-button>
  </div>
</template>

<script>
import { getSessionStorage } from "../../edit/public";

export default {
  data() {
    return {};
  },
  computed: {},
  methods: {
    downPdf() {
      if (getSessionStorage("clickDom"))
        getSessionStorage("clickDom").style.backgroundColor = "";
      this.$emit("downPdf");
    },
    changeCV(command) {
      this.$message({
          message: '模板: ' + command,
          type: 'success',
          center: true,
          duration: 1000
        })
        this.$emit('changeCV', command)
    },
    handleCommand(command){
        this.$message({
          message: '颜色: ' + command,
          type: 'success',
          center: true,
          duration: 1000
        })
        this.$emit('changeColor', command)
    }
  },
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 100%;
  // justify-content: space-between;
  align-items: center;
  .el-dropdown {
    margin: 0 8px;
    &+.el-button{
    margin: 0 10px;
  }
  }
  
}

.r-content {
  display: flex;
  align-items: center;
  .greet {
    margin-right: 14px;
    font-size: 16px;
    color: #1c68ab;
  }
  .user {
    height: 40px;
    border-radius: 50%;
  }
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
.el-icon-arrow-down {
  font-size: 12px;
}
</style>