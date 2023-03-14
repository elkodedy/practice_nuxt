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
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
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
            <v-icon> mdi-account </v-icon>
          </v-list-item-action>
          <v-list-item-title v-if="login_state" >{{ app_user }}</v-list-item-title>
          <v-list-item-title v-else>Guest</v-list-item-title>
        </v-list-item>
      </v-list>

      <div v-if="login_state" class="py-4 d-flex justify-center">
        <v-btn color="success" @click="logout">
          Logout
          <v-icon right dark> mdi-logout-variant </v-icon>
        </v-btn>
      </div>
      <div v-else class="py-4 d-flex justify-center">
        <v-btn color="success" @click="login">
          login
          <v-icon right dark> mdi-logout-variant </v-icon>
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
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      login_state: this.$auth.$storage.getLocalStorage('app.default_name'),
      app_user: this.$auth.$storage.getLocalStorage('app.app_user'),
    }
  },

  mounted() {
    if(this.login_state){
      this.items.push(
        {
          icon: 'mdi-account',
          title: 'User',
          to: '/user',
        },
        {
          icon: 'mdi-account',
          title: 'User Handson Table',
          to: '/user_ht',
        },
      )
    }
    // this.login_state = 'any'
    // console.log(this.login_state)
    // console.log('this.login_state')
  },

  methods: {
    login(){
      window.location.href = "/login"
    },

    async logout() {
      await this.$auth.logout()
      this.$auth.$storage.removeLocalStorage('app.default_name')
      this.$auth.$storage.removeLocalStorage('app.app_user')
      this.$swal({
        type: 'success',
        title: 'Success',
        text: "Logout Berhasil",
      }).then(function(){
        location.reload();
      })
      // this.$router.push('/login')
    },
  },
}
</script>
