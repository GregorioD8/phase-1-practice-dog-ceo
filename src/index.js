

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = "https://dog.ceo/api/breeds/list/all"

const dropDown = document.getElementById('breed-dropdown')
const emptySlot = document.createElement('option')
let breedContainer = document.getElementById('dog-breeds')
emptySlot.setAttribute("value", " ")
emptySlot.setAttribute("selected", true)
dropDown.insertBefore(emptySlot, dropDown.firstChild)
dropDown.addEventListener('change', handleChange)
breedContainer.addEventListener('click', handleClick)


let breedsObj = {}
let allBreeds = []

function initialize() {
    getAllDogs()
    getAllBreeds()

}
initialize()


function renderOneDog(dog) {

    const myImage = new Image(200, 200)
    myImage.src = `${dog}`
    let card = myImage
    document.getElementById('dog-image-container').appendChild(card)

}


function getAllDogs() {

    fetch(imgUrl)
        .then(res => res.json())
        .then(function (data) {
            dogData = data['message']
            dogData.forEach(dog => renderOneDog(dog))
        })
}

//gets all breeds and sub-breeds 
function getAllBreeds() {

    fetch(breedUrl)
        .then(res => res.json())
        .then(breeds => {
            breedsObj = breeds.message

            Object.entries(breedsObj).forEach(([key, value]) => {

                if (value.length === 0) {
                    allBreeds.push(key)
                } else {
                    value.forEach((value) => {
                        allBreeds.push(`${value} ${key}`)
                    })
                }
            })
            renderBreed(allBreeds)
        })
}

//replaces the selected breeds on the DOM
function renderBreed(breedArray) {

    let bArr = []
    breedArray.forEach((el) => {
        let bCard = document.createElement('li')
        bCard.className = 'card'
        bCard.innerText = `${el}`
        bArr.push(bCard)
    })
    breedContainer.replaceChildren(...bArr)
}

//filters the breeds from the selected dropdown option
function handleChange(event) {

    if (event.target.value === " ") {
        renderBreed(allBreeds)
    } else {
        const letter = event.target.value
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(letter))
        renderBreed(filteredBreeds)
    }
}


function handleClick(event) {

    if (event.target.nodeName === 'LI') {
        if (event.target.style.color === 'fireBrick') {
            event.target.style.color = 'black'
        } else {
            event.target.style.color = 'fireBrick'
        }
    }
}
