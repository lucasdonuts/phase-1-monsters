document.addEventListener('DOMContentLoaded', () => {
  const monsterContainer = document.querySelector('#monster-container')
  const form = document.querySelector('#new-monster-form')
  
  getMonsters()
  .then(monsters => renderMonsters(monsters))

  // Function definitions
  function getMonsters() {
    return fetch('http://localhost:3000/monsters')
    .then(res => res.json())
  }

  function renderMonsters(monsterArray) {
    monsterArray.splice(0, 50).forEach(monster => createMonsterCard(monster))
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
    monsterContainer.prepend(card)
  }

  function postMonster(monsterObj) {
    return fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(monsterObj)
    })
    .then(res => res.json())
    .then(monster => addNewMonster(monster))
  }

  function addNewMonster(monsterObj) {
    createMonsterCard(monsterObj)
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const monster = {
      name: e.target.name.value,
      age: e.target.age.value,
      description: e.target.description.value
    }

    postMonster(monster)

  })

})