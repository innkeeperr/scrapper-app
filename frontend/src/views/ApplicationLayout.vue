<template>
    <header>
        <nav>
        <NavigatorBar />
    </nav>
    </header>
    <main>
        <RouterView />
    </main>
</template>

<script setup lang="ts">
import NavigatorBar from '@/components/navigatorBar/NavigatorBar.vue';


</script>