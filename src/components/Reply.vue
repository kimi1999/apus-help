<template>
    <div id="reply">
        <ut-header :title='remind.common_answer.title' fixed class='answer-header'>
            <router-link
              :onclick="`ga('send', 'event','btn', 'click','to_index')`"
              to="/"
              slot="left">
                <ut-button mini icon>
                    <span class="iconfont icon-back" slot='icon'></span>
                </ut-button>
            </router-link>
            <router-link
              :onclick="`ga('send', 'event','btn', 'click','to_feadback')`"
              to="/feedback" slot="right">
                <ut-button mini icon class='feedback-icon'>
                    <span class="iconfont icon-feedbackwrite" slot='icon' :disabled='disabled'></span>
                </ut-button>
            </router-link>
        </ut-header>
        <div class="reply_wrapper">
          <div v-if='list.length>0' class="reply-cell uther-border-b" v-for='item in list'>
            <ut-flexbox>
              <ut-flex-item fixed style='width:60px'>
                <div class="reply-logo">
                  <span></span>
                </div>
              </ut-flex-item>
              <ut-flex-item class='reply-body'>
                <h3>{{remind.add_question.from.lable}} APUS</h3>
                <p>{{item.answer}}</p>
                <div class="reply-question">
                  {{item.question}}
                </div>
              </ut-flex-item>
            </ut-flexbox>
          </div>
          <div v-show="list.length==0" class="loading">
            <div class="loading-wrapper">
              <ut-spinner type='android'></ut-spinner>
            </div>
          </div>

        </div>
    </div>
</template>

<style lang="less">
    .feedback-icon{
        width: 40px;
        .iconfont {
            font-size: 19px;
        }
    }

    .reply_wrapper {
        padding: 20px;
        padding-top: 70px;
    }
    .reply-cell{
        margin-bottom: 15px;
    }
    .reply-logo {
        width: 40px;
        span{
          display: inline-block;
          width: 40px;
          height: 40px;
          background: url("../assets/images/icon-logo.png") center center no-repeat;
          background-size: 40px 40px;
        }
    }

    .reply-body {
        text-align: left;
        padding-bottom: 10px;
        h3 {
            color: #6c67DE;
            font-size: 16px;
            font-weight: 500;
        }
        p {
            line-height: 20px;
            font-size: 16px;
            margin-bottom: 8px;
        }
        .reply-question {
            box-sizing: border-box;
            padding: 8px 10px;
            line-height: 20px;
            word-break: break-all;
            background-color: #fafafa;
            font-size: 14px;
            margin-left: -5px;
        }
    }


    /* 阿拉伯语 适配 */
    .arab{
      #reply{
        .is-right{
          display: block;
          flex: .2 !important;
          text-align: left;
          margin-left: 10px;
        }
        .is-left{
          -webkit-transform: rotateZ(180deg);
          -ms-transform: rotateZ(180deg);
          -moz-transform: rotateZ(180deg);
          transform: rotateZ(180deg);
          margin-right: 0;
        }
        .uthur-flexbox-col.uthur-flexbox-fixed{
          position: absolute;
          right: 0;
        }
        .reply-body{
          text-align: right;
        }
      }
    }

</style>
<script lang="babel">
    import Config from '../config';
    export default{
        name: 'reply',
        props: ['remind'],
        data(){
            return {
                list: []
            }
        },
        computed: {

        },
        mounted(){
            //告诉客户端 已经读过新消息 去掉icon的角标
            //window.ApusHelpJS&&window.ApusHelpJS.hasOpenedFeedbackDetailWeb();
            this.$http.post(Config.base + Config.helpInfo).then(({data})=> {
              console.log(data);

                data = data.data;
                this.$set(this, "list", data.reply_info);
            })
        }
    }
</script>
