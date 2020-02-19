<template>
  <div>
    <v-toolbar dark color="black" dense >
      <v-toolbar-title>Request Item</v-toolbar-title>
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

  </div>
</template>
<script>
export default {
  data () {
    return {
      requestHeader: [
        {
          text: 'Employee Name',
          value: 'username'
        },
        { text: 'Equipment Name', value: 'item' },
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
          this.$emit('verified'),
          this.$emit('reload')
        )
    },
    reject (item) {
      const index = this.newRequests.indexOf(item)
      confirm('Reject request?') && this.newRequests.splice(index, 1)
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
