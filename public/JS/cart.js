let cartList = document.querySelector(".cart-container");
let noCart = document.querySelector(".no-cart");
let sneakBtn = document.getElementById("sneak");
let receipt = document.querySelector(".receipt");
let subTotal = document.getElementById("subtotal");
let myTotal = document.getElementById("total");

cart = JSON.parse(localStorage.getItem("myBasket")) || [];
let store = JSON.parse(localStorage.getItem("storeData")) || [];

function cartTemplate(x) {
  let searchItem = store.find(foo => {
    return foo.id == cart[x].id;
  });
  if (!cartList) return false;
  if (cart.length === 0) {
    noCart.style.display = "block";
  } else {
    noCart.style.display = "none";
    cartList.insertAdjacentHTML(
      "beforeend",
      `
      <div class="cart-item" id="cart-${cart[x].id}">
        <div class="cart-image">
          <img width="75" src="${searchItem.image}" alt="" />       
        </div>
        <p class="cart-details">
         ${searchItem.title}
        </p>
        <div class="quantity">
          <button><i onclick="increment(${searchItem.id})" class="fa-solid fa-chevron-up"></i></button>
          <span id="${searchItem.id}">${cart[x].item}</span>
          <button><i onclick="decrement(${searchItem.id})" class="fa-solid fa-chevron-down"></i></button>
        </div>
        <div class="cart-price">
          <p>$${searchItem.price}</p>
          <button class="xmark"  onclick="removeElement(${searchItem.id})"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>
        `
    );
  }
}

function cartRender() {
  if (cart.length === 0) return;
  for (i = 0; i < cart.length; i++) {
    cartTemplate(i);
  }
}

cartRender();

decrement = id => {
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
  if (document.getElementById(id).textContent == 0) {
    document.getElementById(id).parentElement.parentElement.remove();
  }
  if (cart.length == 0) {
    noCart.style.display = "block";
  }
};

increment = id => {
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
};

function update(id, item) {
  document.getElementById(id).textContent = item;
  updateCart();
  totalBill();
}

function sneak() {
  if (receipt.classList.contains("peek")) {
    receipt.style.left = "-250px";
    receipt.classList.remove("peek");
    sneakBtn.classList.remove("fa-rotate-180");
  } else {
    receipt.style.left = "0";
    receipt.classList.add("peek");
    sneakBtn.classList.add("fa-rotate-180");
  }
}

function removeElement(id) {
  let selectedItem = id;
  let myElement = document.getElementById(`cart-${selectedItem}`);
  cart = cart.filter(x => x.id !== selectedItem);

  if (myElement) {
    myElement.remove();
  }
  updateCart();
  if (cart.length == 0) {
    cartIcon.style.display = "none";
    noCart.style.display = "block";
    subTotal.textContent = "0";
    myTotal.textContent = "";
  }
  totalBill();
  localStorage.setItem("myBasket", JSON.stringify(cart));
}

function totalBill() {
  if (cart.length !== 0) {
    let amount = cart
      .map(x => {
        let { item, id } = x;
        let search =
          store.find(y => {
            return y.id == id;
          }) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    if (myTotal && subTotal) {
      myTotal.textContent = `$ ${amount.toFixed(2)}`;
      subTotal.textContent = `$ ${amount.toFixed(2)}`;
    }
  } else {
    if (myTotal && subTotal) {
      myTotal.textContent = `0`;
      subTotal.textContent = ``;
    }
  }
}

totalBill();
