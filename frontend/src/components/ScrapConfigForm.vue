<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-6 w-full">
        <label class="text-xl text-center">Selectors for scraping</label>
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
import { Form } from '@primevue/forms';
import { reactive, ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

const initialValues = reactive({
    baseUrl: '',
    itemList: '',
    title: '',
    price: '',
    priceFraction: '',
    link: ''
});

const resolver = ref(zodResolver(
    z.object({
        baseUrl: z.string().min(1, { message: 'Base URL is required.' }),
        itemList: z.string().min(1, { message: 'Item list is required.' }),
        title: z.string().min(1, { message: 'Product title is required.' }),
        price: z.string().min(1, { message: 'Price is required.' }),
        priceFraction: z.string().optional(),
        link: z.string().optional()
    })
));

const onFormSubmit = () => {}

</script>

<style scoped>

</style>