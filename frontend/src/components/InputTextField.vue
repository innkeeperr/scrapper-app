<template>
        <FloatLabel class="relative" variant="in">
            <InputText :id="name" :name="name" type="text" class="w-full" />
            <label :for="name">{{ props.label }}</label>
            <Message class="absolute bottom-[-22px] left-[14px]" v-if="invalid" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
        </FloatLabel>  
  </template>
  
  <script setup lang="ts">
  
  const props = defineProps<{
    label: string
    name: string
    errorMessage?: string
    invalid?: boolean
  }>();
  
  </script>
  