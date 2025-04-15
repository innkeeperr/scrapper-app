<template>
    <nav>
        <NavigatorBar />
    </nav>
    <main class="py-4 px-1">
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import NavigatorBar from '@/components/navigatorBar/NavigatorBar.vue';


</script>