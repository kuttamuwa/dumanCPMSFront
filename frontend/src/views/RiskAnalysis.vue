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
const RISKDATASET_API = "http://127.0.0.1:8000/riskanalysis/api/dataset/?format=json";
const POINTS_API = "http://127.0.0.1:8000/riskanalysis/api/points/?format=json";

const axios = require('axios').default;

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default {
  name: "RiskAnalysis",
  data: () => ({
    excelFile: '',
    fileRules: [],

    riskdatasetColumns: [
      {text: 'Müşteri', align: 'start', value: 'musteri'},
      {text: 'Son 12 Aylık Toplam Ciro', value: 'ciro'},
      {text: 'Limit', value: 'limit'},
      {text: 'Teminat Durumu', value: 'teminat_durumu'},
      {text: 'Teminat Tutarı', value: 'teminat_tutari'},
      {text: 'Vade', value: 'vade'},
      {text: 'Vade Aşımı Ortalaması', value: 'vade_asimi_ortalamasi'},
      {text: 'Ödeme Sıklığı', value: 'odeme_sikligi'},
      {text: '12 Aylık Ortalama Sipariş Tutarı', value: 'ort_siparis_tutari_12ay'},
      {text: '1 Aylık Ortalama Sipariş Tutarı', value: 'ort_siparis_tutari_1ay'},
      {text: 'Son Ay İade Yüzdesi', value: 'iade_yuzdesi_1'},
      {text: 'Son 12 Ay İade Yüzdesi', value: 'iade_yuzdesi_12'},
      {text: 'Ortalama Gecikme Gün Sayısı', value: 'ort_gecikme_gun_sayisi'},
      {text: 'Ortalama Gecikme Gün Bakiyesi', value: 'ort_gecikme_gun_bakiyesi'},
      {text: 'Bakiye', value: 'bakiye'}
    ],

    defaultItem: {
      musteri: '',
      ciro: '',
      limit: '',
      teminat_durumu: '',
      teminat_tutari: '',
      vade: '',
      vade_asimi_ortalamasi: '',
      odeme_sikligi: '',
      ort_siparis_tutari_12ay: '',
      ort_siparis_tutari_1ay: '',
      iade_yuzdesi_1: '',
      iade_yuzdesi_12: '',
      ort_gecikme_gun_sayisi: '',
      ort_gecikme_gun_bakiyesi: '',
      bakiye: ''
    },

    riskdatasetValues: [
      {}
    ],

    editedIndex: -1,

    editedItem: {
      musteri: '',
      ciro: '',
      limit: '',
      teminat_durumu: '',
      teminat_tutari: '',
      vade: '',
      vade_asimi_ortalamasi: '',
      odeme_sikligi: '',
      ort_siparis_tutari_12ay: '',
      ort_siparis_tutari_1ay: '',
      iade_yuzdesi_1: '',
      iade_yuzdesi_12: '',
      ort_gecikme_gun_sayisi: '',
      ort_gecikme_gun_bakiyesi: '',
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

  mounted() {
    this.getDataFromApi();
  },

  methods: {

    async getDataFromApi() {
      await this.getRiskDataset();
    },

    async getRiskDataset() {
      const response = await axios.get(RISKDATASET_API);
      this.riskdatasetValues = response.data;
      console.log(this.riskdatasetValues);
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
