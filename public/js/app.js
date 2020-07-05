console.log('Client side js file us loaded!')

const weatherForm = document.querySelector('form')     
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')   // # zbog ID value u index.hbs
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=> {  // how to run the code when someone submit the form -> fetching the weather and getting render corectly
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + search.value).then((response)=> {    // fetch data from url and then run the function
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = (data.location)
            messageTwo.textContent = (data.forecast)
        }
        
    })
})
    
})  
