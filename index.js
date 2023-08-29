import characterData from "./data.js"
import { Character } from "./character.js"

let monstersArray = ["orc", "demon", "goblin"];
const wizard = new Character(characterData.hero) 
let monster = getNewMonster()


function getNewMonster(){
   const nextMonsterData = characterData[monstersArray.shift()]
   if (nextMonsterData){return new Character(nextMonsterData)}
   else return {}
}

function attack(){
   const pauseStatus = !wizard.dead && !monster.dead? false : true
   if (!pauseStatus){
      wizard.setDiceHtml()
      monster.setDiceHtml()
      wizard.takeDamage(monster.currentDiceScore)
      monster.takeDamage(wizard.currentDiceScore)
      render()
      if (wizard.dead){
         endgame()
      }
      else if (monster.dead){
         if(monstersArray.length > 0){
            setTimeout(() => {
               monster = getNewMonster()
               render()
            }, 1500)
         }
         else endgame()
      }
   }
}

function endgame(){
   const endMssg = monster.dead && wizard.dead? 
   "No victors - all creatures are dead"
   : monster.dead?  "The Wizard Wins"
   : "The Monsters Wins"
   const endEmoji = monster.dead && wizard.dead ? "☠️"
   : monster.dead ? "🔮": "☠️"
   setTimeout(() => {
      document.querySelector("main").innerHTML=`
      <div class="end-game">
         <h2>Game Over</h2>
         <h3>${endMssg}<h3>
         <p class="end-emoji">${endEmoji}</p>
      </div>` 
   document.getElementById("actions").innerHTML=""
   }, 1500);
}

function render(){
   document.getElementById("hero").innerHTML = wizard.getCharacterHtml()
   document.getElementById("monster").innerHTML = monster.getCharacterHtml()
}

document.getElementById("attack-button").addEventListener("click", attack)
render()
