<template>
  <div>
    <v-toolbar dark color="black" dense >
      <v-toolbar-title>Request Item</v-toolbar-title>
    </v-toolbar>
    <v-data-table
      :headers="requestHeader"
      :items="newRequests"
      class="elevation-1"
      fixed-header
      height="auto"
    >
      <template v-slot:item.action="{ item }">
        <v-icon color="green" @click="verify(item)">mdi-check</v-icon>
        <v-icon color="red" @click="reject(item)">mdi-close</v-icon>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      requestHeader: [
        {
          text: 'Employee Name',
          value: 'employee.user.username'
        },
        { text: 'Equipment Name', value: '' },
        { text: 'Action', value: 'action' }
      ],
      newRequests: [],
      dataUrl: 'http://127.0.0.1:8000/api/itemrequest/'
    }
  },
  mounted () {
    this.$axios
      .get(this.dataUrl)
      .then(response => {
        console.log(response.data)
        this.newRequests = response.data
      })
  },
  methods: {
    verify (item) {},
    reject (item) {
      const index = this.newRequests.indexOf(item)
      confirm('Reject request?') && this.newRequests.splice(index, 1)
    }
  }
}
</script>
