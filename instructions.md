# Johnny Anderson 3.7 2024 

## Test submission requriements 

### Iteration 

#### Where is it
LN: 95 (index.html) 
#### What it does
This loop runs through each item in the cart items array and dispalys it on the page using vue.js built in for loop iteration. 
#### How to Test
Add as many items to cart as desired. When the cart is opened (With the little cart button top left) it will run a for loop to display all of those items in the cart 

### Classes 
#### Where is it 
Multiple classes are used throughout the program however will focus on the cart one for simplicity
LN 51 (App.js) 
#### What it does 
When a new item in being added to the cart, it will edit this class before pushing it into the cart items array. There are multiple fields; name, price, qty. 
#### How to test 
When an item is added to the cart it pushes it in. Its a little hard to test as its not a very visible thing.

### Expected boundary data 
#### Where is it 
LN 123 - 127 
#### What it does
Each time a new item is added it checks if the amount of items in the cart exeeds 4. If it is more than 4 than it exits the cart function returning the messsage that the cart it full. This means that the user can add 5 items to cart before being full.
#### How to test
Add 5 items to the cart. This will go as expected and add the items. However if you try to add another item. It will tell you that the cart is full.


## Map of program 

L3_Programming 
    L3_cart - This is the styles and assets for the cart
    L3_checkout - This is the styles and assets for the checkout
    L3_compact - This is the styles and assets for the compact mode window
    L3_core - This has the main script and styles for the program
    L3_devtools - This is the add item tool but no need to worry about this if not using remote version
    L3_navigation - Contains the styling for the nav bar
    L3_server - Again no need to worry about this if using a local hosted version but pretty much handles all the remote stuff
    index.html - Main HTML file for the programm
