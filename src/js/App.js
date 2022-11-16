export default {
  props: {
    title: String
  },
  setup(props) {

    // 获取当前时间
    let time = new Date()
    console.log(time.getMonth());
    // 当前季节
    if (time.getMonth()<3) {
      console.log('春');
        import ("@/style/season/spring.css")
        return
    } else if(2 < time.getMonth() && time.getMonth() < 6) {
      console.log('夏');
        import ("@/style/season/summer.css")
        return
    } else if(5 < time.getMonth() && time.getMonth() < 9) {
      console.log('秋');
        import ("@/style/season/autumn.css")
        return
    } else if(8 < time.getMonth() && time.getMonth() < 12) {
      console.log('冬');
        import ("@/style/season/winter.css")
        return
    }
  }
}
  