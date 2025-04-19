<template>
    <div class="mb-2">
        <Button label="Add product" icon="pi pi-search" @click="showAddForm" />
    </div>
    
    <DataTable :value="[]" tableStyle="min-width: 50rem">
        <Column field="baseUrl" header="Base URL"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="createdAt" header="Created At"></Column>
        <Column field="itemList" header="Item list"></Column>
        <Column field="link" header="Link"></Column>
        <Column field="price" header="Price"></Column>
        <Column field="priceFraction" header="Price Fraction"></Column>
    </DataTable>
    <DynamicDialog />
 
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
const ProductConfigForm = defineAsyncComponent(() => import('../components/ProductConfigForm.vue'));

const dialog = useDialog();

const showAddForm = () => {
    const dialogRef = dialog.open(ProductConfigForm, {
        props: {
            header: 'New product configuration',
            style: {
                width: '25vw',
            },
            breakpoints:{
                '960px': '75vw',
                '640px': '90vw'
            },
            modal: true
        },

        onClose: (options) => {
        }
    });
}
    
</script>