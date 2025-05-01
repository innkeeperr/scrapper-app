<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-6 w-full">
        <InputTextField label="base URL" name="baseUrl" />
        <div class="flex flex-row w-full gap-2">
                <InputTextField label="title selector" name="title.selector" class="flex-2" />
            <InputTextField label="title attribute" name="title.attribute" class="flex-1" />
        </div>

        <div class="flex flex-row w-full gap-2">
            <InputTextField label="price selector" name="price.selector" class="flex-2" />
            <InputTextField label="price attribute" name="price.attribute" class="flex-1" /> 
        </div>
                   
        <div class="flex flex-row w-full gap-2">
            <InputTextField label="link selector" name="link.selector" class="flex-2" />
            <InputTextField label="link attribute" name="link.attribute" class="flex-1" />
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