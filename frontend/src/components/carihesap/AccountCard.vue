<template>
    <v-dialog
        v-model="dialog"
        max-width="500px"
        fullscreen

    >
      <v-card>

      </v-card>
    </v-dialog>

</template>

<script>
export default {
  name: "AccountCard",
  data: () => ({
    dialog: true,

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


    methods: {
      async save() {
        if (this.updateState) {
          await this.putData()
        } else {
          await this.postData()
        }
        this.dialog = false;
      },
    }
  })
}
</script>

<style scoped>

</style>
