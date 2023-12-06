import { ref, onMounted, onUnmounted, watch } from 'vue'

// needs to emit an event on end

export function timer(ratio = 1, initialTime = 0, countDown = false,  militaryTime = true, resetTime = initialTime) {

	var intervalId = 0

	// refs
	const end = ref(0)
	const count = ref(0)
	const days = ref('0')
	const hours = ref('00')
	const minutes = ref('00')
	const seconds = ref('00')
	const noonSwitch = ref('')

	// conversion factors for readability
	const minute = 60
	const hour = minute * 60
	const day = hour * 24

	function mod(n, m) {
	  return ((n % m) + m) % m;
	}

	function tick() {
		if(countDown) {
			--count.value
		}
		else{
			count.value++
		}
	}

	function updateClock() {
		seconds.value = mod(count.value, 60)
		minutes.value = mod(Math.floor(count.value/minute), 60)
		if(militaryTime === true) {
			hours.value = mod(Math.floor(count.value/hour), 24)
		} else {
			hours.value = (Math.floor((count.value) / hour) + 11) % 12 + 1
			if (count.value < day / 2) {
				noonSwitch.value = 'am'
			} else {
				noonSwitch.value = 'pm'
			}
		}
		days.value = Math.floor(count.value/day)
		if (seconds.value < 10 && !countDown) {
			seconds.value = '0' + seconds.value
		}
		if (minutes.value < 10 && !countDown) {
			minutes.value = '0' + minutes.value
		}
		if (hours.value < 10 && !countDown) {
			hours.value = '0' + hours.value
		}
		if (countDown && count.value === 0) {
			count.value = resetTime
			end.value++
		}
	}

	watch(count, async (newCount, oldCount) => {
		updateClock()
	})

	onMounted(() => {
		count.value = Math.floor(initialTime)
		updateClock()
		intervalId = setInterval(() => {
			tick()
		}, 1000 * ratio)
	})

	return { days, hours, minutes, seconds, noonSwitch, end }
}