

document.getElementById("signupForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    let userErr = document.getElementById("usernameError");
    let emailErr = document.getElementById("emailError");
    let passErr = document.getElementById("passwordError");
    var btn = document.querySelector(".btn");
    var profile = document.querySelector(".profile");

    let valid = true;

    if (username.value === "") {
        userErr.style.display = "block";
        valid = false;
    } else {
        userErr.style.display = "none";
    }

    if (email.value === "") {
        emailErr.style.display = "block";
        valid = false;
    } else {
        emailErr.style.display = "none";
    }

    if (password.value === "") {
        passErr.style.display = "block";
        valid = false;
    } else {
        passErr.style.display = "none";
    }

    if (valid) {
        
        mainlogindiv.style.display="none"
      btn.style.display="none"
    profile.style.display="flex"
  
         
    }
});
 
    const slides = document.querySelectorAll(".slide");
    const slidesContainer = document.getElementById("slides");
    const dotsContainer = document.getElementById("dots");
    let currentIndex = 2; // Start from middle

    // dots create
    slides.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => moveToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function updateSlider() {
      const offset = -(currentIndex - 2) * 270; // shift slider
      slidesContainer.style.transform = `translateX(${offset}px)`;

      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === currentIndex);
      });

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    function moveToSlide(index) {
      currentIndex = index;
      updateSlider();
    }

    // Auto Slide
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlider();
    }, 3000);

    updateSlider();

var mainlogindiv = document.querySelector(".main_login_div");

function login(){
    mainlogindiv.classList.toggle("active");
}
var carddatamain=document.querySelector(".carddatamain")
function carddata(){
    carddatamain.classList.add("active1")
   
}
function back(){
        carddatamain.classList.remove("active1")
}
function profileopen(){
    var profiledata = document.querySelector(".profile_data");
   profiledata.classList.toggle("active2")

   
}
const counters = document.querySelectorAll(".counter");

function runCounter(counter) {
  counter.innerText = "0";
  const target = +counter.getAttribute("data-target");
  const increment = target / 200; // speed control

  const updateCounter = () => {
    const current = +counter.innerText.replace("+", "").replace("K", "");
    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(updateCounter, 20);
    } else {
      if (target >= 1000) {
        counter.innerText = (target / 1000) + "K+";
      } else {
        counter.innerText = target + "+";
      }
    }
  };

  updateCounter();
}


const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      observer.unobserve(entry.target); 
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  observer.observe(counter);
});

const foods = [
  { id: 1, img: "img/recipe1-S5gfcgix.png", price: 40, title: "Vegan Sweet & Chickpea ", rating: 5 },
  { id: 2, img: "img/recipe2-RJ_Tb9Qg.png", price: 35, title: "Pepper Steak", rating: 5 },
  { id: 3, img: "img/recipe3-GbSPFAxO.png", price: 39.9, title: "Penne Pasta In Tomato ", rating: 5 },
    { id: 4, img: "img/recipe1-S5gfcgix.png", price: 40, title: "Vegan Sweet & Chickpea ", rating: 5 },
  { id: 5, img: "img/recipe2-RJ_Tb9Qg.png", price: 35, title: "Pepper Steak", rating: 5 },
  { id: 6, img: "img/recipe3-GbSPFAxO.png", price: 39.9, title: "Penne Pasta In Tomato ", rating: 5 },
];

const cardContainer = document.querySelector(".carddata");
const cartContainer = document.querySelector(".carddatamain");

// LocalStorage se cart load
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Food cards render
foods.forEach(food => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${food.img}" alt="${food.title}" width="150">
    <div class="card-content">
    <div id="price_data">
      <p class="price">$${food.price}</p>
      <h3>${food.title}</h3>
      <div>
      <div class="stars">${"★".repeat(food.rating)}</div>
      <button class="btn" style=" ">Add To Cart <i class="fa-solid fa-cart-shopping"></i></button>
    </div>
  `;

  
  card.querySelector(".btn").addEventListener("click", () => {
    addToCart(food);
  });

  cardContainer.appendChild(card);
});


function addToCart(food) {
  cart.push(food);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


function removeFromCart(index) {
  cart.splice(index, 1); // index se item remove
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}
function renderCart() {

  cartContainer.innerHTML = `
  <div id="headcard">
    <button class="back" onclick="back()"><i class="fa-solid fa-angle-left"></i></button>
    <h3>Your Cart</h3>
     </div>
  `;
       
  if (cart.length === 0) {
   cartContainer.innerHTML += "<p id='Your'>Your cart is empty.</p>";

    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.title}" width="100">
      <div>
        <h4>${item.title}</h4>
        <p>$${item.price}</p>
      </div>
      <button class="remove-btn"><i class="fa-solid fa-trash"></i></button>
    `;

 
    div.querySelector(".remove-btn").addEventListener("click", () => {
      removeFromCart(index);
    });

    cartContainer.appendChild(div);
  });

 
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("cart-total");
  totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
  cartContainer.appendChild(totalDiv);
}

  $(document).on('ready', function () {
 
    $('.js-slick-carousel').each(function() {
      var slickCarousel = $.HSCore.components.HSSlickCarousel.init($(this));
    });
  });





  