<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-6 w-full">
        <InputTextField label="base URL" name="baseUrl" :errorMessage="$form.baseUrl?.error?.message" :invalid="$form.searchUrl?.invalid" />
        <InputTextField label="item list" name="itemList" :errorMessage="$form.itemList?.error?.message" :invalid="$form.itemList?.invalid" />
        <InputTextField label="product title" name="title" :errorMessage="$form.title?.error?.message" :invalid="$form.title?.invalid" />
        <InputTextField label="price" name="price" :errorMessage="$form.price?.error?.message" :invalid="$form.price?.invalid" />
        <InputTextField label="price fraction" name="priceFraction" :errorMessage="$form.priceFraction?.error?.message" :invalid="$form.priceFraction?.invalid" />
        <InputTextField label="link" name="link" :errorMessage="$form.link?.error?.message" :invalid="$form.link?.invalid" />
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
    itemList: '',
    title: '',
    price: '',
    priceFraction: '',
    link: ''
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