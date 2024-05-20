setTimeout(_ => {

const app = Vue.createApp({
    data() {
        return {

        //* General Data:
          // Check for admin/developer mode
          developer_mode: false, // False by defualt
          admin_mode: false, // False by default

        //* Add New Item data:
            // New Item Add objects: 
            new_items: [ // This does something
                {new_name: 'Test Item', new_price: 10, new_src: 'imgurlink.com'},
            ],
            new_item: { // Used in the add_item process
                new_name: '',
                new_price: '',
                new_img: ''
            }, 

            //* Database Items:
            shop_items: db_items, // array for the flex display

            //* Dropdown menu data:

            // Get the database items: 
            dropdownItems: db_items,

            dropdownOpen: false, 


            //* Compact Mode Data: 

            
            compactOpen: false, // is compact mode open?


            //* Cart Data: 

            
            cart_open: false, // is cart open?

            cart_total: 0, // Running total of the cart

          
            cart_items: [], // Main cart array (all new items pushed into here)

            // Item being added to the cart
            CartClass: { 
                cart_name: '', // Name of the item
                cart_qty: 1, // qty of item
                cart_price: 0 // original price of item
            }, 
            item_counter: 0, // track how many items are in cart

            //* Checkout Data: 

            checkout_open: false,  // is checkout open?

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
            console.log('Shop items:',this.shop_items, 'db_items', this.db_items)
            this.dropdownItems = this.dropdownItems.sort((a,b) => a.ITEM_NAME.localeCompare(b.ITEM_NAME)) // Sort all of the items alphabetically
          
            
        },

        //* Dev mode functions:
       
        add_new(name, price, img_src) { // add new items to database/DOM
            console.log(name, price, img_src) // Log
            new_item = { // Set the values of new_item to the newly obtained data
                new_name: name, 
                new_price: price, 
                new_img: img_src
            }
            console.log(new_item) // Log
            this.new_items.push(new_item) // add to new_items array
            db_add(new_item) // Add the new items to the database using the nodeReq function
        }, 

        // Toggle the developer mode
        toggleDevMode() { 
            this.developer_mode = !this.developer_mode // Toggle
            console.log('Dev Mode:', this.developer_mode) // Log
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
        cart_add(name, price) { 

            if (this.item_counter > 4) {  
                alert('The cart is full')
                return
            } else { 
                console.log('Amount of items in cart =',this.item_counter)


            // Edit the cartClass and prepare it for the push into the array
            this.CartClass = { 
                cart_name: name, // Name
                cart_qty: 1, // qty of item
                cart_price: price * this.CartClass.cart_qty, // Doing this supports having qty of item
                cart_new_price: price * this.CartClass.cart_qty // reset the price otherwise it will wig out if we try to increase the qty in the future
            } 
            // Alert the user about their item. In a larger project we would make our own message box instead of this
            console.log(this.CartClass.cart_price)
            alert('You haved added 1x' + ' ' + this.CartClass.cart_name + ' ' + 'priced at' + ' ' + '$' + this.CartClass.cart_price + ' ' + 'to your cart')
            this.item_counter++; // Increment the item counter 

            // Add the item to the cart items array: 
            this.cart_items.push(this.CartClass) // Push the new item into the main cart array
    
            // Increment the cart Price: 
            this.cart_total += price
            
            
        }
        }, 
        removeFromCart(cart_item) { 
            let index = this.cart_items.indexOf(cart_item); // this index points to the item we want to remove
            this.cart_items.splice(index, 1); // Remove 1 item starting from index
            this.cart_total -= cart_item.cart_price; // Subtract removed item's price from total
            console.log('Removed the following item from cart:', cart_item); //* Log
        },
        

        updateQty(cart_item) { 
            console.log('Cart price =',cart_item.cart_price)
            cart_item.cart_new_price = cart_item.cart_price * cart_item.cart_qty // Multiply the item price with the qty

            if (cart_item.cart_qty == 0 ) { // Check if the item qty is 0 If so then remove from cart
                this.removeFromCart(cart_item) // Call the remove from cart function passing the element we want to remove with the function
                console.log('Passing',cart_item, 'To the remove array')
                return 
            }
            this.cart_total = this.cart_items.reduce((total, item) => total + item.cart_new_price, 0);
            console.log('The updated price = ', this.CartClass.cart_price, this.CartClass.cart_new_price, this.CartClass.cart_qty) //* Log
        },
        // Toggle visibillity of the cart window
        toggle_cart_window() { 
            let time = new Date() //** purely for logging purposes
            this.cart_open = !this.cart_open // toggle the cart_open var. If its false than vue will not show the cart
            console.log('Toggle cart', this.cart_open, time) // Log
            
        },
        

        //* Checkout Functions: 


        toggle_checkout() { 
            let time = new Date() // Logging Purposes
            console.log('Opening Checkout', time) // Log the time of the checkout open
            this.checkout_open = !this.checkout_open // Toggle the checkout variable
        },
        
        submit_checkout() { 
            /* 
            Normally here we would make a server request for the checkout and then verify on the server side instead 
            of directly in the client. BUT we do not have a database setup for this and it would be quite complex to 
            implement the logic for this. So we will just use these examples below to verify the data submitted.
            */

            let time = new Date() // Logging Purpose
            console.log('Checkout Submitted', this.PaymentInfo, 'Items Checked Out:',this.cart_items, time ) // Log the checkout
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


