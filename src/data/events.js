const eventNames = {
	"Daily" : [
		"Jack of Trades Aura",
		"Treasure Hunter",
		"Travelling Merchant",
		"Daily Challenges",
		"Soul Reaper",
		"Player Owned Port",
		"Player Owned Farm",
		"Crystal Tree Blossom",
		"Invention Machines",
		"Motherlode Maw",
		"Gorajo Card",
		"Divine Locations",
		"Archaeology Research",
		"Wilderness Warbands",
		"Nemi Forest",
		"Guthixian Cache",
		"Sinkholes",
		"Goebie Bands",
		"Menaphos Obelisk",
		"Menaphos Scarabs",
		"Big Chinchompa",
		"Phoenix",
		"Fish Flingers",
		"Evil Tree",
		"Shooting Star",
		"Bork",
		"Serenity Posts",
		"Fixate Charges",
		"Arc Contracts",
		"Rapid Growth",
		"Book of Char",
		"Rune Shop Run",
		"Vis Wax",
		"Feathers of Ma'at",
		"Bak Bolts",
		"Wicked Hood Runes",
		"Feather Shop Run",
		"Miscellania",
		"Sand Stone",
		"Crystal Sand Stone",
		"Meat Packs from Oo'glog",
		"Vial of Water Packs",
		"Yak Hide",
		"Broad Arrowheads",
		"Bandit Duty Free",
		"Herb Run",
		"Seaweed and Pineapples",
		"Sand from Bert",
		"Potato Cactus from Weird Old Man",
		"Planks from Razmire",
		"Flax from Geoffrey",
		"Pineapples and Apples from Dell Monti",
		"Pure Essence from Wizard Cromperty",
		"Logs from Coeden",
		"Modified Skilling Helms",
		"Mask of the Troll",
		"Mask of Broken Fingers",
		"Mask of Mourning",
		"Mask of Stone",
		"Mask of Reflection",
		"Mask of Crimson",
		"Mask of Gelatin",
		"Mask of Stench",
		"Mask of Dust",
		"Mask of the Kura",
		"Mask of Granite",
		"Mask of Vines",
		"Mask of the Abyss",
		"Mask of Gloom"
	],
	"Weekly": [
		"Clan Citadel",
		"Anachronia Totems",
		"Meg",
		"Tears of Guthix",
		"Herby Werby",
		"Big Top Bonanza",
		"Penguin Hide and Seek",
		"Wisps of the Grove",
		"Shattered Worlds",
		"Familiarisation",
		"Skeletal Horror",
		"Aquarium Treasure Chest",
		"Agoroth",
		"Broken Home",
		"Rush of Blood",
		"Water Filtration",
		"Miscellania",
		"Invention Machines",
		"Arc Supplies Crate",
		"Dream of Iaia Resources",
		"GWD2 Bounties",
		"D&D of the Week",
		"Fort Forinthry Bonus XP"
	],
	"Monthly": [
		"Solomon's Store",
		"Premier Club Vault",
		"Giant Oyster",
		"God Statues",
		"Effigy Incubator",
		"Troll Invasion",
		"Dream of Iaia XP"
	],
	"Misc": [
		["Liberation of Mazcab", "2 days"],
		["Mask of the Green Wyrm", "3 days"],
		["Mask of the Dagganoth", "3 days"],
		["Mask of the Yellow Wyrm", "3 days"],
		["Mask of the Black Demon", "3 days"],
		["Mask of the Automatons", "3 days"],
		["Mask of the Aquanites", "3 days"],
		["Mask of the Airut", "3 days"],
		["Mask of the White Wyrm", "3 days"],
		["Mask of the Ganodermic", "3 days"]
	]
}

var events = {}

for (let category in eventNames) {
	events[category] = {}
	if (category === "Misc") {
		for (let index = 0; index < eventNames[category].length; index++) {
			events[category][eventNames[category][index][0]] = {
				"completed": false,
				"lastCompleted": 0,
				"hidden": false,
				"frequency": eventNames[category][index][1]
			}
		}
	}
	else {
		for (let index = 0; index < eventNames[category].length; index++) {
			events[category][eventNames[category][index]] = {
				"completed": false,
				"lastCompleted": 0,
				"hidden": false
			}
		}
	}
}

console.log("Events")
console.log(events)

export { events }