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
          value: 'employeeName'
        },
        { text: 'Equipment Name', value: 'equipmentName' },
        { text: 'Action', value: 'action' }
      ],
      newRequests: [
        { employeeName: 'Rohit', equipmentName: 'CPU' },
        { employeeName: 'Sanjeev', equipmentName: 'Monitor' },
        { employeeName: 'Aditya', equipmentName: 'Phone' }
      ]
    }
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
