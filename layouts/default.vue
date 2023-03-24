<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item-action v-if="login_state" router exact>
          <v-list-item-action class="mr-3 account-icon">
            <v-icon :style="{ fontSize: accountPhotoSize }"
              >mdi-account-circle</v-icon
            >
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <span class="">Selamat Datang</span> <br />
              <span class="user_name cl-green"
                ><strong>{{ app_user }}</strong></span
              >
            </v-list-item-title>
          </v-list-item-content>
          <hr />
        </v-list-item-action>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariantFunc()">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title class="text-h6">{{ title }} </v-toolbar-title>
      <!-- <v-toolbar-title> ({{ notif }})</v-toolbar-title> -->
      <v-spacer />

      <v-menu offset-y left>
        <template #activator="{ on }">
          <v-btn
            v-if="notif"
            small
            icon
            color="green"
            class="mr-0"
            v-on="on"
            @click="bellOff"
          >
            <!-- <v-badge :content="1" dot floating> -->
              <v-icon size="25">mdi-bell-ring</v-icon>
            <!-- </v-badge> -->
          </v-btn>
          <v-btn v-else small icon class="mr-0" v-on="on">
            <v-icon size="25">mdi-bell</v-icon></v-btn
          >
        </template>

        <v-card>
          <v-list dense nav>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  {{ notif_title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ notif_message }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>

      <!-- /notif -->

      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-icon> mdi-account-circle </v-icon>
          </v-list-item-action>
          <v-list-item-title v-if="login_state">{{
            app_user
          }}</v-list-item-title>
          <v-list-item-title v-else>Guest</v-list-item-title>
        </v-list-item>
      </v-list>

      <div v-if="login_state" class="py-4 d-flex justify-center">
        <v-btn class="my-btn-logout grey mx-1" @click="logout"> Logout </v-btn>
      </div>
      <!-- <div v-if="login_state" class="py-4 d-flex justify-center">
        <v-btn color="success" @click="send_mail">
          send mail
          <v-icon right dark> mdi-logout-variant </v-icon>
        </v-btn>
      </div> -->
      <div v-else class="py-4 d-flex justify-center">
        <v-btn
          class="my-btn light-green mx-1"
          color="white"
          text
          @click="login"
        >
          login
          <!-- <v-icon right dark> mdi-logout-variant </v-icon> -->
        </v-btn>
      </div>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      notif: false,
      notif_title: '',
      notif_message: 'Belum ada pesan',
      clipped: false,
      drawer: false,
      fixed: false,
      accountPhotoSize: '60px',
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/',
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: '',
        //   to: '/inspire',
        // },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      // title: 'INDONESIA MOROWAILI INDUSTRIAL PARK',
      title: 'IMIP',
      login_state: this.$auth.$storage.getLocalStorage('app.default_name'),
      app_user: this.$auth.$storage.getLocalStorage('app.app_user'),
    }
  },

  mounted() {
    if (this.login_state) {
      this.items.push(
        {
          icon: 'mdi-account',
          title: 'User',
          to: '/user',
        },
        {
          icon: 'mdi-account-edit',
          title: 'User Handsontable',
          to: '/user_ht',
        }
      )
    }

    if (this.login_state) {
      this.$echo
        .channel('Practice.' + this.$auth.user.id)
        .on('practice.updated', (e) => {
          this.notif = true
          this.notif_title = e.data.title
          this.notif_message = e.data.message
        })
    }
  },

  methods: {
    miniVariantFunc() {
      this.miniVariant = !this.miniVariant
      if (this.miniVariant) {
        this.accountPhotoSize = '30px'
      } else {
        this.accountPhotoSize = '60px'
      }
    },
    login() {
      window.location.href = '/login'
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
        location.reload()
      })
    },

    bellOff() {
      this.notif = false
    },
  },
}
</script>

<style>
.user_name {
  font-size: 20px;
  color: #3dae38;
}
</style>
