<template>
  <v-card
      height="100%"
      width="100%"
  >
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-card-text> Ticari Bilgiler</v-card-text>
            <v-combobox
                label="Firma Tipi"
                persistent-hint
                v-model="firm_type"
                :items="firmTypes"
            ></v-combobox>

            <v-text-field
                label="Firma Adı"
                v-model="firm_full_name"
                required
            ></v-text-field>

            <v-text-field
                label="Kimlik No"
                v-model="taxpayer_number"
                :rules="kimlikRules"
                required
            ></v-text-field>

            <v-text-field
                label="Vergi Departmanı"
                v-model="tax_department"
                :rules="generalRules"
                required
            ></v-text-field>

            <v-text-field
                label="Firma Adresi"
                v-model="firm_address"
                :rules="generalRules"
                required
            ></v-text-field>

            <v-combobox
                label="Doğum Yeri"
                persistent-hint
                v-model="birthplace"
                :items="sehirler"
            ></v-combobox>

            <v-combobox
                persistent-hint
                label="İletişim Personeli"
                v-model="firm_key_contact_personnel"
                :items="syspersonnels"
            ></v-combobox>

          </v-col>

          <v-col>
            <v-card-text>Firma Bilgileri</v-card-text>
            <v-text-field
                v-model="sector"
                :rules="generalRules"
                label="Sektör"
                required
            ></v-text-field>

            <v-combobox
                persistent-hint
                label="Şehir"
                v-model="city"
                :items="sehirler"
            ></v-combobox>

            <v-combobox
                persistent-hint
                label="İlçe"
                v-model="district"
                :items="ilceler"
                @click="getDistrict"
            ></v-combobox>
            <br>

<!--            <v-container id="attachmentsTicaret">-->

<!--            </v-container>-->
          </v-col>

          <v-col>
            <v-card-text>İletişim Bilgileri</v-card-text>
            <v-text-field
                v-model="email_addr"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="phone_number"
                :rules="telnoRules"
                label="Telefon"
                required
            ></v-text-field>

            <v-text-field
                v-model="fax"
                label="Fax"
                required
            ></v-text-field>
          </v-col>
          <!--        İletişim bilgileri-->
          <v-col
          >
            <v-card-text> Ek Dosyalar </v-card-text>
            <v-file-input
                accept="image/*"
                label="Faaliyet Belgesi"
                id="faaliyetDoc"
                v-model="faaliyetDoc"
            ></v-file-input>

            <v-file-input
                accept="image/*"
                label="Vergi Beyannamesi"
                id="vergiDoc"
                v-model="vergiDoc"
            ></v-file-input>

            <v-file-input
                accept="image/*"
                label="İmza Sirküleri"
                id="imzaDoc"
                v-model="imzaDoc"
            ></v-file-input>

<!--            <v-container id="attachmentsPartnership">-->
              <v-file-input
                  accept="image/*"
                  label="Ortaklık yapısı ve kimlik kopyaları"
                  id="partnershipDoc"
                  v-model="partnershipDoc"
              ></v-file-input>

              <v-file-input
                  accept="image/*"
                  label="Kimlik kopyaları"
                  id="identityDoc"
                  v-model="identityDoc"
              ></v-file-input>

              <v-file-input
                  accept="image/*"
                  label="Yönetim kurulu yapısı"
                  id="managementDoc"
                  v-model="managementDoc"
              ></v-file-input>
<!--            </v-container>-->
          </v-col>

        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="blue darken-1"
          text
          @click="closeDialog"
      >
        Temizle
      </v-btn>
      <v-btn
          color="blue darken-1"
          text
          @click="submitData"> Kaydet
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
import lstore from "@/store/lstore";

const ACCOUNT_API = "http://127.0.0.1:8000/checkaccount/api/accounts/?format=json";
const CITY_API = "http://127.0.0.1:8000/checkaccount/api/cities/?format=json";

const axios = require('axios').default;

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default {
  name: "CreateCard",
  createCardDialog: false,

  data: () => ({
    firm_full_name: '',
    firm_type: '',
    taxpayer_number: '',
    birthplace: '',
    tax_department: '',
    firm_address: '',
    firm_key_contact_personnel: '',
    sector: '',
    city: '',
    district: '',
    phone_number: '',
    fax: '',
    web_url: '',
    email_addr: '',

    // documents
    // part I
    partnershipDoc: null,
    identityDoc: null,
    managementDoc: null,

    // part II
    faaliyetDoc: null,
    vergiDoc: null,
    imzaDoc: null,

    // choice lists
    firmTypes: [
      'Tüzel Kişilik',
      'Şahıs İşletmesi'],

    // props: [
    //     'sehirler',
    //     'syspersonnels'
    // ],

    sehirler: [],

    ilceler: [],

    syspersonnels: [],

    generalRules: [
      v => !!v || 'Bu alan boş bırakılamaz !',
    ],

    kimlikRules: [
      v => !!v || 'Kimlik No gereklidir',
      v => v.length === 11 || 'Kimlik numarası 11 haneden farklı olamaz !'
    ],

    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 10 || 'Name must be less than 10 characters',
    ],

    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid',
    ],

    telnoRules: [
      v => !!v || 'Telefon numarası gereklidir',
      v => v.length !== 10 || '10 haneli telefon numaranızı giriniz '
    ],
  }),

  methods: {
    async getDistrict() {
      let cityName = this.city
      const DISTRICT_API = "http://127.0.0.1:8000/checkaccount/api/district/?city=" + cityName;
      const response = await axios.get(DISTRICT_API)
      this.ilceler = response.data.map(function (item) {
        return item.name
      });
      console.log(cityName + "için ilçeler çekildi")
    },

    closeDialog() {
      this.dialogDelete = false

      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async submitData() {
      console.log(this.editedItem);
      await this.save();

      await this.getAccounts();
      this.accountValues.push(this.editedItem);
    },
  }
}
</script>

<style scoped>

</style>
