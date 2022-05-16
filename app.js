function getRandomValue(max, min) {
    return Math.floor(Math.random() * (max- min))+min
}

const app = Vue.createApp({

    data() {
        return {
            showControls: true,
            playerHealth: 100,
            monsterHealth: 100,
            itemsHeal: 3,
            specialAttackPoints: 0,
            winner: null,
            logMessage: []
        }
    },

    watch: {
            playerHealth(value){
                if(value <= 0 && this.monsterHealth <= 0) {
                    //draw
                    this.showControls = false
                    return this.winner = "draw"
                }
                if(value <= 0){
                    //lost
                    this.showControls = false
                    return this.winner = "lost"
                }
                if(value > 0 && this.monsterHealth <= 0)
                //win
                return (this.winner = "win", this.showControls = false)
            }
    },

    methods: {
        attackMonster(){
            const attackValue = getRandomValue(15,5)
            this.monsterHealth -= attackValue;
            this.addLogMessage('Player', 'Attack', attackValue)
            this.attackPlayer()
            this.specialAttackPoints += getRandomValue(25,10)
        },

        attackPlayer(){
            const attackMonsterValue = getRandomValue(18,8)
            this.playerHealth -= attackMonsterValue;
            this.addLogMessage('Monster', 'Attack', attackMonsterValue)
        },

        specialAttack(){
            const attackValue = getRandomValue(25,10)
            this.monsterHealth -= attackValue;
            this.addLogMessage('Player', 'Special Attack', attackValue)
            this.attackPlayer()
            this.specialAttackPoints = 0
        },

        healPlayer(){
            if(this.itemsHeal>0){
                const healValue = getRandomValue(20,10)

                if(this.playerHealth >= 100) {
                    return this.playerHealth = 100
                }

                if(this.playerHealth + healValue >= 100) {
                    return (this.playerHealth = 100, this.itemsHeal--, this.addLogMessage('Player', 'heal', healValue))
                }

                this.playerHealth += healValue
                this.addLogMessage('Player', 'heal', healValue)
                this.itemsHeal--
            }
        },

        surrender(){
            this.playerHealth = 0
            this.addLogMessage('Player', 'Surrender', playerHealth)
        },

        newGame(){
            this.playerHealth = 100
            this.monsterHealth = 100
            this.itemsHeal = 3
            this.specialAttackPoints = 0
            this.showControls = true
            this.winner = null
            this.logMessage = []
        },

        addLogMessage(who, what, value){
            this.logMessage.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }
    },
    computed: {
        monsterBarStyle(){
            if(this.monsterHealth < 0) {
                return { width: `0%` }
            }
            if(this.monsterHealth < 50){
                return { width: `${this.monsterHealth}%`, 'background-color': '#e8833b' }
            }
            return { width: `${this.monsterHealth}%`}

        },

        playerBarStyle(){
            if(this.playerHealth < 0) {
                return { width: `0%` }
            }
            if(this.playerHealth < 50){
                return { width: `${this.playerHealth}%`, 'background-color': '#e8833b' }
            }
            return { width: `${this.playerHealth}%` }
        },

        healActive(){
            return this.itemsHeal <= 0
        },

        specialAttackActivate(){
            return this.specialAttackPoints <= 55
        },
    }

})

app.mount('#game')