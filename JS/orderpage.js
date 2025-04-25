// Function to update the table and calculate the total price
function updateTable() {
    const form = document.getElementById('orderForm');
    const tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
    const totalPriceElement = document.getElementById('totalPrice');
    
    // Clear the table before updating
    tableBody.innerHTML = '';
  
    let total = 0;
  
    // Iterate over all the form elements (inputs) to check for selected items and quantities
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
      const input = formElements[i];
      
      if (input.type === 'number' && input.value > 0) {
        const itemName = input.name;
        const itemPrice = parseFloat(input.getAttribute('data-price'));
        const quantity = parseInt(input.value);
        const subtotal = itemPrice * quantity;
  
        // Add a new row to the table
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = itemName;
        row.insertCell(1).innerText = input.closest('section').querySelector('h2').innerText;
        row.insertCell(2).innerText = quantity;
        row.insertCell(3).innerText = `Rs. ${itemPrice}`;
        row.insertCell(4).innerText = `Rs. ${subtotal.toFixed(2)}`;
        row.insertCell(5).innerHTML = '<button type="button" onclick="removeItem(this)">Remove</button>';
  
        // Add to the total
        total += subtotal;
      }
    }
  
    // Update the total price display
    totalPriceElement.innerText = `Total: Rs. ${total.toFixed(2)}`;
  }
  
  // Function to save the current order to local storage
  function saveFavourite() {
    const order = [];
    const form = document.getElementById('orderForm');
  
    // Iterate over all form elements (inputs) to get the items and quantities
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; i++) {
      const input = formElements[i];
      
      if (input.type === 'number' && input.value > 0) {
        const itemName = input.name;
        const itemPrice = parseFloat(input.getAttribute('data-price'));
        const quantity = parseInt(input.value);
        const subtotal = itemPrice * quantity;
  
        // Save the order item details
        order.push({
          name: itemName,
          price: itemPrice,
          quantity: quantity,
          subtotal: subtotal
        });
      }
    }
  
    // Save the order to local storage (overwrite any existing favourites)
    localStorage.setItem('favouriteOrder', JSON.stringify(order));
  
    alert('Order saved to favourites!');
  }
  
  // Function to apply the saved favourite order
  function applyFavourite() {
    // Retrieve the saved favourite order from local storage
    const savedOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
  
    if (savedOrder) {
      const form = document.getElementById('orderForm');
      const tableBody = document.getElementById('orderTable').getElementsByTagName('tbody')[0];
      const totalPriceElement = document.getElementById('totalPrice');
  
      // Clear the table and the form
      tableBody.innerHTML = '';
      totalPriceElement.innerText = 'Total: Rs. 0.00';
  
      // Iterate over the saved order and apply the items
      let total = 0;
      savedOrder.forEach(item => {
        // Find the corresponding input field for each item and set its value
        const input = form.querySelector(`[name="${item.name}"]`);
        input.value = item.quantity;
  
        // Add a row to the table for the item
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = item.name;
        row.insertCell(1).innerText = input.closest('section').querySelector('h2').innerText;
        row.insertCell(2).innerText = item.quantity;
        row.insertCell(3).innerText = `Rs. ${item.price}`;
        row.insertCell(4).innerText = `Rs. ${item.subtotal.toFixed(2)}`;
        row.insertCell(5).innerHTML = '<button type="button" onclick="removeItem(this)">Remove</button>';
  
        // Add the subtotal to the total
        total += item.subtotal;
      });
  
      // Update the total price
      totalPriceElement.innerText = `Total: Rs. ${total.toFixed(2)}`;
    } else {
      alert('No favourite order found!');
    }
  }
  
  // Function to remove an item from the order
  function removeItem(button) {
    const row = button.closest('tr');
    row.remove();
  
    // Recalculate the total
    updateTable();
  }
  
  // Call updateTable() to initially load the order summary
  updateTable();
 