<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="6" xl="4">
        <v-card class="elevation-12">
          <v-card-title>
            <span>Login</span>
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-text-field
                  label="E-Mail"
                  name="email"
                  :rules="[(v) => !!v || 'E-Mail is required']"
                  v-model="email"
                  prepend-icon="mdi-email"
                  type="email"
                  autocomplete="username"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  name="password"
                  :rules="[(v) => !!v || 'Password is required']"
                  v-model="password"
                  prepend-icon="mdi-lock"
                  :type="showPw ? 'text' : 'password'"
                  autocomplete="current-password"
                  :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPw = !showPw"
                ></v-text-field>
              </v-form>
              <v-col>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    :to="'/forgot-password'"
                    class="text-none"
                    >Forgott password?</v-btn
                  >
                </v-row>
                <v-row>
                  <v-btn
                    color="primary"
                    @click="emailLogin"
                    :disabled="!valid"
                    block
                    class="text-none mb-8"
                    >Sign in</v-btn
                  >
                </v-row>
              </v-col>
              <v-divider></v-divider>
              <div class="devider-text text-center black--text mb-4">
                <span> Don't have an account? </span>
              </div>
              <v-btn
                color="primary"
                text
                :to="'/register'"
                block
                outlined
                class="text-none"
                >Create account</v-btn
              >
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    head() {
      return { title: "Login" };
    },
    data: () => ({
      valid: false,
      email: "",
      password: "",
      showPw: false,
    }),
    methods: {
      validate() {
        return this.$refs.loginForm.validate();
      },
      emailLogin() {
        if (this.validate()) {
          this.$store
            .dispatch("auth/signInWithEmail", {
              email: this.email,
              password: this.password,
            })
            .then(() => {
              this.$router.push("/");
              this.clear();
            })
            .catch((e) => {
              this.$nuxt.$emit("alert-error", e.message);
            });
        }
      },
      clear() {
        this.$refs.loginForm.reset();
      },
    },
  };
</script>

<style>
  .alert {
    position: absolute;
    top: 5%;
    right: 1%;
  }
  .devider-text {
    margin-top: -10px;
  }
  .devider-text > span {
    padding: 0 8px 0 8px;
    background-color: white;
  }
</style>
