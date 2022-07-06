document.addEventListener('DOMContentLoaded', () => {
  const monsterContainer = document.querySelector('#monster-container')
  const form = document.querySelector('#new-monster-form')
  const backButton = document.querySelector('#back')
  const nextButton = document.querySelector('#forward')
  let numOfMonsterCards = 0;
  let currentPage = 1
  
  getMonsters()
  .then(monsters => renderMonsters(monsters, currentPage))

  // Next is page iteration. Shows 50 per page.
  // Alter renderMonsters to take a page parameter as well.
  // Add page value in between buttons and possibly to buttons themselves.
  // Read this page value to pass into button event listener.

  nextButton.addEventListener('click', (e) => {
    monsterContainer.innerHTML = ''
    currentPage += 1

    getMonsters()
    .then(monsters => renderMonsters(monsters, currentPage))
  })

  backButton.addEventListener('click', (e) => {
    if(currentPage > 1) {
      monsterContainer.innerHTML = ''
      currentPage -= 1

      getMonsters()
      .then(monsters => renderMonsters(monsters, currentPage))
    }
  })

  // Function definitions
  function getMonsters() {
    return fetch('http://localhost:3000/monsters')
    .then(res => res.json())
  }

  function renderMonsters(monsterArray, page) {
    const start = page == 1 ? 0 : ((page - 1) * 50)
    monsterArray.splice(start, 50).forEach(monster => createMonsterCard(monster))
  }

  function createMonsterCard(monster) {
    const card = document.createElement('div')
    const name = document.createElement('h2')
    const age = document.createElement('p')
    const description = document.createElement('p')

    numOfMonsterCards += 1

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