<template>
  <div class="Login">
    <v-content>
      <v-img
          src=""
          gradient="to top right, rgba(255,255,255,.7), rgba(19,199,243,.33)"
          height="100vh">
          <v-container class="fill-height" fluid>
        <v-row justify="center">
          <v-col cols="12" sm="8" md="4">

        <v-card class="elevation-12" height=auto>
          <v-toolbar dark class="black">
            <v-toolbar-title align="center" justify="center">Welcome to IMS</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit="validateBeforeSubmit()">
              <v-text-field
              type="text"
              v-model="input.username"
              label="Username"
              v-validate="'required|alpha_num|min:3'"
              name="username"
              ></v-text-field>
                <span>{{ errors.first('username') }}</span>
              <v-text-field
              type="password"
              v-model="input.password"
              v-validate="'required|min:3'"
              name="password"
              label="Password"
              ></v-text-field>
              <span>{{ errors.first('password')}}</span>
              <br />
              <!-- <v-card-actions> -->
                <!-- <v-spacer/> -->
                <v-btn tile type="submit" color="black" dark>Login</v-btn>
              <!-- </v-card-actions> -->
            </v-form>
          </v-card-text>
        </v-card>
          </v-col>
              </v-row>
      </v-container>
      </v-img>

      <!-- snackbar -->
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
      // username: '',
      // password: ''
    }
  },
  mounted () {
    document.title = 'IMS -login'
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // alert('Form Submitted!')
          this.login()
        }

        // alert('INPUT DETAILS')
      })
    },
    login () {
      this.$router.replace({ name: 'admin' })
      this.$axios
        .post('http://127.0.0.1:8000/token-auth/', {
          username: this.input.username,
          password: this.input.password
        })
        .then(response => {
          if (response.data) {
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
              localStorage.setItem('userCredentials', response.data.user.id)
              this.$router.replace({ name: 'employee' })
            }
          }
        })
    }
  }
}
</script>
