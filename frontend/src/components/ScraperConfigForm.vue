<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-6 w-full">
        <InputTextField label="base URL" name="baseUrl" :errorMessage="$form.baseUrl?.error?.message" :invalid="$form.baseUrl?.invalid" />
        <div class="flex flex-row w-full gap-2">
            <InputTextField label="title selector" name="title.selector" :errorMessage="$form.title?.selector?.error?.message" :invalid="$form.title?.selector?.invalid" class="flex-2" />
            <InputTextField label="title attribute" name="title.attribute" :errorMessage="$form.title?.attribute?.error?.message" :invalid="$form.title?.attribute?.invalid" class="flex-1" />
        </div>

        <div class="flex flex-row w-full gap-2">
            <InputTextField label="price selector" name="price.selector" :errorMessage="$form.price?.selector?.error?.message" :invalid="$form.price?.selector?.invalid" class="flex-2" />
            <InputTextField label="price attribute" name="price.attribute" :errorMessage="$form.price?.attribute?.error?.message" :invalid="$form.price?.attribute?.invalid" class="flex-1" /> 
        </div>
                   
        <div class="flex flex-row w-full gap-2">
            <InputTextField label="link selector" name="link.selector" :errorMessage="$form.link?.selector?.error?.message" :invalid="$form.link?.selector?.invalid" class="flex-2" />
            <InputTextField label="link attribute" name="link.attribute" :errorMessage="$form.link?.attribute?.error?.message" :invalid="$form.link?.attribute?.invalid" class="flex-1" />
        </div>
        
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

const initialValues: ScraperConfigSchemaType = reactive({
    baseUrl: '',
    title: {
        selector: '',
        attribute: 'text'
    },
    price: {
        selector: '',
        attribute: 'text'
    },
    link: {
        selector: '',
        attribute: 'href'
    }
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