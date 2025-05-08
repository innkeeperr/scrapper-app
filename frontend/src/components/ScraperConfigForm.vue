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
        <Button label="Test" @click="toggle" />
        <Button label="Submit" type="submit" />
        <Popover ref="popoverRef">
            <div class="w-[300px]">
                <InputTextField label="example product URL" name="exampleProductUrl" class="flex-1" />
                <Fieldset legend="Scrapped data" class="h-40 overflow-auto">
                    <pre class="whitespace-pre-wrap">{{ testScraperData }}</pre>
                </Fieldset>
                <Button label="Test configuration" @click="() => onTestConfigClick($form)" class="mt-4!" />
            </div>
        </Popover>
    </Form>
</template>

<script setup lang="ts">
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { reactive, ref, inject, type Ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { scraperConfigApi } from '@/services/api/scraperConfigApi';
import { scraperConfigSchema, type ScraperConfigSchemaType } from '@/schemas/scraperConfigSchema';
import type { DynamicDialogInstance } from 'primevue/dynamicdialogoptions';
import { scraperApi } from '@/services/api/scraperApi';

const initialValues = reactive({
    'baseUrl': '',
    'title.selector': '',
    'title.attribute': 'text',
    'price.selector': '',
    'price.attribute': 'text',
    'link.selector': '',
    'link.attribute': 'href',
    'exampleProductUrl': '',
});

const resolver = ref(zodResolver(scraperConfigSchema));
const testScraperData = ref({})

const dialogRef = inject<Ref<DynamicDialogInstance>>('dialogRef');

const onFormSubmit = async ({values, valid}: FormSubmitEvent<ScraperConfigSchemaType>) => {
    if(valid) {
        const response = await scraperConfigApi.createScraperConfig(values)
        
        if(response.status === 201) {
            dialogRef?.value.close();
        }
    }
}

const onTestConfigClick = async (formState: unknown) => {
    const payload = {
        config: {
            title: {
                selector: formState?.title?.selector.value,
                attribute: formState?.title?.attribute.value
            },
            price: {
                selector: formState?.price?.selector.value,
                attribute: formState?.price?.attribute.value
            },
            link: {
                selector: formState?.link?.selector.value,
                attribute: formState?.link?.attribute.value
            },
        },
        exampleProductUrl: formState?.exampleProductUrl?.value
    }

    const response = await scraperApi.testScraperConfiguration(payload)
    testScraperData.value = response.data
}

const popoverRef = ref();
const toggle = (event) => {
    popoverRef.value.toggle(event);
}

</script>