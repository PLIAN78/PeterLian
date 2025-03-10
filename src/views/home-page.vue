<template>
  <div class="home-page-container">
    <div class="home-page-home-page">
      <span class="home-page-text10">
        <span class="home-page-text11">Peter Lian</span>
        <span class="home-page-text12">/</span>
        <span>Portfolio</span>
      </span>
      <div class="home-page-frame10"></div>
      <div class="home-page-frame16">
        <div class="home-page-frame141"></div>
        <div class="home-page-frame15"></div>
        <div class="home-page-frame142"></div>
        <div class="home-page-frame143"></div>
      </div>
      <div class="home-page-frame12"></div>
      <div class="home-page-frame13">
        <span class="home-page-text14">Projects</span>
      </div>
      <span class="home-page-text15">
        About Me
        <span v-html="rawntac"></span>
      </span>
      <span class="home-page-text16">
        About Me
        <span v-html="rawtx70"></span>
      </span>
      <span class="home-page-text17">
        About Me
        <span v-html="rawit8u"></span>
      </span>
      <span class="home-page-text18">
        Experiences
        <span v-html="raw3f01"></span>
      </span>
      <img
        src="/external/instagram492-l9a.svg"
        alt="Instagram492"
        class="home-page-instagram"
      />
      <img
        src="/external/linkedin4110-w4l.svg"
        alt="Linkedin4110"
        class="home-page-linkedin"
      />
      <span class="home-page-text19">hi</span>
      <span class="home-page-text20">HII</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      rawntac: ' ',
      rawtx70: ' ',
      rawit8u: ' ',
      raw3f01: ' ',
    }
  },
  metaInfo: {
    title: 'exported project',
  },
}
</script>

<style scoped>
.home-page-container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}
 
.home-page-home-page {
  width: 100%;
  height: 1024px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  background-color: rgba(3, 32, 38, 1);
}
 
.home-page-text10 {
  top: 72px;
  left: 71px;
  color: rgba(255, 255, 255, 1);
  width: 218px;
  height: auto;
  position: absolute;
  font-size: 32px;
  font-style: ExtraBold;
  text-align: left;
  font-family: Zain;
  font-weight: 800;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
 
.home-page-text11 {
  font-weight: 800;
}
 
.home-page-text12 {
  font-weight: 400;
}
 
.home-page-frame10 {
  top: 252px;
  left: 91px;
  width: 466px;
  height: 237px;
  display: flex;
  overflow: hidden;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 40px;
  background-color: rgba(145, 242, 187, 1);
}
 
.home-page-frame16 {
  gap: 35px;
  top: 273px;
  left: 720px;
  width: 669px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
}
 
.home-page-frame141 {
  width: 669px;
  height: 143px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-self: stretch;
  align-items: flex-start;
  border-radius: 40px;
  background-color: rgba(242, 238, 216, 1);
}
 
.home-page-frame15 {
  width: 669px;
  height: 143px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-self: stretch;
  align-items: flex-start;
  border-radius: 40px;
  background-color: rgba(242, 238, 216, 1);
}
 
.home-page-frame142 {
  width: 669px;
  height: 143px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-self: stretch;
  align-items: flex-start;
  border-radius: 40px;
  background-color: rgba(242, 238, 216, 1);
}
 
.home-page-frame143 {
  width: 669px;
  height: 143px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-self: stretch;
  align-items: flex-start;
  border-radius: 40px;
  background-color: rgba(242, 238, 216, 1);
}
 
.home-page-frame12 {
  top: 579px;
  left: 91px;
  width: 466px;
  height: 372px;
  display: flex;
  overflow: hidden;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 40px;
  background-color: rgba(20, 140, 118, 1);
}
 
.home-page-frame13 {
  top: 202px;
  left: 720px;
  width: 188px;
  height: 50px;
  display: flex;
  overflow: hidden;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 40px;
  background-color: rgba(242, 87, 73, 1);
}
 
.home-page-text14 {
  top: 2px;
  left: 28px;
  color: rgba(255, 255, 255, 1);
  height: auto;
  position: absolute;
  font-size: 32px;
  font-style: Regular;
  text-align: left;
  font-family: Zain;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
 
.home-page-text15 {
  top: 207px;
  left: 91px;
  color: rgba(255, 255, 255, 1);
  height: auto;
  position: absolute;
  font-size: 32px;
  font-style: Regular;
  text-align: left;
  font-family: Zain;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
 
.home-page-text16 {
  top: 207px;
  left: 91px;
  color: rgba(255, 255, 255, 1);
  height: auto;
  position: absolute;
  font-size: 32px;
  font-style: Regular;
  text-align: left;
  font-family: Zain;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
 
.home-page-text17 {
  top: 207px;
  left: 91px;
  color: rgba(255, 255, 255, 1);
  height: auto;
  position: absolute;
  font-size: 32px;
  font-style: Regular;
  text-align: left;
  font-family: Zain;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
 
.home-page-text18 {
  top: 534px;
  left: 85px;
  color: rgba(255, 255, 255, 1);
  height: auto;
  position: absolute;
  font-size: 32px;
  font-style: Regular;
  text-align: left;
  font-family: Zain;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
 
.home-page-instagram {
  top: 49px;
  left: 1319px;
  width: 48px;
  height: 48px;
  position: absolute;
}
 
.home-page-linkedin {
  top: 49px;
  left: 1245px;
  width: 48px;
  height: 48px;
  position: absolute;
}
 
.home-page-text19 {
  top: 53px;
  left: 1251px;
  color: rgba(255, 255, 255, 1);
  width: 42px;
  height: auto;
  opacity: 0.00;
  position: absolute;
  font-size: 48px;
  font-style: Regular;
  text-align: left;
  font-family: Zain;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: underline;
}
 
.home-page-text20 {
  top: 44px;
  left: 1323px;
  color: rgba(255, 255, 255, 1);
  height: auto;
  opacity: 0.00;
  position: absolute;
  font-size: 48px;
  font-style: Regular;
  text-align: left;
  font-family: Zain;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: underline;
}
</style>
