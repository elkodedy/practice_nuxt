<template>
  <v-row no-gutters align="center" align-content="center" justify="center">
    <v-col cols="12" sm="4" md="4" lg="4" xl="3" align-self="center">
      <v-form v-if="!login_state" @keyup.native.enter="login">
        <v-card>
          <div class="logo py-8 mt-16 d-flex justify-center">
            <ImipLogo />
          </div>
          <v-card-title>
            <v-card-text>
              <v-flex xs12 class="mb-4">
                <v-text-field
                  v-model="form.app_name"
                  readonly
                  outlined
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="mb-4">
                <v-text-field
                  v-model="form.username"
                  outlined
                  dense
                  label="Username"
                  required
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 class="mb-1">
                <v-text-field
                  v-model="form.password"
                  :append-icon="show ? 'mdi-eye-off' : 'mdi-eye'"
                  :type="show ? 'text' : 'password'"
                  outlined
                  dense
                  label="Password"
                  required
                  hide-details="auto"
                  @click:append="show = !show"
                ></v-text-field>
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
                  @click="login"
                >
                  Login
                  <!-- <v-icon right dark> mdi-login-variant </v-icon> -->
                </v-btn>
              </v-flex>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-form>

      <div v-else class="py-4 d-flex justify-center">
        <v-btn  class="my-btn-logout grey mx-1" @click="logout">
          Logout
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'Auth',
  // middleware: 'guest',

  /* function data() fungsi bawaan, vue yang me-return variabel yang dapat di gunakan di dalam halaman */
  data() {
    return {
      form: {
        username: '',
        password: '',
        language: 'en',
        // app_name: process.env.appName,
        app_name: 'E-FORM',
      },
      show: false,
      loading: false,
      login_state: this.$auth.$storage.getLocalStorage('app.default_name'),
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

    login() {
      this.loading = true
      this.$auth
        .loginWith('local', {
          data: this.form,
        })
        .then((response) => {
          this.loading = false

          // jika berhasil login maka simpan info halaman ke dalam localstorage browser
          this.$auth.$storage.setLocalStorage(
            'app.default_name',
            this.form.app_name
          )
          this.$auth.$storage.setLocalStorage(
            'app.app_user',
            this.form.username
          )
          this.$axios.get('/api/auth/roles').then((res) => {
            console.log('login berhasil')
            this.$swal({
              type: 'success',
              title: 'Success',
              text: 'Login Berhasil',
            }).then(function () {
              // location.reload();
              window.location.href = '/'
            })

            //   this.$gates.setRoles(res.data)

            // this.$axios.get('/api/auth/permissions').then((res) => {
            //   this.$gates.setPermissions(res.data)
            //   this.$swal({
            //     type: 'success',
            //     title: 'Success',
            //     text: "Login Berhasil",
            //   })
            // window.location.href = process.env.baseRoute
            // if (this.$auth.$state.redirect) {
            //   // If rediect to login page from page that is required authentication (auth midleware), go that page
            //   window.location.href = this.$auth.$state.redirect
            // } else if (this.$route.query.service) {
            //   window.location.href = this.$route.query.service
            // } else {
            //   // Otherwise, go to home page
            //   window.location.href = process.env.baseRoute
            // }
            // })
          })
          // .catch((err) => {
          //   console.log(err)
          //   console.log("login gagal")
          // })
        })
        .catch((err) => {
          // console.log(err)
          // console.log("login gagal")
          this.loading = false
          this.snackbar = true
          this.$swal({
            type: 'error',
            title: 'Error',
            text: err.response.data.message,
          })
        })
    },

    async logout() {
      await this.$auth.logout()
      this.$auth.$storage.removeLocalStorage('app.default_name')
      this.$auth.$storage.removeLocalStorage('app.app_user')
      this.$swal({
        type: 'success',
        title: 'Success',
        text: 'Logout Berhasil',
      }).then(function () {
        window.location.href = '/'
      })
      // this.$router.push('/login')
    },
  },
}
</script>
