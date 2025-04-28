<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-6 w-full">
        <InputTextField label="base URL" name="baseUrl" :errorMessage="$form.baseUrl?.error?.message" :invalid="$form.baseUrl?.invalid" />
        <InputTextField label="product title" name="titleSelector" :errorMessage="$form.titleSelector?.error?.message" :invalid="$form.titleSelector?.invalid" />
        <InputTextField label="price" name="priceSelector" :errorMessage="$form.priceSelector?.error?.message" :invalid="$form.priceSelector?.invalid" />
        <InputTextField label="link" name="linkSelector" :errorMessage="$form.linkSelector?.error?.message" :invalid="$form.linkSelector?.invalid" />
        <Button label="Submit" type="submit" />
    </Form>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { reactive, ref, inject, type Ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { scraperConfigApi } from '@/services/api/scraperConfigApi';
import { scraperConfigSchema, type ScraperConfigSchemaType } from '@/schemas/scraperConfigSchema';
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';

const initialValues = reactive({
    baseUrl: '',
    titleSelector: '',
    priceSelector: '',
    linkSelector: ''
});

const resolver = ref(zodResolver(scraperConfigSchema));

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef');

const onFormSubmit = async ({values, valid}: FormSubmitEvent<ScraperConfigSchemaType>) => {
    if(valid) {
        const response = await scraperConfigApi.createScraperConfig(values)
        
        if(response.status === 201) {
            dialogRef?.value.close();
        }
    }
}
</script>