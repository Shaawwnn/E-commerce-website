let storeItems;
let storeItemsDuplicate;
const mall = document.querySelector(".mall-container");
const cartQuantity = document.getElementById("cart-quantity");
const cartIcon = document.querySelector(".cart-count");
const searchFilter = document.querySelector("#search");
const modal = document.querySelector(".modal");
const searchPanel = document.querySelector(".render-search");

let cart = JSON.parse(localStorage.getItem("myBasket")) || [];

let ctr = 0;

window.addEventListener("DOMContentLoaded", fetchData);

async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const myData = await response.json();
  storeItems = myData;
  localStorage.setItem("storeData", JSON.stringify(myData));
  //console.log(storeItems);
  for (ctr = 0; ctr < storeItems.length; ctr++) {
    renderShop(ctr);
  }
}

function renderShop(x) {
  let rate = (storeItems[x].rating.rate / 5) * 100;
  ///////
  let searchCart =
    cart.find(y => {
      return y.id === storeItems[x].id;
    }) || [];
  if (mall) {
    mall.insertAdjacentHTML(
      "beforeend",
      `
         <div class="mynode" id="node${storeItems[x].id}">
          <div class="mall-items" id="item-${storeItems[x].id}">
            <div class="mall-card" id="product-id-${storeItems[x].id}">
              <div id="img-container">
                <img onclick="fullScreenRender(${
                  storeItems[x].id
                })" width='100%' src="${storeItems[x].image}" alt="" />
              </div>
              <div class="title-price">
                <h6 class="product-name">${storeItems[x].title}</h6>
              <span class="price">$${storeItems[x].price}</span>
              </div>
              <div class="rating-container">
                  <div class="rating">
                    <p class='gray'>
                      <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    </p> 
                    <div class="checked" style="width:${rate}%">   
                      <p class='gold'>
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                      </p> 
                    </div>
                  </div>           
              </div>
              <div class="buttons">
                <button><i onclick="decrement(${
                  storeItems[x].id
                })" class="fa-solid fa-minus" id="minus"></i></button>
                <input class= "price${storeItems[x].id}" id="${
        storeItems[x].id
      }" type="text" value="${
        searchCart.item === undefined ? 0 : searchCart.item
      }" disabled="true" />
                <button><i onclick="increment(${
                  storeItems[x].id
                })" class="fa-solid fa-plus" id="add"></i></button>
              </div>
            </div>
          </div>
        </div>
    `
    );
  }
}

let decrement = id => {
  if (document.getElementById(id).value == 0) {
    return;
  }
  let search = cart.find(x => x.id == id);
  if (search) {
    search.item -= 1;
    update(id, search.item);
  } else {
    cart.push({
      id: id,
      item: 1,
    });
  }

  cart = cart.filter(x => {
    return x.item != 0;
  });
  //console.log(cart);
  localStorage.setItem("myBasket", JSON.stringify(cart));
  totalBill();
};

let increment = id => {
  let search = cart.find(x => x.id == id);
  if (search) {
    search.item += 1;
    update(id, search.item);
  } else {
    cart.push({
      id: id,
      item: 1,
    });
    //console.log(cart);
    update(id, 1);
  }
  localStorage.setItem("myBasket", JSON.stringify(cart));
  totalBill();
};

function update(id, item) {
  //document.getElementById(id).value = item;
  let barbaz = document.querySelectorAll(`.price${id}`);
  barbaz.forEach(x => {
    x.value = item;
  });
  updateCart();
}

function updateCart() {
  if (cart.length <= 0) {
    return;
  }
  let totalItems = cart.map(x => {
    return x.item;
  });
  cartQuantity.textContent = totalItems.reduce((total, x) => {
    return total + x;
  });
  if (cartQuantity.textContent != 0) {
    cartIcon.style.display = "flex";
  } else {
    cartIcon.style.display = "none";
  }
}

updateCart();

function fullScreenRender(id) {
  let modalData = storeItems.filter(x => {
    return x.id === id;
  });
  let rate = (modalData[0].rating.rate / 5) * 100;
  modal.style.display = "block";
  modal.innerHTML = `
    <div class="box-modal">
      <div class="modal-top">
      <i onclick="removeModal()" class="fa-solid fa-xmark" id="remove-modal"></i>
        <div class='modal-image'>
          <img width = "300" src="${modalData[0].image}" />
          <div class="modal-rating-container">
                  <div class="rating">
                    <p class='gray'>
                      <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                    </p> 
                    <div class="checked" style="width:${rate}%">   
                      <p class='gold'>
                        <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                      </p> 
                    </div>
                  </div>  
                  <span> Ratings : ${modalData[0].rating.rate} / 5</span>         
              </div>
        </div>
        <div class="modal-details">
          <h4>${modalData[0].title}</h4>
          <p class="mleft modal-short">- ${modalData[0].description}</p>
            <div class = "m-data">
              <p class="mleft modal-price">$ ${modalData[0].price}</p>
              <p class="mleft modal-category">Tag : ${modalData[0].category}</p>
              <p class="mleft modal-stock">Stocks : ${modalData[0].rating.count}</p>
            </div>
        </div>
      </div>  
    </div>
  `;
}

function removeModal() {
  modal.style.display = "none";
}

if (searchFilter && searchPanel) {
  searchFilter.addEventListener("input", async e => {
    let queryList = JSON.parse(localStorage.getItem("storeData"));

    // if (e.target.value.length < 3) {
    //   return;
    // }
    let myQuery = queryList.filter(x => {
      if (e.target.value.length < 3) {
        return;
      }
      if (
        x.title.toLowerCase().includes(`${e.target.value.toLowerCase()}`) ||
        x.category.toLowerCase().includes(`${e.target.value.toLowerCase()}`)
      ) {
        return x;
      }
    });
    let myQueryId = myQuery.map(x => {
      return x.id;
    });
    let itemElement = document.querySelectorAll(".mynode");
    let itemArray = Array.from(itemElement);
    let searchRender = document.querySelector(".render-search");
    let allItems = document.querySelector(".mall");
    if (myQueryId.length == 0) {
      searchRender.innerHTML = `<p class='notif'>Sorry. We couldn't find anything for "${e.target.value}".</p>`;
      setTimeout(() => {
        searchRender.innerHTML = "";
      }, 3000);
      allItems.style.display = "block";
    } else {
      //console.log(itemArray[0].id);
      let myArrayofItems = [];
      myQueryId.forEach(element => {
        itemArray.find(x => {
          if (x.id === `node${element}`) myArrayofItems.push(x.innerHTML);
        });
      });
      console.log(myArrayofItems);
      searchRender.innerHTML = myArrayofItems.join("");
      allItems.style.display = "none";
    }
  });
}
