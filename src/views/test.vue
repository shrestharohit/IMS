<template>
<v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="12">
              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="deep-purple accent-4"
              ></v-progress-linear>
              <v-data-table
                :headers="headers"
                :items="items.results"
                class="elevation-1"
                :footer-props="footerProps"
                @update:page="getPage"
                :page.sync='this.page'
                :server-items-length='this.pageCount'
              ></v-data-table>
          </v-col>
        </v-row>
</v-container>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      footerProps: {
        itemsPerPageOptions: []
      },
      page: 1,
      pageOptions: [],
      pageCount: 0,
      headers: [
        {
          text: 'Equipment Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Equipment Code', value: 'code' },
        { text: 'Added Date', value: 'added_date' },
        { text: 'Availibility Status', value: 'available' },
        { text: 'Assigned To', value: 'assigned_to.employee.user.username' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      items: [],
      dataUrl: 'http://127.0.0.1:8000/api/item/',
      loading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getPage (val) {
      this.getData(val)
    },
    getData (getPage) {
      this.$axios.get(this.dataUrl + '?offset=' + (getPage - 1) * 10)
        .then(response => {
          this.items = response.data
          this.pageCount = response.data.count
        })
    }
  }
}
</script>
