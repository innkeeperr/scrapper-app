<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ScrapConfigForm />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import ScrapConfigForm from '../components/ScrapConfigForm.vue'
  
</script>
 
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
