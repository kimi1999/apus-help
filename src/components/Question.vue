<template>
    <div id="qCont">
        <ut-header :title='remind.common_questions.title' fixed class='answer-header'>
            <router-link
              to="/allQuestion"
              :onclick="`ga('send', 'event','btn', 'click','to_allQuestions')`"
              slot="left">
                <ut-button mini icon>
                    <span class="iconfont icon-back" slot='icon'></span>
                </ut-button>
            </router-link>
        </ut-header>
        <div class="answer-content"
             ref='answer'
             v-infinite-scroll="loadMore"
             infinite-scroll-disabled="loading"
             infinite-scroll-distance="10">
            <div v-if='list.length'>
                <div v-for='content in list'>
                    <div class="answer-title uther-border-b">
                        <h3 v-text='content.title'></h3>
                    </div>
                    <div class="answer-body" v-html='content.info'></div>
                </div>
            </div>
            <div class="loading" v-if='!list.length'>
                <div class="loading-wrapper">
                    <ut-spinner type='android'></ut-spinner>
                </div>
            </div>
        </div>
        <transition name='fade'>
            <ut-tabbar fixed class='question-toolbar' v-show='loading'>
                <ut-tab-item>
                    <router-link :to="link">
                        <ut-flexbox align='center' justify='center'>
                            <div class="to-feedback">
                                <i class="question"></i>
                                {{remind.common_questions.feedback}}
                            </div>
                        </ut-flexbox>
                    </router-link>
                </ut-tab-item>
            </ut-tabbar>
        </transition>
    </div>
</template>
<style lang="less">
    .group-wrapper {
        padding-top: 50px;
        padding-bottom: 56px;
        h3 {
            font-weight: bold;
            font-size: 16px;
            margin-bottom: 8px;
        }
        & > div {
            padding: 15px;
            line-height: 1.41;
            font-size: 15px;
        }
    }

    .question-toolbar {
        .uther-tab-item:after {
            display: none;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .5s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0;
        transform: translateY(55px);
    }

    .arab{
      .to-feedback{
        direction: rtl !important;
      }
      #qCont .is-left{
        -webkit-transform: rotateZ(180deg);
        -ms-transform: rotateZ(180deg);
        -moz-transform: rotateZ(180deg);
        transform: rotateZ(180deg);
        margin-right: 0;
      }
    }
</style>
<script lang="babel">
    import Config from '../config'
    export default{
        props: ['remind'],
        data(){
            return {
                list: [],
                loading: false,
                link: '/feedback',
                pushData:{},
                ready: false
            }
        },
      watch:{
        "pushData":function(){
          if(this.pushData.link){
            this.link = '/reply';
          }
        }
      },
        mounted(){
            this.getPushData();
        },
        methods: {
            /* 判断是否有与自己相关的回复 决定底部 feadback 按钮的去向 */
            getPushData(){
              this.$http.post(Config.base + Config.push)
                .then(({data})=> {
                  data = data.data;
                  this.$set(this, 'pushData', data);
                  this.getQuestionById();
                });
            },
            /* 根据id获取某类 问题列表 */
            getQuestionById(){
              this.$http.post(Config.base + Config.question, {id: this.$route.query.id}).then(({data})=> {
                data = data.data;
                this.$set(this, "list", data.answers);
                this.$nextTick(()=> {
                  if (this.$refs.answer.clientHeight < document.body.clientHeight) {
                    this.loading = true;
                  }
                })
              });
            },
            loadMore(){
                if (this.ready) {
                    this.loading = true;
                } else {
                    this.ready = true;
                }
            }
        }
    }
</script>
