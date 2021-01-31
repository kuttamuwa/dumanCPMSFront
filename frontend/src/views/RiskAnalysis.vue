<template>
  <v-form v-model="valid">
    <div id="riskanalysis">
      <v-alert
          v-bind:value="alert_status"

          color="#C51162"
          dark
          icon="mdi-material-design"
          border="right"
          dismissible

          v-bind:text="alert_text"
      >
      </v-alert>

      <v-expansion-panels>

        <v-expansion-panel id="creationForm">
          <v-expansion-panel-header>
            Dataset Yükle
          </v-expansion-panel-header>
          <v-expansion-panel-content>

            <v-alert
                dense
                border="left"
                type="warning"
            >
              Yükleyeceğiniz verinin excel uzantısında ve sütunlarının
              <a href="README.md">klavuzda yazdığı gibi </a> olduklarından emin olunuz
            </v-alert>

            <v-card>
              <v-card-text>
                Excel dosyası
              </v-card-text>
              <v-container id="excelUpload">
                <v-file-input
                    chips
                    persistent-hint
                    hint="Excel verinizi yüklerken sütunların doğru olduğuna emin olunuz."
                    label="Risk Analiz verilerinizi yükleyiniz"
                    v-model="excelFile"

                ></v-file-input>

                <v-btn
                    class="mr-4"
                    @click="save"
                >
                  Gönder
                </v-btn>
                <v-btn @click="clear">
                  Temizle
                </v-btn>
              </v-container>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-divider></v-divider>

        <v-expansion-panel id="Read">
          <v-expansion-panel-header>
            Veriler
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-data-table
                  :headers="riskdatasetColumns"
                  :items="riskdatasetValues"
                  :items-per-page="10"
                  class="elevation-1"
              >
                <template v-slot:item.actions="{ item }">
                  <v-icon
                      small
                      class="mr-2"
                      @click="analyzeItem(item)"
                  >
                    mdi-tools
                  </v-icon>
                </template>

                <template v-slot:no-data>
                  <v-card-text> Hiç veri bulunamamıştır </v-card-text>
                </template>

              </v-data-table>
              <v-spacer></v-spacer>
            </v-form>

          </v-expansion-panel-content>
        </v-expansion-panel>

      </v-expansion-panels>
    </div>
  </v-form>
</template>

<script>
const RISKDATASET_API = "http://127.0.0.1:8000/riskanalysis/api/dataset/?format=json";

const axios = require('axios').default;

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default {
  name: "RiskAnalysis",
  data: () => ({
    valid: false,

    // alert conditions
    alert_text: "",
    alert_status: false,
    alert_type: "alert",

    excelFile: null,
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
      {text: 'Bakiye', value: 'bakiye'},
      {text: 'Analiz Puanı', value: 'general_point'},
      {text: 'Analiz Et', value: 'actions', sortable: false},
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

    clear() {
      this.excelFile = null
      this.$refs.observer.reset()
    },

    async analyzeItem(item) {
      let index = this.riskdatasetValues.indexOf(item);
      let pk = this.riskdatasetValues[index].data_id;
      console.log(pk);
      const ANALYZE_POINT_API = "http://127.0.0.1:8000/riskanalysis/api/points/" + "?riskdataset_pk=" + pk + "&again=True"
      const response = await axios.post(ANALYZE_POINT_API)

      let point = response.data
      console.log("Alınan puan : " + point);
      this.riskdatasetValues[index].general_point = point
    },

    async save() {
      let formData = new FormData();
      formData.append("excel", this.excelFile);

      const response = await axios.post(RISKDATASET_API, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(
          (response => {
            if (response.status !== 200) {
              console.log("YÜKLEME BAŞARISIZ :/")
              this.alert_type = "alert";
              this.alert_text = response.data
            } else {
              console.log("YÜKLEME BAŞARILI")
              this.$store.commit('showmsg', {text: "Verileriniz yüklendi", show: true})
            }
          })
      );
      console.log("veri yollandi cevabi " + response);
    },

  },
}
</script>

<style scoped>

</style>
