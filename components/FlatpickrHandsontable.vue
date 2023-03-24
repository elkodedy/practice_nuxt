<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="290"
    no-click-animation
    :retain-focus="false"
  >
    <v-card>
      <v-card-text>
        <flat-pickr
          v-model="datetime"
          :config="config"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click="closeDialog()"
        >
          Close
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="setDatetime()"
        >
          Done
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  name: 'FlatpickrHandsontable',
  components: {
    flatPickr,
  },
  data() {
    return {
      dialog: false,
      datetime: null,
      row: '',
      cell: '',
      config: {
        dateFormat: "Y-m-d",
        // dateFormat: "Y-m-d H:i:S",
        // enableSeconds: true,
        // enableTime: true,
        // time_24hr: true,
        // minuteIncrement: 5,
        clickOpens : false,
        monthSelectorType : 'static',
        inline: true,
      }
    }
  },
  methods: {
    openDialog(data) {
      this.row = data.row
      this.cell = data.col
      this.datetime = data.valueCol
      this.dialog = true
      // console.log('oke');
    },
    closeDialog() {
      this.row = ''
      this.cell = ''
      this.datetime = null
      this.dialog = false
    },
    setDatetime() {
      const vm = this
      this.$emit("setDatetimeItem", {
        row: vm.row,
        cell: vm.cell,
        datetime: vm.datetime,
      })
      console.log(vm.datetime)
      this.closeDialog()
    }
  }
}
</script>
<style>
  input.flatpickr-input {
    width: 100%;
    text-align: center;
    font-size: 15px;
    font-weight: 500;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .flatpickr-calendar,
  .flatpickr-days,
  .dayContainer {
    width: 240px !important;
    min-width: 240px;
    max-width: 240px;
  }
  .flatpickr-day {
    font-size: 12px;
    padding: 5px;
    height: auto;
    line-height: 15px;
    width: auto;
    border-radius: 0;
  }
  .numInputWrapper,
  .cur-month {
    font-size: 14px;
    font-weight: bold;
  }
  .flatpickr-time {
    height: 30px;
    max-height: 30px;
    line-height: 30px;
  }
  .flatpickr-time .numInputWrapper {
    height: 30px;
  }
  .flatpickr-time-separator,
  .flatpickr-am-pm {
    max-height: 30px;
    line-height: 30px;
  }
  .flatpickr-calendar.animate.open {
    animation: none !important;
  }
  .flatpickr-calendar:before,
  .flatpickr-calendar:after {
    display: none;
  }
  .flatpickr-current-month {
    padding-top: 12px;
  }
</style>
