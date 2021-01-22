<template>
  <v-form v-model="valid">
    <div id="createCheckAccount">
      <v-expansion-panels>
        <v-expansion-panel id="creationForm">
          <v-expansion-panel-header>
            Cari Hesap Aç
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                        cols="12"
                        md="4"
                    >
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
                      ></v-combobox>
                      <br>

                      <v-container id="attachmentsTicaret">
                        <v-file-input
                            accept="image/*"
                            label="Faaliyet Belgesi"
                            id="faaliyetDoc"
                        ></v-file-input>

                        <v-file-input
                            accept="image/*"
                            label="Vergi Beyannamesi"
                            id="vergiDoc"
                        ></v-file-input>

                        <v-file-input
                            accept="image/*"
                            label="İmza Sirküleri"
                            id="imzaDoc"
                        ></v-file-input>
                      </v-container>
                    </v-col>

                    <!--        İletişim bilgileri-->
                    <v-col
                        cols="12"
                        md="4"
                    >
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

                      <v-container id="attachmentsPartnership">
                        <v-file-input
                            accept="image/*"
                            label="Ortaklık yapısı ve kimlik kopyaları"
                            id="partnershipDoc"
                        ></v-file-input>

                        <v-file-input
                            accept="image/*"
                            label="Kimlik kopyaları"
                            id="identityDoc"
                        ></v-file-input>

                        <v-file-input
                            accept="image/*"
                            label="Yönetim kurulu yapısı"
                            id="managementDoc"
                        ></v-file-input>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
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
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-divider></v-divider>
        <v-expansion-panel id="RUD Form">
          <v-expansion-panel-header>
            Cari Hesaplar
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
                :headers="accountColumns"
                :items="accountValues"
                sort-by="firmaAdi"
                class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar
                    flat>
                  <v-toolbar-title>Cari Hesap Aç</v-toolbar-title>
                  <v-divider
                      class="mx-4"
                      inset
                      vertical
                  ></v-divider>
                  <v-spacer></v-spacer>
                  <v-dialog
                      v-model="dialog"
                      max-width="500px"
                  >
                    <v-card>
                      <v-card-title>
                        <span class="headline">Cari Hesap</span>
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.firmaTipi"
                                  label="Firma Tipi"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.firmaAdi"
                                  label="Firma Adı"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.kimlikNo"
                                  label="Kimlik No"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.dyeri"
                                  label="Doğum Yeri"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.vdepartmani"
                                  label="Vergi Departmanı"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.firmaddr"
                                  label="Firma Adresi"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.firmcontact"
                                  label="Firma Contact"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.sektor"
                                  label="Sektör"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.sehir"
                                  label="Şehir"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.ilce"
                                  label="İlçe"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.telno"
                                  label="Tel No"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.fax"
                                  label="Fax"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.web_url"
                                  label="Vergi Departmanı"
                              ></v-text-field>
                            </v-col>
                            <v-col
                                cols="12"
                                sm="6"
                                md="4"
                            >
                              <v-text-field
                                  v-model="editedItem.email_addr"
                                  label="Email"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="close"
                        >
                          İptal
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="save"
                        >
                          Kaydet
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="headline">Bu kaydı silmek istiyor musunuz?</v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDelete">İptal</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Tamam</v-btn>
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </template>

              <template v-slot:no-data>
                <v-btn
                    color="primary"
                    @click="initialize"
                >
                  Reset
                </v-btn>
              </template>
            </v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-form>
</template>

<script>
const ACCOUNT_API = "http://127.0.0.1:8000/checkaccount/api/accounts/?format=json";
const CITY_API = "http://127.0.0.1:8000/checkaccount/api/cities/?format=json";

