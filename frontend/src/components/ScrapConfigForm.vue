<template>
    <Form v-slot="$form" :initialValues :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56">
    <InputText name="item" type="text" />
    <InputText name="price" type="text" />
    <InputText name="priceFraction" type="text" />
    <InputText name="link" type="text" />
<Button label="Submit" />
    </Form>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { Form } from '@primevue/forms';
import Button from 'primevue/button';
import { reactive } from 'vue';

const initialValues = reactive({
    item: '',
    price: '',
    priceFraction: '',
    link: ''
});

const resolver = ({ values }) => {
    const errors = {};

    if (!values.item) {
        errors.item = [{ message: 'Item is required.' }];
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