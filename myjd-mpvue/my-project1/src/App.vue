<script>
  // const app = getApp()

export default {
    data () {
      return {
      }
    },
    created () {
    },
    mounted () {
      // setTimeout(this.findUser, 1000)
    },
    log () {
      console.log(`log at:${Date.now()}`)
    },
    methods: {
    }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
