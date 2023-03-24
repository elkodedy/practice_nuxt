<template>
  <v-container>
    <v-layout>
      <v-flex sm12>
        <v-toolbar flat dense>
          <v-toolbar-title class="hidden-xs-only"> Data Users </v-toolbar-title>
          <v-divider class="mx-6" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-form d-flex @keyup.native.enter="getDataFromApi">
            <v-layout wrap>
              <!-- <v-flex sm5 xs6>
                <v-select
                  v-model="searchItem"
                  :items="itemSearch"
                  label="Search Type"
                  class="mt-1"
                  outlined
                  dense
                  hide-details="auto"
                ></v-select>
              </v-flex> -->
              <v-flex sm12 xs12 style="margin-top: 4px">
                <v-text-field
                  v-model="search"
                  label="search"
                  outlined
                  dense
                  hide-details="auto"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-form>

          <v-btn icon color="green" dark @click="newData">
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
            :footer-props="{ 'items-per-page-options': [20, 50, 100, -1] }"
          >
            <template #body="{ items }">
              <tbody>
                <tr
                  v-for="item in items"
                  :key="item.id"
                  class="test-tr"
                  :style="{ backgroundColor: item.Color }"
                >
                  <td class="text-md-center">{{ item.name }}</td>
                  <td class="text-md-center">{{ item.nik }}</td>
                  <td class="text-md-center">{{ item.tanggal_lahir }}</td>
                  <td class="text-md-center">{{ item.ktp }}</td>
                  <td class="text-md-center">{{ item.jenis_kelamin }}</td>
                  <td class="text-md-center">{{ item.hp }}</td>
                  <td class="text-md-center">{{ item.email }}</td>
                  <td class="text-md-center">{{ item.alamat }}</td>
                  <td class="text-md-center">
                    <v-tooltip top style="margin-top: 4px">
                      <template #activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon class="teal--text" @click="mail(item)"
                            >mdi-email-variant</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Send Email</span>
                    </v-tooltip>
                  </td>
                  <td class="text-md-center">
                    <v-tooltip top style="margin-top: 4px; margin-right: 8px">
                      <template #activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon class="amber--text" @click="editItem(item)"
                            >mdi-account-edit</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip top style="margin-top: 4px">
                      <template #activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon class="red--text" @click="deleteItem(item)"
                            >mdi-delete</v-icon
                          >
                        </v-btn>
                      </template>
                      <span>Delete</span>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </template>
            <template #footer> </template>
          </v-data-table>
        </div>
      </v-flex>

      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card class="py-10">
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
                        type="number"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="pa-2">
                      <v-text-field
                        v-model="form.tanggal_lahir"
                        label="Tanggal Lahir"
                        outlined
                        dense
                        hide-details="auto"
                        type="date"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="pa-2">
                      <v-text-field
                        v-model="form.ktp"
                        label="KTP"
                        outlined
                        dense
                        hide-details="auto"
                        type="number"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 class="pa-2">
                      <v-select
                        v-model="form.jenis_kelamin"
                        label="Jenis Kelamin"
                        :items="['Pria', 'Wanita']"
                        outlined
                        dense
                        hide-details="auto"
                      ></v-select>
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
                        v-model="form.email"
                        label="Email"
                        outlined
                        dense
                        hide-details="auto"
                        type="email"
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
              text
              class="my-btn-logout grey mx-1"
              color="white"
              @click="close()"
            >
              Close
            </v-btn>
            <v-btn
              text
              class="my-btn light-green mx-1 mr-4"
              color="white"
              @click="save()"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout class="">
      <div class="py-4 d-flex justify-center ml-auto ml-5">
        <v-btn color="error" @click="downloadPdf">
          Download PDF (.pdf)
          <v-icon right dark> mdi-download </v-icon>
        </v-btn>
      </div>
      <!-- <div class="py-4 d-flex justify-center ml-5">
        <v-btn color="success" @click="downloadExcel">
          Download Excel (.xlsx)
          <v-icon right dark> mdi-download </v-icon>
        </v-btn>
      </div> -->
      <div class="py-4 d-flex justify-center ml-5">
        <v-btn color="success" @click="downloadExcel2">
          Download Excel (.xlsx)
          <v-icon right dark> mdi-download </v-icon>
        </v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Users',
  middleware: 'auth',

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
        { id: 0, name: 'Ordinary User' },
        { id: 14, name: 'Administrator' },
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
        { text: 'Yes', value: 'Y' },
        { text: 'No', value: 'N' },
      ],
      form: {
        id: null,
        name: null,
        nik: null,
        tanggal_lahir: null,
        ktp: null,
        jenis_kelamin: null,
        hp: null,
        email: null,
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
        email: null,
        alamat: null,
      },

      headers: [
        { text: 'Name', value: 'name', align: 'center' },
        { text: 'NIK', value: 'nik', align: 'center' },
        { text: 'Tanggal Lahir', value: 'tanggal_lahir', align: 'center' },
        { text: 'KTP', value: 'ktp', align: 'center' },
        { text: 'Jenis Kelamin', value: 'jenis_kelamin', align: 'center' },
        { text: 'HP', value: 'hp', align: 'center' },
        { text: 'Email', value: 'email', align: 'center' },
        { text: 'Alamat', value: 'alamat', align: 'center' },
        { text: 'Kirim Email', value: '', align: 'center' },
        { text: 'Action', value: '', align: 'center' },
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

  mounted() {
    // this.getHeaders()
    this.getInit()
    // console.log(this.$auth.user.id)
  },

  methods: {
    getInit() {
      window.details = this
    },

    getDataFromApi() {
      this.loading = true
      const vm = this
      this.$axios
        .get(`/api/practice`, {
          params: {
            options: vm.options,
            searchItem: vm.searchItem,
            search: vm.search,
          },
        })
        .then((res) => {
          this.loading = false
          this.allData = res.data.data.rows
          this.totalData = res.data.data.total
          this.itemSearch = res.data.data.filter
          this.allDevice = res.data.data.all_device
        })
        .catch((err) => {
          this.loading = false
          this.$swal({
            title: 'Error!',
            text: err.response.data.message,
            type: 'error',
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
      // console.log(item)
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
          this.$axios.delete(`/api/practice/${item.id}`).then((res) => {
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

    save(type = 'all', row = null) {
      const vm = this
      const status = this.statusProcessing
      const form = this.form
      const data = {
        form,
        status,
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
      vm.submitLoad = true
      this.$axios({ method, url, data })
        .then((res) => {
          this.$swal({
            title: 'Success!',
            text: res.data.message,
            type: 'success',
          })
          vm.submitLoad = false
          this.dialog = false
          this.getDataFromApi()
        })
        .catch((err) => {
          vm.submitLoad = false
          this.$swal({
            title: 'Error!',
            text: err.response.data.message,
            type: 'error',
          })
        })
    },

    mail(item) {
      const method = 'get'
      const url = 'api/kirim-email/' + item.id
      this.$swal({
        title: 'Send Email?',
        text: 'This email will be send to ' + item.email,
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#009688',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, send it!',
      }).then((result) => {
        if (result.value) {
          this.$axios({ method, url })
            .then((res) => {
              this.$swal({
                title: 'Success!',
                text: 'Email berhasil dikirim',
                type: 'success',
              })
              this.getDataFromApi()
            })
            .catch((err) => {
              this.$swal({
                title: 'Error!',
                text: err.response.data.message,
                type: 'error',
              })
            })
        }
      })
    },

    downloadExcel() {
      this.loading1 = true
      this.$axios
        .get(`/api/download-excel`, {
          responseType: 'arraybuffer',
        })
        .then((res) => {
          // console.log(res)
          this.loading1 = res
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel',
          })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')

          link.href = window.URL.createObjectURL(blob)
          link.download = 'php-spreadsheet.xlsx'
          document.body.appendChild(link)
          link.click()
          setTimeout(function () {
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          }, 100)
        })
        .catch((err) => {
          this.$swal({
            type: 'error',
            title: 'Error',
            text: err.response.data.message,
          })
          this.loading1 = false
        })
    },
    downloadExcel2() {
      this.loading1 = true
      this.$axios
        .get(`/api/download-excel-2`, {
          responseType: 'arraybuffer',
        })
        .then((res) => {
          // console.log(res.data)
          this.loading1 = res
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel',
          })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')

          link.href = window.URL.createObjectURL(blob)
          link.download = 'php-excel.xlsx'
          document.body.appendChild(link)
          link.click()
          setTimeout(function () {
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          }, 100)
        })
        .catch((err) => {
          this.$swal({
            type: 'error',
            title: 'Error',
            text: err.response.data.message,
          })
          this.loading1 = false
        })
    },
    downloadPdf() {
      this.loading1 = true
      this.$axios
        .get(`/api/download-pdf`, {
          responseType: 'arraybuffer',
        })
        .then((res) => {
          // console.log(res.data)
          this.loading1 = res
          const blob = new Blob([res.data], {
            type: 'application/pdf',
          })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')

          link.href = window.URL.createObjectURL(blob)
          link.download = 'laravel-mpdf.pdf'
          document.body.appendChild(link)
          link.click()
          setTimeout(function () {
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
          }, 100)

          this.$swal({
            type: 'success',
            title: 'Success',
            text: res,
          })
        })
        .catch((err) => {
          this.$swal({
            type: 'error',
            title: 'Error',
            text: err.response.data.message,
          })
          this.loading1 = false
        })
    },
  },
}
</script>
