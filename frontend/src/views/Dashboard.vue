<template>
  <v-expansion-panels>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Limit Aşımı Yapanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
            :headers="riskdatasetColumns"
            :items="limitasanlar"
            items-per-page="5"
        >
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Vade Aşımı Yapanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
            :headers="riskdatasetColumns"
            :items="vadeasanlar"
            items-per-page="5"
        >
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-divider></v-divider>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Devir Hızı Kötü Olanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
            :headers="riskdatasetColumns"
            :items="devirhizikotuolanlar"
            items-per-page="5"
        >
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-divider></v-divider>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Vergi Borcu Olanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
            :headers="riskdatasetColumns"
            :items="vergiborcuolanlar"
            items-per-page="5"
        >
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-divider></v-divider>

    <v-expansion-panel>
      <v-expansion-panel-header>
        SGK Borcu Olanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
            :headers="riskdatasetColumns"
            :items="sgkborcuolanlar"
            items-per-page="5"
        >
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-divider></v-divider>

    <v-expansion-panel>
      <v-expansion-panel-header>
        Sektör Kara Listede Olanlar
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-data-table
            :headers="riskdatasetColumns"
            :items="sektorkaraliste"
            items-per-page="5"
        >
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>

    <v-divider></v-divider>
  </v-expansion-panels>

</template>

<script>
import RiskAnalysis from "@/views/RiskAnalysis";

const axios = require('axios').default;

const DASHBOARD_RD_API = "http://127.0.0.1:8000/dashboard/api/rd";

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
    this.getlimitasanlar();
    this.getvadeasanlar();
    this.getdevirhizikotuolanlar();

    // vergi sgk vs
    this.getvergiborcuolanlar();
    this.getsgkborcuolanlar();
    this.getsektorkaraliste();

  },

  methods: {
    async getlimitasanlar() {
      var url = DASHBOARD_RD_API + "/?dtype=l"
      const response = await axios.get(url);
      console.log("limiti aşanlar response : " + response);
      this.limitasanlar = response.data;

    },

    async getvadeasanlar() {
      var url = DASHBOARD_RD_API + "/?dtype=v"
      const response = await axios.get(url);
      console.log("vade aşanlar response : " + response);
      this.vadeasanlar = response.data;
    },

    async getdevirhizikotuolanlar() {
      // 'dh1': devir_hizi_self_artmis,
      // 'dh2': devir_hizi_baskalariyla_artmis,
      var url = DASHBOARD_RD_API + "/?dtype=" + this.dhtype;
      const response = await axios.get(url);
      console.log("devir hizi kötü olanlar response : " + response);
      this.devirhizikotuolanlar = response.data;
    },

    async getvergiborcuolanlar() {
      var url = DASHBOARD_RD_API + "/?dtype=v"
      const response = await axios.get(url);
      console.log("vergi borcu olanlar response : " + response);
      this.vergiborcuolanlar = response.data;
    },

    async getsgkborcuolanlar() {
      var url = DASHBOARD_RD_API + "/?dtype=s"
      const response = await axios.get(url);
      console.log("SGK borcu olanlar response : " + response);
      this.sgkborcuolanlar = response.data;
    },

    async getsektorkaraliste() {
      var url = DASHBOARD_RD_API + "/?dtype=skl"
      const response = await axios.get(url);
      console.log("limiti aşanlar response : " + response);
      this.sektorkaraliste = response.data;
    }

  }
}
</script>

<style scoped>

</style>
