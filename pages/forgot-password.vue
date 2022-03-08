<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="6" xl="4">
        <v-card class="elevation-12">
          <v-card-title>
            <span>Forgot Password?</span>
          </v-card-title>
          <v-card-text>
            <v-container fluid>
              <v-form ref="forgotPasswordForm" v-model="valid" lazy-validation>
                <v-text-field
                  label="E-Mail"
                  name="email"
                  :rules="[(v) => !!v || 'E-Mail is required']"
                  v-model="email"
                  prepend-icon="mdi-email"
                  type="email"
                  autocomplete="username"
                ></v-text-field>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" text @click="$router.go(-1)">Back</v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="sendPasswordResetEmail"
              :disabled="!valid"
              >Continue</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      email: "",
    }),
    methods: {
      validate() {
        return this.$refs.forgotPasswordForm.validate();
      },
      sendPasswordResetEmail() {
        if (this.validate()) {
          this.$store
            .dispatch("auth/sendPasswordResetEmail", this.email)
            .then(() => {
              this.$nuxt.$emit("alert-success", "Password reset email sent");
              this.$router.push("/login");
              this.clear();
            })
            .catch((e) => {
              this.$nuxt.$emit("alert-error", e.message);
            });
        }
      },
      clear() {
        this.$refs.forgotPasswordForm.reset();
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
