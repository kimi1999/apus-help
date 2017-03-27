<template>
    <div id="mainPage">
        <ut-header :title='remind.common_questions.title' fixed class='main-header'></ut-header>
        <template v-if='questions.length>0'>
            <ut-group class='main-group' :title='remind.common_questions.position_tip'>
                <ut-cell :onclick="`ga('send', 'event','link', 'click','answer_${item.id}_in_index')`"
                         v-for='item in questions'
                         :to="'/answer?id='+item.id"
                         :title="item.title" isLink></ut-cell>
            </ut-group>

        </template>
        <div v-else class='main-group-loading main-group'>
            <div class="loading-wrapper">
                <ut-spinner type='android'></ut-spinner>
            </div>
        </div>
        <Toolbar :text='remind.common_questions' :push-data='pushData'></Toolbar>
    </div>
</template>
<script lang="babel">
    import Toolbar from './Toolbar.vue';
    import Config from '../config'
    export default {
        name: 'Main',
        props: ['remind', 'pushData'],
        data(){
            return {
                questions: []
            }
        },
        components: {
            Toolbar
        },
        mounted(){

            //ga('send', 'event','btn', 'click','sign_up_btn-cn-school_recruit-20160918');

            this.$http.post(Config.base + Config.title)
                    .then(({data})=> {
                        data = data.data;
                        this.$set(this, 'questions', data);
                    });

        }
    }
</script>
<style lang="less" scoped>
    .main-group {
        padding-top: 50px;
        padding-bottom: 56px;
    }

    .main-group-loading {
        text-align: center;
        padding-top: 60px;
    }

    .main-header {
        text-align: left;
    }

</style>

<style lang="less">
    .main-header {
        text-align: left;
        .is-left {
            display: none;
        }
        .uther-header-title {
            padding-left: 10px;
        }
    }


    /* 阿拉伯语 适配 */
    .arab{
      .uther-tab-item:nth-child(2):after{
        content: '';
        width: 1px;
        height: 60%;
        position: absolute;
        display: block;
        right: 0;
        top: 20%;
        background: #444;
        opacity: 0.8;
      }
      .uther-tab-item:first-child:after{
        width: 0;
      }


      .main-header .uther-header-title,.uther-group-title{
        text-align: right;
        direction: rtl;
        padding-right: 10px;
        padding-left: 0;
      }
      .uther-group-title{
        padding-right: 20px;
      }
      .main-group .uther-cell-text{
        text-align: right;
        direction: rtl;
        padding-right: 10px;
        padding-left: 40px;
      }
      #mainPage .main-group .uther-group-wrapper .uther-cell-allow-right:after{
        left: 5px;
        right: auto;
        border-bottom-width: 2px;
        border-left-width: 2px;
        border-top-width: 0;
        border-right-width: 0;
      }
    }

</style>
