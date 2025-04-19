<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-6 w-full">
        <ComboboxField label="scraper config" name="scraperConfig" :items="items" :errorMessage="$form.scraperConfig?.error?.message" :invalid="$form.scraperConfig?.invalid" />
        <InputTextField label="product name" name="productName" :errorMessage="$form.productName?.error?.message" :invalid="$form.productName?.invalid" />
        <Button label="Submit" type="submit" />
    </Form>
</template>

<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { ref } from 'vue';
import type ComboboxField from './ComboboxField.vue';
import { productConfigSchema, type ProductConfigSchemaType } from '@/schemas/productConfigSchema';
import type { FormSubmitEvent } from '@primevue/forms';

const items = ref([ 
    {name: "test1", value: "test1"},
    {name: "test2", value: "test2"},
])

const initialValues = ref({
    scraperConfig: {name: ''},
    productName: ''
});

const resolver = ref(zodResolver(productConfigSchema));

const onFormSubmit = ({values, valid }: FormSubmitEvent<ProductConfigSchemaType>) => {
    if (valid) {
        console.log('product config valid')
        console.log('values', values)
    }
};

</script>