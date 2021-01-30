<template>
  <v-snackbar
      v-model="$store.state.snackbar.show"
      timeout="1000"
  >
    {{ $store.state.snackbar.text }}
    <template v-slot:action="{attrs}">
      <v-btn color="pink" text v-bind="attrs">
        Close
      </v-btn>
    </template>
  </v-snackbar>

</template>

<script>
export default {
  data: () => ({
  }),
}
</script>
