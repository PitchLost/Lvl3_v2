//! The following will need to be changed to constant variables:

let users_storage; //TODO: Add the logic for this
let users_account; // TODO: Check browser storage or database for user account
let session_length = 0

const loadingScreen = document.getElementById('LoadingScreen')


document.addEventListener('DOMContentLoaded', _ => { 
console.log('core.js executing')

setTimeout(_ => { 
loadingScreen.style.display = 'none'
},300)

const time_of_load = new Date() 
console.log('Session start time =',time_of_load)



// setInterval(_ => { 
//     session_length = new Date(); // Make the session length a new 
//     session_length = session_length - time_of_load
//     console.log('The session has been going for:', session_length)
// }, 5000)

// })
})

