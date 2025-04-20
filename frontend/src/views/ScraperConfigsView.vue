<template>
    <div class="mb-2">
        <Button label="Add configuration" icon="pi pi-search" @click="showAddForm" />
    </div>
    
    <DataTable :value="scraperConfigs" tableStyle="min-width: 50rem">
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
import { scraperConfigApi } from '@/services/api/scraperConfigApi';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
const ScrapConfigForm = defineAsyncComponent(() => import('../components/ScraperConfigForm.vue'));

const scraperConfigs = ref()

onMounted(async () => {
    scraperConfigs.value = await scraperConfigApi.fetchAllScraperConfigs()
});

const dialog = useDialog();

const showAddForm = () => {
    const dialogRef = dialog.open(ScrapConfigForm, {
        props: {
            header: 'New scraper configuration',
            style: {
                width: '50vw',
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