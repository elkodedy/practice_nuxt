<template>
  <v-row no-gutters align="center" align-content="center" justify="center">
    <v-col cols="12" sm="4" md="4" lg="4" xl="3" align-self="center">
      <!-- <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card> -->

      <v-form @keyup.native.enter="sendNotif">
        <v-card>
          <div class="logo py-8 mt-16 d-flex justify-center">
            <ImipLogo />
          </div>
          <v-card-title>
            <v-card-text>
              <v-flex xs12 class="mb-4">
                <v-text-field
                  v-model="form.title"
                  outlined
                  dense
                  label="Title"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="mb-1">
                <v-textarea
                  v-model="form.message"
                  outlined
                  dense
                  label="Message"
                  required
                  hide-details="auto"
                  @click:append="show = !show"
                ></v-textarea>
              </v-flex>
            </v-card-text>
            <v-card-text class="">
              <v-flex class="text-center" xs12>
                <v-btn
                  text
                  class="my-btn-logout grey mx-1"
                  color="white"
                  @click="clear"
                  >clear</v-btn
                >
                <v-btn
                  text
                  class="my-btn light-green mx-1"
                  color="white"
                  @click="sendNotif"
                >
                Send Notification
                  <!-- <v-icon right dark> mdi-login-variant </v-icon> -->
                </v-btn>
              </v-flex>
            </v-card-text>
            <!-- <v-card-actions>
              <v-flex class="text-right" xs12>
                <v-spacer></v-spacer>
                <v-btn small text color="red" @click="clear">clear</v-btn>
                <v-btn color="success" small @click="sendNotif">
                  Send Notification
                  <v-icon right dark>mdi-arrow-right-bold-circle-outline </v-icon>
                </v-btn>
              </v-flex>
            </v-card-actions> -->
          </v-card-title>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'Auth',
  middleware: 'auth',

  /* function data() fungsi bawaan, vue yang me-return variabel yang dapat di gunakan di dalam halaman */
  data() {
    return {
      form: {
        id: this.$auth.user.id,
        title: '',
        message: '',
        language: 'en',
        // app_name: process.env.appName,
        app_name: 'E-FORM',
      },
      show: false,
      loading: false,
    }
  },

  /* fungtion create() fungsi bawaan, vue yang akan langsung mengeksekusi perintah didalamnya saat halaman di akses */
  created() {
    this.getApps()
  },

  // object method bawaan vue, object yang dapat menyimpan fungsi2 yang dapat di gunakan di halaman
  methods: {
    // menggunakan plugin axios untuk mengkoneksikan vue ke api backend
    getApps() {
      this.$axios.get(`/api/apps`).then((res) => {
        this.apps = res.data.data.rows
      })
    },

    clear() {
      this.form = Object.assign({}, this.defaultForm)
    },

    sendNotif() {
      this.loading = true

      this.$axios.post('/api/kirim-notifikasi', this.form).then((res) => {
        // console.log('Notifikasi terkirim')
        // console.log(res.data)
        this.$swal({
          type: 'success',
          title: 'Success',
          text: 'Notifikasi terkirim',
        })
      })
    },
  },
}
</script>
