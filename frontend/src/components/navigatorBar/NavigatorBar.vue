<template>
      <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
          <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                  <span>{{ item.label }}</span>
              </a>
          </router-link>
          <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
              <span>{{ item.label }}</span>
              <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
          </a>
      </template>
  </Menubar>
  </template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ref([
    {
        label: 'Dashboard',
        route: '/'
    },
    {
        label: 'Scraper configs',
        route: '/scraper-configs'
    },
    ])
</script>
