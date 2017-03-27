<template>
    <div id="scCont" style='height:100%'>
        <ut-header :title='remind.add_success.title' fixed class='answer-header'>
            <router-link
              :onclick="`ga('send', 'event','btn', 'click','to_index')`"
              to="/" slot="left">
                <ut-button mini icon>
                    <span class="iconfont icon-back" slot='icon'></span>
                </ut-button>
            </router-link>
        </ut-header>
        <ut-flexbox align='center' justify='center' class="success-wrapper">
            <div class="container">
                <i class="icon-right iconfont"></i>
                <h3>{{remind.add_success.list_from_title}}</h3>
                <p>{{remind.add_success.tip_words}}</p>
                <router-link
                  :onclick="`ga('send', 'event','link', 'click','to_allQuestions')`"
                  to="/allQuestion">
                    <ut-button type='primary' mini>{{remind.add_success.to_faq}}</ut-button>
                </router-link>
                <p>
                  <a href="javascript:void(0)"
                     :onclick="`ga('send', 'event','link', 'click','close_web')`"
                     @click="closeWeb()" style="color:gray;">
                    {{remind.add_success.later}}
                  </a>
                </p>
            </div>
        </ut-flexbox>
    </div>
</template>
<style lang="less" >
    .success-wrapper {
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        line-height: 1.5;
        .container {
            padding: 50px;
        }
        i {
            font-size: 120px;
            color: #6b63e1;
            margin-bottom: 20px;
            display: inline-block;
        }
        h3 {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        button{
            padding: 6px 15px;
            margin-top: 10px;
        }
    }
  .arab{
    .success-wrapper .container{
      direction: rtl !important;
    }

    #scCont .is-left{
      -webkit-transform: rotateZ(180deg);
      -ms-transform: rotateZ(180deg);
      -moz-transform: rotateZ(180deg);
      transform: rotateZ(180deg);
      margin-right: 0;
    }
  }
</style>
<style lang="less">
    .success-wrapper {
        p {
            font-size: 15px;
            margin-bottom: 35px;
        }
        button {
            padding: 5px 8px;
            margin-bottom: 15px;
        }
    }
</style>
<script lang="babel">
    export default{
        name: "success",
        methods: {
          closeWeb(){
            window.ApusHelpJS&&window.ApusHelpJS.callFinish();

          }
        },
        props: ['remind']
    }
</script>
