<template>
    <div class="mb-2">
        <Button label="Add product" icon="pi pi-search" @click="showAddForm" />
    </div>
    
    <DataTable :value="productConfigs" tableStyle="min-width: 50rem">
        <Column field="searchUrl" header="Search URL"></Column>
        <Column field="productName" header="Product Name"></Column>
        <Column field="createdAt" header="Created At"></Column>
        <Column field="maxPrice" header="Max price"></Column>
        <Column field="scraperConfigId" header="Scraper configuration ID"></Column>
    </DataTable>
    <DynamicDialog />
 
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useDialog } from 'primevue/usedialog';
import { productConfigApi } from '@/services/api/productConfigApi';
const ProductConfigForm = defineAsyncComponent(() => import('../components/ProductConfigForm.vue'));


const productConfigs = ref()

onMounted(async () => {
    productConfigs.value = await productConfigApi.fetchAllProductConfigs()
});

const dialog = useDialog();

const showAddForm = () => {
    const dialogRef = dialog.open(ProductConfigForm, {
        props: {
            header: 'New product configuration',
            style: {
                width: '35vw',
            },
            breakpoints:{
                '1400px': '40vw',
                '1200px': '50vw',
                '1000px': '60vw',
                '700px': '80vw',
            },
            modal: true
        },
        onClose: (options) => {
        }
    });
}
    
</script>