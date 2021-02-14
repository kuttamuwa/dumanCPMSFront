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
        <v-toolbar-title> Cari Hesaplar</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical></v-divider>
        <v-spacer></v-spacer>

        <v-dialog
            v-model="createCardDialog"
            max-width="500px">

          <template v-slot:activator="{on, attrs}">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              Yeni Hesap Ekle
            </v-btn>
          </template>

          <CreateCard
          ></CreateCard>
          <template v-slot:no-data>
            <v-card-text> Hiç veri bulunamamıştır</v-card-text>
          </template>

        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
<!--      <v-icon-->
<!--          small-->
<!--          class="mr-2"-->
<!--          @click="createItem"-->
<!--      >-->
<!--        mdi-add-->
<!--      </v-icon>-->

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

  </v-data-table>
</template>

<script>
import lstore from "@/store/lstore";
import AccountCard from "@/components/carihesap/AccountCard";
import CreateCard from "@/components/carihesap/CreateCard";

const ACCOUNT_API = "http://127.0.0.1:8000/checkaccount/api/accounts/?format=json";
const CITY_API = "http://127.0.0.1:8000/checkaccount/api/cities/?format=json";

const axios = require('axios').default;

axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.xsrfCookieName = "csrftoken";

export default {
  name: 'CheckAccount',
  components: {CreateCard, AccountCard},
  data: () => ({
    // actions
    editCardDialog: false,
    createCardDialog: false,
    deleteCardDialog: false,

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

    accountValues: [
      {}
    ],

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
    editCardDialog(val) {
      val || this.closeEdit()
    },
    createCardDialog(val) {
      val || this.closeCreate()
    },
    deleteCardDialog(val) {
      val || this.closeDelete()
    }
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
      await this.$store.commit('checkPermission');
      await this.getAccounts();
      await this.getCities();
      await this.getSysPersonnels();

    },

    createItem() {
      this.createCardDialog = true
    },

    editItem(item) {
      this.editedIndex = this.accountValues.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.updateState = true;
      this.editCardDialog = true
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

    closeCreate() {
      this.createCardDialog = false
    },

    closeEdit(val) {
      this.editCardDialog = false
    },

    closeDelete() {
      this.deleteCardDialog = false

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


  },
}
</script>

<style scoped>

</style>
