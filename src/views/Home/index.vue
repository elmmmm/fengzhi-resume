<template>
  <el-container>
    <el-header>
      <MyHeader @downPdf="downPdfHandle" @changeColor="changeColorHandle" @changeCV="changeCVHandle"></MyHeader>
    </el-header>
    <el-row :gutter="0">
      <el-col :span="16">
        <!-- 动态组件 component -->
        <component v-bind:is="currentCV"  @clickText = "clickTextHandler(arguments)" ref="cv"></component>
      </el-col>
      <el-col :span="8" class="right">
        <EditTool :curtext="curtext" :curField="curField"></EditTool>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
import html2canvas from "html2canvas"
import JSPDF from "jspdf"
import MyHeader from './MyHeader.vue'
import CvOne from "../../components/CvOne.vue"
import CvTwo from "../../components/CvTwo"
import EditTool from "../../components/EditTool.vue"
import SchemaEditor from "../../edit/schemaEditor"

export default {
  components: {
    MyHeader,
    EditTool,
    CvOne,
    CvTwo
  },
  data(){
    return {
      curtext: "",
      curField: [],
      currentCV: 'CvOne'
    }
  },
  methods: {
    clickTextHandler(param){
      console.log('home receive: ', param)
      this.curtext = param[0]
      this.curField = param[1] 
    },
    changeColorHandle(command){
      this.$refs.cv.colorMode = command
    },
    changeCVHandle(command){
      if(this.currentCV == command) return
      this.currentCV = command
      document.getElementById('domContext').value = ""
      SchemaEditor.getInstance().set({});  //SchemaEditor对象，不是JSONEditor对象
    },

    downPdfHandle(){
      console.log("downpdf ", this.$refs)
      let cvdom = document.getElementById('page')
      cvdom.classList.remove('cvborder')
      this.htmlToPdf('mycv', Date.now())
      cvdom.classList.add("cvborder")
    },

    htmlToPdf(name, time) {
      let element = this.$refs.cv.$refs.toPdf;
      // let element = document.getElementById("page")
      html2canvas(element, {
        dpi: 120, // 图片清晰度问题
        useCORS:true, // 支持跨域打印图片
        logging: false,
      }).then(function (canvas) {
        let pdf = new JSPDF("p", "mm", "a4"); // A4纸，纵向
        let ctx = canvas.getContext("2d");
        let a4w = 200;
        let a4h = 287; 
        // A4大小：210mm x 297mm，四边各保留5mm的边距，显示区域190x277
        let imgHeight = Math.floor((a4h * canvas.width) / a4w); // 按A4显示比例换算一页图像的像素高度
        let renderedHeight = 0;
        while (renderedHeight < canvas.height) {
          let page = document.createElement("canvas");
          page.width = canvas.width;
          page.height = Math.min(imgHeight, canvas.height - renderedHeight); // 可能内容不足一页

          // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
          page.getContext("2d")
              .putImageData(
                ctx.getImageData(
                  0,
                  renderedHeight,
                  canvas.width,
                  Math.min(imgHeight, canvas.height - renderedHeight)
                ),
                0,
                0
            );
          pdf.addImage(
            page.toDataURL("image/jpeg", 1.0),
            "JPEG",
            5,
            5,
            a4w,
            Math.min(a4h, (a4w * page.height) / page.width)
          ); // 添加图像到页面，保留5mm边距

          // 如果后面还有内容，添加一个空页
          renderedHeight += imgHeight;
          if (renderedHeight < canvas.height) {
            pdf.addPage();
          }
        }
        pdf.save(name + time);
      });
    },

  },
  created(){
    // const initData = localStorage.getItem('cvOne')
    // //如果本地没有数据就使用原vuex中的模板数据，否则使用本地数据更新store
    // if(!initData){
    //   return
    // }
    // this.$store.commit('cvOne/initState', JSON.parse(initData))
  }
};
</script>

<style>
</style>