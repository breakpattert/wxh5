<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="a">
      a
          <div class="b">
            b
              <div class="c">
                c
              </div>
          </div>
      
   </div>
  </div>
   
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss" scoped>
    .a{
      width: 187.5px;
      height: 100px;
      background-color: #cccccc;
      .b{
        width: 100px;
        height: 20px;
        background-color: red;
        .c{
            width: 50px;
            height: 30px;
            background-color: pink;
        }
      }
    }
</style>
