<template>
    <div id="app">
        <template v-if='remind.common_questions'>
            <router-view :remind='remind' :push-data='pushData'></router-view>
        </template>
        <ut-flexbox v-else align='center' justify='center' style='height:100%'>
            <ut-spinner type='android'></ut-spinner>
        </ut-flexbox>
    </div>

</template>


<script lang="babel">
    import Config from './config';
    export default{
        name: "App",
        data(){
            return {
                remind: {},
                pushData: {}
            }
        },
        mounted(){
          const isAPUS = window.ApusHelpJS;
          const allowBrowser = true;//是否允许在 非app情况（浏览器）打开页面
          //test
          if(isAPUS || allowBrowser){
            this.$http.post(Config.base + Config.remind)
              .then(({data}) => {
                data = data.data;
                if(data.letter_direction=="ar"){
                  document.body.className = document.body.className+"arab";
                }
                this.$set(this, 'remind', data);
              });
          }
          else{
            window.location.href = "http://support.apusapps.com/category/apus-discovery/";
          }

        },
        methods: {
            getPushData(){
                this.$http.post(Config.base + Config.push)
                        .then(({data})=> {
                            data = data.data;
                            this.$set(this, 'pushData', data);
                        });
            }
        }
    }
</script>
<style src='./assets/css/index.less' lang="less"></style>
