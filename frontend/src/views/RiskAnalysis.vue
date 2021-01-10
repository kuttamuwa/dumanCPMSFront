<template>
  <div id="riskanalysis">
    <v-alert
        dense
        border="left"
        type="warning"
    >
      Yükleyeceğiniz verinin excel uzantısında ve sütunlarının
      <a href="README.md">klavuzda yazdığı gibi </a> olduklarından emin olunuz
    </v-alert>

    <v-form>
      <v-file-input
          chips
          persistent-hint
          rules="fileRules"
          hint="Excel verinizi yüklerken sütunların doğru olduğuna emin olunuz."
          label="Risk Analiz verilerinizi yükleyiniz"
      ></v-file-input>

      <v-btn
          class="mr-4"
          type="submit"
          :disabled="invalid"
      >
        Gönder
      </v-btn>
      <v-btn @click="clear">
        Temizle
      </v-btn>
    </v-form>


  </div>
</template>

<script>
export default {
  name: "RiskAnalysis",
  data: () => ({
    excelFile: '',
    fileRules: [
        v => v.endsWith('.xlsx') !== true || 'Sadece xlsx uzantısındaki Exceller kabul edilir !'
    ]

  }),

  methods: {
    submit() {
      this.$refs.observer.validate()
    },

    clear() {
      this.excelFile = ''
      this.$refs.observer.reset()
    },
  },
}
</script>

<style scoped>

</style>
