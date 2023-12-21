let showProducts = document.getElementById("showProducts");
const menButton = document.getElementById("menButton");
const womenButton = document.getElementById("womenButton");
const kidsButton = document.getElementById("kidsButton");

let selectedCategory = "Men";

const createProductCard = (data) => {
  const { badgeText, image, title, vendor, price, compareAtPrice } = data;

  const badge = badgeText === null ? "Trending" : badgeText;

  const productsContainer = document.createElement("li");
  productsContainer.className = "product-container";

  const imgContainer = document.createElement("div");
  const badgeTextEl = document.createElement("h6");
  badgeTextEl.textContent = badge;
  badgeTextEl.className = "product-bagde";
  imgContainer.appendChild(badgeTextEl);

  const imgEl = document.createElement("img");
  imgEl.src = image;
  imgEl.className = "product-img";
  imgContainer.appendChild(imgEl);

  const productDetailscontainer = document.createElement("div");
  productDetailscontainer.className = "product-details-container";
  const productTitle = document.createElement("h4");
  productTitle.textContent = title;
  productDetailscontainer.appendChild(productTitle);

  const productVendor = document.createElement("h5");
  productVendor.textContent = vendor;
  productDetailscontainer.appendChild(productVendor);

  const productPrice = document.createElement("span");
  const productPriceCut = document.createElement("span");
  const productDiscount = document.createElement("span");

  productPrice.textContent = "Rs : " + " " + price + "." + "00";
  productPrice.className = "price";
  productPriceCut.textContent = compareAtPrice + "." + "00";
  productPriceCut.className = "original-price";
  productDiscount.textContent = "50% Off";
  productDiscount.className = "product-discount";

  const productBtn = document.createElement("button");
  productBtn.textContent = "Add To Cart";
  productBtn.className = "product-btn";

  productDetailscontainer.appendChild(productPrice);
  productDetailscontainer.appendChild(productPriceCut);
  productDetailscontainer.appendChild(productDiscount);
  productDetailscontainer.appendChild(productBtn);

  productsContainer.appendChild(imgContainer);
  productsContainer.appendChild(productDetailscontainer);

  showProducts.appendChild(productsContainer);
};

const FetchApiCall = async (value) => {
  console.log(selectedCategory);
  const url =
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
  const options = {
    method: "GET",
  };
  const request = await fetch(url, options);
  const response = await request.json();
  const modifyData = response.categories.map((eachProduct) => ({
    categoryName: eachProduct.category_name,
    categoryProducts: eachProduct.category_products.map((eachProductItem) => ({
      id: eachProductItem.id,
      badgeText: eachProductItem.badge_text,
      compareAtPrice: eachProductItem.compare_at_price,
      image: eachProductItem.image,
      price: eachProductItem.price,
      secondImage: eachProductItem.second_image,
      title: eachProductItem.title,
      vendor: eachProductItem.vendor,
    })),
  }));

  const productData = modifyData.filter(
    (eachItem) => eachItem.categoryName === value && eachItem.categoryProducts
  );

  for (let product of productData) {
    product.categoryProducts.map((eachItem) => createProductCard(eachItem));
  }
};
FetchApiCall(selectedCategory);

menButton.addEventListener("click", (e) => {
  showProducts.textContent = "";
  selectedCategory = e.target.value;
  if (selectedCategory === "Men") {
    menButton.className = "active";
    womenButton.className = "";
    kidsButton.className = "";
  }
  FetchApiCall(selectedCategory);
});

womenButton.addEventListener("click", (e) => {
  showProducts.textContent = "";
  selectedCategory = e.target.value;
  if (selectedCategory === "Women") {
    womenButton.className = "active";
    menButton.className = "";
    kidsButton.className = "";
  }

  FetchApiCall(selectedCategory);
});

kidsButton.addEventListener("click", (e) => {
  showProducts.textContent = "";
  selectedCategory = e.target.value;
  if (selectedCategory === "Kids") {
    kidsButton.className = "active";
    womenButton.className = "";
    menButton.className = "";
  }

  FetchApiCall(selectedCategory);
});

if (selectedCategory === "Men") {
  menButton.classList = "active";
}
