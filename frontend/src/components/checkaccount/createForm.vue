<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
            cols="12"
            md="4"
        >
          <v-card-text> Ticari Bilgiler </v-card-text>
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
    sehir : '',
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

    sehirler: [

    ],

    ilceler: [

    ],

    syspersonnels: [

    ],
  }),
}
</script>

<style scoped>

</style>
