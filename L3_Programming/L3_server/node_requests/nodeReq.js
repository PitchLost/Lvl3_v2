let db_items = [] 
let done_loading = false
document.addEventListener('DOMContentLoaded', loaded => { 
    console.log('Server Functions executing')
    getDataOnLoad()

async function getDataOnLoad() { 
    console.log('Getting data from database')
    const response = await fetch('http://localhost:3300/getShopItems', { 
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
    },)
    if (response.ok) { 
        console.log('Data recieved from server succesfully stand by for server conf')
    }
    if (!response.ok) { 
        console.error('Internal server error Check your network and try again')
    } else { 
        console.log('Hmmm somethings wrong')
    }
    db_items = await response.json()
    console.log('Data from database:',db_items)
    done_loading = true
}})




async function db_add(new_item) { 
    console.log(new_item)
    const response = await fetch('http://localhost:3300/add_shop_data', { 
        method: 'POST',
        body: JSON.stringify(new_item),
        headers: { 
            'Content-Type': 'application/json'
        }
    }) 
    if (response.ok) { 
        console.log('Add Data went well!')
    } else if (!response.ok) { 
        console.error('Internal Server error')
    }
}