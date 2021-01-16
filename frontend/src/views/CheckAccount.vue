<template>
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
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
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
</template>

<script>
const API_URL = 'http://127.0.0.1:8000/checkaccount/api';
const axios = require('axios').default;
import Cookies from "js-cookie";

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,

    sehirler: [],

    ilceler: [],

    syspersonnels: [],

    firmTypes: [
      'Tüzel Kişilik',
      'Şahıs İşletmesi'],

    accountColumns: [
      {text: 'Firma Adı', align: 'start', value: 'firmaAdi'},
      {text: 'Firma Tipi', value: 'firmaTipi'},
      {text: 'Kimlik No', value: 'kimlikNo'},
      {text: 'Doğum Yeri', value: 'dyeri'},
      {text: 'Vergi Departmanı', vdepartmani: 'protein'},
      {text: 'Firma Adresi', firmaddr: 'iron'},
      {text: 'Firma İletişim', firmcontact: 'iron'},
      {text: 'Sektör', value: 'sektor'},
      {text: 'Şehir', value: 'sehir'},
      {text: 'İlçe', value: 'ilce'},
      {text: 'Tel', value: 'telno'},
      {text: 'Fax', value: 'fax'},
      {text: 'Web', value: 'iron'},
      {text: 'Email', value: 'email_addr'},
      {text: 'Aksiyonlar', value: 'actions', sortable: false},
    ],

    accountValues: [
      {}
    ],

    defaultItem: {
      firmaAdi: '',
      firmaTipi: '',
      kimlikNo: '',
      dyeri: '',
      vdepartmani: '',
      firmaddr: '',
      firmcontact: '',
      sektor: '',
      sehir: '',
      ilce: '',
      telno: '',
      fax: '',
      email_addr: ''
    },

    editedIndex: -1,

    editedItem: {
      firmaAdi: '',
      firmaTipi: '',
      kimlikNo: '',
      dyeri: '',
      vdepartmani: '',
      firmaddr: '',
      firmcontact: '',
      sektor: '',
      sehir: '',
      ilce: '',
      telno: '',
      fax: '',
      email_addr: '',
      web_url: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

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

  mounted() {
    this.getDataFromApi();
  },

  methods: {
    initialize() {
      this.accountValues = [
        {
          firmaAdi: 'Umut A.Ş.',
          firmaTipi: 'Şahıs',
          kimlikNo: '13244112113',
          dyeri: 'Çorum',
          vdepartmani: 'Ümraniye Vergi Dairesi',
          firmaddr: 'a b c',
          firmcontact: 'Salim O.',
          sektor: 'IT',
          sehir: 'İstanbul',
          ilce: 'Ümraniye',
          telno: '+90 505 238 19 51',
          fax: '+212 143 13 32',
          email_addr: 'uucok@sirket.com.tr'
        },
        {
          firmaAdi: 'Ahmet A.Ş.',
          firmaTipi: 'Tüzel',
          kimlikNo: '17318665774',
          dyeri: null,
          vdepartmani: 'Ümraniye Vergi Dairesi',
          firmaddr: 'a b c',
          firmcontact: 'Salim O.',
          sektor: 'IT',
          sehir: 'İstanbul',
          ilce: 'Ümraniye',
          telno: '+90 505 238 19 51',
          fax: '+212 143 13 32',
          email_addr: 'uucok@sirket.com.tr'
        },
      ]
    },

    getDataFromApi() {
      console.log("Naber")
      var url = API_URL + '/accounts/';
      console.log(url);
      var r = axios.create({
            timeout: 5000,
            baseURL: url,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": Cookies.get('csrftoken')
            }
          }
      );

      r.get(url)
          .then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });


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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.accountValues[this.editedIndex], this.editedItem)
      } else {
        this.accountValues.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>
