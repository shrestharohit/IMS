<template>
  <div class="Login">
    <v-content>
     <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12" height="auto">
                <v-toolbar flat>
                  <v-toolbar-title></v-toolbar-title>
                </v-toolbar>
                <hr color="blue" />
                <v-card-text>
                  <v-form>
                    <br />
                    <v-text-field type="text" v-model="input.username" label="Username" />
                    <v-text-field type="password" v-model="input.password" label="Password" />
                    <br />
                    <v-card-actions>
                      <v-btn block color="primary" @click="login()">Login</v-btn>
                    </v-card-actions>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      <v-snackbar v-model="snackbar" right :timeout="2000" color="red lighten-1" top>
        The username and/or password is incorrect
        <v-icon dark @click="snackbar = false">mdi-close</v-icon>
      </v-snackbar>
    </v-content>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      input: {
        username: '',
        password: ''
      },
      user: [],
      role: [],
      snackbar: false
    }
  },
  methods: {
    login () {
      this.$router.replace({ name: 'admin' })
      this.$axios
        .post('http://127.0.0.1:8000/token-auth/', {
          username: this.input.username,
          password: this.input.password
        })
        .then(response => {
          if (response.data) {
            console.log(response.data.user.username)
            this.user = response.data.token
            this.role = response.data
            localStorage.setItem(
              'userdetails',
              JSON.stringify(response.data.token)
            )
            if (response.data.user.is_superuser === true) {
              localStorage.setItem('pageDetails', 'admin')
              this.$router.replace({ name: 'admin' })
            } else if (response.data.user.username) {
              localStorage.setItem('pageDetails', 'employee')
              localStorage.setItem('userCredentials',
                response.data.user.id
              )
              this.$router.replace({ name: 'employee' })
            }
          }
        })
        .catch(e => {
          this.snackbar = true
        })
    }
  }
}
</script>
