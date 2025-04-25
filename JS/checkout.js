// Retrieve the order data from localStorage
const orderData = JSON.parse(localStorage.getItem("orderData"));
const checkoutTable = document.getElementById("checkoutTable");
const totalCell = document.getElementById("totalCell");

console.log(orderData); // Log the order data to the console for debugging

if (orderData && orderData.length > 0) {
  let total = 0;

  // Loop through the order data and populate the table
  orderData.forEach(item => {
    const row = document.createElement("tr");
    const subtotal = item.quantity * item.price;
    total += subtotal;

    // Populate the row with item data
    row.innerHTML = `
      <td>${item.itemName}</td>
      <td>${item.category}</td>
      <td>Rs. ${item.price.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>Rs. ${subtotal.toFixed(2)}</td>
    `;
    checkoutTable.appendChild(row);
  });

  // Update the total price in the summary table
  totalCell.textContent = "Rs. " + total.toFixed(2);
} else {
  // If there is no order data, show a message
  checkoutTable.innerHTML = "<tr><td colspan='5'>No items in order.</td></tr>";
}

// Handle form submission for checkout
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Calculate delivery date (5 days from today)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  // Show a confirmation message with delivery date
  alert("Thank you for your purchase! Your items will be delivered by " + deliveryDate.toDateString());

  // Optionally, clear the order data after purchase
  localStorage.removeItem("orderData"); // Clear the order from localStorage
});
