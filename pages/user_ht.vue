<template>
  <v-container>
    <v-row no-gutters align="center" align-content="center" justify="center">
      <v-col cols="12" md="12" align-self="center">
        <v-card class="mt-2">
          <v-toolbar flat dense>
            <v-toolbar-title class="hidden-xs-only"
              >Data Users Handsontable</v-toolbar-title
            >
            <v-divider class="mx-6" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <!-- <v-btn
            icon
            color='green'
            dark @click='newData()'
          >
            <v-icon>mdi-plus-circle</v-icon>
          </v-btn> -->

            <v-btn
              text
              class="my-btn my-btn-add-line grey mx-1 mt-2"
              color="white"
              style=""
              @click="$refs.tableHandson.addLine()"
            >
              Add Line
            </v-btn>
            <v-btn
              text
              class="my-btn light-green mx-1 mt-2"
              color="white"
              :loading="submitLoad"
              @click="save()"
            >
              Save
            </v-btn>
            <v-btn class="mt-2" :loading="loading" icon @click="getData">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="pa-4" style="width: 100%; height: 75vh; overflow: hidden">
            <LazyTableHandson
              ref="tableHandson"
              @openFlatpickr="openFlatpickr"
              @openEditForm="openEditForm"
              @removeData="removeData"
            />

            <FlatpickrHandsontable
              ref="flatpickrHands"
              @setDatetimeItem="setDatetimeItem"
            />

            <EditForm ref="editForm" @getData="getData" />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FlatpickrHandsontable from '~/components/FlatpickrHandsontable.vue'

export default {
  name: 'UsersWithHandsonTable',
  middleware: 'auth',
  data() {
    return {
      totalData: 0,
      loading: false,
      submitLoad: false,
      statusProcessing: 'insert',
      dialog: false,
      formData: [],
      url: '/api/practice_ht',
    }
  },
  head() {
    return {
      title: 'Config',
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New' : 'Edit'
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    setDatetimeItem(data) {
      // console.log('setDatetimeItem')
      this.$refs.tableHandson.setDatetimeToDetails(
        data.row,
        data.cell,
        data.datetime
      )
    },
    openFlatpickr(data) {
      const vm = this
      vm.$refs.flatpickrHands.openDialog(data)
    },
    openEditForm(data) {
      const vm = this
      vm.$refs.editForm.editItem(data)
    },
    getData() {
      this.loading = true
      this.$axios
        .get(this.url)
        .then((res) => {
          this.loading = false
          this.$refs.tableHandson.setDataToDetails(
            res.data.data.rows,
            res.data.data.columns,
            res.data.data.header,
            this.formData
          )
        })
        .catch((err) => {
          this.loading = false
          this.$swal({
            type: 'error',
            title: 'Error',
            text: err.response.data.message,
          })
        })
    },
    removeData(data) {
      this.$axios
        .delete(this.url + '/0', {
          params: {
            id: data.id,
          },
        })
        .then((res) => {
          this.$swal({
            type: 'success',
            title: 'Success!',
            text: res.data.message,
          })
          this.getData()
        })
        .catch((err) => {
          this.$swal({
            type: 'error',
            title: 'Error',
            text: err.response.data.message,
          })
          this.getData()
        })
    },
    save() {
      this.submitLoad = true
      const details = this.$refs.tableHandson.getAddData()
      this.$axios
        .post(this.url, {
          details,
          formData: this.formData,
        })
        .then((res) => {
          this.$swal({
            type: 'success',
            title: 'Success',
            text: res.data.message,
          })
          this.getData()
        })
        .catch((err) => {
          this.$swal({
            type: 'error',
            title: 'Error',
            text: err.response.data.message,
          })
        })
        .finally((res) => {
          this.submitLoad = false
        })
    },
  },
  components: { FlatpickrHandsontable },
}
</script>

<style>
</style>
