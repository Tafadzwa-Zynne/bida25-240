Plan to correctly finish the request:
1) Replace the entire product cards HTML block in collection.html (from the first <section class="product-grid"...> to the last one) with a clean, consistent set of cards.
2) Each card will include:
   - class="card"
   - a .img-container with the same image currently used
   - an <h3> title
   - a <a href="collections.html" class="btn">Explore</a>
   - data-price and data-size attributes on the card element (so the existing filter JS works).
3) Assign different data-price and visible <p>/price display to each card.
   - Keep filter JS compatibility: JS reads data-price/data-size and checks .product-card elements.
   - To avoid changing JS, keep cards as class="product-card" (add also class="card" for styling/button consistency), or adjust JS to look for .card elements.

Done.


