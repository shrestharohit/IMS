<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="12">
        <v-data-table
          :headers="headers"
          :items="items"
          fixed-header
          :page.sync="pagination.page"
          :items-per-page.sync="pagination.rowsPerPage"
          :footer-props="{ itemsPerPageOptions: [10] }"
          :server-items-length="pagination.pageCount"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    pagination: {
      page: 1,
      rowsPerPage: 10,
      pageStart: '',
      pageStop: '',
      pageCount: ''
    },
    headers: [
      {
        text: 'Equipment Name',
        align: 'left',
        value: 'name'
      },
      { text: 'Equipment Code', value: 'code' },
      { text: 'Added Date', value: 'added_date' },
      { text: 'Availibility Status', value: 'available' }
    ],
    items: [],
    baseUrl: 'http://127.0.0.1:8000/api/item/'
  }),
  methods: {
    getData () {
      this.$axios.get(this.baseUrl + '?offset=' + (this.pagination.page - 1) * 10)
        .then(response => {
          this.items = response.data.results
          this.pagination.pageCount = response.data.count
        })
    }
  },
  mounted () {
    this.getData()
    document.title = 'IMS -test'
  }
}
</script>
