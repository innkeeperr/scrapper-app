<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-6 w-full sm:w-56">
        <label class="text-xl text-center">Selectors for scraping</label>
        <InputTextField label="item list" name="itemList" :errorMessage="$form.itemList?.error?.message" :invalid="$form.itemList?.invalid" />
        <InputTextField label="price" name="price" :errorMessage="$form.price?.error?.message" :invalid="$form.price?.invalid" />
        <InputTextField label="price fraction" name="priceFraction" :errorMessage="$form.priceFraction?.error?.message" :invalid="$form.priceFraction?.invalid" />
        <InputTextField label="link" name="link" :errorMessage="$form.link?.error?.message" :invalid="$form.link?.invalid" />
        <Button label="Submit" type="submit" />
    </Form>
</template>

<script setup lang="ts">
import { Form } from '@primevue/forms';
import { reactive } from 'vue';

const initialValues = reactive({
    itemList: '',
    price: '',
    priceFraction: '',
    link: ''
});

const resolver = ({ values }) => {
    const errors = {};

    if (!values.itemList) {
        errors.itemList = [{ message: 'Item is required.' }];
    }

    if (!values.price) {
        errors.price = [{ message: 'Price is required.' }];
    }

    return {
        values, // (Optional) Used to pass current form values to submit event.
        errors
    };
};

const onFormSubmit = () => {}

</script>

<style scoped>

</style>