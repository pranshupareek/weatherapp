console.log('JS file loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const  location = search.value

    messageOne.textContent = 'Loading....'
    messageTwo.textContent = ''

    const url = '/weather?address='+ encodeURIComponent(location)
    fetch(url).then((response) => {
        response.json().then(({error,location,forecast}) => {
            if (error){
                messageOne.textContent = error , messageTwo.textContent = ''
            } else{
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }

        })
    })
})