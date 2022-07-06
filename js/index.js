document.addEventListener('DOMContentLoaded', () => {
  const monsterContainer = document.querySelector('#monster-container')
  fetchMonsters()
  // Function definitions
  function fetchMonsters() {
    fetch('http://localhost:3000/monsters')
    .then(res => res.json())
    .then(monsters => renderMonsters(monsters.splice(0, 50)))
  }

  function renderMonsters(monsterArray) {
    monsterArray.forEach(monster => createMonsterCard(monster))
  }

  function createMonsterCard(monster) {
    const card = document.createElement('div')
    const name = document.createElement('h2')
    const age = document.createElement('p')
    const description = document.createElement('p')

    card.className = 'monster-card'
    name.textContent = monster.name
    name.className = 'name'
    age.textContent = `${Math.floor(monster.age)} years old`
    age.className = 'age'
    description.textContent = monster.description
    description.className = 'description'

    card.append(name, age, description)
    monsterContainer.append(card)
  }

})