<template>
  <div>
    <v-toolbar dark color="black" dense >
      <v-toolbar-title>Request Item</v-toolbar-title>
      <v-spacer/>
      <v-icon @click="closeSheet()">mdi-close</v-icon>
    </v-toolbar>
    <v-data-table
  :headers="requestHeader"
  :items="uniqueItem"
  >
      <template v-slot:item.action="{ item }">
        <v-icon color="green" @click="verify(item)">mdi-check</v-icon>
        <v-icon color="red" @click="reject(item)">mdi-close</v-icon>
      </template>
</v-data-table>
<v-snackbar v-model="snackbar" right :timeout="2000" color="red" top>
      {{ this.info }}
      <v-icon dark @click="snackbar = false">mdi-close</v-icon>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      snackbar: false,
      info: '',
      requestHeader: [
        {
          text: 'Employee Name',
          value: 'username'
        },
        { text: 'Equipment Name', value: 'item' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action' }
      ],
      newRequests: [],
      uniqueItem: [],
      dataUrl: 'http://127.0.0.1:8000/api/itemrequest/',
      approveUrl: 'http://127.0.0.1:8000/api/itemapprove/'
    }
  },
  mounted () {
    this.$axios
      .get(this.dataUrl)
      .then(response => {
        this.newRequests = response.data.results
        this.displayItems()
      })
    document.title = 'IMS - requestItem'
  },
  methods: {
    verify (itemToVerify) {
      console.log(itemToVerify.userId, itemToVerify.itemId)
      this.$axios
        .post(this.approveUrl, {
          employee: itemToVerify.userId,
          item: itemToVerify.itemId
        })
        .then(
          this.closeSheet(),
          this.$emit('verified'),
          this.$emit('reload'),
          window.history.go()
        )
    },
    closeSheet () {
      this.$emit('closeSheet')
    },
    reject (item) {
      const index = this.newRequests.indexOf(item)
      confirm('Reject request?') && this.newRequests.splice(index, 1) && this.$axios.post('http://127.0.0.1:8000/api/rejectrequest/', {
        employee: item.userId,
        item: item.itemId
      })
      this.closeSheet()
      this.snackbar = true
      this.info = 'request rejected'
    },
    async displayItems () {
      await this.newRequests.forEach(element => {
        if (element.item.length > 1) {
          for (let index = 0; index < element.item.length; index++) {
            var newStatus = 'pending'
            if (element.item[index].is_accepted === true) {
              newStatus = 'approved'
            } else if (element.item[index].is_accepted === false) {
              newStatus = 'rejected'
            }
            if (element.item[index].is_accepted === null) {
              this.uniqueItem.push({
                username: element.employee.user.username,
                item: element.item[index].name,
                status: newStatus,
                userId: element.employee.user.id,
                itemId: element.item[index].id
              })
              console.log(this.uniqueItem)
            }
          }
        } else {
          var Status = 'pending'
          // console.log(newStatus)
          if (element.item[0].is_accepted === true) {
            Status = 'approved'
          } else if (element.item[0].is_accepted === false) {
            Status = 'rejected'
          }
          if (element.item[0].is_accepted === null) {
            this.uniqueItem.push({
              username: element.employee.user.username,
              item: element.item[0].name,
              status: Status,
              userId: element.employee.user.id,
              itemId: element.item[0].id
            })
          }
        }
      })
    }
  }
}
</script>
