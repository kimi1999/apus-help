<template>
    <div id="answerCont">
        <ut-header :title='remind.common_questions.title' fixed class='answer-header'>
            <router-link
              :onclick="`ga('send', 'event','btn', 'click','to_index')`"
              to="/" slot="left">
                <ut-button mini icon>
                    <span class="iconfont icon-back" slot='icon'></span>
                </ut-button>
            </router-link>
        </ut-header>
        <div class="answer-content">
            <div v-if='loaded'>
                <div class="answer-title uther-border-b" >
                    <h3 v-text='content.title'></h3>
                </div>
                <div class="answer-body" v-html='content.info'></div>
            </div>
            <div class="loading" v-if='!loaded'>
                <div class="loading-wrapper">
                    <ut-spinner type='android'></ut-spinner>
                </div>
            </div>
        </div>
        <Toolbar :text='remind.common_questions' :push-data='pushData'></Toolbar>
    </div>
</template>
<style lang="less">
    .loading {
        text-align: center;

    }

    .answer {
        &-header {
            text-align: left;
        }
        &-content {
            padding: 15px;
            padding-top: 65px;
            padding-bottom: 56px;
            background-color: #fff;
            h3 {
                font-size: 16px;
                padding-bottom: 8px;
                font-weight: bold;
            }
        }
        &-body {
            padding: 10px 0;
            font-size: 16px;
            line-height: 1.41;
        }
    }

    /* 阿拉伯语 适配 */
    .arab{
      .uther-header-title,.answer-content h3,.answer-body,.answer-body *{
        text-align: right !important;
        direction: rtl !important;
      }
      #answerCont .is-left{
        -webkit-transform: rotateZ(180deg);
        -ms-transform: rotateZ(180deg);
        -moz-transform: rotateZ(180deg);
        transform: rotateZ(180deg);
        margin-right: 0;
      }
    }
</style>
<script lang="babel">
    import Config from '../config';
    import Toolbar from './Toolbar.vue';
    export default{
        name: "Answer",
        props: ['remind', 'pushData'],
        data(){
            return {
                content: {}
            }
        },
        components: {
            Toolbar
        },
        computed: {
            loaded(){
                return this.content.title;
            }
        },
        mounted(){
            this.$http.post(Config.base + Config.answer, {id: this.$route.query.id})
                    .then(({data})=> {
                        data = data.data;
                        this.content = data[0];
                    })
        }
    }
</script>
