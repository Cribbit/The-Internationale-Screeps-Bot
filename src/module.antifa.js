let allyList = require("module.allyList")
let creepFunctions = require("module.creepFunctions")

module.exports = {
    run: function() {

        let antifaAssaulters = _.filter(Game.creeps, (c) => c.memory.role == 'antifaAssaulter');
        let antifaSupporters = _.filter(Game.creeps, (c) => c.memory.role == 'antifaSupporter');

        for (let assaulter of antifaAssaulters) {


        }
        for (let supporter of antifaSupporters) {


        }

        function findCreepWithoutTask(creep, collection) {

            for (let assaulter of collection) {

                if (assaulter.roomFrom == creep.room.name) {

                    if (!assaulter.memory.task) {

                        return assaulter
                    }
                }
            }
            return false
        }


    }
}


/*

let allyList = require("module.allyList")
let creepFunctions = require("module.creepFunctions")

module.exports = {
    run: function(creep) {
        if (creep.memory.role == "antifaSupporter" || creep.memory.role == "antifaAssaulter") {

            var antifaRally = true

        }
        if (antifaRally == true) {

            let antifaAssaulter = _.filter(Game.creeps, (c) => c.memory.role == 'antifaAssaulter');
            let antifaSupporter = _.filter(Game.creeps, (c) => c.memory.role == 'antifaSupporter');

            for (let i = 0; i < antifaSupporter.length; i++) {

                let leader = antifaAssaulter[i]
                let member = antifaSupporter[i]

                if (leader && member) {

                    let leaderIsEdge = (leader.pos.x <= 0 || leader.pos.x >= 48 || leader.pos.y <= 0 || leader.pos.y >= 48)
                    let memberIsEdge = (member.pos.x <= 0 || member.pos.x >= 49 || member.pos.y <= 0 || member.pos.y >= 49)

                    const target = leader.memory.target = Memory.global.attackTarget

                    if (leader.room.name == leader.memory.roomFrom && leader.pos.getRangeTo(leader.pos.findClosestByRange(FIND_MY_SPAWNS)) < 8) {

                        if (leader.room.name == leader.memory.roomFrom) {

                            let goal = _.map([leader.pos.findClosestByRange(FIND_MY_SPAWNS)], function(target) {
                                return { pos: target.pos, range: 8 }
                            })

                            leader.creepFlee(leader.pos, goal)
                        }
                    } else if (leader.pos.isNearTo(member) || leaderIsEdge || memberIsEdge) {

                        member.say("F")

                        member.moveTo(leader)

                        let squadTarget

                        if (leader.room.name == target) {

                            let injuredCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                filter: (c) => {
                                    return (allyList.run().indexOf(c.owner.username.toLowerCase()) >= 0)
                                }
                            })

                            if (injuredCreep && creep.moveTo(injuredCreep) != ERR_NO_PATH) {

                                member.say("IC")

                                if (creep.pos.inRangeTo(injuredCreep, 1)) {

                                    creep.heal(injuredCreep)
                                } else if (creep.pos.inRangeTo(injuredCreep, 3)) {

                                    creep.rangedHeal(injuredCreep)
                                }
                            } else {

                                member.heal(leader)
                            }

                            let hostile = leader.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                                filter: (c) => {
                                    return (allyList.run().indexOf(c.owner.username.toLowerCase()) === -1)
                                }
                            })

                            let hostileIsEdge = (hostile.pos.x <= 0 || hostile.pos.x >= 48 || hostile.pos.y <= 0 || hostile.pos.y >= 48)

                            if (hostile && !hostileIsEdge) {

                                leader.say("H")

                                if (leader.pos.inRangeTo(hostile, 3)) {

                                    leader.rangedAttack(hostile)
                                } else if (leader.pos.inRangeTo(hostile, 2)) {

                                    leader.rangedAttack(hostile)

                                    let goal = _.map([hostile], function(target) {
                                        return { pos: target.pos, range: 3 }
                                    })

                                    leader.creepFlee(leader.pos, goal)

                                } else if (leader.pos.inRangeTo(hostile, 1)) {

                                    leader.rangedMassAttack(hostile)

                                    let goal = _.map([hostile], function(target) {
                                        return { pos: target.pos, range: 3 }
                                    })

                                    leader.creepFlee(leader.pos, goal)
                                } else {

                                    let goal = _.map([hostile], function(target) {
                                        return { pos: target.pos, range: 1 }
                                    })

                                    leader.intraRoomPathing(leader.pos, goal)
                                }


                            } else {

                                let enemySpawn = leader.pos.findClosestByRange(FIND_HOSTILE_SPAWNS, {
                                    filter: (c) => c.owner.username !== "cplive" && c.owner.username !== "Brun1L" && c.owner.username !== "mrmartinstreet" && c.owner.username !== "Source Keeper"
                                })

                                if (enemySpawn && leader.moveTo(enemySpawn) != ERR_NO_PATH) {

                                    leader.say("Enemy Spawn")

                                    if (leader.pos.inRangeTo(enemySpawn, 2)) {

                                        leader.rangedAttack(enemySpawn)
                                    } else {

                                        leader.rangedAttack(enemySpawn)
                                    }

                                    if (leader.pos.inRangeTo(enemySpawn, 1)) {

                                        leader.rangedMassAttack(enemySpawn)
                                    } else {

                                        leader.rangedAttack(enemySpawn)
                                        leader.moveTo(enemySpawn, { visualizePathStyle: { stroke: '#ffffff' } })
                                    }
                                } else {

                                    let enemyStructure = leader.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                                        filter: (c) => c.owner.username !== "cplive" && c.owner.username !== "Brun1L" && c.owner.username !== "mrmartinstreet" && c.owner.username !== "Source Keeper" && c.structureType != STRUCTURE_CONTROLLER
                                    })

                                    if (enemyStructure && leader.moveTo(enemySpawn) != ERR_NO_PATH) {

                                        leader.say("Enemy Structure")

                                        if (leader.pos.inRangeTo(enemyStructure, 2)) {

                                            leader.rangedAttack(enemyStructure)
                                        } else {

                                            leader.rangedAttack(enemyStructure)
                                        }

                                        if (leader.pos.inRangeTo(enemyStructure, 1)) {

                                            leader.rangedMassAttack(enemyStructure)
                                        } else {

                                            leader.rangedAttack(enemyStructure)
                                            leader.moveTo(enemyStructure, { visualizePathStyle: { stroke: '#ffffff' } })
                                        }
                                    } else {

                                        let enemyBarricade = leader.pos.findClosestByPath(FIND_STRUCTURES, {
                                            filter: s => s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART
                                        })

                                        if (enemyBarricade) {

                                            let mainTarget = Game.getObjectById(leader.room.memory.mainTarget)

                                            leader.say("MT: " + mainTarget.pos.x + ", " + mainTarget.pos.y)

                                            if (!mainTarget) {

                                                leader.room.memory.mainTarget = enemyBarricade.id
                                            } else {

                                                leader.room.visual.circle(mainTarget.pos, {
                                                    fill: 'transparent',
                                                    radius: 0.8,
                                                    stroke: '#39A0ED',
                                                    strokeWidth: 0.125
                                                });

                                                if (leader.pos.inRangeTo(mainTarget, 2)) {

                                                    creep.rangedAttack(mainTarget)
                                                } else {

                                                    creep.rangedAttack(mainTarget)
                                                    leader.moveTo(mainTarget)
                                                }
                                            }
                                        } else {

                                            if (creep.room.controller) {

                                                let goal = _.map([leader.room.controller], function(target) {
                                                    return { pos: target.pos, range: 3 }
                                                })

                                                //leader.intraRoomPathing(leader.pos, goal)
                                            }
                                        }
                                    }
                                }
                            }
                        } else {

                            leader.say("AT")

                            goal = _.map([new RoomPosition(25, 25, target)], function(pos) {
                                return { pos: pos, range: 3 }
                            })

                            leader.onlySafeRoomPathing(leader.pos, goal)
                        }
                    } else {

                        leader.say("No M")

                        member.say("No L")

                        goal = _.map([leader], function(target) {
                            return { pos: target.pos, range: 1 }
                        })

                        member.onlySafeRoomPathing(member.pos, goal)

                    }
                }
            }
        }
    }
};
*/