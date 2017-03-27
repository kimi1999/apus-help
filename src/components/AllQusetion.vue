<template>
    <div id="allQCont">
        <ut-header :title='remind.common_questions.title' fixed class='answer-header'>
            <router-link to="/" slot="left" :onclick="`ga('send', 'event','link', 'click','to_index')`">
                <ut-button mini icon>
                    <span class="iconfont icon-back" slot='icon'></span>
                </ut-button>
            </router-link>
        </ut-header>

        <ut-group class='all-group' :title='remind.all_question.categoried'>
            <div v-if='list.length>0'>
                <ut-grid :hasLine='false'>
                    <ut-flexbox v-for='item in list' justify='center' align='center' class="grid-box grid-box-fix">
                        <router-link
                          :onclick="`ga('send', 'event','link', 'click','question_${item.id}_in_allQuestions')`"
                          :to="'/question?id='+item.id"
                          style="width:100%;display:block;">
                            <div>
                                <div style="text-align:center">
                                    <img :src='item.icon'>
                                </div>
                                <p class="q-title">{{item.title}}</p>
                            </div>
                        </router-link>
                    </ut-flexbox>
                </ut-grid>
            </div>
            <div v-else style='text-align:center;height:170px;padding:20px'>
                <div class="loading-wrapper">
                    <ut-spinner type='android'></ut-spinner>
                </div>
            </div>
        </ut-group>
    </div>
</template>
<style lang="less">
    .grid-box {
        height: 100px;
        img {
            width: 40px;
        }
        p {
            margin-top: 10px;
            font-size: 13px;
            /* 修复文字太长 一行展示不下时 样式错乱的bug */
            /*overflow: hidden;*/
            /*text-overflow: ellipsis;*/
            /*height: 20px;*/
            /*word-break: break-all;*/
            padding-right: 10px;
            padding-left: 10px;
            text-align: center;
            width: 100%;
            box-sizing: border-box;
        }
    }

    .uther-grid-item{
      margin-top: 20px;
    }
    .grid-box-fix{
      height: auto;
    }

    .all-group {
        padding-top: 50px;
        padding-bottom: 56px;
        .uther-grid {
            border-top: 0;
            border-bottom: 0 !important;
        }
        a {
            color: #444;
        }
    }
    #allQCont .uther-border-tb{
      border-bottom: 0 !important;
      background-image: none!important;
    }
    .arab{
      .q-title{
        direction: rtl !important;
      }
      #allQCont .is-left{
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
                list: []
            }
        },
        mounted(){
            this.$http.post(Config.base + Config.allQuestion).then(({data})=> {
                data = data.data;
                this.$set(this, "list", data);
            })
        }
    }
</script>
