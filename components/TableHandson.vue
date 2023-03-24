<template>
  <div>
    <hot-table
      ref="details"
      :root="detailsRoot"
      :settings="settings"
    ></hot-table>

    <!-- <FlatpickrHandsontable
      ref='flatpickrHands'
      @setDatetimeItem="setDatetimeItem"
      >
    </FlatpickrHandsontable> -->
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'

// Event for `keydown` event. Add condition after delay of 200 ms which is counted from time of last pressed key.
// const debounceFn = Handsontable.helper.debounce(function (colIndex, event) {
//   const vm = window.details
//   // let docEntry = vm.$refs.details.hotInstance.getDataAtCell(row, 28)
//   const filtersPlugin = vm.$refs.details.hotInstance.getPlugin('filters')
//   filtersPlugin.removeConditions(colIndex + 1)
//   filtersPlugin.addCondition(colIndex + 1, 'contains', [event.target.value])
//   filtersPlugin.filter()
// }, 400)

// const addEventListeners = function (input, colIndex) {
//   input.addEventListener('keydown', function (event) {
//     debounceFn(colIndex, event)
//   })
// }

// Build elements which will be displayed in header.
// const getInitializedElements = function (colIndex) {
//   const div = document.createElement('div')
//   const input = document.createElement('input')

//   div.className = 'filterHeader'

//   addEventListeners(input, colIndex)

//   div.appendChild(input)

//   return div
// }

// Deselect column after click on input.
const doNotSelectColumn = function (event, coords) {
  if (coords.row === -1 && event.target.nodeName === 'INPUT') {
    event.stopImmediatePropagation()
    this.deselectCell()
  }
}

