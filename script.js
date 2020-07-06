
var slideIndex = 1;
showSlides(slideIndex);


function plusSlides(n) {
    showSlides(slideIndex += n);
}


function currentSlide(n) {
    showSlides(slideIndex = n);
}


function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlide");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
   
    slides[slideIndex - 1].style.display = "block";

}









	let content = document.getElementsByClassName("content");
	let mainContainer = document.getElementById("mainContainer");
	let name = document.getElementsByClassName("name");
	let price = document.getElementsByClassName("price");
	let image = document.getElementsByClassName("image");
	let apple = [
                {   name: "Iphone 7plus", 
                    price: 25000.00, 
                    image: "img/iphone7plus.png", 
                    inCart: 0 
                },

                {   name: "Iphone X", 
                    price: 39990.00, 
                    image: "img/iphoneX.png", 
                    inCart: 0
                },

                {   name: "Iphone 11",  
                    price: 47990.00,
                    image: "img/iphone11.png", 
                    inCart: 0 },

                {   name: "Iphone 11Pro Max",  
                    price: 79900.00, 
                    image: "img/iphone-11-promax.png", 
                    inCart: 0 },

                {   name: "Iphone XR",  
                    price: 40990.00, 
                    image: "img/IphoneXR.png", 
                    inCart: 0 
                },
                {   name: "Airpods Pro",  
                    price: 14999.00, 
                    image: "img/AirpodsPro.png", 
                    inCart: 0 }
  ];
  

  
	function loadingProducts() {
    for (let index = 0; index < apple.length; index++) {
        mainContainer.innerHTML += ` <div class="content zone box">
        <img class="image" src="${apple[index].image}" alt="This is a picture.">
        <h3 class="name">${apple[index].name}</h3>
        <p class="price">${apple[index].price}</p>
        <a href="#" class="add-cart cart1">Add to Bag</a>
        </div>`;
        console.log("The number of cart is", document.querySelectorAll(".add-cart"));
    }

    let carts = document.querySelectorAll(".add-cart");
	

    for (let index = 0; index < carts.length; index++) {
        carts[index].addEventListener("click", () => {
            cartNumbers(apple[index]);
            totalCost(apple[index]);
            location.reload();
        })


    }
}


let carts = document.querySelectorAll(".add-cart");
	

	for (let index = 0; index < carts.length; index++) {
	    carts[index].addEventListener("click", () => {
	        cartNumbers(apple[index]);
	        totalCost(apple[index]);
	        location.reload();
	    })
	

	}
	
	function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers");
    if (productNumbers) {
        document.querySelector(".shopBag span").textContent = productNumbers;
    }
}


function cartNumbers(apple) {
    let productNumbers = localStorage.getItem("cartNumbers");
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".shopBag span").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".shopBag span").textContent = 1;
    }
    setItems(apple);
}



function setItems(apple) {
  let cartItems = localStorage.getItem("appleInCart");
  cartItems = JSON.parse(cartItems);


  if (cartItems != null) {
      if (cartItems[apple.name] == undefined) {
          cartItems = {
              ...cartItems,
              [apple.name]: apple
          }
      }
      cartItems[apple.name].inCart += 1;
  } else {
      apple.inCart = 1;
      cartItems = {
          [apple.name]: apple
      }
  }
  localStorage.setItem("appleInCart", JSON.stringify(cartItems));
}



function totalCost(apple) {

  let cartCost = localStorage.getItem("totalCost");



  if (cartCost != null) {
      cartCost = parseInt(cartCost);
      localStorage.setItem("totalCost", cartCost + apple.price);
  } else {
      localStorage.setItem("totalCost", apple.price);
  }


}



function displayCart() {
  let cartItems = localStorage.getItem("appleInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");
 let removeCartItemsButtons = document.getElementsByClassName('btn-danger');
 console.log(removeCartItemsButtons);

 

  if (cartItems && modal) {
      productContainer.innerHTML = '';
      Object.values(cartItems).map(item => {
          productContainer.innerHTML += `
          <div class ="product">
         
              <img src="${item.image}">
              <span>Name: ${item.name}</span>
         
          <div class="product-price"> ₱${item.price},00</div>
          <div class="product-quantity">
          </div>
          <span>${item.inCart}</span>
        
          <div class = "product-total">
          ₱${item.inCart * item.price},00
         
          <div> <button class="btn-danger">REMOVE</button> 
          
          </div>
          
          `;
        
      });

      productContainer.innerHTML += `
          <div class="basketTotalContainer">
              <h4 class ="basketTotalTitle">
                  Basket Total
              </h4>
              <h4 class = "basketTotal">
              ₱${cartCost},00`


             
       
              
             
              
              for (let i = 0; i < removeCartItemsButtons.length; i++) {
                  
                  let button = removeCartItemsButtons[i];
                  button.addEventListener("click", (event) => {
                   var buttonCLicked = event.target;

                     localStorage.clear();
                     location.reload();
                  })
              
              
              }
              

  }

 
 
}











	var modal = document.getElementById("myModal");
	


	var btn = document.getElementById("myBtn");
	


	var span = document.getElementsByClassName("close")[0];

	btn.onclick = function () {
	    modal.style.display = "block";
	}
	

	span.onclick = function () {
	    modal.style.display = "none";
	}
	

	window.onclick = function (event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}
	


loadingProducts();
onLoadCartNumbers();
displayCart();
