 /**
  * 关于表格的一些个方法
  */
 export default {
     /**
      * 
      * @param {*表格的序号生成} index 
      */
     indexMethod(index) {
         return (this.currentPage - 1) * this.pagesize + 1 + index;
     }
 };