z<template>
  <div>
    <navBar />
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="12">
            <v-card class="elevation-12" height="auto">
              <v-card-title>
                Table
                <v-spacer />
                <v-col md="3">
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
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1"
                :search="search"
                fixed-header
                height="380px"
              >
                <template #item.action v-slot:activator="{ on }">
                  <v-btn class="ma-2" rounded outlined color="success" v-on="on">
                    <!-- <v-icon left>mdi-thumb-up</v-icon> -->
                    Request
                  </v-btn>
                </template>
              </v-data-table>
              <v-dialog v-model="dialog" width="500">
                  <template v-slot:activator="{ on }">
                    <v-btn color="red lighten-2" dark v-on="on">Click Me</v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Privacy Policy</v-card-title>

                    <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="dialog = false">I accept</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
export default {
  data: () => ({
    dialog: false,
    search: '',
    headers: [
      {
        text: 'Item Name',
        align: 'left',
        value: 'name'
      },
      { text: 'Actions', align: 'right', value: 'action', sortable: false }
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
  mounted () {
    if (localStorage.getItem('pageDetails') === 'employee') {
    } else if (localStorage.getItem('pageDetails')) {
      var pageAuth = localStorage.getItem('pageDetails')
      this.$router.replace({ name: pageAuth })
    } else {
      this.$router.replace({ name: 'login' })
      localStorage.clear()
    }
  }
}
</script>
