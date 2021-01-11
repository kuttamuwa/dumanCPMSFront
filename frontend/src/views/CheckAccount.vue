<template>
  <v-form v-model="valid">
    <div id="createCheckAccount">
      <v-expansion-panels>

        <v-expansion-panel id="creationForm">
          <v-expansion-panel-header>
            Cari Hesap Aç
          </v-expansion-panel-header>
          <v-expansion-panel-content>
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
                      v-model="firmaTipi"
                      :items="firmTypes"
                  ></v-combobox>

                  <v-text-field
                      label="Firma Adı"
                      v-model="firmaAdi"
                      required
                  ></v-text-field>

                  <v-text-field
                      label="Kimlik No"
                      v-model="kimlikNo"
                      :rules="kimlikRules"
                      required
                  ></v-text-field>

                  <v-text-field
                      label="Vergi Departmanı"
                      v-model="vdepartmani"
                      :rules="generalRules"
                      required
                  ></v-text-field>

                  <v-text-field
                      label="Firma Adresi"
                      v-model="firmaddr"
                      :rules="generalRules"
                      required
                  ></v-text-field>

                  <v-combobox
                      label="Doğum Yeri"
                      persistent-hint
                      v-model="dyeri"
                      :items="sehirler"
                  ></v-combobox>

                  <v-combobox
                      persistent-hint
                      label="İletişim Personeli"
                      v-model="firmcontact"
                      :items="syspersonnels"
                  ></v-combobox>

                </v-col>

                <v-col>
                  <v-card-text>Firma Bilgileri</v-card-text>
                  <v-text-field
                      v-model="sektor"
                      :rules="generalRules"
                      label="Sektör"
                      required
                  ></v-text-field>

                  <v-combobox
                      persistent-hint
                      label="Şehir"
                      v-model="sehir"
                      :items="sehirler"
                  ></v-combobox>

                  <v-combobox
                      persistent-hint
                      label="İlçe"
                      v-model="ilce"
                      :items="ilceler"
                  ></v-combobox>
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
                      v-model="telno"
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

              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel id="RUD Form">
          <v-expansion-panel-header>
            Cari Hesaplar
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-data-table
                :headers="accountColumns"
                :items="accountValues"
                :items-per-page="5"
                class="elevation-1"
            ></v-data-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </div>
  </v-form>
</template>

<script>
export default {
  name: "CheckAccount",
  data: () => ({
    valid: false,

    firmaTipi: '',
    firmaAdi: '',
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
    web_url: '',
    email_addr: '',

    generalRules: [
      v => !!v || 'Bu alan boş bırakılamaz !',
    ],

    kimlikRules: [
      v => !!v || 'Kimlik No gereklidir',
      v => v.length !== 11 || 'Kimlik numarası 11 haneden farklı olamaz !'
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


    // API'dan alinan veriler
    firmTypes: [
      'Tüzel Kişilik',
      'Şahıs İşletmesi',
    ],

    sehirler: [],

    ilceler: [],

    syspersonnels: [],

    accountColumns: [
      {
        text: 'Firma Adı',
        align: 'start',
        value: 'firmaAdi',
      },
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
    ],

    accountValues: [
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

  methods: {
    getaccounts() {
      // servise istek atip yazacagimiz yer
    },

    initialize() {
      // accountlar
      this.getaccounts();

      // test degerleri
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
      this.accountValues.splice(this.editedIndex, 1)
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
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  }
}
</script>

<style scoped>

</style>
