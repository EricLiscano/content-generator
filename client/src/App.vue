<template>
  <v-app>
    <div data-app>
      <div class="input d-flex mt-10">
        <div class="d-flex w-50 mx-auto my-auto">
          <v-text-field
            v-model="prompt"
            label="Un coche rojo.."
            :rules="rules"
            hide-details="auto"
          ></v-text-field>

          <v-btn
            color="primary"
            dark
            @click="generate()"
            >Generar Imagen
          </v-btn>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import Vue from 'vue';
  import ImageGeneratorService from '@/Services/ImageGeneratorService';
  import GeneratorParams from '@/Structures/GeneratorParams';

  @Component({})
  export default class App extends Vue {
    rules = [
      (value: any) => !!value || 'Required.',
      (value: any) => (value && value.length >= 3) || 'Min 3 characters',
    ];

    prompt: string = '';
    imageResultUrl: string = '';
    generatorService: ImageGeneratorService = new ImageGeneratorService();

    async generate() {
      const params = new GeneratorParams(this.prompt);

      await this.generatorService.generateImage(params).then((response: any) => {
        console.log(response);
      });
    }
  }
</script>
<style>
  .input {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .w-50 {
    width: 50%;
  }
</style>
