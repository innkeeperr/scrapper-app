<template>
    <Button label="Add configuration" icon="pi pi-search" @click="showAddForm" />
    <DataTable :value="scraperConfigs" tableStyle="min-width: 50rem">
        <Column field="baseUrl" header="Base URL"></Column>
        <Column field="title" header="Title"></Column>
        <Column field="createdAt" header="Created At"></Column>
        <Column field="itemList" header="Item list"></Column>
        <Column field="link" header="Link"></Column>
        <Column field="price" header="Price"></Column>
        <Column field="priceFraction" header="Price Fraction"></Column>
    </DataTable>
    <!-- <DynamicDialog /> -->
 
</template>

<script setup lang="ts">
import { scraperApi } from '@/services/api/scraperApi';
import { defineAsyncComponent, onMounted, ref } from 'vue';
// import { useDialog } from 'primevue/usedialog';
// import DynamicDialog from 'primevue/dynamicdialog'
// import DialogService from 'primevue/dialogservice';
// const ScrapConfigForm = defineAsyncComponent(() => import('../components/ScrapConfigForm.vue'));

const scraperConfigs = ref()

onMounted(async () => {
    scraperConfigs.value = await scraperApi.fetchAllScraperConfigs()
});

// const dialog = useDialog();

const showAddForm = () => {}

// const showAddForm = () => {
//     const dialogRef = dialog.open(ScrapConfigForm, {
//         props: {
//             header: 'Product List',
//             style: {
//                 width: '50vw',
//             },
//             breakpoints:{
//                 '960px': '75vw',
//                 '640px': '90vw'
//             },
//             modal: true
//         },
//         templates: {
//             footer: ScrapConfigForm
//         },

//         onClose: (options) => {
//         }
//     });
// }
    
</script>