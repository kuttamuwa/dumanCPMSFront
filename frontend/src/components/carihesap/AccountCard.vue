<template>
  <template v-slot:top>
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
    </v-dialog>
  </template>

  <template v-slot:no-data>
    <v-card-text> Hiç veri bulunamamıştır</v-card-text>
  </template>
</template>

<script>
export default {
  name: "AccountCard",
  data: () => ({
    dialog: true,
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
