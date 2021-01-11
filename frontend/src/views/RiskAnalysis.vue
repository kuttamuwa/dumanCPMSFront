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
          @click="submit"
          :disabled="invalid"
      >
        Gönder
      </v-btn>
      <v-btn @click="clear">
        Temizle
      </v-btn>
    </v-form>

    <v-expansion-panel id="RiskDatasets">
      <v-expansion-panel-header>
        Veriler
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
            :headers="riskdatasetColumns"
            :items="riskdatasetValues"
            :items-per-page="10"
            class="elevation-1"
        ></v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>

  </div>
</template>

<script>
export default {
  name: "RiskAnalysis",
  data: () => ({
    excelFile: '',
    fileRules: [
      v => v.endsWith('.xlsx') !== true || 'Sadece xlsx uzantısındaki Exceller kabul edilir !'
    ],

    riskdatasetColumns: [],

    riskdatasetValues: []

  }),

  methods: {
    getRiskDatasets() {
      this.riskdatasetValues = []

    },

    setRiskDatasetColumns() {
      var datasets = this.riskdatasetValues;
      this.riskdatasetColumns = datasets;

    },

    initialize() {
      // veriler çekilir
      this.getRiskDatasets();
      this.setRiskDatasetColumns()
    },

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
