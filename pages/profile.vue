<template>
  <v-container fluid class="align-self-start">
    <v-form fluid class="mt-4">
      <v-row class="justify-center">
        <v-col cols="12" md="8">
          <v-row>
            <v-col cols="12" md="3"><h3>Account Settings</h3></v-col>
            <v-col cols="12" md="6">
              <v-row>
                <v-col>
                  <strong>Username</strong><br />
                  <v-text-field
                    v-model="user.username"
                    outlined
                    dense
                    hide-details
                    autocomplete="off"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <strong>Email</strong><br />
                  <v-text-field
                    v-model="user.email"
                    outlined
                    dense
                    disabled
                    hide-details
                    type="email"
                    autocomplete="email"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <strong>Password</strong><br />
                  <v-text-field
                    v-model="currentPassword"
                    outlined
                    dense
                    hide-details
                    type="password"
                    autocomplete="current-password"
                  />
                  <v-btn
                    class="text-decoration-underline px-0"
                    color="primary"
                    text
                    x-small
                    @click="resetPassword"
                  >
                    Click here to reset your password
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <strong>E-Mail verification</strong>
                  <br />
                  <v-icon color="success" v-if="emailVerified">
                    mdi-check-circle-outline
                  </v-icon>
                  <v-icon color="error" v-if="!emailVerified">
                    mdi-close-circle-outline
                  </v-icon>
                  <span>
                    E-Mail {{ emailVerified ? "" : "not" }} verified
                  </span>
                  <v-btn
                    class="float-right"
                    color="primary"
                    small
                    outlined
                    v-if="!emailVerified"
                    @click="refreshUserData"
                  >
                    refresh
                  </v-btn>
                  <br />
                  <v-btn
                    class="text-decoration-underline px-0"
                    color="primary"
                    text
                    x-small
                    v-if="!emailVerified"
                    @click="resendVerificationEmail"
                  >
                    Click here to resend the verificaton Email
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-divider class="my-8" />

          <v-row>
            <v-col offset-md="3" cols="12" md="6">
              <v-row>
                <v-col>
                  <v-btn :to="'/'"> Cancel </v-btn>
                </v-col>
                <v-spacer />
                <v-col>
                  <v-btn
                    color="primary"
                    @click="saveSettings"
                    :loading="loading"
                    :disabled="loading"
                  >
                    Save Settings
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    head() {
      return { title: "Profile" };
    },
    data: () => ({
      loading: false,
      currentPassword: "",
    }),
    computed: {
      ...mapGetters({
        user: "auth/GET_USER",
        emailVerified: "auth/getEmailVerified",
      }),
    },
    methods: {
      resetPassword() {
        this.$store
          .dispatch("auth/sendPasswordResetEmail", this.user.email)
          .then(() => {
            this.showSuccess("Password reset email sent");
          })
          .catch((e) => {
            this.showError(e.message);
          });
      },
      refreshUserData() {
        this.$store
          .dispatch("auth/refreshUserData")
          .then(() => {
            this.showSuccess("Profile Refreshed");
          })
          .catch((e) => {
            this.showError(e.message);
          });
      },
      resendVerificationEmail() {
        this.$store
          .dispatch("auth/resendEmailVerification")
          .then(() => {
            this.showSuccess("A verification Email was sent to your email");
          })
          .catch((e) => {
            this.showError(e.message);
          });
      },
      showSuccess(message) {
        this.$nuxt.$emit("alert-success", message);
      },
      showError(message) {
        this.$nuxt.$emit("alert-error", message);
      },
      saveSettings() {
        this.loading = true;
        this.$store
          .dispatch("auth/changeUserSettings", {
            user: this.user,
            password: this.currentPassword,
          })
          .then(() => {
            this.showSuccess("Profile settings updated");
            this.loading = false;
          })
          .catch((e) => {
            this.showError(e.message);
            this.loading = false;
          });
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
