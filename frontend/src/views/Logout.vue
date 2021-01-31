<template>
  <v-card>
    Sistemden çıkış yaptınız.
  </v-card>
</template>

<script>
import lstore from "@/store/lstore";

export default {
  created() {
    lstore.commit('logout')
  }
}
</script>

