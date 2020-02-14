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

                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn tile depressed v-on="on">Create New</v-btn>
                  </template>
                  <v-card>
                    <v-card-title>Create New</v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-text-field v-model="editedItem.name" label="Item Name"></v-text-field>
                          <v-text-field v-model="editedItem.vendor" label="Vendor Name"></v-text-field>
                          <v-text-field v-model="editedItem.status" label="Availability Status"></v-text-field>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn tile depressed @click="close()">Cancel</v-btn>
                      <v-btn tile depressed @click="save">Save</v-btn>
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
                <template v-slot:item.action="{ item }">
                  <v-icon small @click="editItem(item.id)">mdi-pencil</v-icon>
                  <v-icon small @click="deleteItem()">mdi-delete</v-icon>
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
      { text: 'Vendor', align: 'center', value: 'vendor' },
      { text: 'Availibility Status', align: 'center', value: 'status' },
      { text: 'Actions', align: 'right', value: 'action', sortable: false }
    ],
    items: [
      { name: 'Chair', vendor: 'abc', status: 'used' },
      { name: 'Table', vendor: 'abc', status: 'used' },
      { name: 'Laptop', vendor: 'abc', status: 'used' },
      { name: 'Keyboard', vendor: 'abc', status: 'used' },
      { name: 'Mouse', vendor: 'abc', status: 'used' },
      { name: 'Phone', vendor: 'abc', status: 'used' }
    ],
    editedItem: {
      name: '',
      vendor: '',
      status: ''
    }
  }),
  components: {
    navBar
  },
  methods:
  {
    close () {
      this.dialog = false
    },
    deleteItem () {
      const index = this.items.indexOf()
      confirm('Are you sure you want to delete this item?')
      this.desserts.splice(index, 1)
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
