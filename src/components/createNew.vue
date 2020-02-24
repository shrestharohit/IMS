<template>
  <div>
    <v-toolbar dark color="black" dense>
      <v-toolbar-title>Create New</v-toolbar-title>
      <v-spacer/>
      <v-icon @click="closeSheet()">mdi-close</v-icon>
    </v-toolbar>
    <ValidationObserver>
    <v-form @submit="save()">
      <v-container align="center" justify="center">
      <v-row>
        <v-col cols="12" sm="3" md="3">
          <ValidationProvider rules="required" v-slot="{ validate, errors }">
          <v-text-field v-model="input.equipmentName" @input="validate" type="text" label="Equipment Name" name="Equipment Name" :error-messages="errors" ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <ValidationProvider rules="required" v-slot="{ validate, errors }">
          <v-text-field v-model="input.equipmentCode" @input="validate" type="text" label="Equipment Code" name="Equipment Code" :error-messages="errors" ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-switch v-model="input.available" label="Available" disabled required></v-switch>
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

// const validation = extend('required', {
//   validate (value) {
//     return {
//       required: true,
//       valid: ['', null, undefined].indexOf(value) === -1
//     }
//   },
//   computesRequired: true
// })

export default {
  // validation,
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
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    document.title = 'IMS - createNew'
  },
  methods: {
    validateField (field) {
      const provider = this.$refs[field]

      // Validate the field
      return provider.validate()
    },
    clear () {
      this.input.equipmentName = ''
      this.input.equipmentCode = ''
      this.input.available = true
    },
    save () {
      if (this.input.equipmentName !== '' && this.input.equipmentCode !== '') {
        this.$axios
          .post('http://127.0.0.1:8000/api/item/', {
            name: this.input.equipmentName,
            code: this.input.equipmentCode,
            available: this.input.available
          })
          .then(
            this.$emit('closeBottomSheet'),
            this.clear()
            // this.$emit('reload')
          )
      } else {
        this.snackbar = true
        this.info = 'input something to add'
      }
    },
    closeSheet () {
      this.$emit('closeBottomSheet')
    },
    validate () {

    }
  }
}
</script>
