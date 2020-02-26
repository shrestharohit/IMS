<template>
  <div>
    <v-toolbar dark color="black" dense>
      <v-toolbar-title>Create New</v-toolbar-title>
      <v-spacer/>
      <v-icon @click="closeSheet()">mdi-close</v-icon>
    </v-toolbar>
    <!-- {{ editedItem }} -->
    <ValidationObserver ref='form'>
    <v-form @submit.prevent="onSubmit()">
      <v-container align="center" justify="center">
      <v-row>
        <v-col cols="12" sm="3" md="3">
          <ValidationProvider v-slot="{ errors }" name="equipmentName" rules="required">
          <v-text-field
          type="text"
          label="Equipment Name"
          v-model="editedItem.name"
          :error-messages="errors"
          ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="6" md="3">
         <ValidationProvider v-slot="{ errors }" name="equipmentCode" rules="required">
          <v-text-field
          type="text"
          label="Equipment Code"
          v-model="editedItem.code"
          :error-messages="errors"
          ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-switch
          :value="editedItem.available"
          label="Available"
          disabled
          ></v-switch>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer />
        <v-btn tile class="black mr-1" dark @click="clear()">Clear</v-btn>
        <v-btn tile class="black" dark type="submit">Save</v-btn>
      </v-card-actions>
    </v-container>
    </v-form>
    </ValidationObserver>
    <v-snackbar v-model="snackbar" right :timeout="2000" color="red" top>
      {{ this.info }}
      <v-icon dark @click="snackbar = false">mdi-close</v-icon>
    </v-snackbar>
  </div>
</template>
<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  // validation,

  name: 'createNew',
  data: function () {
    return {
      valid: true,
      snackbar: false,
      info: '',
      input: {
        equipmentName: '',
        equipmentCode: '',
        available: true
      }
    }
  },
  props: ['editedItem'],
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    document.title = 'IMS - createNew'
  },
  methods: {
    clear () {
      this.editedItem.name = ''
      this.editedItem.code = ''
      this.editedItem.available = true
      this.$refs.form.reset()
    },
    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.save()
        }
      })
    },
    save () {
      this.$axios
        .put('http://127.0.0.1:8000/api/item/', {
          name: this.editedItem.name,
          code: this.editedItem.code,
          available: this.editedItem.available
        })
        .then(() => {
          this.$emit('closeBottomSheet')
          this.clear()
          this.$emit('reload')
        }
        )
        .catch(e => {
          this.snackbar = true
          this.info = 'Cant perfom the task right now !'
          // throw Error
        })
    },
    closeSheet () {
      this.$emit('closeBottomSheet')
    }
  }
}
</script>
