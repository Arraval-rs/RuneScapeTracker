import { ref } from 'vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { useStorage } from '@vueuse/core';
import EventPage from '@/components/events'
import { events } from '@/data/events.js'

const storedEvents = ref(useStorage('Events', events, localStorage, { mergeDefaults: (storageValue, defaults) => mergeEvents(storageValue, defaults)}))

const routes = [
  { path: '/', component: () => import('@/components/home') }
]

for (let category in storedEvents.value) {
  routes.push({ path: '/' + category, component: () => import('@/components/events'), props: {title: category, eventList: storedEvents.value[category]} })
}

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

function mergeEvents(storageValue, defaults) {
  for (let category in defaults) {
    for (let event in defaults[category]) {
      if (storageValue[category].hasOwnProperty(event) && storageValue[category][event] !== null) {
        if (category === "Daily" && storageValue[category][event].completed  && dailyReset(storageValue[category][event].lastCompleted)) {
          console.log("Daily " + event + " reset")
          storageValue[category][event].completed = false
        }
        else if (category === "Weekly" && storageValue[category][event].completed  && weeklyReset(storageValue[category][event].lastCompleted)) {
          console.log("Weekly " + event + " reset")
          storageValue[category][event].completed = false
        }
        else if (category === "Monthly" && storageValue[category][event].completed  && monthlyReset(storageValue[category][event].lastCompleted)) {
          console.log("Monthly " + event + " reset")
          storageValue[category][event].completed = false
        }
        else if (category === "Misc" && storageValue[category][event].completed  && miscReset(storageValue[category][event].lastCompleted, storageValue[category][event].frequency)) {
          console.log("Misc " + event + " reset")
          storageValue[category][event].completed = false
        }
      }
      else {
        console.log("New event: " + event + " (" + category + ")")
        storageValue[category][event] = defaults[category][event]
      }
    }
  }
  // console.log("Router")
  // console.log(storageValue)
  //storageValue = null
  return storageValue
}

function dailyReset(completedTime) {
  const dayLength = 24 * 60 * 60 * 1000
  const currentDay = Date.now()/dayLength
  if (currentDay >= completedTime + 1) {
    return true
  }
  return false
}

function weeklyReset(completedTime) {
  const weekLength = 7 * 24 * 60  * 60 * 1000
  const weekCount = Math.floor(completedTime/7)
  const currentWeek = Math.floor(Date.now()/weekLength)
  const dayOfWeek = new Date(Date.now()).getUTCDay()
  if ((currentWeek > weekCount && dayOfWeek > 2) || currentWeek > weekCount + 1) {
    return true
  }
  return false
}

function monthlyReset(completedTime) {
  const dayLength = 24 * 60 * 60 * 1000
  const completedDate = new Date(completedTime * dayLength)
  const now = new Date(Date.now())
  if (now.getUTCMonth() > completedDate.getUTCMonth() || now.getUTCFullYear() > completedDate.getUTCFullYear()) {
    return true
  }
  return false
}

function miscReset(completedTime, frequency) {
  const dayLength = 24 * 60 * 60 * 1000
  const currentDay = Date.now()/dayLength
  if (currentDay >= completedTime + parseInt(frequency[0])) {
    return true
  }
  return false
}

//console.log(routes)

export default router
