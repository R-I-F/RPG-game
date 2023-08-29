export { Character }
import { getDiceRollArray, getDicePlaceholderHtml, getPercentage } from "./utils.js"


class Character{
    constructor(data){
        Object.assign(this, data)
        this.maxHealth = this.health
        this.dead = false
        this.diceHtml = getDicePlaceholderHtml(this.diceCount)
    } 
    setDiceHtml(){
        this.currentDiceScore = getDiceRollArray(this.diceCount)
        this.diceHtml = this.currentDiceScore.map((num)=>
            `<div class="dice">${num}</div>`).join("")
    }
    getHealthBarHtml(){
        const percent = getPercentage(this.health,this.maxHealth)
        return `<div class="health-bar-outer">
                    <div class="health-bar-inner ${percent<=25? "danger": null}" 
                        style="width:${percent}%;">
                    </div>
                </div>` 
    }
    takeDamage(attackScoreArray){
       const totalAttackScore = attackScoreArray.reduce((total, num)=> total + num)
        this.health -= totalAttackScore
        if (this.health<=0){
            this.health = 0
            this.dead = true
        }
    }
    getCharacterHtml(){
        const {name, avatar, health, diceCount, diceHtml} = this
        const healthBar = this.getHealthBarHtml()
        return  `<div class="character-card">
                    <h4 class="name"> ${name} </h4>
                    <img class="avatar" src=${avatar}>
                    <p class="health">health: <b> ${health} </b></p>
                    ${healthBar}
                    <div class="dice-container">
                        ${diceHtml}
                    </div>
                </div>`
    }
 }