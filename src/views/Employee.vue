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
                  Table
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
                  <v-btn tile class="black mr-1" dark @click="dialog = true">Verify</v-btn>
                  <v-dialog v-model="dialog" width="500">
                    <v-card>
                      <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

                      <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>
                      <v-card-actions>
                        <v-spacer/><v-btn tile color="black" dark @click="dialog = false">I accept</v-btn>
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
                  height="380px"
                >
                  <template v-slot:item.action = {}>
                    <!-- <v-icon color="green">mdi-plus-circle-outline</v-icon> -->
                    <v-checkbox
                    ></v-checkbox>
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
    items: [
      { name: 'Rohit' },
      { name: 'Sanjeev' },
      { name: 'Prabin' },
      { name: 'Prahlad' },
      { name: 'Raju' },
      { name: 'Summit' }
    ]
  }),
  components: {
    navBar
  },
  methods: {
    redirect () {
      this.$router.replace({ name: 'admin' })
    },
    verify () {}
  },
  mounted () {
    // if (localStorage.getItem('pageDetails') === 'employee') {
    // } else if (localStorage.getItem('pageDetails')) {
    //   var pageAuth = localStorage.getItem('pageDetails')
    //   this.$router.replace({ name: pageAuth })
    // } else {
    //   this.$router.replace({ name: 'login' })
    //   localStorage.clear()
    // }
  }
}
</script>
