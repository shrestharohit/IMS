z<template>
  <div>
    <navBar />
    <v-content>
      <!-- <v-tabs v-model="tab" dark vertical>
        <v-tabs-slider></v-tabs-slider>
        <v-tab v-for="i in tabs" :key="i" :href="`#tab-${i}`" fixed-tabs>Tab {{ i }}</v-tab>
        <v-tab-item :value="'tab-' + 1"> -->
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="12">
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
                  <v-btn tile class="black mr-1" dark @click="openDialog()">Verify</v-btn>
                  <v-dialog v-model="dialog" width="500">
                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Selected Items</v-card-title>
                      <v-card-text>   The items you selected are</v-card-text>
                      <v-card-text>
                      <v-chip-group v-for="item in finalItemNames" v-bind:key="item.name">
                        <v-chip> {{item}} </v-chip></v-chip-group>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer/><v-btn tile color="black" dark @click="verify()">Done</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-title>
                <v-data-table
                  :headers="headers"
                  :items="items"
                  class="elevation-1"
                  :search="search"
                  fixed-header
                  height= auto
                  dense
                >
                  <template v-slot:item.action ="{ item }">
                    <v-checkbox v-bind:value="item" v-model="selected"></v-checkbox>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        <!-- </v-tab-item>
      </v-tabs> -->
    </v-content>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
export default {
  data: () => ({
    dialog: false,
    tab: null,
    tabs: 1,
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
    displayedItems: [],
    selected: [],
    finalItemId: [],
    finalItemNames: [],
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
      }
      )
    },
    openDialog () {
      this.dialog = true
      this.idOfItems()
    },
    loadItems () {
      this.$axios.get('http://127.0.0.1:8000/api/item/').then(response => {
        this.displayedItems = response.data
        this.displayedItems.forEach(item => {
          if (item.available === true) {
            this.items.push(item)
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
    }
  },
  mounted () {
    if (localStorage.getItem('pageDetails') === 'employee') {
    } else if (localStorage.getItem('pageDetails')) {
      var pageAuth = localStorage.getItem('pageDetails')
      this.$router.replace({ name: pageAuth })
    } else {
      this.$router.replace({ name: 'login' })
      localStorage.clear()
    }
    this.userInfo = localStorage.getItem('userCredentials')
    this.loadItems()
  }
}
</script>
