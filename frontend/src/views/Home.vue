<template>
  <div class="home">

    <v-btn
        to="/login">
      <v-icon>mdi-logout</v-icon>
      360 Müşteri Performans Yönetim Sistemi'ne Hoş Geldiniz. <br>
      Giriş yaptıktan sonra yetkinize uygun olarak sol panelde modülleri görebilirsiniz.
    </v-btn>
    <h2 style="color: #2e6c80;">Modüller:</h2>

    <ol style="list-style: none; font-size: 14px; line-height: 32px; font-weight: bold;">
      <li style="clear: both;"><img style="float: left;" src="https://html-online.com/img/01-interactive-connection.png"
                                    width="45"/> Cari Hesap
      </li>
      <li style="clear: both;"><img style="float: left;" src="https://html-online.com/img/03-docs-to-html.png"
                                    width="45"/> Risk Analizi
      </li>
      <li style="clear: both;"><img style="float: left;" src="https://html-online.com/img/04-replace.png"
                                    width="45"/> Dashboard
      </li>
    </ol>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {}
}
</script>
