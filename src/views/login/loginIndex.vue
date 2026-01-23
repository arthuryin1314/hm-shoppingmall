<template>
  <div class="login-page">
    <!-- 标题栏 -->
    <el-page-header content="详情页面" class="page-header"></el-page-header>
    <!-- 登录表单容器（负责居中） -->
    <div class="form-wrapper">
      <div class="form">
        <!-- 手机号输入框 -->
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="tel" v-model="telNum">
        </div>

        <!-- 图形验证码 -->
        <div class="form-item code-item">
          <input class="inp code-inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="codeInput">
          <img :src="picUrl" alt="图形验证码" class="code-img" v-if="picUrl" @click="getPic">
        </div>

        <!-- 短信验证码 -->
        <div class="form-item code-item">
          <input class="inp sms-inp" placeholder="请输入短信验证码" type="text" v-model="smsCode">
          <button class="get-code-btn" @click="timerIndex">{{totalSeconds==second?'获取验证码':second+'秒后重试'}}</button>
        </div>
      </div>

      <!-- 登录按钮 -->
      <div class="login-btn" @click="loginIndex">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicCode, login, sendSmsCode } from '@/api/login.js'
import { PageHeader, Message } from 'element-ui'

// import 'element-ui/lib/theme-chalk/alert.css'
export default {
  components: {
    ElPageHeader: PageHeader
  },
  data () {
    return {
      picUrl: '',
      picKey: '',
      codeInput: '',
      isShow: false,
      totalSeconds: 60,
      second: 60,
      timer: null,
      telNum: '',
      smsCode: ''
    }
  },
  created () {
    this.getPic()
  },
  methods: {
    async getPic () {
      const { data: { base64, key } } = await getPicCode()
      // console.log(res)
      this.picUrl = base64
      this.picKey = key
    },
    async timerIndex () {
      if (!/^1[3-9]\d{9}$/.test(this.telNum)) {
        // this.isShow = true
        Message({
          message: '手机号填写有误',
          type: 'error'
        })
      } else if (!/^[0-9a-zA-Z]{4}$/.test(this.codeInput)) {
        Message({
          message: '图形验证码填写有误',
          type: 'error'
        })
      } else if (!this.timer && this.second === this.totalSeconds) {
        const res = await sendSmsCode(this.codeInput, this.picKey, this.telNum)
        console.log(res)
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSeconds
          }
        }, 1000)
      }
    },
    async loginIndex () {
      if (this.smsCode.length === 0) {
        Message({
          message: '短信验证码不能为空',
          type: 'error'
        })
      } else if (!/^1[3-9]\d{9}$/.test(this.telNum)) {
        // this.isShow = true
        Message({
          message: '手机号填写有误',
          type: 'error'
        })
      } else if (!/^[0-9a-zA-Z]{4}$/.test(this.codeInput)) {
        Message({
          message: '图形验证码填写有误',
          type: 'error'
        })
      } else {
        const res2 = await login(this.telNum, this.smsCode)
        console.log(res2)
        Message({
          message: '登录成功',
          type: 'success'
        })
        this.$store.commit('user/setUser', res2)
        this.$router.push('/home')
      }
    }
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

}
</script>

<style>
/* 页面容器：占满屏幕，控制整体布局 */
.login-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 60px;
  /* 给底部导航栏留空间 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 标题栏：返回箭头居左，标题居中 */
.page-header {
  background-color: #fff;
  padding: 12px 15px;
  border-bottom: 1px solid #eee;
  width: 100%;
  position: relative;
}

/* 穿透修改标题栏内置样式 */
.page-header>>>.el-page-header__left {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
}

.page-header>>>.el-page-header__content {
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding-left: 0 !important;
}

/* 表单外层容器：页面垂直+水平居中 */
.form-wrapper {
  max-width: 350px;
  /* 限制表单最大宽度，避免太宽 */
  width: 90%;
  /* 小屏幕自适应 */
  margin: 60px auto 0;
  /* 垂直居中核心：上下margin+auto */
}

/* 表单样式：增大尺寸+优化间距 */
.form {
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: box-shadow .2s ease;
}

.form:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.10);

}

/* 表单项：增大高度+优化间距 */
.form-item {
  display: flex;
  align-items: center;
  height: 50px;
  /* 增大输入框高度，更易点击 */
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  margin-bottom: 20px;
  /* 增大项间距 */
  padding: 0 15px;
  box-sizing: border-box;
  transition: border-color .2s ease, box-shadow .2s ease, background-color .2s ease;
  flex-wrap: nowrap;
  overflow: hidden;
}

.form-item:focus-within {
  border-color: #409eff;
  box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.12);
  background-color: #fcfdff;
}

/* 输入框：增大字号+优化内边距 */
.inp {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  font-size: 15px;
  /* 增大字号，更易输入 */
  color: #333;
  background: transparent;
  padding: 0 2px;
  min-width: 0; /* 允许在flex容器中收缩，防止撑破布局 */
}

.inp::placeholder {
  color: #999;
}

.code-inp {
  letter-spacing: 2px;
}

.sms-inp {
  letter-spacing: 1px;
}

/* 图形验证码项 */
.code-item {
  gap: 12px;
}

.code-img {
  width: 90px;
  /* 增大验证码图片尺寸 */
  height: 35px;
  border-radius: 6px;
  object-fit: cover;
  cursor: pointer;
  border: 1px solid #e6e6e6;
  background-color: #fafafa;
  transition: transform .1s ease, box-shadow .2s ease, border-color .2s ease;
  flex-shrink: 0; /* 防止被压缩导致溢出或位置异常 */
}

/* 短信验证码按钮 */
.get-code-btn {
  width: 110px;
  height: 35px;
  background-color: #409eff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.25);
  transition: background-color .2s ease, box-shadow .2s ease, transform .08s ease;
  min-width: 120px;
  line-height: 35px;
  white-space: nowrap;
}

.get-code-btn:hover {
  background-color: #66b1ff;
  box-shadow: 0 3px 8px rgba(64, 158, 255, 0.35);
}

.get-code-btn:active {
  transform: scale(0.98);
}

.get-code-btn:disabled {
  background-color: #cfe5ff;
  color: #fff;
  cursor: not-allowed;
  box-shadow: none;
}

/* 登录按钮：增大尺寸+优化样式 */
.login-btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  border-radius: 8px;
  font-size: 17px;
  margin-top: 25px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.3);
  transition: background-color .2s ease, box-shadow .2s ease, transform .08s ease;
}

.login-btn:hover {
  background-color: #66b1ff;
}

.login-btn:active {
  transform: translateY(1px);
}
.alert-wrapper {
  max-width: 350px;
  width: 90%;
  margin: 20px auto 0; /* 和表单对齐，留间距 */
}

.alert-wrapper>>>.el-alert {
  border-radius: 8px;
}

@media (max-width: 375px) {
  .form {
    padding: 18px;
  }
  .form-item {
    height: 46px;
    padding: 0 12px;
  }
  .code-img,
  .get-code-btn {
    height: 32px;
  }
  .get-code-btn { line-height: 32px; }
  .login-btn {
    height: 46px;
    line-height: 46px;
    font-size: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
</style>
