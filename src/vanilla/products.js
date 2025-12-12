const API_URL = "https://fakestoreapi.com/products";

export async function loadProducts() {
  const container = document.getElementById("products-grid");

  try {
    container.innerHTML = "<p>Yuklanmoqda...</p>";

    const response = await fetch(API_URL);
    const products = await response.json();

    container.innerHTML = products
      .map(
        (product) => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.title}" width="120" />
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <button class="add-btn" onclick="addToCart({
          id: ${product.id},
          title: '${product.title.replace(/'/g, "\\'")}',
          price: ${product.price}
        })">Add to cart</button>
      </div>
    `
      )
      .join("");
  } catch (error) {
    container.innerHTML = "<p>Xatolik yuz berdi!</p>";
    console.error("Mahsulotlarni yuklashda xatolik:", error);
  }
}
