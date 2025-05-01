<template>
    <FormField :name="name" v-slot="$field">
      <FloatLabel class="relative" variant="in">
            <InputText :id="name" :name="name" type="text" class="w-full" />
            <label :for="name">{{ props.label }}</label>
            <Message class="absolute bottom-[-22px] left-[14px]" v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field?.error?.message }}</Message>
        </FloatLabel>
    </FormField>
        
  </template>
  
  <script setup lang="ts">
  
  const props = defineProps<{
    label: string
    name: string
  }>();
  
  </script>
  