<template>
    <div class="flex flex-col gap-2">
      <label :for="name">{{ props.label }}</label>
      <InputText :id="name" :name="name" type="text" />
      <Message v-if="invalid" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </div>
  </template>
  
  <script setup lang="ts">  
  import InputText from 'primevue/inputtext';
  const props = defineProps<{
    label: string
    name: string
    errorMessage?: string
    invalid?: boolean
  }>();
  
  </script>
  