const axios = require('axios').default;

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default {
  name: 'CheckAccount',
  data: () => ({
    dialog: false,
    valid: false,

    dialogDelete: false,

    firm_full_name: 'DCPMS Test Firması',
    firm_type: 'Tüzel Kişilik',
    taxpayer_number: '19312776664',
    birthplace: 'Çorum',
    tax_department: 'Ümraniye Vergi Daires',
    firm_address: 'Tatlısu Mah. Gelendost Sok.',
    firm_key_contact_personnel: 'Salim Onurbilen',
    sector: 'GIS',
    city: 'ISTANBUL',
    district: 'ÜMRANİYE',
    phone_number: '5043371228',
    fax: '2129975442',
    web_url: 'https://www.youtube.com/watch?v=3OC2aPCuzjo',
    email_addr: 'ucok.umut@gmail.com',

    // documents
    // partnershipDoc: '',
    // faaliyetDoc: '',
    // vergiDoc: '',
    // imzaDoc: '',

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

    sehirler: [],

    ilceler: [],

    syspersonnels: [],

    firmTypes: [
      'Tüzel Kişilik',
      'Şahıs İşletmesi'],

    accountColumns: [
      {text: 'Firma Adı', align: 'start', value: 'firm_full_name'},
      {text: 'Firma Tipi', value: 'firm_type'},
      {text: 'Kimlik No', value: 'taxpayer_number'},
      {text: 'Doğum Yeri', value: 'birthplace'},
      {text: 'Vergi Departmanı', vdepartmani: 'tax_department'},
      {text: 'Firma Adresi', firmaddr: 'firm_address'},
      {text: 'Firma İletişim', firmcontact: 'firm_key_contact_personnel'},
      {text: 'Sektör', value: 'sector'},
      {text: 'Şehir', value: 'city'},
      {text: 'İlçe', value: 'district'},
      {text: 'Tel', value: 'phone_number'},
      {text: 'Fax', value: 'fax'},
      {text: 'Web', value: 'web_url'},
      {text: 'Email', value: 'email_addr'},
      {text: 'Aksiyonlar', value: 'actions', sortable: false},
    ],

    accountValues: [
      {}
    ],

    defaultItem: {
      firm_full_name: 'DCPMS Test Firması',
      firm_type: 'Tüzel Kişilik',
      taxpayer_number: '19312776664',
      birthplace: 'Çorum',
      tax_department: 'Ümraniye Vergi Daires',
      firm_address: 'Tatlısu Mah. Gelendost Sok.',
      firm_key_contact_personnel: 'Salim Onurbilen',
      sector: 'GIS',
      city: 'ISTANBUL',
      district: 'ÜMRANİYE',
      phone_number: '5043371228',
      fax: '2129975442',
      web_url: 'https://www.youtube.com/watch?v=3OC2aPCuzjo',
      email_addr: 'ucok.umut@gmail.com',

      // documents
      // partnershipDoc: '',
      // faaliyetDoc: '',
      // vergiDoc: '',
      // imzaDoc: '',
    },

    editedIndex: -1,

    editedItem: {
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
    },
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
    async getAccounts() {
      const response = await axios.get(ACCOUNT_API)
      this.accountValues = response.data
    },

    async getCities() {
      const response = await axios.get(ACCOUNT_API + "/cities/?format=json")
      this.sehirler = response.data;
    },

    async getDistrict(cityName) {
      const DISTRICT_API = "http://127.0.0.1:8000/checkaccount/api/district/?city=" + cityName;
      const response = await axios.get(ACCOUNT_API + "/district/?format=json?city=" + cityName);
      this.ilceler = response.data;

    },

    async getDataFromApi() {
      await this.getAccounts();

    },

    editItem(item) {
      this.editedIndex = this.accountValues.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.accountValues.indexOf(item)
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

    async submitData() {
      console.log(this.defaultItem);
      await this.save();

    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.accountValues[this.editedIndex], this.editedItem)
      } else {
        this.accountValues.push(this.editedItem)
      }

      // API'ye istek
      // console.log(this.editedItem.firm_type);
      // const response = await axios.post(API_URL,{
      //   firm_full_name: this.editedItem.firm_full_name,
      //   firm_type: this.editedItem.firm_type,
      //   taxpayer_number: this.editedItem.taxpayer_number,
      //   birthplace: this.editedItem.birthplace,
      //   tax_department: this.editedItem.tax_department,
      //   firm_address: this.editedItem.firm_address,
      //   firm_key_contact_personnel: this.editedItem.firm_key_contact_personnel,
      //   sector: this.editedItem.sector,
      //   city: this.editedItem.city,
      //   district: this.editedItem.district,
      //   phone_number: this.editedItem.phone_number,
      //   fax: this.editedItem.fax,
      //   web_url: this.editedItem.web_url,
      //   email_addr: this.editedItem.email_addr
      // })
      // .then(function (response) {
      //   console.log(response)
      // })
      // .catch(function (error) {
      //   console.log("error:" + error)
      // });
      this.formData()
      console.log(this.defaultItem);
      const response2 = await axios({
        method: 'post',
        url: ACCOUNT_API,
        data: this.defaultItem
      })
      console.log(response2);
      this.close()
    },
  },
}
</script>

<style scoped>

</style>
