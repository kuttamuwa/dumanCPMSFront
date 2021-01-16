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
    fileRules: [],

    riskdatasetColumns: [
      {text: 'Müşteri', align: 'start', value: 'musteriAdi'},
      {text: 'Son 12 Aylık Toplam Ciro', value: 'ciro'},
      {text: 'Limit', value: 'limit'},
      {text: 'Teminat Durumu', value: 'teminatDurumu'},
      {text: 'Teminat Tutarı', value: 'teminatTutari'},
      {text: 'Vade', value: 'vade'},
      {text: 'Vade Aşımı Ortalaması', value: 'vadeAsimiOr'},
      {text: 'Ödeme Sıklığı', value: 'odemeSikligi'},
      {text: '12 Aylık Ortalama Sipariş Tutarı', value: 'siparisTutariOrt12'},
      {text: '1 Aylık Ortalama Sipariş Tutarı', value: 'sipartisTutariOrt1'},
      {text: 'Son Ay İade Yüzdesi', value: 'iadeYuzdesi1'},
      {text: 'Son 12 Ay İade Yüzdesi', value: 'iadeYuzdesi12'},
      {text: 'Ortalama Gecikme Gün Sayısı', value: 'ortGecikmeGunSayisi'},
      {text: 'Ortalama Gecikme Gün Bakiyesi', value: 'ortGecikmeGunBakiyesi'},
      {text: 'Bakiye', value: 'bakiye'}
    ],

    defaultItem: {
      musteriAdi: '',
      ciro: '',
      limit: '',
      teminatDurumu: '',
      teminatTutari: '',
      vade: '',
      vadeAsimiOr: '',
      odemeSikligi: '',
      siparisTutariOrt12: '',
      sipartisTutariOrt1: '',
      iadeYuzdesi1: '',
      iadeYuzdesi12: '',
      ortGecikmeGunSayisi: '',
      ortGecikmeGunBakiyesi: '',
      bakiye: ''
    },

    riskdatasetValues: [],

    editedIndex: -1,

    editedItem: {
      musteriAdi: '',
      ciro: '',
      limit: '',
      teminatDurumu: '',
      teminatTutari: '',
      vade: '',
      vadeAsimiOr: '',
      odemeSikligi: '',
      siparisTutariOrt12: '',
      sipartisTutariOrt1: '',
      iadeYuzdesi1: '',
      iadeYuzdesi12: '',
      ortGecikmeGunSayisi: '',
      ortGecikmeGunBakiyesi: '',
      bakiye: ''
    }
  }),

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

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


    editItem(item) {
      this.editedIndex = this.riskdatasetValues.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.riskdatasetValues.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.riskdatasetValues[this.editedIndex], this.editedItem)
      } else {
        this.riskdatasetValues.push(this.editedItem)
      }
      this.close()
    },

  },
}
</script>

<style scoped>

</style>
