<template>
    <FloatLabel class="relative" variant="in">
        <AutoComplete dropdown :name="name" optionLabel="name" :suggestions="filteredItems" @complete="search" class="w-full" />
        <label :for="name">{{ props.label }}</label>
        <Message class="absolute bottom-[-22px] left-[14px]" v-if="invalid" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </FloatLabel>  
</template>

<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
label: string
name: string
items: {name: string, value: string}[]
errorMessage?: string
invalid?: boolean
}>();

const filteredItems = ref();

const search = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredItems.value = [...props.items];
        } else {
            filteredItems.value = props.items.filter((item) => {
                return item.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
};

</script>
