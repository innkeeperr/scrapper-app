<template>
    <FloatLabel class="relative" variant="in">
        <AutoComplete name="country.name" optionLabel="name" :suggestions="filteredCountries" @complete="search" />
        <label for="country.name">{{ props.label }}</label>
        <Message class="absolute bottom-[-22px] left-[14px]" v-if="invalid" severity="error" size="small" variant="simple">{{ errorMessage }}</Message>
    </FloatLabel>  
</template>

<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps<{
label: string
name: string
errorMessage?: string
invalid?: boolean
}>();


const selectedCountry = ref();
const filteredCountries = ref();
const countries = ref([{
    name: "Poland",
    value: "poland" 
},
{
    name: "Gondor",
    value: "gondor" 
}]
);

const search = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredCountries.value = [...countries.value];
        } else {
            filteredCountries.value = countries.value.filter((country) => {
                return country.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
};

</script>
