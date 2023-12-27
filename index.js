let showProducts = document.getElementById("showProducts");
const menButton = document.getElementById("menButton");
const womenButton = document.getElementById("womenButton");
const kidsButton = document.getElementById("kidsButton");

let productsData;
let FilterProducts;
let selectedCategory = "Men";

const createAndAppendProduct = (value) => {
  const { badge_text, title, vendor, price, image, compare_at_price } = value;
  const priceLess = compare_at_price - price;
  const discount = Math.floor((priceLess / compare_at_price) * 100);
  const bagdeFound = badge_text ? "product-bagde" : "";

  const productContainer = document.createElement("li");
  const productImgContainer = document.createElement("div");
  const productImgEle = document.createElement("img");
  const productImgBadgeEle = document.createElement("b");
  const productTitleEle = document.createElement("h2");
  const productVendorEle = document.createElement("h4");
  const productPriceEle = document.createElement("span");
  const productOrginalPriceEle = document.createElement("span");
  const productPriceDiscountEle = document.createElement("span");
  const productAddCartBtnEle = document.createElement("button");

  productImgEle.src = image;
  productImgEle.className = "product-img";
  productImgContainer.className = "product-img-container";
  productImgContainer.appendChild(productImgEle);
  productContainer.appendChild(productImgContainer);

  productImgBadgeEle.textContent = badge_text;
  productImgBadgeEle.className = bagdeFound;
  productImgContainer.appendChild(productImgBadgeEle);

  productTitleEle.textContent = title;
  productTitleEle.className = "product-title";
  productContainer.appendChild(productTitleEle);

  productVendorEle.textContent = vendor;
  productVendorEle.className = "product-vendor";
  productContainer.appendChild(productVendorEle);

  productPriceEle.textContent = "Rs " + price;
  productPriceEle.className = "product-price";
  productContainer.appendChild(productPriceEle);

  productOrginalPriceEle.textContent = compare_at_price;
  productOrginalPriceEle.className = "procuct-original-price";
  productContainer.appendChild(productOrginalPriceEle);

  productPriceDiscountEle.textContent = discount + " " + "% off";
  productPriceDiscountEle.className = "procuct-discount";
  productContainer.appendChild(productPriceDiscountEle);

  productAddCartBtnEle.textContent = "Add To Cart";
  productAddCartBtnEle.className = "product-btn";
  productContainer.appendChild(productAddCartBtnEle);

  productContainer.className = "product-container";

  showProducts.appendChild(productContainer);
};

const loopEachProduct = (value) => {
  for (let product of value.category_products) {
    createAndAppendProduct(product);
  }
};

menButton.addEventListener("click", (e) => {
  showProducts.textContent = "";
  selectedCategory = e.target.value;
  menButton.className = "active-btn";
  womenButton.className = "";
  kidsButton.className = "";
  FilterProducts = productsData.find(
    (eachProduct) => eachProduct.category_name === selectedCategory
  );
  loopEachProduct(FilterProducts);
});

womenButton.addEventListener("click", (e) => {
  showProducts.textContent = "";
  selectedCategory = e.target.value;
  menButton.className = "";
  womenButton.className = "active-btn";
  kidsButton.className = "";
  FilterProducts = productsData.find(
    (eachProduct) => eachProduct.category_name === selectedCategory
  );
  loopEachProduct(FilterProducts);
});

kidsButton.addEventListener("click", (e) => {
  showProducts.textContent = "";
  selectedCategory = e.target.value;
  menButton.className = "";
  womenButton.className = "";
  kidsButton.className = "active-btn";
  FilterProducts = productsData.find(
    (eachProduct) => eachProduct.category_name === selectedCategory
  );
  loopEachProduct(FilterProducts);
});

const fetchApi = async () => {
  const url =
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";
  const options = {
    method: "GET",
  };

  const req = await fetch(url, options);
  const res = await req.json();
  productsData = res.categories;
  FilterProducts = productsData.find(
    (eachProduct) => eachProduct.category_name === selectedCategory
  );
  loopEachProduct(FilterProducts);
};
fetchApi();

menButton.className = "active-btn";
