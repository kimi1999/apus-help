<template>
  <div id="fdCont"style="height:100%;">
    <div v-if="!sending">
      <ut-header :title='remind.add_question.title' fixed class='answer-header'>
        <router-link
          :onclick="`ga('send', 'event','btn', 'click','to_index')`"
          to="/" slot="left">
          <ut-button mini icon>
            <span class="iconfont icon-back" slot='icon'></span>
          </ut-button>
        </router-link>
        <ut-button mini icon slot="right" class='send' @click.native='sendMsg'>
          <span class="iconfont icon-send" slot='icon'></span>
        </ut-button>
      </ut-header>
      <div class="feedback-content">
        <ut-field :label="remind.add_question.from.lable"
                  :placeholder="remind.add_question.from.placeholder"
                  :attr="{ maxlength: 60 }"
                  v-model='from.value'
        ></ut-field>

        <ut-field :label="remind.add_question.to.lable"
                  :value="remind.add_question.to.value"
                  readonly
        ></ut-field>

        <ut-field type='textarea'
                  :placeholder="remind.add_question.send_msg.placeholder"
                  rows="10"
                  v-model='feedback.value'
        ></ut-field>
      </div>
    </div>
    <ut-flexbox v-else align='center' justify='center' style='height:100%'>
      <ut-spinner type='android'></ut-spinner>
    </ut-flexbox>

    <!-- 邮箱未输入、格式错误、问题输入框未输入提示 -->
    <ut-popup v-model="popup" position="top" class='feedback-pop-top' :modal=false>
      <p>{{errorTip}}</p>
    </ut-popup>

  </div>
</template>
<style lang="less">
  #app .uther-field .uther-cell-title{
    flex: initial;
    width: auto;
    margin-right: 15px;
  }

  #fdCont .uther-field.is-textarea textarea{
    border: 1px dotted#eadcdc;
    padding: 5px;
  }
  .feedback-content {
    padding: 0 15px;
    padding-top: 50px;
  }

  .icon-send {
    font-size: 20px;
  }
  .feedback-pop-top {
    text-align: center;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    min-height: 44px;
    height: auto;
    line-height: 44px;
    line-height: 44px;
    z-index: 2;
  }

  .send {
    width: 40px;
  }

  /* 阿拉伯语 适配 */
  .arab{
    #fdCont .is-left, #fdCont .uther-header-button.is-right{
      -webkit-transform: rotateZ(180deg);
      -ms-transform: rotateZ(180deg);
      -moz-transform: rotateZ(180deg);
      transform: rotateZ(180deg);
      margin-right: 0;
    }
    #fdCont .uther-header-button.is-right{
      margin-left: 10px;
    }
    .uther-popup{
      direction: rtl;
    }
    .uther-field .uther-cell-title{
      position: absolute;
      right: 0;
      top: 15px;
      text-align: right;
      direction: rtl !important;
    }
    .uther-field .uther-cell-value{
      input{
        text-align: right;
        direction: rtl !important;
        margin-right: 60px;
      }
      textarea{
        text-align: right;
        direction: rtl !important;
      }
    }
  }

</style>
<script lang="babel">
  import Config from '../config'
  export default{
    name: 'Feedback',
    props: ['remind'],
    data(){
      return {
        from: {
          value: sessionStorage.getItem("apus_club_email")
            ? sessionStorage.getItem("apus_club_email")
            : this.remind.add_question.email,
          validate: ""
        },
        feedback: {
          value: "",
          validate: ""
        },
        popup: false,
        errorTip: this.remind.add_question.from.need_tip,
        sending: false
      }
    },
    computed: {},
    mounted: function(){
//      var setTextareaHeight = function(){
//        //alert("test");
//      }
//      //setTextareaHeight();
//      window.onresize=function(){
//        setTextareaHeight();
//      }
    },
    methods: {
      checkEmail(){
        const v = this.from.value;
        if(!this.from.value || (v.replace(/^[ ]+/g,"").replace(/[ ]+$/g,""))==""){
          this.errorTip = this.remind.add_question.from.placeholder;
          this.popup = true;
          setTimeout(()=> {
            this.popup = false;
          }, 2000);
          return false
        }
        else{
          var emailReg = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
          if (!emailReg.test(this.from.value)) {
            this.errorTip = this.remind.add_question.from.need_tip;
            this.popup = true;
            setTimeout(()=> {
              this.popup = false;
            }, 2000)
            return false;
          }
          return true;
        }
      },
      checkTextarea: function(){
        const v = this.feedback.value;
        if(!this.feedback.value || (v.replace(/^[ ]+/g,"").replace(/[ ]+$/g,""))==""){
          this.errorTip = this.remind.add_question.send_msg.placeholder;
          this.popup = true;
          setTimeout(()=> {
            this.popup = false;
          }, 2000);
          return false
        }
        return true;
      },
      sendMsg(){
        if (this.checkEmail()) {
          if(this.checkTextarea()){
            this.sending = true;
            ga('send', 'event','btn', 'click','send_feadback');
            this.$http.post(Config.base + Config.feedback, {
              contact_way: "",
              email: this.from.value,
              content: this.feedback.value
            }).then(({data})=> {
              //this.$set(this.$root,'remind.add_question.email',this.remind.add_question.email);
              //把更新后的邮箱 放到sessionStorage里面
              sessionStorage.setItem("apus_club_email", this.from.value);
              this.$router.push('/success');
            })
          }
        }
      }
    }
  }
</script>
