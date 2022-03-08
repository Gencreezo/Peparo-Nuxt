<template>
  <v-container>
    <v-container my-16 py-16>
      <v-flex text-center mt-16>
        <h2 class="text-center mb-2">Dein Pen & Paper Rollenspiel Assistent</h2>
        <v-btn color="primary">Mehr erfarhen</v-btn>
      </v-flex>
    </v-container>

    <v-container my-16 py-16>
      <v-row>
        <v-col cols="4">
          <v-card height="220px">
            <v-card-title>Lorem Ipsum</v-card-title>
            <v-card-text
              >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perferendis numquam ducimus corporis corrupti ea, dolore ratione
              nobis, commodi, soluta officia voluptate distinctio atque neque
              enim!</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="220px">
            <v-card-title>Lorem Ipsum</v-card-title>
            <v-card-text
              >Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
              et minus omnis, perspiciatis, expedita molestias animi culpa
              impedit dolore eligendi officia eos cum adipisci
              explicabo!</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="220px">
            <v-card-title>Lorem Ipsum</v-card-title>
            <v-card-text
              >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
              quaerat eveniet veniam iusto. Molestias consequuntur fugiat rerum
              nam voluptate eius fuga veniam perspiciatis quo
              voluptates?</v-card-text
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container my-16 py-16>
      <v-flex text-center mt-16>
        <h2>Erlebe schon heute spannende Abenteuer</h2>
        <v-btn class="mt-10" color="primary" to="register"
          >Kostenlos Registrieren</v-btn
        >
      </v-flex>
    </v-container>
  </v-container>
</template>

<script>
  export default {
    head() {
      return { title: "Home" };
    },
  };
</script>

<style scoped>
  .custom {
    width: 600px;
    max-width: 600px;
  }

  .height-100 {
    height: 100%;
  }
</style>
