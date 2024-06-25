document.addEventListener('DOMContentLoaded', () => {
  const commandsContainer = document.getElementById('commands-container');
  const searchInput = document.getElementById('command-search');

  // Todos los comandos segmentados por categoría
  const commands = {
    AISettings: [
      { name: "ai.addignoreplayer", description: "Adds the target ID to the NPCs ignore-list.", example: "ai.addignoreplayer \"GamerTag/PSN ID\"" },
      { name: "ai.brainstats", description: "Prints the amount of 'brains' on the map.", example: "ai.brainstats" },
      { name: "ai.clearignoredplayers", description: "Clears the ignore-list.", example: "ai.clearignoredplayers" },
      { name: "ai.killanimals", description: "Kills all animals on the server.", example: "ai.killanimals" },
      { name: "ai.killscientists", description: "Kills all scientists on the server.", example: "ai.killscientists" },
      { name: "ai.printignoredplayers", description: "Prints the list of currently ignored players.", example: "ai.printignoredplayers" },
      { name: "ai.removeignoreplayer", description: "Removes the target ID from the NPCs ignore-list.", example: "ai.removeignoreplayer \"GamerTag/PSN ID\"" },
      { name: "attackentity.print_ai_stats", description: "Prints various AI stats.", example: "attackentity.print_ai_stats" }
    ],
    GrowableSettings: [
      { name: "growableentity.growall", description: "Advances the growth stages of all growables.", example: "growableentity.growall" },
      { name: "growableentity.setalldying", description: "Sets the status of all growables as dying.", example: "growableentity.setalldying" }
    ],
    HorseSettings: [
      { name: "baseridableanimal.decayminutes", description: "Defines the amount of minutes for a horse to die.", example: "baseridableanimal.decayminutes 240" },
      { name: "baseridableanimal.dungtimescale", description: "Production rate of horse dung.", example: "baseridableanimal.dungtimescale 5" }
    ],
    Whitelisting: [
      { name: "global.whitelistid", description: "Adds the given Player ID to the Whitelist.", example: "global.whitelistid \"2StageFright\"" },
      { name: "global.removewhitelist", description: "Removes the given Player ID from the Whitelist.", example: "global.removewhitelist \"2StageFright\"" }
    ],
    GamblingWheelSettings: [
      { name: "bigwheelgame.forcedbigwheelhittype", description: "Forces the Gambling Wheel to land on the chosen colour.", example: "bigwheelgame.forcedbigwheelhittype \"2\"" },
      { name: "bigwheelgame.spinfrequencyseconds", description: "Defines how often the Gambling Wheel spins.", example: "bigwheelgame.spinfrequencyseconds \"45\"" }
    ],
    WeaponSettings: [
      { name: "baseprojectile.fullstartingmagazine", description: "Toggles a full ammunition magazine.", example: "baseprojectile.fullstartingmagazine \"1\"" },
      { name: "baseprojectile.infiniteammo", description: "Toggles infinite ammunition.", example: "baseprojectile.infiniteammo \"1\"" }
    ],
    RecyclerSettings: [
      { name: "CanUseRecycler", description: "Enable or disable interaction with recyclers.", example: "CanUseRecycler \"1\"" },
      { name: "RecyclerNextRecycleTime", description: "Sets the rate at which items are recycled.", example: "RecyclerNextRecycleTime \"5\"" },
      { name: "RecyclerStartTime", description: "Sets the warm up time for the recyclers.", example: "RecyclerStartTime \"3\"" }
    ],
    TimeSettings: [
      { name: "env.addtime", description: "Adds a specified number of hours to the current time.", example: "env.addtime \"2\"" },
      { name: "env.progresstime", description: "Enables or disables time progression on the server.", example: "env.progresstime \"1\"" },
      { name: "env.time", description: "Sets the time to the specified hour.", example: "env.time \"11\"" }
    ],
    DebugSettings: [
      { name: "debug.breakheld", description: "Breaks the current item in your hands.", example: "debug.breakheld" },
      { name: "debug.debugcamera", description: "Activates a free camera.", example: "debug.debugcamera" },
      { name: "debug.disablecondition", description: "Toggles degradation of tools and weapons.", example: "debug.disablecondition \"1\"" },
      { name: "debug.noclip", description: "Toggles NoClip mode.", example: "debug.noclip \"1\"" },
      { name: "debug.puzzlereset", description: "Resets all keycard puzzles in monuments.", example: "debug.puzzlereset" }
    ],
    EntitySettings: [
      { name: "entity.deleteby", description: "Destroys all buildings created by the target ID.", example: "entity.deleteby \"1111\"" },
      { name: "entity.deleteentity", description: "Destroys the chosen entity.", example: "entity.deleteentity \"string\" \"0/1\"" },
      { name: "entity.find_entity", description: "Prints a list of all items/animals/objects and their IDs & locations.", example: "entity.find_entity \"string\"" },
      { name: "entity.find_group", description: "Prints a list of all objects in a specified group.", example: "entity.find_group \"number\"" },
      { name: "entity.find_id", description: "Finds an object based on its ID.", example: "entity.find_id \"entity ID\"" },
      { name: "entity.find_parent", description: "Finds an object’s parent based on its ID.", example: "entity.find_parent \"entity ID\"" },
      { name: "entity.find_self", description: "Finds information about the player who entered this command.", example: "entity.find_self" },
      { name: "entity.spawn", description: "Spawns an object at the specified map co-ordinates.", example: "entity.spawn \"recycler_static\" \"1,2,3\"" },
      { name: "entity.spawnitem", description: "Spawns a dropped item at the specified map co-ordinates.", example: "entity.spawnitem \"mushroom\" \"1,2,3\"" }
    ],
    EventSettings: [
      { name: "events.activeevent", description: "Lists all events that are active on the server.", example: "events.activeevent" },
      { name: "events.cooldowntime", description: "Lists the current cooldowns for the specified event.", example: "events.cooldowntime \"event_airdrop\"" },
      { name: "events.cooldowntimemultiplier", description: "Controls the current cooldown multiplier for the specified event.", example: "events.cooldowntimemultiplier \"event_airdrop\" 0.5" },
      { name: "events.remainingtime", description: "Lists the remaining time left on a certain event.", example: "events.remainingtime \"event_airdrop\"" },
      { name: "events.stopevent", description: "Stops the specified event.", example: "events.stopevent \"event_airdrop\"" },
      { name: "events.triggerevent", description: "Starts the specified event.", example: "events.triggerevent \"event_airdrop\"" }
    ],
    MonumentRecyclers: [
      { name: "monumentspawns.enableconfig", description: "Enables the spawning of recyclers at the target monument.", example: "monumentspawns.enableconfig \"dome_recycler\"" },
      { name: "monumentspawns.disableconfig", description: "Disables the recycler spawn at the given monument.", example: "monumentspawns.disableconfig \"dome_recycler\"" },
      { name: "monumentspawns.getconfigs", description: "Returns a list of the possible configurations for recycler spawns at monuments.", example: "monumentspawns.getconfigs" },
      { name: "monumentspawns.getenabledconfigs", description: "Returns a list of the enabled configurations active on the current server.", example: "monumentspawns.getenabledconfigs" }
    ],
    MiscellaneousSettings: [
      { name: "server.combatlogclient", description: "Prints the combat log of a player.", example: "server.combatlogclient \"playerID\"" },
      { name: "server.d11oobcheck", description: "Toggles the out-of-bounds killbox underneath the map.", example: "server.d11oobcheck \"1\"" },
      { name: "server.globalchat", description: "Toggles global chat.", example: "server.globalchat \"1\"" },
      { name: "server.god", description: "Toggles god mode.", example: "server.god \"1\"" },
      { name: "servermgr.numsleepingplayers", description: "Displays the current number of sleeping players.", example: "servermgr.numsleepingplayers" },
      { name: "note.lognoterenames", description: "Toggles logging of when Notes are renamed.", example: "note.lognoterenames \"1\"" },
      { name: "vehicle.boat_corpse_seconds", description: "Defines how long destroyed boats persist.", example: "vehicle.boat_corpse_seconds \"300\"" },
      { name: "relationshipmanager.maxteamsize", description: "Defines the maximum amount of players that a team can have.", example: "relationshipmanager.maxteamsize \"8\"" },
      { name: "relationshipmanager.sleeptoggleother", description: "Sends the target player to a sleeping state.", example: "relationshipmanager.sleeptoggleother \"playerID\"" }
    ],
    InventorySettings: [
      { name: "inventory.adddefaultitem", description: "Adds an item to the set of default items that players spawn with.", example: "inventory.adddefaultitem \"mushroom\"" },
      { name: "inventory.bpunlock", description: "Unlocks a blueprint in the Tech Tree.", example: "inventory.bpunlock \"mushroom\"" },
      { name: "inventory.clearall", description: "Completely empties your inventory.", example: "inventory.clearall" },
      { name: "inventory.cleardefaultitem", description: "Clears any items that have been added to the default inventory.", example: "inventory.cleardefaultitem" },
      { name: "inventory.clearitemfromplayers", description: "Removes an item from everyone’s inventories.", example: "inventory.clearitemfromplayers \"rock\"" },
      { name: "inventory.give", description: "Gives yourself an item.", example: "inventory.give \"mushroom\" \"11\"" },
      { name: "inventory.giveall", description: "Gives everyone an item.", example: "inventory.giveall \"mushroom\" \"11\"" },
      { name: "inventory.givedrop", description: "Drops an item in front of you.", example: "inventory.givedrop \"mushroom\"" },
      { name: "inventory.giveto", description: "Gives a target player an item.", example: "inventory.giveto \"player\" \"mushroom\"" },
      { name: "inventory.removedefaultitem", description: "Removes an item from the set of default items the players spawn with.", example: "inventory.removedefaultitem \"torch\"" },
      { name: "inventory.removefromcorpses", description: "Removes an item from all corpses.", example: "inventory.removefromcorpses \"torch\"" },
      { name: "inventory.resetbp", description: "Resets everyone’s blueprint progress.", example: "inventory.resetbp" },
      { name: "inventory.unlockall", description: "Unlocks all blueprints for the player who entered the command.", example: "inventory.unlockall" }
    ],
    Modifiers: [
      { name: "modifiers.listallmodifiers", description: "Prints all items with modifiers.", example: "modifiers.listallmodifiers" },
      { name: "modifiers.listmodifiers", description: "Prints all modifiers for a specific item.", example: "modifiers.listmodifiers \"rock\"" },
      { name: "modifiers.clearallmodifiers", description: "Removes all modifiers from all items.", example: "modifiers.clearallmodifiers" },
      { name: "modifiers.clearmodifier", description: "Removes a previously applied modifier from an item.", example: "modifiers.clearmodifier rock collection" },
      { name: "modifiers.setmodifier collection", description: "Sets the relative collection rate of 'pickup-ables'.", example: "modifiers.setmodifier \"stones\" collection 2" },
      { name: "modifiers.setmodifier gather", description: "Sets the relative collection rate of 'gatherables'.", example: "modifiers.setmodifier \"wood\" gather 3" },
      { name: "modifiers.setmodifier tool", description: "Sets the relative 'gather rate' of a tool.", example: "modifiers.setmodifier \"hatchet\" tool 2" },
      { name: "modifiers.setmodifier loot", description: "Sets the relative amount of 'loot' that spawns.", example: "modifiers.setmodifier \"scrap\" loot 3" },
      { name: "modifiers.setmodifier cookspeed", description: "Sets the relative 'cooking speed' of furnace-able items.", example: "modifiers.setmodifier \"metal.ore\" cookspeed 3" },
      { name: "modifiers.setmodifier cookamount", description: "Sets the relative 'cooking yield' of a furnace-able item.", example: "modifiers.setmodifier \"metal.refined\" cookamount 3" },
      { name: "craft.furnaceusagemultiplier", description: "Controls the relative amount of Low Grade Fuel that furnaces use.", example: "craft.furnaceusagemultiplier 2" },
      { name: "craft.itemcookspeedmultiplier", description: "Controls the relative speed of Furnace cooking.", example: "craft.itemcookspeedmultiplier 2" }
    ],
    KillZones: [
      { name: "setmonumentkillzone", description: "Toggle PvP Zones around the entered monument.", example: "setmonumentkillzone \"sphere_tank\" 1" },
      { name: "clearMonumentKillzones", description: "Clears all active PvP Zones on the map.", example: "clearMonumentKillzones" },
      { name: "listMonumentKillzones", description: "Lists all active PvP Zones in the console.", example: "listMonumentKillzones" }
    ]
  };

  // Items segmentados por categoría
  const items = {
    Weapons: [
      "bone.club",
      "bow.compound",
      "bow.hunting",
      "crossbow",
      "flamethrower",
      "grenade.beancan",
      "grenade.f1",
      "grenade.flashbang",
      "grenade.molotov",
      "grenade.smoke",
      "hmlmg",
      "knife.bone",
      "knife.combat",
      "lmg.m249",
      "smg.mp5",
      "smg.thompson",
      "spear.stone",
      "spear.wooden",
      "speargun",
      "weapon.mod.extendedmags",
      "weapon.mod.flashlight",
      "weapon.mod.holosight",
      "weapon.mod.lasersight",
      "weapon.mod.muzzleboost",
      "weapon.mod.muzzlebrake",
      "weapon.mod.silencer",
      "weapon.mod.simplesight",
      "weapon.mod.small.scope",
      "rifle.l96",
      "rifle.lr300",
      "rifle.m39",
      "rifle.semiauto",
      "rocket.launcher",
      "salvaged.cleaver",
      "salvaged.sword",
      "shotgun.double",
      "shotgun.m4",
      "shotgun.pump",
      "shotgun.spas12",
      "shotgun.waterpipe",
      "smg.2",
      "smg.mp5",
      "longsword",
      "mace",
      "machete",
      "multiplegrenadelauncher",
      "paddle",
      "pistol.eoka",
      "pistol.m92",
      "pistol.nailgun",
      "pistol.prototype17",
      "pistol.python",
      "pistol.revolver",
      "pistol.semiauto",
      "rifle.ak",
      "rifle.bolt"
    ],
    Construction: [
      "barricade.concrete",
      "barricade.metal",
      "barricade.sandbags",
      "barricade.stone",
      "barricade.wood",
      "barricade.wood.cover",
      "barricade.woodwire",
      "building.planner",
      "cupboard.tool",
      "door.double.hinged.metal",
      "door.double.hinged.toptier",
      "door.double.hinged.wood",
      "door.hinged.metal",
      "door.hinged.toptier",
      "door.hinged.wood",
      "floor.grill",
      "floor.ladder.hatch",
      "floor.triangle.grill",
      "floor.triangle.ladder.hatch",
      "gates.external.high.stone",
      "gates.external.high.wood",
      "ladder.wooden.wall",
      "lock.code",
      "lock.key",
      "shutter.metal.embrasure.a",
      "shutter.metal.embrasure.b",
      "shutter.wood.a",
      "wall.external.high",
      "wall.external.high.stone",
      "wall.frame.cell",
      "wall.frame.cell.gate",
      "wall.frame.fence",
      "wall.frame.fence.gate",
      "wall.frame.garagedoor",
      "wall.frame.netting",
      "wall.frame.shopfront",
      "wall.frame.shopfront.metal",
      "wall.window.bars.metal",
      "wall.window.bars.toptier",
      "wall.window.bars.wood",
      "wall.window.glass.reinforced",
      "watchtower.wood",
      "water.catcher.large",
      "water.catcher.small"
    ],
    Items: [
      "bbq",
      "bed",
      "botabag",
      "box.repair.bench",
      "box.wooden",
      "box.wooden.large",
      "campfire",
      "chair",
      "composter",
      "dropbox",
      "fireplace.stone",
      "fishtrap.small",
      "fridge",
      "furnace",
      "furnace.large",
      "hitchtroughcombo",
      "kayak",
      "lantern",
      "locker",
      "mailbox",
      "mixingtable",
      "planter.large",
      "planter.small",
      "research.table",
      "rug",
      "rug.bear",
      "shelves",
      "sleepingbag",
      "small.oil.refinery",
      "stash.small",
      "table",
      "tunalight",
      "vending.machine",
      "water.barrel",
      "water.purifier",
      "workbench1",
      "workbench2",
      "workbench3"
    ],
    Resources: [
      "bone.fragments",
      "can.beans.empty",
      "can.tuna.empty",
      "cctv.camera",
      "charcoal",
      "cloth",
      "crude.oil",
      "diesel_barrel",
      "explosives",
      "fat.animal",
      "fertilizer",
      "gunpowder",
      "horsedung",
      "hq.metal.ore",
      "leather",
      "lowgradefuel",
      "metal.fragments",
      "metal.ore",
      "metal.refined",
      "plantfiber",
      "scrap",
      "skull.human",
      "skull.wolf",
      "stones",
      "sulfur",
      "sulfur.ore",
      "targeting.computer",
      "wood"
    ],
    Attire: [
      "attire.hide.boots",
      "attire.hide.helterneck",
      "attire.hide.pants",
      "attire.hide.poncho",
      "attire.hide.skirt",
      "attire.hide.vest",
      "barrelcostume",
      "bone.armor.suit",
      "boots.frog",
      "bucket.helmet",
      "burlap.gloves",
      "burlap.gloves.new",
      "burlap.headwrap",
      "burlap.shirt",
      "burlap.shoes",
      "burlap.trousers",
      "coffeecan.helmet",
      "cratecostume",
      "deer.skull.mask",
      "diving.fins",
      "diving.mask",
      "diving.tank",
      "diving.wetsuit",
      "hat.beenie",
      "hat.boonie",
      "hat.candle",
      "hat.cap",
      "hat.miner",
      "hat.wolf",
      "hazmatsuit",
      "heavy.plate.helmet",
      "heavy.plate.jacket",
      "heavy.plate.pants",
      "hoodie",
      "horse.armor.wood",
      "horse.armor.roadsign",
      "horse.saddle",
      "horse.saddle.double",
      "horse.saddlebag",
      "horse.shoes.advanced",
      "horse.shoes.basic",
      "jacket",
      "jacket.snow",
      "lumberjack.hoodie",
      "mask.balaclava",
      "mask.bandana",
      "metal.facemask",
      "metal.plate.torso",
      "nightvisiongoggles",
      "pants",
      "pants.shorts",
      "partyhat",
      "riot.helmet",
      "roadsign.gloves",
      "roadsign.jacket",
      "roadsign.kilt",
      "shirt.collared",
      "shirt.tanktop",
      "shoes.boots",
      "tactical.gloves",
      "tshirt",
      "tshirt.long",
      "wood.armor.helmet",
      "wood.armor.jacket",
      "wood.armor.pants"
    ],
    Tool: [
      "axe.salvaged",
      "bucket.water",
      "cakefiveyear",
      "chainsaw",
      "explosive.satchel",
      "explosive.timed",
      "fishingrod.handmade",
      "flare",
      "flashlight.held",
      "hammer",
      "hammer.salvaged",
      "hatchet",
      "icepick.salvaged",
      "jackhammer",
      "pickaxe",
      "rf.detonator",
      "rock",
      "spraycan",
      "stone.pickaxe",
      "stonehatchet",
      "supply.signal",
      "tool.binoculars",
      "torch"
    ],
    Medical: [
      "antiradpills",
      "bandage",
      "largemedkit",
      "syringe.medical"
    ],
    Food: [
      "apple",
      "bearmeat",
      "bearmeat.burned",
      "bearmeat.cooked",
      "black.raspberries",
      "blue.berry",
      "blueberries",
      "cactusflesh",
      "can.beans",
      "can.tuna",
      "chicken.burned",
      "chicken.cooked",
      "chicken.raw",
      "chocolate",
      "clone.blue.berry",
      "clone.corn",
      "clone.green.berry",
      "clone.hemp",
      "clone.potato",
      "clone.pumpkin",
      "clone.red.berry",
      "clone.white.berry",
      "clone.yellow.berry",
      "corn",
      "deermeat.burned",
      "deermeat.cooked",
      "deermeat.raw",
      "fish.anchovy",
      "fish.catfish",
      "fish.cooked",
      "fish.herring",
      "fish.minnows",
      "fish.orangeroughy",
      "fish.raw",
      "fish.salmon",
      "fish.sardine",
      "fish.smallshark",
      "fish.troutsmall",
      "fish.yellowperch",
      "granolabar",
      "green.berry",
      "grub",
      "healingtea",
      "healingtea.advanced",
      "healingtea.pure",
      "horsemeat.burned",
      "horsemeat.cooked",
      "horsemeat.raw",
      "humanmeat.burned",
      "humanmeat.cooked",
      "humanmeat.raw",
      "jar.pickle",
      "maxhealthtea",
      "maxhealthtea.advanced",
      "maxhealthtea.pure",
      "meat.boar",
      "meat.pork.burned",
      "meat.pork.cooked",
      "mushroom",
      "oretea",
      "oretea.advanced",
      "oretea.pure",
      "potato",
      "pumpkin",
      "radiationresisttea",
      "radiationresisttea.advanced",
      "radiationresisttea.pure",
      "red.berry",
      "scraptea",
      "scraptea.advanced",
      "scraptea.pure",
      "seed.blue.berry",
      "seed.corn",
      "seed.green.berry",
      "seed.hemp",
      "seed.potato",
      "seed.pumpkin",
      "seed.red.berry",
      "seed.white.berry",
      "seed.yellow.berry",
      "smallwaterbottle",
      "waterjug",
      "white.berry",
      "wolfmeat.burned",
      "wolfmeat.cooked",
      "wolfmeat.raw",
      "woodtea",
      "woodtea.advanced",
      "woodtea.pure",
      "worm",
      "yellow.berry"
    ],
    Ammunition: [
      "ammo.grenadelauncher.buckshot",
      "ammo.grenadelauncher.he",
      "ammo.grenadelauncher.smoke",
      "ammo.handmade.shell",
      "ammo.nailgun.nails",
      "ammo.pistol",
      "ammo.pistol.fire",
      "ammo.pistol.hv",
      "ammo.rifle",
      "ammo.rifle.explosive",
      "ammo.rifle.hv",
      "ammo.rifle.incendiary",
      "ammo.rocket.basic",
      "ammo.rocket.fire",
      "ammo.rocket.hv",
      "ammo.shotgun",
      "ammo.shotgun.fire",
      "ammo.shotgun.slug",
      "arrow.bone",
      "arrow.fire",
      "arrow.hv",
      "arrow.wooden",
      "speargun.spear",
      "submarine.torpedo.straight"
    ],
    Traps: [
      "flameturret",
      "guntrap",
      "spikes.floor",
      "trap.bear",
      "trap.landmine"
    ],
    Misc: [
      "door.key",
      "fun.guitar",
      "keycard_blue",
      "keycard_green",
      "keycard_red",
      "note"
    ],
    Component: [
      "fuse",
      "gears",
      "metalblade",
      "metalpipe",
      "metalspring",
      "propanetank",
      "riflebody",
      "roadsigns",
      "rope",
      "semibody",
      "sewingkit",
      "sheetmetal",
      "smgbody",
      "tarp",
      "techparts",
      "weapon.mod.burstmodule"
    ],
    Electrical: [
      "autoturret",
      "ceilinglight",
      "computerstation",
      "electric.andswitch",
      "electric.audioalarm",
      "electric.battery.rechargable.large",
      "electric.battery.rechargable.medium",
      "electric.battery.rechargable.small",
      "electric.blocker",
      "electric.button",
      "electric.counter",
      "electric.doorcontroller",
      "electric.flasherlight",
      "electric.fuelgenerator.small",
      "electric.generator.small",
      "electric.hbhfsensor",
      "electric.heater",
      "electric.igniter",
      "electric.laserdetector",
      "electric.orswitch",
      "electric.pressurepad",
      "electric.random.switch",
      "electric.rf.broadcaster",
      "electric.rf.receiver",
      "electric.sirenlight",
      "electric.solarpanel.large",
      "electric.splitter",
      "electric.sprinkler",
      "electric.switch",
      "electric.teslacoil",
      "electric.timer",
      "electric.xorswitch",
      "electrical.branch",
      "electrical.combiner",
      "electrical.memorycell",
      "elevator",
      "fluid.combiner",
      "fluid.splitter",
      "fluid.switch",
      "generator.wind.scrap",
      "hosetool",
      "powered.water.purifier",
      "rf_pager",
      "searchlight",
      "storage.monitor",
      "target.reactive",
      "waterpump",
      "wiretool"
    ]
  };

  // Función para generar el menú de comandos
  function generateMenu(commands) {
    commandsContainer.innerHTML = '';
    for (const category in commands) {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';
      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = category;
      categoryDiv.appendChild(categoryTitle);

      commands[category].forEach(command => {
        const commandDiv = document.createElement('div');
        commandDiv.className = 'command';
        commandDiv.textContent = `${command.name}: ${command.description}`;
        commandDiv.addEventListener('click', () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: (example) => {
                document.querySelector('#text-input__console-input-message').value = example;
              },
              args: [command.example]
            });
          });
        });
        categoryDiv.appendChild(commandDiv);
      });

      commandsContainer.appendChild(categoryDiv);
    }
  }

  // Función para generar el menú de ítems
  function generateItemsMenu(items) {
    const itemsContainer = document.createElement('div');
    itemsContainer.className = 'items-container';
    const itemsTitle = document.createElement('h2');
    itemsTitle.textContent = 'Items';
    itemsContainer.appendChild(itemsTitle);

    for (const category in items) {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';
      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = category;
      categoryDiv.appendChild(categoryTitle);

      items[category].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.textContent = item;
        itemDiv.addEventListener('click', () => {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              func: (item) => {
                const inputField = document.querySelector('#text-input__console-input-message');
                const start = inputField.selectionStart;
                const end = inputField.selectionEnd;
                const text = inputField.value;
                const before = text.substring(0, start);
                const after = text.substring(end, text.length);
                inputField.value = before + item + after;
                inputField.focus();
                inputField.selectionStart = inputField.selectionEnd = start + item.length;
              },
              args: [item]
            });
          });
        });
        categoryDiv.appendChild(itemDiv);
      });

      itemsContainer.appendChild(categoryDiv);
    }

    commandsContainer.appendChild(itemsContainer);
  }

  // Filtrar comandos e ítems
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const filteredCommands = {};
    const filteredItems = {};

    for (const category in commands) {
      filteredCommands[category] = commands[category].filter(command => 
        command.name.toLowerCase().includes(filter) || command.description.toLowerCase().includes(filter)
      );
    }

    for (const category in items) {
      filteredItems[category] = items[category].filter(item => 
        item.toLowerCase().includes(filter)
      );
    }

    generateMenu(filteredCommands);
    generateItemsMenu(filteredItems);
  });

  // Generar el menú inicialmente
  generateMenu(commands);
  generateItemsMenu(items);
});
