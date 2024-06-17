
const loadingScreen = document.getElementById('LoadingScreen')


document.addEventListener('DOMContentLoaded', _ => { 
console.log('core.js executing')

setTimeout(_ => { 
loadingScreen.style.display = 'none'
},300)
})

