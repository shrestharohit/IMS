<template>
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

                <!-- New Request page -->
                <v-btn tile depressed @click="requestSheet = !requestSheet">New Requests</v-btn>
                <v-bottom-sheet v-model="requestSheet">
                  <v-sheet class="text-center" height= auto>
                    <requestItem />
                  </v-sheet>
                </v-bottom-sheet>

                <!-- Create New page -->
                <v-btn tile depressed @click="sheet = !sheet">Create New</v-btn>
                <v-bottom-sheet v-model="sheet">
                  <v-sheet height= auto>
                    <createNew />
                  </v-sheet>
                </v-bottom-sheet>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="items"
                class="elevation-1"
                :search="search"
                fixed-header
                height="380px"
              >
                <template v-slot:item.action="{ item }">
                  <v-icon color="blue" @click="editItem(item)">mdi-pencil</v-icon>
                  <v-icon color="red" @click="deleteItem( item )">mdi-close</v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import requestItem from '../components/requestItem.vue'
import createNew from '../components/createNew.vue'

export default {
  data: () => ({
    sheet: false,
    requestSheet: false,
    search: '',
    headers: [
      {
        text: 'Equipment Name',
        align: 'left',
        value: 'equipmentName'
      },
      { text: 'Equipment Code', value: 'equipmentCode' },
      { text: 'Added Date', value: 'addedDate' },
      { text: 'Vendor Name', value: 'vendorName' },
      { text: 'Availibility Status', value: 'available' },
      { text: 'Assigned To', value: 'assignedTo' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    items: [
      {
        equipmentName: 'Chair',
        equipmentCode: '003-C32V-0012',
        addedDate: '04-20-2020',
        vendorName: 'abc',
        available: 'assigned',
        assignedTo: ''
      }
    ]
  }),
  components: {
    navBar,
    requestItem,
    createNew
  },
  methods: {
    editItem (item) {
      this.sheet = true
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      confirm('Are you sure you want to delete this Item?') && this.items.splice(index, 1)
    }
  },
  mounted () {
    if (localStorage.getItem('userdetails')) {
    } else {
      this.$router.replace({ name: 'login' })
    }
  }
}
</script>
