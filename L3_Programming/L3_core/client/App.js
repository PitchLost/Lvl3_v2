setTimeout(_ => {

const app = Vue.createApp({
    data() {
        return {

        //* General Data:
          // Check for admin/developer mode
          devMode: false, // False by defualt
          adminMode: false, // False by default

        //* Add New Item data:
            // New Item Add objects: 
            newItems: [ // This does something
                {newName: 'Test Item', newPrice: 10, newSrc: 'imgurlink.com'},
            ],
            newItem: { // Used in the add_item process
                newName: '',
                newPrice: '',
                newImage: ''
            }, 

            //* Database Items:
            shopItems: db_items, // array for the flex display

            //* Dropdown menu data:

            // Get the database items: 
            dropdownItems: db_items, // db_items is like this because its supposed to look different from the client variables

            dropdownOpen: false, 


            //* Compact Mode Data: 

            
            compactOpen: false, // is compact mode open?


            //* Cart Data: 

            
            cartOpen: false, // is cart open?

            cartTotal: 0, // Running total of the cart

          
            cartItems: [], // Main cart array (all new items pushed into here)

            // Item being added to the cart
            CartClass: { 
                cartName: '', // Name of the item
                cartQty: 1, // qty of item
                cartPrice: 0 // original price of item
            }, 
            cartCounter: 0, // track how many items are in cart

            //* Checkout Data: 

            checkoutOpen: false,  // is checkout open?

            PaymentInfo: { 
                CardNum: '',  // card number
                CardName: '', // card name
                CardCvc: '', // card cvc
                CardExpiry: '' // expiry date of card
            }, 
         
        

        };
    },
    methods: { // Methods are the vue.js functions

        // On page load function:
        vue_onload() { 
            console.log('vue onload function') // log the script
            console.log('Shop items:',this.shopItems, 'db_items', this.db_items)
            this.dropdownItems = this.dropdownItems.sort((a,b) => a.ITEM_NAME.localeCompare(b.ITEM_NAME)) // Sort all of the items alphabetically
          
            
        },

        //* Dev mode functions:
       
        addNew(name, price, img_src) { // add new items to database/DOM
            console.log(name, price, img_src) // Log
            newItem = { // Set the values of newItem to the newly obtained data
                newName: name, 
                newPrice: price, 
                newImage: img_src
            }
            console.log(newItem) // Log
            this.newItems.push(newItem) // add to newItems array
            db_add(newItem) // Add the new items to the database using the nodeReq function
        }, 

        // Toggle the developer mode
        toggleDevMode() { 
            this.devMode = !this.devMode // Toggle
            console.log('Dev Mode:', this.devMode) // Log
        }, 

        


        //* Compact Mode Functions: 
        toggleCompact() { 
            let time = new Date()
            console.log('Compact mode opened', time)
            this.compactOpen = !this.compactOpen
        },
        toggleDropdown() { 
            let time = new Date()
            console.log('Dropdown opened',time)
            this.dropdownOpen = !this.dropdownOpen
        },


        //* Cart Functions: 
        cartAdd(name, price) { 

            if (this.cartCounter > 4) {  
                alert('The cart is full')
                return
            } else { 
                console.log('Amount of items in cart =',this.cartCounter)


            // Edit the cartClass and prepare it for the push into the array
            this.CartClass = { 
                cartName: name, // Name
                cartQty: 1, // qty of item
                cartPrice: price * this.CartClass.cartQty, // Doing this supports having qty of item
                cart_newPrice: price * this.CartClass.cartQty // reset the price otherwise it will wig out if we try to increase the qty in the future
            } 
            // Alert the user about their item. In a larger project we would make our own message box instead of this
            console.log(this.CartClass.cartPrice)
            alert('You haved added 1x' + ' ' + this.CartClass.cartName + ' ' + 'priced at' + ' ' + '$' + this.CartClass.cartPrice + ' ' + 'to your cart')
            this.cartCounter++; // Increment the item counter 

            // Add the item to the cart items array: 
            this.cartItems.push(this.CartClass) // Push the new item into the main cart array
    
            // Increment the cart Price: 
            this.cartTotal += price
            
            
        }
        }, 
        removeFromCart(cart_item) { 
            let index = this.cartItems.indexOf(cart_item); // this index points to the item we want to remove
            this.cartItems.splice(index, 1); // Remove 1 item starting from index
            this.cartTotal -= cart_item.cartPrice; // Subtract removed item's price from total
            console.log('Removed the following item from cart:', cart_item); //* Log
        },
        

        updateQty(cart_item) { 
            console.log('Cart price =',cart_item.cartPrice)
            cart_item.cart_newPrice = cart_item.cartPrice * cart_item.cartQty // Multiply the item price with the qty

            if (cart_item.cartQty == 0 ) { // Check if the item qty is 0 If so then remove from cart
                this.removeFromCart(cart_item) // Call the remove from cart function passing the element we want to remove with the function
                console.log('Passing',cart_item, 'To the remove array')
                return 
            }
            this.cartTotal = this.cartItems.reduce((total, item) => total + item.cart_newPrice, 0);
            console.log('The updated price = ', this.CartClass.cartPrice, this.CartClass.cart_newPrice, this.CartClass.cartQty) //* Log
        },
        // Toggle visibillity of the cart window
        toggleCart() { 
            let time = new Date() //** purely for logging purposes
            this.cartOpen = !this.cartOpen // toggle the cartOpen var. If its false than vue will not show the cart
            console.log('Toggle cart', this.cartOpen, time) // Log
            
        },
        

        //* Checkout Functions: 


        toggleCheckout() { 
            let time = new Date() // Logging Purposes
            console.log('Opening Checkout', time) // Log the time of the checkout open
            this.checkoutOpen = !this.checkoutOpen // Toggle the checkout variable
        },
        
        confirmCheckout() { 
            /* 
            Normally here we would make a server request for the checkout and then verify on the server side instead 
            of directly in the client. BUT we do not have a database setup for this and it would be quite complex to 
            implement the logic for this. So we will just use these examples below to verify the data submitted.
            */

            let time = new Date() // Logging Purpose
            console.log('Checkout Submitted', this.PaymentInfo, 'Items Checked Out:',this.cartItems, time ) // Log the checkout
            // Check if the data entered in the checkout is correct: 
            if (this.PaymentInfo.CardNum.length == 19) { // If the card number is to long/short
                console.log('Card number correct')
        }   
            if (this.PaymentInfo.CardCvc.length == 3) {  // If the cvc is to long/short
                console.log('CVC good!')
            }
            else { 
                alert('One of the inputs is wrong!')
                return
            }
            alert('The order has been placed! Click and collect from wherever')
    }, 

    //* On mount functions: 

    mounted() { 
        this.vue_onload()
    }
}});


//* Mount ^ to #app div
app.mount('#app');


},100)


