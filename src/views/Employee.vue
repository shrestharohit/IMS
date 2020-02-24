z<template>
  <div>
    <navBar />
    <v-content>
      <v-container class="fill-height" fluid>
        <v-col cols="12" md="12">
          <!-- title -->
          <v-card-title>
            <v-breadcrumbs :items="myitem">
              <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
              </template>
            </v-breadcrumbs>
            <v-spacer />
            <v-col md="2">
              <v-text-field
                v-model="search"
                label="Search"
                solo
                filled
                rounded
                hide-details
                dense
                clearable
                flat
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </v-col>
            <!-- dialog box on verify -->
            <v-btn tile class="black mr-1" dark @click="openDialog()">Request</v-btn>
            <v-dialog v-model="dialog" width="500">
              <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>Selected Items</v-card-title>
                <v-card-text>The items you selected are</v-card-text>
                <v-card-text>
                  <v-chip-group v-for="item in finalItemNames" v-bind:key="item.name">
                    <v-chip>{{item}}</v-chip>
                  </v-chip-group>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn tile color="black" dark @click="verify()">Done</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
        </v-col>

        <!-- request table -->
        <v-col cols="12" sm="8" md="6">
          <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :search="search"
            fixed-header
            height= "300"
          >
            <template v-slot:item.action="{ item }">
              <v-checkbox v-bind:value="item" v-model="selected" ></v-checkbox>
            </template>
          </v-data-table>
        </v-col>

        <!-- request status table-->
        <v-col cols="12" sm="8" md="6">
          <v-data-table
            :headers="requestHeaders"
            :items="requestItems"
            class="elevation-1"
            fixed-header
            height= "300"
          >
            <template v-slot:item.status="{ item }">
              <v-btn style="text-transform:none" small :label="item.status" text :color="getStatusColor(item.status)" >
                 <v-icon left>
                   {{ getIcon(item.status) }}
                   </v-icon> {{ item.status }} </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-container>
    </v-content>
    <v-snackbar v-model="snackbar" right :timeout="2000" :color="getColor()" top>
      {{ this.info }}
      <v-icon dark @click="snackbar = false">mdi-close</v-icon>
    </v-snackbar>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
export default {
  data: () => ({
    dialog: false,
    snackbar: false,
    tab: null,
    tabs: 1,
    info: '',
    search: '',
    headers: [
      {
        text: 'Item Name',
        align: 'left',
        value: 'name'
      },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    items: [],
    myitem: [
      {
        text: 'Employee',
        disabled: false,
        href: '/employee'
      },
      {
        text: 'Home',
        disabled: true
      }
    ],
    requestHeaders: [
      { text: 'Item', value: 'item' },
      { text: 'Status', align: 'right', value: 'status' }
    ],
    displayedItems: [],
    selected: [],
    finalItemId: [],
    finalItemNames: [],
    requestItems: [],
    approvedList: [],
    userInfo: ''
  }),
  components: {
    navBar
  },
  methods: {
    verify () {
      this.dialog = false

      this.$axios.post('http://127.0.0.1:8000/api/itemrequest/', {
        employee: this.userInfo,
        item: this.finalItemId
      }).then(
        this.snackbar = true,
        this.info = 'Successfully Requested !'
      )
    },
    openDialog () {
      if (this.selected.length === 0) {
        this.snackbar = true
        this.info = 'Empty Selection !'
      } else {
        this.dialog = true
        this.idOfItems()
      }
    },
    async loadItems () {
      await this.$axios
        .get('http://127.0.0.1:8000/api/item/')
        .then(response => {
          this.displayedItems = response.data
          this.displayedItems.forEach(item => {
            // eslint-disable-next-line eqeqeq
            if (item.available === true && item.is_accepted === null && item.employee.user.id == this.userInfo) {
              this.items.push(item)
            }
          })
        })
      await this.$axios.get('http://127.0.0.1:8000/api/itemrequest/').then(response => {
        response.data.forEach(Element => {
          // eslint-disable-next-line eqeqeq
          if (Element.employee.user.id == this.userInfo) {
            var newStatus = 'pending'
            if (Element.item[0].is_accepted === true) {
              newStatus = 'approved'
            } else if (Element.item[0].is_accepted === false) {
              newStatus = 'rejected'
            }
            Element.item.forEach(newitem => {
              this.requestItems.push({
                item: newitem.name,
                status: newStatus
              })
            })
          }
        })
      })
    },
    idOfItems () {
      this.finalItemId = []
      this.finalItemNames = []
      this.selected.forEach(item => {
        this.finalItemId.push(item.id)
        this.finalItemNames.push(item.name)
      })
    },
    getColor () {
      if (this.info === 'Empty Selection !') {
        return 'red'
      } else {
        return 'green'
      }
    },
    getStatusColor (item) {
      console.log(item)
      if (item === 'pending') {
        return 'blue'
      } else if (item === 'approved') {
        return 'green'
      } else {
        return 'red'
      }
    },
    getIcon (item) {
      if (item === 'pending') {
        return 'mdi-clock-outline'
      } else if (item === 'approved') {
        return 'mdi-check'
      } else {
        return 'mdi-close'
      }
    }
  },
  async mounted () {
    if (localStorage.getItem('pageDetails') === 'employee') {
    } else if (localStorage.getItem('pageDetails')) {
      var pageAuth = localStorage.getItem('pageDetails')
      this.$router.replace({ name: pageAuth })
    } else {
      this.$router.replace({ name: 'login' })
      localStorage.clear()
    }
    this.userInfo = localStorage.getItem('userCredentials')
    await this.loadItems()
    // console.log(this.requestItems)
  }
}
</script>
