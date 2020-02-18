<template>
  <div>
      <v-container dense>
      <v-row>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
          v-model="input.equipmentName"
          label="Equipment Name"
          required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
          v-model="input.equipmentCode"
          label="Equipment Code"
          required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
          v-model="input.vendorName"
          label="Vendor Name"
          required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-text-field
          v-model="input.addedDate"
          label="Added Date ( mm-dd-yy )"
          required
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="2">
          <v-switch
          v-model="input.available"
          label="Available"
          required></v-switch>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile depressed @click="clear()">Clear</v-btn>
        <v-btn tile depressed @click="save()">Save</v-btn>
      </v-card-actions>
    </v-container>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      input: {
        equipmentName: '',
        equipmentCode: '',
        vendorName: '',
        addedDate: '',
        available: true
      }
    }
  },

  methods: {
    clear () {
      this.input.equipmentName = ''
      this.input.equipmentCode = ''
      this.input.vendorName = ''
      this.input.addedDate = ''
      this.input.available = true
    },
    save () {
      this.$axios
        .post('', {
          equipmentName: this.input.equipmentName,
          equipmentCode: this.input.equipmentCode,
          vendorName: this.input.vendorName,
          addedDate: this.input.addedDate,
          available: this.input.available
        })
    }
  }
}
</script>
