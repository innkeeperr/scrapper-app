<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
        <label class="text-xl text-center">Selectors for scraping</label>
        <InputTextField label="item list" name="itemList" :errorMessage="$form.itemList?.error?.message" :invalid="$form.itemsList?.invalid" />
        <InputText name="price" type="text" />
        <InputText name="priceFraction" type="text" />
        <InputText name="link" type="text" />
        <Button label="Submit" type="submit" />
    </Form>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { Form } from '@primevue/forms';
import Button from 'primevue/button';
import { reactive } from 'vue';
import InputTextField from './InputTextField.vue'

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

    return {
        values, // (Optional) Used to pass current form values to submit event.
        errors
    };
};

const onFormSubmit = () => {}

</script>

<style scoped>

</style>