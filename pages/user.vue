<template>
  <v-container>
    <v-layout>
      <v-flex sm12>
        <v-toolbar flat dense>
          <v-toolbar-title class="hidden-xs-only">{{ $route.meta.title }}</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-form d-flex @keyup.native.enter="getDataFromApi">
            <v-layout wrap>
              <v-flex sm5 xs6>
                <v-select
                  v-model="searchItem"
                  :items="itemSearch"
                  label="Search Type"
                  class="mt-1"
                  outlined dense
                  hide-details="auto"
                ></v-select>
              </v-flex>
              <v-flex sm1>
              </v-flex>
              <v-flex sm6 xs6 style="margin-top: 4px">
                <v-text-field
                  v-model="search"
                  label="search"
                  outlined dense
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>

          <v-btn
            icon
            color="green"
            dark @click="newData"
          >
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn>
          <v-btn :loading="loading" icon @click="getDataFromApi">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>

        <div class="mt-2">
          <v-data-table
            :mobile-breakpoint="0"
            :headers="headers"
            :items="allData"
            :items-per-page="20"
            :options.sync="options"
            :server-items-length="totalData"
            :loading="loading"
            class="elevation-1"
            :footer-props="{'items-per-page-options':[20, 50, 100, -1]}"
          >
            <template
              #body="{ items }"
            >
              <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
                class="test-tr"
                :style="{backgroundColor: item.Color}"
              >
              <td class="text-xs-center">{{ item.name }}</td>
              <td class="text-xs-center">{{ item.nik }}</td>
              <td class="text-xs-center">{{ item.tanggal_lahir }}</td>
              <td class="text-xs-center">{{ item.ktp }}</td>
              <td class="text-xs-center">{{ item.jenis_kelamin }}</td>
              <td class="text-xs-center">{{ item.hp }}</td>
              <td class="text-xs-center">{{ item.alamat }}</td>
                <td class="d-flex">
                  <v-tooltip
                    top
                    style="margin-top: 4px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
                      </v-btn>
                    </template>
                    <span>Edit</span>
                  </v-tooltip>
                  <v-tooltip
                    top
                    style="margin-top: 4px"
                  >
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Delete</span>
                  </v-tooltip>
                </td>
              </tr>
              </tbody>
            </template>
            <template
              #footer
            >
            </template>
          </v-data-table>
        </div>
      </v-flex>

      <v-dialog
        v-model="dialog"
        persistent
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span>{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-layout wrap>
                <v-flex v-if="message" xs12>
                  <div class="red darken-2 text-xs-center">
                    <span class="white--text">{{ message }}</span>
                  </div>
                </v-flex>

                <v-flex md12 class="d-flex">
                  <v-layout wrap>
                    <v-flex xs12 class="pa-2">
                      <v-text-field
                        v-model="form.name"
                        label="Name"
                        outlined
                        dense
                        hide-details="auto"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="pa-2">
                      <v-text-field
                        v-model="form.nik"
                        label="NIK"
                        outlined
                        dense
                        hide-details="auto"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="pa-2">
                      <v-text-field
                        v-model="form.tanggal_lahir"
                        label="Tanggal Lahir"
                        outlined
                        dense
                        hide-details="auto"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="pa-2">
                      <v-text-field
                        v-model="form.ktp"
                        label="KTP"
                        outlined
                        dense
                        hide-details="auto"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="pa-2">
                      <v-text-field
                        v-model="form.jenis_kelamin"
                        label="Jenis Kelamin"
                        outlined
                        dense
                        hide-details="auto"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="pa-2">
                      <v-text-field
                        v-model="form.hp"
                        label="HP"
                        outlined
                        dense
                        hide-details="auto"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="pa-2">
                      <v-text-field
                        v-model="form.alamat"
                        label="Alamat"
                        outlined
                        dense
                        hide-details="auto"
                      ></v-text-field>
                    </v-flex>

                  </v-layout>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              small
              @click="close()"
            >
              Close
            </v-btn>
            <v-btn
              color="green darken-1"
              small
              dark
              :loading="submitLoad"
              @click="save()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Users",
  middleware: 'auth',

  components: {
  },

  data() {
    return {
      totalData: 0,
      editedIndex: -1,
      loadNewBtn: false,
      loadingAddUser: false,
      submitLoad: false,
      singleSelect: false,
      show: false,
      dialog: false,
      dialogExportUser: false,
      message: false,
      loading: true,
      statusProcessing: 'insert',
      searchItem: '',
      listDevices: [],
      privilege: [
        {id: 0, name: 'Ordinary User'},
        {id: 14, name: 'Administrator'},
      ],
      search: '',
      allData: [],
      itemSearch: [],
      itemDeviceBrand: [],
      itemDeviceType: [],
      itemAccessType: [],
      itemCompany: [],
      selected: [],
      allDevice: [],
      options: {},
      dataItem: {},
      sub_id: {},
      itemYesNo: [
        {text: 'Yes', value: 'Y'},
        {text: 'No', value: 'N'},
      ],
      form: {
        id: null,
        name: null,
        nik: null,
        tanggal_lahir: null,
        ktp: null,
        jenis_kelamin: null,
        hp: null,
        alamat: null,
      },
      defaultItem: {
        id: null,
        name: null,
        nik: null,
        tanggal_lahir: null,
        ktp: null,
        jenis_kelamin: null,
        hp: null,
        alamat: null,
      },

      headers: [
        {text: 'Name', value: 'name'},
        {text: 'NIK', value: 'nik'},
        {text: 'Tanggal Lahir', value: 'tanggal_lahir'},
        {text: 'KTP', value: 'ktp'},
        {text: 'Jenis Kelamin', value: 'jenis_kelamin'},
        {text: 'HP', value: 'hp'},
        {text: 'Alamat', value: 'alamat'},
      ],
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Data' : 'Edit Data'
    },
  },

  watch: {
    options: {
      handler() {
        this.getDataFromApi()
      },
      deep: true,
    },
  },

  created() {
    this.getInit()
  },

  methods: {
    getInit() {
      window.details = this
    },

    getDataFromApi() {
      this.loading = true
      const vm = this
      this.$axios.get(`/api/practice`, {
        params: {
          options: vm.options,
          searchItem: vm.searchItem,
          search: vm.search,
        }
      })
        .then(res => {
          this.loading = false
          this.allData = res.data.data.rows
          this.totalData = res.data.data.total
          this.itemSearch = res.data.data.filter
          this.allDevice = res.data.data.all_device
        })
        .catch(err => {
          this.loading = false
          this.$swal({
            title: 'Error!',
            text: err.response.data.message,
            type: 'error'
          })
        })
    },

    newData() {
      this.dialog = true
      setTimeout(() => {
        this.form = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
      this.statusProcessing = 'insert'
    },

    editItem(item) {
      console.log(item)
      this.statusProcessing = 'update'
      this.editedIndex = this.allData.indexOf(item)
      this.form = Object.assign({}, item)
      this.dataItem = item
      this.dialog = true
      this.insert = false
    },

    deleteItem(item) {
      const vm = this
      this.$swal({
        title: 'Are you sure?',
        text: 'The file will be permanently deleted',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          this.$axios
            .delete(`/api/practice/${item.id}`)
            .then((res) => {
              vm.getDataFromApi()
            })
        }
      })
    },

    close() {
      this.statusProcessing = 'insert'
      this.dialog = false
      setTimeout(() => {
        this.form = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save (type = 'all', row = null) {
      const vm = this
      const status = this.statusProcessing
      const form = this.form
      const data = {
        form,
        status
      }
      if (status === 'insert') {
        this.store('post', '/api/practice', data, 'insert', type)
        vm.submitLoad = false
      } else if (status === 'update') {
        this.store('put', '/api/practice/' + this.form.id, data, 'update', type)
        vm.submitLoad = false
      }
    },

    store(method, url, data, type, column = 'all') {
      const vm = this
      vm.submitLoad = true;
      this.$axios({method, url, data})
        .then(res => {
          this.$swal({
            title: 'Success!',
            text: res.data.message,
            type: 'success'
          })
          vm.submitLoad = false
          this.dialog = false
          this.getDataFromApi()
        })
        .catch(err => {
          vm.submitLoad = false
          this.$swal({
            title: 'Error!',
            text: err.response.data.message,
            type: 'error'
          })
        })
    },

  },
}
</script>
