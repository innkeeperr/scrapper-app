<template>
    <div class="card">
        <DataTable :value="scraperConfigs" tableStyle="min-width: 50rem">
            <Column field="baseUrl" header="Base URL"></Column>
            <Column field="title" header="Title"></Column>
            <Column field="createdAt" header="Created At"></Column>
            <Column field="itemList" header="Item list"></Column>
            <Column field="link" header="Link"></Column>
            <Column field="price" header="Price"></Column>
            <Column field="priceFraction" header="Price Fraction"></Column>
        </DataTable>
    </div>

</template>

<script setup lang="ts">
import { scraperApi } from '@/services/api/scraperApi';
import { onMounted, ref } from 'vue';

const scraperConfigs = ref()

    onMounted(async () => {
        scraperConfigs.value = await scraperApi.fetchAllScraperConfigs()
        console.log(scraperConfigs.value)
    });
    
</script>