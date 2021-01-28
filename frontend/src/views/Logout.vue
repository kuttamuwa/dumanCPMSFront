<template>

</template>

<script>
import lstore from "@/store/lstore";

export default {
  created() {
    lstore.commit('logout')
        .then(response => {
          this.$router.push({ name: 'Home' })

        })
  }
}
</script>

