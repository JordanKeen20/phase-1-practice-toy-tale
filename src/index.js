let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// declarations

const toyContainer = document.getElementById('toy-collection')
const toysUrl = 'http://localhost:3000/toys'
// Step 1 make a Get request

fetch(toysUrl)
  .then(respObj => respObj.json())
  .then(newToys =>{

 // Step 2 create a DIV for each Toy

      newToys.forEach( toyObj => {
        brandNewToy(toyObj) 
      })
  })

    // step 3 add a new toy

function brandNewToy(newtoyObj){
  const div = document.createElement('div')
  div.className = 'card'

  const name = document.createElement('h2')
  name.textContent = newtoyObj.name

  const img = document.createElement('img')
  img.src = newtoyObj.image
  img.className = 'toy-avatar'

  const likes = document.createElement('p')
  likes.textContent = `${newtoyObj.likes} likes`

  const button = document.createElement('button')
  button.textContent = 'like ❤️'
  button.className = 'like-btn'
  button.Id = newtoyObj.id
  button.addEventListener('click', () => 
    addbutton(likes, newtoyObj))
  
  div.append(name, img, likes, button)
  toyContainer.append(div)
}

function addbutton(elementChange, thatToyObj){
  const oldLikesNumber = parseInt(elementChange.textContent.split(' ')[0])
  const newLikesNumber = oldLikesNumber + 1
  const toyId = thatToyObj.id
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'content-Type':'application/json'},
    body: JSON.stringify({
      likes : newLikesNumber
    })
  })
    .then(resp => resp.json())
    .then(updatedToy =>{
      console.log(updatedToy)
      const theString = elementChange.textContent
      const splitArray = theString.split(' ')
      splitArray[0] = updatedToy.likes
      elementChange.textContent = splitArray.join(' ')
    })
}

const newToyForm = document.querySelector('form');

newToyForm.addEventListener('submit', (eventObj) =>{
  eventObj.preventDefault()
  // get info for the event

 const newToyObj = {
  name : eventObj.target.name.value,
  image :eventObj.target.image.value,
  likes : 0 
 }
 // use our brandNewToy function
 fetch(toysUrl, {
  method: 'POST',
  headers: {
    'content-Type':'application/json'},
  body:JSON.stringify(newToyObj)
  })
    .then(respObj => respObj.json())
    .then (afreshNewToyObj => {
      brandNewToy(afreshNewToyObj)
    })
  })


  // I watched the log way around this code! 
  // It was intresting.