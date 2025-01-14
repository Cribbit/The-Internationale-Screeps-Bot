function rampartUpgraderManager(room, creepsWithRole) {

    const anchorPoint = room.memory.anchorPoint

    if (!anchorPoint) return

    let ramparts = room.get("myRamparts")

    for (let creep of creepsWithRole) {

        creep.isFull()
        const isFull = creep.memory.isFull

        if (isFull) {

            if (creep.memory.quota) creep.say(creep.memory.quota.toFixed(0) / 1000 + "k")

            if (creep.findRampartToRepair(ramparts)) creep.repairRamparts(creep.target)

        } else {

            let terminal = room.get("terminal")

            if (terminal && terminal.store[RESOURCE_ENERGY] >= 80000) {

                creep.say("T")

                creep.advancedWithdraw(terminal)

            } else {

                let storage = room.get("storage")

                if (storage) {
                    if (storage.store[RESOURCE_ENERGY] >= 30000) {

                        creep.say("S")

                        creep.advancedWithdraw(storage)

                    }
                } else {

                    let container = creep.searchSourceContainers()

                    if (container) {

                        creep.say("SC")

                        creep.advancedWithdraw(container)

                    } else {

                        let droppedEnergy = creep.findDroppedEnergyOfAmount(creep.store.getFreeCapacity())

                        if (droppedEnergy) {

                            creep.say("💡")

                            creep.pickupDroppedEnergy(droppedEnergy)
                        }
                    }
                }
            }
        }
    }
}

module.exports = rampartUpgraderManager