<template>
    <ut-tabbar fixed>
        <ut-tab-item>
            <router-link to="/allQuestion" :onclick="`ga('send', 'event','btn', 'click','to_allQuestions')`">
                <ut-flexbox align='center' justify='center'>
                    <div class="question-wrapper">
                        <i class="question"></i>
                        {{text.btn_all_question}}
                    </div>
                </ut-flexbox>
            </router-link>
        </ut-tab-item>
        <ut-tab-item>
            <router-link :to="link" :onclick="`ga('send', 'event','btn', 'click','to_feadback')`">
                <ut-flexbox align='center' justify='center'>
                    <div class="feedback-wrapper">
                        <i class="feedback" :class='{"is-red":pushData.red}'></i>
                        {{text.feedback}}
                    </div>
                </ut-flexbox>
            </router-link>
        </ut-tab-item>
    </ut-tabbar>
</template>
<style lang="less">
    .question {
        display: block;
        margin: 0 auto;
        height: 24px;
        width: 50px;
        //background: url("http://static.appbox.apuslauncher.com/upload/fe/20160909145021cbb9e5e6fe.png") center center no-repeat;
        background: url("../assets/images/ic_question_answer_black_24dp.png") center center no-repeat;
        background-size: auto 24px;
    }

    .feedback {
        display: block;
        margin: 0 auto;
        height: 24px;
        width: 50px;
        //background: url("http://static.appbox.apuslauncher.com/upload/fe/201609091450147e556e5b61.png") center center no-repeat;
        background: url("../assets/images/ic_feedback_black_24dp.png") center center no-repeat;
        background-size: auto 24px;
    }
    .arab{
      .question-wrapper, .feedback-wrapper {
        direction: rtl;
      }
    }

    .is-red:after {
        content: '';
        background: #d22028;
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        position: relative;
        left: 33px;
        opacity: 0.7;
    }
</style>
<script lang="babel">
    export default{
        name: 'toolbar',
        props: ['text', 'pushData'],
        computed: {
            link(){
                if (this.pushData.link) {
                    return '/reply';
                } else {
                    return '/feedback';
                }
            }
        },
        mounted(){
            this.$root.$children[0].getPushData()
        }
    }
</script>
