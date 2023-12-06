<template>
	<v-app-bar class="header">
		<v-app-bar-nav-icon icon="mdi-home" @click="navPage('/')"></v-app-bar-nav-icon>
        <v-toolbar-title>Runescape Web Tools</v-toolbar-title>
        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props">DailyScape</v-btn>
            </template>
            <v-list>
                <v-list-item v-for="category in events" @click="navPage(category)">
                    <v-list-item-title> {{ category }} </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script setup>
    import { ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'

    const events = ["Daily", "Weekly", "Monthly", "Misc"]

    // Router info
    const router = useRouter()
    const route = useRoute()

    function navPage(page) {
        router.push('' + page)
    }
</script>