<template>
  <v-alert
    class="alert"
    v-model="showAlert"
    border="left"
    dismissible
    elevation="8"
    :type="alertType"
    transition="slide-x-reverse-transition"
  >
    {{ alert }}
    <template v-slot:close="{ toggle }">
      <v-progress-circular
        id="alert_close_timer"
        :size="24"
        :width="3"
        class="ml-2"
        :value="alertCloseValue"
        @click="toggle"
      >
        <v-icon small> mdi-close </v-icon>
      </v-progress-circular>
    </template>
  </v-alert>
</template>

<script>
  export default {
    data: () => ({
      showAlert: false,
      alertType: "success",
      alert: "",
      alertCloseValue: 0,
      alertAutoCloseInSeconds: 10,
    }),
    created() {
      // TRIGGERED BY: this.$nuxt.$emit("alert-success", "message");
      this.$nuxt.$on("alert-success", (msg) => {
        this.showSuccess(msg);
      });
      // TRIGGERED BY: this.$nuxt.$emit("alert-error", "message");
      this.$nuxt.$on("alert-error", (msg) => {
        this.showError(msg);
      });
    },
    methods: {
      showSuccess(message) {
        this.alert = message;
        this.alertType = "success";
        if (!this.showAlert) {
          this.showAlert = true;
          this.alertCloseValue = 0;
          this.autoCloseAfterTime();
        }
      },
      showError(message) {
        this.alert = message;
        this.alertType = "error";
        if (!this.showAlert) {
          this.showAlert = true;
          this.alertCloseValue = 0;
          this.autoCloseAfterTime();
        }
      },
      async autoCloseAfterTime() {
        for (let i = 1; i <= this.alertAutoCloseInSeconds; i++) {
          if (!this.showAlert) {
            break;
          }
          await this.delay1Sec();
          if (!this.showAlert) {
            break;
          }
          this.alertCloseValue = (100 / this.alertAutoCloseInSeconds) * i;
          if (i === this.alertAutoCloseInSeconds) {
            await this.delay1Sec();
            this.showAlert = false;
            this.alertCloseValue = 0;
          }
        }
      },
      delay1Sec() {
        return new Promise((res) => setTimeout(res, 1000));
      },
    },
  };
</script>

<style>
  .alert {
    z-index: 999;
    position: absolute !important;
    top: 75px;
    right: 1%;
  }
  #alert_close_timer {
    cursor: pointer;
  }
</style>
