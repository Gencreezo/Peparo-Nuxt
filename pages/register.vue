<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="6" xl="4">
        <v-card class="elevation-12">
          <v-card-title>
            <span>Register</span>
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-form ref="registerForm" v-model="valid" lazy-validation>
                <v-text-field
                  label="Username"
                  name="username"
                  :rules="[(v) => !!v || 'Username is required']"
                  v-model="username"
                  prepend-icon="mdi-account"
                  type="text"
                  autocomplete="off"
                ></v-text-field>
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
                  autocomplete="new-password"
                  :append-icon="showPw ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPw = !showPw"
                ></v-text-field>
              </v-form>
              <v-btn
                color="primary"
                @click="emailRegister"
                :disabled="!valid"
                block
                class="text-none mb-8"
                >Create account</v-btn
              >
              <v-divider></v-divider>
              <div class="devider-text text-center black--text mb-4">
                <span> Already have an account? </span>
              </div>
              <v-btn
                color="primary"
                text
                :to="'/login'"
                block
                outlined
                class="text-none"
                >Sign in</v-btn
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
      return { title: "Register" };
    },
    data: () => ({
      valid: false,
      showPw: false,
      username: "",
      email: "",
      password: "",
    }),
    methods: {
      validate() {
        return this.$refs.registerForm.validate();
      },
      emailRegister() {
        if (this.validate()) {
          this.$store
            .dispatch("auth/registerWithEmail", {
              username: this.username,
              email: this.email,
              password: this.password,
            })
            .then(() => {
              this.$nuxt.$emit(
                "alert-success",
                "A verification Email was sent to your email"
              );
              this.$router.push("/");
              this.clear();
            })
            .catch((e) => {
              this.$nuxt.$emit("alert-error", e.message);
            });
        }
      },
      clear() {
        this.$refs.registerForm.reset();
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
</style>
