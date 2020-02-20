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
        this.newRequests = response.data
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
          this.$emit('closeSheet'),
          this.$emit('verified'),
          this.$emit('reload')
        )
    },
    closeSheet () {
      this.$emit('closeSheet')
    },
    reject (item) {
      const index = this.newRequests.indexOf(item)
      confirm('Reject request?') && this.newRequests.splice(index, 1)
      this.snackbar = true
      this.info = 'request rejected'
    },
    displayItems () {
      this.newRequests.forEach(element => {
        if (element.item.length > 1) {
          for (let index = 0; index < element.item.length; index++) {
            this.uniqueItem.push({
              username: element.employee.user.username,
              item: element.item[index].name,
              userId: element.employee.user.id,
              itemId: element.item[index].id
            })
          }
        } else {
          this.uniqueItem.push({
            username: element.employee.user.username,
            item: element.item[0].name,
            userId: element.employee.user.id,
            itemId: element.item[0].id
          })
        }
      })
    }
  }
}
</script>
