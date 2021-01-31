<template>

</template>

<script>
export default {
  name: 'Tests',
  props:{
    msg: String
  },

  data() {
    return{
      env: process.env.VUE_APP_DJ_SECRET_KEY
    }
  },

  mounted() {
    console.log("djkey: " + process.env.VUE_APP_DJ_SECRET_KEY)
  }
}
</script>
