<template>

  <!-- Sadece ilk 5 tanesini gösteren kartlar yapacaz -->

  <v-expansion-panels>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Limit Aşımı Yapanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container>
          <v-row justify="space-around">
            <v-card width="400">
              <v-img
                  height="50px"
                  src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
              ></v-img>

              <v-toolbar-title class="title white--text pl-0">
                Limit Aşımı Yapanlar
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-card-text>
                <v-timeline
                    align-top
                    dense
                >
                  <v-timeline-item
                      v-for="dataset in limitasanlar"
                      :key="dataset.data_id"
                      small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ dataset.firm_full_name }}</strong> {{ dataset.general_point }}
                      </div>
                      <div>{{ dataset.firm_full_name }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Vade Aşımı Yapanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container>
          <v-row justify="space-around">
            <v-card width="400">
              <v-img
                  height="50px"
                  src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
              ></v-img>

              <v-toolbar-title class="title white--text pl-0">
                Vade Aşımı Yapanlar
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-card-text>
                <v-timeline
                    align-top
                    dense
                >
                  <v-timeline-item
                      v-for="dataset in vadeasanlar"
                      :key="dataset.data_id"
                      small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ dataset.firm_full_name }}</strong> {{ dataset.general_point }}
                      </div>
                      <div>{{ dataset.firm_full_name }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-divider></v-divider>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Devir Hızı Kötü Olanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container>
          <v-row justify="space-around">
            <v-card width="400">
              <v-img
                  height="50px"
                  src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
              ></v-img>

              <v-toolbar-title class="title white--text pl-0">
                Devir Hızı Kötü Olanlar
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-card-text>
                <v-timeline
                    align-top
                    dense
                >
                  <v-timeline-item
                      v-for="dataset in devirhizikotuolanlar"
                      :key="dataset.data_id"
                      small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ dataset.firm_full_name }}</strong> {{ dataset.general_point }}
                      </div>
                      <div>{{ dataset.firm_full_name }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-divider></v-divider>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Vergi Borcu Olanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container>
          <v-row justify="space-around">
            <v-card width="400">
              <v-img
                  height="50px"
                  src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
              ></v-img>

              <v-toolbar-title class="title white--text pl-0">
                Vergi Borcu Olanlar
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-card-text>
                <v-timeline
                    align-top
                    dense
                >
                  <v-timeline-item
                      v-for="dataset in vergiborcuolanlar"
                      :key="dataset.data_id"
                      small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ dataset.firm_full_name }}</strong> {{ dataset.general_point }}
                      </div>
                      <div>{{ dataset.firm_full_name }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-divider></v-divider>

    <v-expansion-panel>
      <v-expansion-panel-header>
        SGK Borcu Olanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container>
          <v-row justify="space-around">
            <v-card width="400">
              <v-img
                  height="50px"
                  src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
              ></v-img>

              <v-toolbar-title class="title white--text pl-0">
                SGK Borcu Olanlar
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-card-text>
                <v-timeline
                    align-top
                    dense
                >
                  <v-timeline-item
                      v-for="dataset in sgkborcuolanlar"
                      :key="dataset.data_id"
                      small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ dataset.firm_full_name }}</strong> {{ dataset.general_point }}
                      </div>
                      <div>{{ dataset.firm_full_name }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-divider></v-divider>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Sektör Kara Listede Olanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container>
          <v-row justify="space-around">
            <v-card width="400">
              <v-img
                  height="50px"
                  src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
              ></v-img>

              <v-toolbar-title class="title white--text pl-0">
                Sektör Kara Listede Olanlar
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-card-text>
                <v-timeline
                    align-top
                    dense
                >
                  <v-timeline-item
                      v-for="dataset in sektorkaraliste"
                      :key="dataset.data_id"
                      small
                  >
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ dataset.firm_full_name }}</strong> {{ dataset.general_point }}
                      </div>
                      <div>{{ dataset.firm_full_name }}</div>
                    </div>
                  </v-timeline-item>
                </v-timeline>
              </v-card-text>
            </v-card>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-divider></v-divider>
  </v-expansion-panels>

</template>

<script>
import RiskAnalysis from "@/views/RiskAnalysis";

const DASHBOARD_URL = "http://127.0.0.1:8000/riskanalysis/api/dashboard/"

const axios = require('axios').default;

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default {
  name: "Dashboard",
  data: () => ({
    selected: [2],
    limitasanlar: [],

    dhtype: "dh1",
    itype: "i1",

    vadeasanlar: [{}],

    devirhizikotuolanlar: [{}],

    vergiborcuolanlar: [{}],

    sgkborcuolanlar: [{}],

    sektorkaraliste: [{}],

    riskdatasetColumns: RiskAnalysis.data().riskdatasetColumns

  }),

  mounted() {
    axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token');

    this.getlimitasanlar();
    this.getvadeasanlar();
    this.getdevirhizikotuolanlar();

    // vergi sgk vs
    this.getvergiborcuolanlar();
    this.getsgkborcuolanlar();
    this.getsektorkaraliste();

  },

  methods: {
    async getPerms() {
      let url = DASHBOARD_URL + "/?dtype=l"
      const response = await axios.get(url)
      return response.status !== 401
    },

    async getDataFromApi() {
      await this.getlimitasanlar();
    },

    async getlimitasanlar() {
      const LIMIT_URL = DASHBOARD_URL + "?dtype=l";
      console.log("limit asanlar : " + LIMIT_URL)
      const response = await axios.get(LIMIT_URL);
      console.log("limiti aşanlar response : " + JSON.stringify(response.data));
      this.limitasanlar = response.data;

    },

    async getvadeasanlar() {
      var url = DASHBOARD_URL + "/?dtype=v"
      const response = await axios.get(url);
      console.log("vade aşanlar response : " + response);
      this.vadeasanlar = response.data;
    },

    async getdevirhizikotuolanlar() {
      // 'dh1': devir_hizi_self_artmis,
      // 'dh2': devir_hizi_baskalariyla_artmis,
      const url = DASHBOARD_URL + "/?dtype=" + this.dhtype;
      const response = await axios.get(url);
      console.log("devir hizi kötü olanlar response : " + response);
      this.devirhizikotuolanlar = response.data;
    },

    async getvergiborcuolanlar() {
      const url = DASHBOARD_URL + "/?dtype=v"
      const response = await axios.get(url);
      console.log("vergi borcu olanlar response : " + response);
      this.vergiborcuolanlar = response.data;
    },

    async getsgkborcuolanlar() {
      const url = DASHBOARD_URL + "/?dtype=s"
      const response = await axios.get(url);
      console.log("SGK borcu olanlar response : " + response);
      this.sgkborcuolanlar = response.data;
    },

    async getsektorkaraliste() {
      const url = DASHBOARD_URL + "/?dtype=skl"
      const response = await axios.get(url);
      console.log("limiti aşanlar response : " + response);
      this.sektorkaraliste = response.data;
    }

  }
}
</script>

<style scoped>

</style>
