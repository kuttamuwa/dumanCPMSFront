<template>
  <v-form v-model="valid">
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
                        @click="getDistrict"
                    ></v-combobox>
                    <br>

                    <v-container id="attachmentsTicaret">
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
          Veriler
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form>

            <v-data-table
                :headers="accountColumns"
                :items="accountValues"
                sort-by="firmaAdi"
                class="elevation-1"
            >
              <template v-slot:top>
                <v-divider
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
                          <v-text-field
                              v-model="editedItem.firm_type"
                              label="Firma Tipi"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.firm_full_name"
                              label="Firma Adı"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.taxpayer_number"
                              label="Kimlik No"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.birthplace"
                              label="Doğum Yeri"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.tax_department"
                              label="Vergi Departmanı"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.firm_address"
                              label="Firma Adresi"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.firm_key_contact_personnel"
                              label="Firma Contact"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.sector"
                              label="Sektör"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.city"
                              label="Şehir"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.district"
                              label="İlçe"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.phone_number"
                              label="Tel No"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.fax"
                              label="Fax"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.web_url"
                              label="Vergi Departmanı"
                          ></v-text-field>
                          <v-text-field
                              v-model="editedItem.email_addr"
                              label="Email"
                          ></v-text-field>
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
                <v-card-text> Hiç veri bulunamamıştır</v-card-text>
              </template>
            </v-data-table>
            <v-spacer></v-spacer>
          </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-form>
</template>

