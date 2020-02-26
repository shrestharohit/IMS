<template>
  <div>
    <navBar />
    <v-content>
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
                <v-col md="3">
                  <v-text-field
                    v-model="search"
                    @input="getPage()"
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
                <v-btn
                  tile
                  class="black mr-1"
                  dark
                  @click="requestSheet = !requestSheet"
                >New Requests</v-btn>
                <v-bottom-sheet v-model="requestSheet" persistent>
                  <v-sheet class="text-center" height="auto">
                    <requestItem @closeSheet="docTitle1()" @verified="snackbar= false, info='Item Assigned'" @reload="loader()"/>
                  </v-sheet>
                </v-bottom-sheet>

                <!-- Create New page -->
                <v-btn tile class="black" dark @click="createNew()">Create New</v-btn>
                <v-bottom-sheet v-model="sheet" persistent>
                  <v-sheet height="auto">
                    <createNew @closeBottomSheet="docTitle()" @reload="loader(), snackbar = false, info = 'Item added'" :editedItem = 'editedItem' />
                  </v-sheet>
                </v-bottom-sheet>
              </v-card-title>
              <v-progress-linear
                :active="loading"
                :indeterminate="loading"
                absolute
                top
                color="deep-purple accent-4"
              ></v-progress-linear>
              <v-data-table
                :headers="headers"
                :items="searchedItems"
                class="elevation-1"
                :search="search"
                :footer-props="footerProps"
                @update:page="getPage"
                :page.sync='this.page'
                :server-items-length='this.pageCount'
                fixed-header
                height= auto
              >
               <template v-slot:item.value="{ item }">
              <v-btn style="text-transform:none" small :label="getAvailability(item.value)" text :color="getStatusColor(item.status)" >
                 <v-icon left>
                   {{ getIcon(item.status) }}
                   </v-icon> {{ item.status }} </v-btn>
            </template>
                <template v-slot:item.action="{ item }">
                  <v-icon color="green" @click="editItem( item )">mdi-pencil</v-icon>
                  <v-icon color="red" @click="deleteItem( item )">mdi-close</v-icon>
                </template>
              </v-data-table>
            <!-- </v-card> -->
          </v-col>
        </v-row>
      </v-container>
      <v-snackbar v-model="snackbar" right :timeout="2000" color="green" top>
        {{ info }}
        <v-icon dark @click="snackbar = false">mdi-close</v-icon>
      </v-snackbar>
    </v-content>
  </div>
</template>

<script>
import navBar from '../components/navBar.vue'
import requestItem from '../components/requestItem.vue'
import createNew from '../components/createNew.vue'

export default {
  name: 'admin',
  data () {
    return {
      sheet: false,
      snackbar: false,
      info: '',
      requestSheet: false,
      search: '',
      newsearch: '',
      footerProps: {
        itemsPerPageOptions: []
      },
      page: 1,
      newPage: '',
      pageOptions: [],
      pageCount: 0,
      searchedItems: [],
      headers: [
        {
          text: 'Equipment Name',
          align: 'left',
          value: 'name'
        },
        { text: 'Equipment Code', value: 'code' },
        { text: 'Added Date', value: 'added_date' },
        { text: 'Availibility Status', value: 'available' },
        { text: 'Assigned To', value: 'assigned_to.employee.user.username' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      items: [],
      myitem: [
        {
          text: 'Admin',
          disabled: false,
          href: '/admin'
        },
        {
          text: 'Home',
          disabled: true
        }
      ],
      dataUrl: 'http://127.0.0.1:8000/api/item/',
      loading: false,
      editedItem: ''
    }
  },
  methods: {
    getPage (val) {
      if (!val) {
        val = this.newPage
      }
      this.searchData(val)
    },
    async editItem (item) {
      this.editedItem = item
      this.sheet = true
    },
    createNew () {
      this.sheet = true
      this.editedItem = {
        name: '',
        code: '',
        availability: true
      }
    },
    deleteItem (item) {
      const index = this.items.indexOf(item)
      this.$axios.delete(this.dataUrl + item.id + '/')
      if (confirm('Are you sure you want to delete this Item?') &&
        this.items.splice(index, 1)) {
        this.snackbar = true
        this.info = 'Deleted Successfully !'
      }
    },
    async loader () {
      await this.searchData()
    },
    async searchData (getPage) {
      await this.$axios.get(this.dataUrl + '?offset=' + (getPage - 1) * 10).then(response => {
        this.newPage = getPage
        this.newsearch = response.data.results
        this.pageCount = response.data.count
        this.searchedItems = this.newsearch.filter(item => item.name.toLowerCase().includes(this.search.toLowerCase()))
      })
    },
    async docTitle () {
      await this.searchData()
      this.sheet = false
      this.editedItem = ''
      document.title = 'IMS - admin'
    },
    docTitle1 () {
      this.requestSheet = false
      document.title = 'IMS - admin'
    }
  },
  async mounted () {
    this.search = ''
    if (localStorage.getItem('pageDetails') === 'admin') {
    } else if (localStorage.getItem('pageDetails')) {
      var pageAuth = localStorage.getItem('pageDetails')
      this.$router.replace({ name: pageAuth })
    } else {
      this.$router.replace({ name: 'login' })
      localStorage.clear()
    }
    await this.loader()
    document.title = 'IMS -admin'
  },
  components: {
    navBar,
    requestItem,
    createNew
  }
}

</script>
