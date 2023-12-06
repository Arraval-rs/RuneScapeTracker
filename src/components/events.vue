<template>
    <v-app>
        <NavBar/>
        <div class="main"> 
            <div v-if="props.title === 'Daily'">
                {{ props.title }} Reset In: {{ resetTimer.hours }} hours {{ resetTimer.minutes }} minutes {{ resetTimer.seconds }} seconds
            </div>
            <div v-else-if="props.title !== 'Misc'">
                {{ props.title }} Reset In: {{ resetTimer.days }} days {{ resetTimer.hours }} hours {{ resetTimer.minutes }} minutes {{ resetTimer.seconds }} seconds
            </div>
            <div>
                <v-switch label="Show Hidden" v-model="showHidden"></v-switch>
                <v-switch label="Show Completed" v-model="showCompleted"></v-switch>
                <v-btn @click="resetEvents()">Reset {{ props.title }} events</v-btn>
            </div>
            <table>
                <thead>
                    <th>Completed</th>
                    <th>Name</th>
                    <th v-if="props.title === 'Misc'">Resets Frequency</th>
                    <th v-if="props.title === 'Misc'">Resets In</th>
                    <th>Hidden</th>
                </thead>
                <tbody>
                    <tr v-for="(event, key) in props.eventList">
                        <td v-if="(!event.hidden || showHidden) && (!event.completed || showCompleted)">
                            <input type="checkbox" v-model="event.completed" @input="updateCompletedDate(key)" />
                        </td>
                        <td v-if="(!event.hidden || showHidden) && (!event.completed || showCompleted)">
                            <a :href="getUrl(key)" target="_blank" rel="noopener noreferrer">{{ key }}</a>
                        </td>
                        <td v-if="props.title === 'Misc' && (!event.hidden || showHidden) && (!event.completed || showCompleted)">
                            {{ event.frequency }}
                        </td>
                        <td v-if="props.title === 'Misc' && event.completed && (!event.hidden || showHidden) && (!event.completed || showCompleted)">
                            {{ miscTimers[key].days }} days {{ miscTimers[key].hours }} hours {{ miscTimers[key].minutes }} minutes {{ miscTimers[key].seconds }} seconds
                        </td>
                        <td v-else>
                            Not Completed
                        </td>
                        <td v-if="(!event.hidden || showHidden) && (!event.completed || showCompleted)">
                            <input type="checkbox" v-model="event.hidden" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </v-app>
</template>

<script setup>
    import { ref, watch, onBeforeMount } from 'vue'
    import NavBar from '@/components/navbar.vue'
    import { timer } from '@/composables/timer'

    const props = defineProps({
        title: String,
        eventList: Object
    })

    const showHidden = false
    const showCompleted = false
    const resetTimer = timer(1, timeToReset(), true, true, initialResetTime())
    const miscTimers = ref(null)

    onBeforeMount(() => {
        if (props.title === "Misc") {
            miscTimers.value = createMiscTimers()
        }
        else {
            watch(resetTimer.end, () => {
                timerReset()
            })
        }
    })

    function mod(n, m) {
      return ((n % m) + m) % m;
    }

    function timeToReset() {
        const now = new Date()
        if (props.title === "Daily") {
            const now = new Date()
            const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, -now.getTimezoneOffset())
            const nextReset = mod(target.getTime() - now.getTime(), 1000 * 60 * 60 * 24) // difference mod 1 week
            return Math.floor(nextReset / 1000)
        }
        if (props.title === "Weekly") {
            const now = new Date()
            const target = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10 - now.getDay(), 0, -now.getTimezoneOffset())
            const nextReset = mod(target.getTime() - now.getTime(), 1000 * 60 * 60 * 24 * 7) // difference mod 1 week
            return Math.floor(nextReset / 1000)
        }
        if (props.title === "Monthly") {
            const target = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, -now.getTimezoneOffset())
            const nextReset = target.getTime() - now.getTime()
            return Math.floor(nextReset / 1000)
        }
    }

    function initialResetTime() {
        if (props.title === "Daily") {
            return 24 * 60 * 60
        }
        if (props.title === "Weekly") {
            return 7 * 24 * 60 * 60
        }
        if (props.title === "Monthly") {
            const now = new Date()
            const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, -now.getTimezoneOffset())
            const target = new Date(now.getFullYear(), now.getMonth() + 2, 1, 0, -now.getTimezoneOffset())
            const nextReset = target.getTime() - nextMonth.getTime()
            return Math.floor(nextReset / 1000)
        }
    }

    function createMiscTimers() {
        var newTimers = {}
        for (let event in props.eventList) {
            const eventFrequency = parseInt(props.eventList[event].frequency[0])
            const now = new Date()
            const target = new Date((props.eventList[event].lastCompleted + eventFrequency) * 24 * 60 * 60 * 1000)
            const nextReset = mod(target.getTime() - now.getTime(), 1000 * 60 * 60 * 24 * eventFrequency)
            newTimers[event] = timer(1, Math.floor(nextReset / 1000), true, true, eventFrequency * 60 * 60 * 24)
            watch(newTimers[event].end, () => {
                props.eventList[event].completed = false
                console.log(event)
            })
        }
        console.log(newTimers)
        return newTimers
    }

    function getUrl(event) {
        return "https://runescape.wiki/w/" + event.replaceAll(" ", "_").toLowerCase()
    }

    function resetEvents() {
        for (let event in props.eventList) {
            props.eventList[event].hidden = false
            props.eventList[event].completed = false
        }
    }

    function timerReset() {
        for (let event in props.eventList) {
            props.eventList[event].completed = false
        }
    }

    function updateCompletedDate(key) {
        const dayLength = 24 * 60 * 60 * 1000
        const now = Date.now()
        props.eventList[key].lastCompleted = Math.floor(now / dayLength)
    }
</script>
