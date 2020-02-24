<template>
  <div class="Login">
    <v-content>
      <v-img src gradient="to top right, rgba(255,255,255,.7), rgba(19,199,243,.33)" height="100vh">
        <v-container class="fill-height" fluid>
          <v-row justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12" height="auto">
                <v-toolbar dark class="black">
                  <v-toolbar-title align="center" justify="center">Welcome to IMS</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <ValidationObserver ref="form">
                    <v-form @submit.prevent="onSubmit()">
                     <ValidationProvider v-slot="{ errors }" name="username" rules="required|alpha_num|min:5">
                       <v-text-field
                      type="text"
                      v-model="input.username"
                      :error-messages="errors"
                      label="Username"
                    ></v-text-field>
                     </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="password" rules="required|min:5">
                      <v-text-field
                        type="password"
                        v-model="input.password"
                        :error-messages="errors"
                        label="Password"
                      ></v-text-field>
                    </ValidationProvider>
                    <br />
                    <v-btn type="submit" >Login</v-btn>
                  </v-form>
                  </ValidationObserver>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-img>

      <!-- snackbar -->
      <v-snackbar v-model="snackbar" :timeout="2000" color="red lighten-1" multi-line top>
        {{ this.info }}
      </v-snackbar>
    </v-content>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'Login',
  data () {
    return {
      input: {
        username: '',
        password: ''
      },
      snackbar: false,
      info: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    document.title = 'IMS -login'
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate().then(success => {
        if (success) {
          this.login()
        }
      })
    },
    login () {
      this.$axios
        .post('http://127.0.0.1:8000/token-auth/', {
          username: this.input.username,
          password: this.input.password
        })
        .then(response => {
          if (response.data) {
            localStorage.setItem('userdetails', JSON.stringify(response.data.token))
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
        .catch(error => {
          this.snackbar = true
          this.info = 'Incorrect Username or Password. Try Again !'
          console.log(error)
        }
        )
    }
  }
}
</script>
