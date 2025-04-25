<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-6 w-full">
        <AutocompleteField label="scraper config" name="scraperConfig" :items="items" :errorMessage="$form.scraperConfig?.error?.message" :invalid="$form.scraperConfig?.invalid" />
        <InputTextField label="product url" name="searchUrl" :errorMessage="$form.searchUrl?.error?.message" :invalid="$form.searchUrl?.invalid" />
        <InputTextField label="product name" name="productName" :errorMessage="$form.productName?.error?.message" :invalid="$form.productName?.invalid" />
        <InputNumberField label="max price" name="maxPrice" :errorMessage="$form.maxPrice?.error?.message" :invalid="$form.maxPrice?.invalid" />
        <Button label="Submit" type="submit" />
    </Form>
</template>

<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { ref, inject, type Ref } from 'vue';
import AutocompleteField from './AutocompleteField.vue';
import { productConfigSchema, type ProductConfigSchemaType } from '@/schemas/productConfigSchema';
import type { FormSubmitEvent } from '@primevue/forms';
import { onMounted } from 'vue';
import { scraperConfigApi } from '@/services/api/scraperConfigApi';
import { productConfigApi, type CreateProductConfigPayload } from '@/services/api/productConfigApi';
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';

const items = ref<{name: string, value: string}[]>([])

onMounted(async () => {
    const responseData = await scraperConfigApi.fetchAllScraperConfigs()
    items.value = responseData.map(item => ({name: item.baseUrl, value: item._id}))
});

const initialValues = ref({
    scraperConfig: {name: '', value: ''},
    productName: ''
});

const resolver = ref(zodResolver(productConfigSchema));

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef');

const onFormSubmit = async ({values, valid }: FormSubmitEvent<ProductConfigSchemaType>) => {
    if (valid) {
        const requestPayload: CreateProductConfigPayload = {
            productName: values.productName,
            searchUrl: values.searchUrl,
            maxPrice: values.maxPrice,
            scraperConfigId: values.scraperConfig.value
        }
        const response = await productConfigApi.createProductConfig(requestPayload)

        if(response.status === 201) {
            dialogRef?.value.close();
        }
    }
};

</script>