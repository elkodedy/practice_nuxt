<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span>Edit</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-layout wrap>
            <!-- <v-flex v-if="message" xs12>
                  <div class="red darken-2 text-xs-center">
                    <span class="white--text">{{ message }}</span>
                  </div>
                </v-flex> -->

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
        <v-btn color="red darken-1" text small @click="close()"> Close </v-btn>
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
</template>

<script>
export default {
  name: 'UsersEdit',
  // middleware: 'auth',

  components: {},
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
      statusProcessing: 'update',
      searchItem: '',
      listDevices: [],
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
        { text: 'Name', value: 'name' },
        { text: 'NIK', value: 'nik' },
        { text: 'Tanggal Lahir', value: 'tanggal_lahir' },
        { text: 'KTP', value: 'ktp' },
        { text: 'Jenis Kelamin', value: 'jenis_kelamin' },
        { text: 'HP', value: 'hp' },
        { text: 'Alamat', value: 'alamat' },
      ],
    }
  },

  // created() {
  //   this.getInit()
  // },

  methods: {
    getInit() {
      window.details = this
    },

    editItem(item) {
      item = item.dataEdit
      this.statusProcessing = 'update'
      this.editedIndex = this.allData.indexOf(item)
      this.form = Object.assign({}, item)
      this.dataItem = item
      this.dialog = true
      this.insert = false
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
      this.store('put', '/api/practice/' + this.form.id, data, 'update', type)
      vm.submitLoad = false
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
          this.$emit("getData")
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
  },
}
</script>