export default {
  name: 'TableSimple',

  components: {
    HotTable,
  },

  data() {
    return {
      settings: {
        licenseKey: 'non-commercial-and-evaluation',
      },
      detailsRoot: 'detailsRoot',
      colHeaders: [],
      formData: null,
    }
  },

  created() {
    this.setInstance()
  },

  methods: {
    setInstance() {
      window.details = this
    },

    addLine() {
      const totalRow = this.$refs.details.hotInstance.countRows()
      this.$refs.details.hotInstance.alter('insert_row', totalRow + 1)
    },

    updateTableSettings(header, columns) {
      this.$refs.details.hotInstance.updateSettings({
        // colHeaders: header,
        // columns,
        colHeaders: [
          '',
          'Nama',
          'NIK',
          'KTP',
          '',
          'Tanggal Lahir',
          // { label: 'Tanggal Lahir', colspan: 2 },
          'Jenis Kelamin',
          'HP',
          'Email',
          'Alamat',
          '',
          // ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
        ],

        columns: [
          {
            // 1
            data: 'id',
          },
          {
            data: 'name',
          },
          {
            data: 'nik',
            type: 'numeric',
            strict: true,
            allowInValid: false,
          },
          {
            data: 'ktp',
            type: 'numeric',
          },
          {
            data: 'tanggal_lahir',
            width: 20,
            // height: 26,
            wordWrap: false,
            renderer(instance, td, row, col, prop, value, cellProperties) {
              let button = null
              const vm = window.details
              const valueCol = vm.$refs.details.hotInstance.getDataAtCell(
                row,
                col + 1
              )

              button = document.createElement('button')
              button.type = 'button'
              button.innerText = '📆'
              button.className = 'btn-flatpickr'
              button.value = 'Show'

              Handsontable.dom.addEvent(button, 'mousedown', (event) => {
                event.preventDefault()
                vm.$emit('openFlatpickr', {
                  row,
                  col,
                  valueCol,
                })
                // console.log(button)
              })

              Handsontable.dom.empty(td)
              td.appendChild(button)
              // console.log(td)
              return td
            },
          },
          {
            data: 'tanggal_lahir',
            readOnly: true,
          },
          {
            // 12
            data: 'jenis_kelamin',
            // readOnly: true,
            width: 70,
            height: 26,
            wordWrap: false,
            type: 'dropdown',
            source(query, process) {
              // const vm = window.details
              const data = ['Pria', 'Wanita']
              process(data)
            },
          },
          // {
          //   data: 'jenis_kelamin',
          // },
          {
            data: 'hp',
          },
          {
            data: 'email',
          },
          {
            data: 'alamat',
            beforeKeyDown: false,
          },
          {
            // data: '',
            width: 35,
            // height: 26,
            wordWrap: false,
            renderer(instance, td, row, col, prop, value, cellProperties) {
              let button = null
              const vm = window.details
              const dataEdit =
                vm.$refs.details.hotInstance.getSourceDataAtRow(row)

              button = document.createElement('button')
              button.type = 'button'
              button.innerText = '✏️'
              button.className = 'btn-flatpickr'
              button.value = 'Show'

              Handsontable.dom.addEvent(button, 'mousedown', (event) => {
                event.preventDefault()
                vm.$emit('openEditForm', { row, dataEdit })
              })

              Handsontable.dom.empty(td)
              td.appendChild(button)
              return td
            },
          },
        ],

        currentRowClassName: 'currentRow',
        currentColClassName: 'currentCol',
        className: 'htCenter',
        startRows: 1,
        manualColumnFreeze: true,
        currData: {},
        rowHeaders: true,
        manualColumnResize: true,
        manualRowResize: true,
        // filters: false,
        autoRowSize: false,
        height: '70vh',
        // rowHeights: 50,
        autoColumnSize: { syncLimit: 300 },
        viewportRowRenderingOffset: 1000,
        viewportColumnRenderingOffset: 100,
        colWidths: 80,
        dropdownMenu: true,
        columnSorting: true,
        persistentState: true,
        width: '100%',
        stretchH: 'all',
        hiddenColumns: {
          copyPasteEnabled: false,
          indicator: false,
          columns: [0],
        },

        beforeOnCellMouseDown: doNotSelectColumn,
        // afterGetColHeader(col, TH) {
        //   if (typeof col !== 'number') {
        //     return col
        //   }

        //   if (col >= 0 && TH.childElementCount < 2) {
        //     TH.appendChild(getInitializedElements(col))
        //   }

        //   const TR = TH.parentNode
        //   const THEAD = TR.parentNode
        //   // eslint-disable-next-line no-unused-vars
        //   const headerLevel =
        //     -1 * THEAD.childNodes.length +
        //     Array.prototype.indexOf.call(THEAD.childNodes, TR)

        //   // eslint-disable-next-line no-unused-vars
        //   function applyClass(elem, className) {
        //     if (!Handsontable.dom.hasClass(elem, className)) {
        //       Handsontable.dom.addClass(elem, className)
        //     }
        //   }
        // },
        contextMenu: {
          callback(key, options) {
            // eslint-disable-next-line no-unused-vars
            let indexArr, selectedData
            const vm = window.details
            // console.log(key)
            if (key === 'remove_row') {
              vm.isInvDetailChanges = true
              vm.isInvChanges = true
            }
          },
        },
        beforeRemoveRow: (index, amount, physicalRow, source) => {
          const vm = window.details
          const delQuestion = prompt(
            'Are your sure want to delete this rows? y/n'
          )
          const id = []
          if (delQuestion === 'y') {
            physicalRow.forEach(function (index, value) {
              const entry = vm.$refs.details.hotInstance.getDataAtCell(index, 0)
              if (entry) {
                id.push(entry)
              }
            })
            if (id.length > 0) {
              vm.$emit('removeData', {
                id,
              })
            }
            return true
          } else {
            return false
          }
        },
      })
    },

    setDataToDetails(data, columns, colHeaders, formData) {
      this.formData = formData
      this.updateTableSettings(colHeaders, columns)
      const vm = this
      setTimeout(() => {
        vm.$refs.details.hotInstance.loadData(data)
      }, 300)
    },

    setDatetimeToDetails(row, cell, datetime) {
      this.$refs.details.hotInstance.setDataAtCell(row, cell + 1, datetime)
    },

    getAddData() {
      return this.$refs.details.hotInstance.getSourceData()
      // return this.$refs.details.hotInstance.getData()
    },

    checkIfEmptyRow(key) {
      return this.$refs.details.hotInstance.isEmptyRow(key)
    },
    instance() {
      window.details = this
    },
  },
}
</script>

<style>
.handsontable td {
  border-top-width: 0;
  border-left-width: 0;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 22px;
  empty-cells: show;
  line-height: 21px;
  padding: 6px 4px;
  background-color: #fff;
  vertical-align: top;
  overflow: hidden;
  outline-width: 0;
  white-space: pre-wrap;
}
.handsontable thead th {
  padding: 8px 4px;
  font-weight: bold;
}
.btn-flatpickr {
  background-color: #79b3ff;
  /* width: 90%;
  height: 90%; */
  border-radius: 2px;
  padding: 5px;
}
</style>
