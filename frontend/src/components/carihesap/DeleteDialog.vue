<template>
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

<script>
export default {
  name: "DeleteDialog"
}
</script>

<style scoped>

</style>