<script>
import lstore from "@/store/lstore";

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
    updateState: false,

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
    // part I
    partnershipDoc: null,
    identityDoc: null,
    managementDoc: null,

    // part II
    faaliyetDoc: null,
    vergiDoc: null,
    imzaDoc: null,

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
      {text: 'Vergi Departmanı', value: 'tax_department'},
      {text: 'Firma Adresi', value: 'firm_address'},
      {text: 'Firma İletişim', value: 'firm_key_contact_personnel'},
      {text: 'Sektör', value: 'sector'},
      {text: 'Şehir', value: 'city'},
      {text: 'İlçe', value: 'district'},
      {text: 'Tel', value: 'phone_number'},
      {text: 'Fax', value: 'fax'},
      {text: 'Web', value: 'web_url'},
      {text: 'Email', value: 'email_addr'},
      {text: 'Aksiyonlar', value: 'actions', sortable: false},
    ],

    accountValues: [{}],

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
      // part I
      partnershipDoc: null,
      identityDoc: null,
      managementDoc: null,

      // part II
      faaliyetDoc: null,
      vergiDoc: null,
      imzaDoc: null,
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
    axios.defaults.headers.common['Authorization'] = 'JWT ' + localStorage.getItem('token');

    this.getDataFromApi();
  },

  methods: {
    async getAccounts() {
      const response = await axios.get(ACCOUNT_API)
      this.accountValues = response.data
    },

    async getPerms() {
      const response = await axios.get(ACCOUNT_API)
      return response.status !== 401;
    },

    async deleteAccount() {
      console.log("index : " + this.editedIndex)
      console.log("item : " + JSON.stringify(this.accountValues[this.editedIndex]))
      let data_id = this.accountValues[this.editedIndex].data_id;
      console.log("data id " + JSON.stringify(data_id))

      const DELETE_API = "http://127.0.0.1:8000/checkaccount/api/accounts/" + data_id
      console.log("Delete api : " + DELETE_API);
      const response = await axios.delete(DELETE_API)
      console.log("response : " + response.data)
    },

    async getCities() {
      const response = await axios.get(CITY_API)
      let data = response.data;
      this.sehirler = data.map(function (item) {
        return item.name
      })
      console.log("Sehirler yuklendi");
    },

    async getDistrict() {
      let cityName = this.city
      const DISTRICT_API = "http://127.0.0.1:8000/checkaccount/api/district/?city=" + cityName;
      const response = await axios.get(DISTRICT_API)
      this.ilceler = response.data.map(function (item) {
        return item.name
      });
      console.log(cityName + "için ilçeler çekildi")
    },

    async getSysPersonnels() {
      const PERSONNEL_API = "http://127.0.0.1:8000/checkaccount/api/syspersonnels/?format=json"
      const response = await axios.get(PERSONNEL_API);
      this.syspersonnels = response.data.map(function (item) {
        return item.username
      })
      console.log("Personel listesi yüklendi");
    },

    async getDataFromApi() {
      await this.getAccounts();
      await this.getCities();
      await this.getSysPersonnels();

    },

    editItem(item) {
      this.editedIndex = this.accountValues.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.updateState = true;
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.accountValues.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.accountValues.splice(this.editedIndex, 1)
      this.deleteAccount()

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
      console.log(this.editedItem);
      await this.save();

      await this.getAccounts();
      this.accountValues.push(this.editedItem);
    },

    async postData() {
      let formData = new FormData();
      formData.append("partnership_structure_identity_copies", this.partnershipDoc);
      formData.append("activity_certificate_pdf", this.faaliyetDoc);
      formData.append("tax_return_pdf", this.vergiDoc);

      formData.append("authorized_signatures_list_pdf", this.imzaDoc);
      formData.append("board_management", this.managementDoc);
      formData.append("identity_copies", this.identityDoc);

      formData.append('firm_full_name', this.firm_full_name)
      formData.append('firm_type', this.firm_type)
      formData.append('taxpayer_number', this.taxpayer_number)
      formData.append('birthplace', this.birthplace)
      formData.append('tax_department', this.tax_department)
      formData.append('firm_address', this.firm_address)
      formData.append('firm_key_contact_personnel', this.firm_key_contact_personnel)
      formData.append('sector', this.sector)
      formData.append('city', this.city)
      formData.append('district', this.district)
      formData.append('phone_number', this.phone_number)
      formData.append('fax', this.fax)
      formData.append('web_url', this.web_url)
      formData.append('email_addr', this.email_addr)

      const response = await axios.post(ACCOUNT_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(
          (response => {
            if (response.status !== 201) {
              lstore.commit('showmsg', {text: "Cari hesap oluşturulamadı", show: true})
              console.log(response)
            } else {
              console.log("Hesap oluşturuldu !");
              lstore.commit('showmsg', {
                text: "Cari Hesap oluşturuldu: " + response.data.firm_full_name
                , show: true
              });
            }
          })
      )
    },

    async putData() {
      let formData = new FormData();
      formData.append("partnership_structure_identity_copies", this.editedItem.partnershipDoc);
      formData.append("activity_certificate_pdf", this.editedItem.faaliyetDoc);
      formData.append("tax_return_pdf", this.editedItem.vergiDoc);

      formData.append("authorized_signatures_list_pdf", this.editedItem.imzaDoc);
      formData.append("board_management", this.editedItem.managementDoc);
      formData.append("identity_copies", this.editedItem.identityDoc);

      formData.append('firm_full_name', this.editedItem.firm_full_name)
      formData.append('firm_type', this.editedItem.firm_type)
      formData.append('taxpayer_number', this.editedItem.taxpayer_number)
      formData.append('birthplace', this.editedItem.birthplace)
      formData.append('tax_department', this.editedItem.tax_department)
      formData.append('firm_address', this.editedItem.firm_address)
      formData.append('firm_key_contact_personnel', this.editedItem.firm_key_contact_personnel)
      formData.append('sector', this.editedItem.sector)
      formData.append('city', this.editedItem.city)
      formData.append('district', this.editedItem.district)
      formData.append('phone_number', this.editedItem.phone_number)
      formData.append('fax', this.editedItem.fax)
      formData.append('web_url', this.editedItem.web_url)
      formData.append('email_addr', this.editedItem.email_addr)
      console.log("form data : " + JSON.stringify(formData))

      let data_id = this.accountValues[this.editedIndex].data_id;

      const ACCOUNT_PUT_API = "http://127.0.0.1:8000/checkaccount/api/accounts/" + data_id + "/"
      console.log("PUT API : " + ACCOUNT_PUT_API);

      const response = await axios.put(ACCOUNT_PUT_API, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
          .then(
              (response => {
                console.log("status : " + response.status)
                if (response.status !== 200) {
                  lstore.commit('showmsg', {text: "Hesap güncellenemedi", show: true})
                  console.log(response)
                } else {
                  console.log("Hesap güncellendi !");
                  lstore.commit('showmsg', {
                    text: "Hesap güncellendi: " + response.data.firm_full_name
                    , show: true
                  });
                }
              })
          )
      console.log("put response : " + response)

    },

    async save() {
      if (this.updateState) {
        await this.putData()
      } else {
        await this.postData()
      }
      this.dialog = false;
    },
  },
}
</script>

<style scoped>

</style>
