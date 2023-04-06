"use strict";

function carousel() {
  let carouselSlider = document.querySelector(".nav-brands .marquee");
  let list = document.querySelector(".nav-brands__list");
  let item = document.querySelectorAll(".nav-brands__list-item");
  let list2;

  const speed = 0.333;

  const width = list.offsetWidth;
  let x = 0;
  let x2 = width;

  function clone() {
    list2 = list.cloneNode(true);
    carouselSlider.appendChild(list2);
    list2.style.left = `${width}px`;
  }

  function moveFirst() {
    x -= speed;

    if (width >= Math.abs(x)) {
      list.style.left = `${x}px`;
    } else {
      x = width;
    }
  }

  function moveSecond() {
    x2 -= speed;

    if (list2.offsetWidth >= Math.abs(x2)) {
      list2.style.left = `${x2}px`;
    } else {
      x2 = width;
    }
  }

  function hover() {
    clearInterval(a);
    clearInterval(b);
  }

  function unhover() {
    a = setInterval(moveFirst, 10);
    b = setInterval(moveSecond, 10);
  }

  clone();

  let a = setInterval(moveFirst, 10);
  let b = setInterval(moveSecond, 10);

  item.forEach((i) => {
    i.addEventListener("mouseenter", hover);
  });
  item.forEach((i) => {
    i.addEventListener("mouseleave", unhover);
  });
}

carousel();

const swiper = new Swiper('.swiper', {
  slidesPerView: 3,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const headers = document.querySelectorAll('.accordion-header');

headers.forEach((header) => {
  header.addEventListener('click', () => {
    header.classList.toggle('is__open');
  });
});

const triggers = document.querySelectorAll('.modal-trigger'),
      modal = document.querySelector('.overlay'),
      formModal = modal.querySelector('.form-block'),
      cross = formModal.querySelector('.form-block__cross');

cross.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (event) => {
  if (!formModal.contains(event.target)) {
    modal.style.display = 'none';
  }
});


triggers.forEach((trigger) => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
  });
});

const forms = document.querySelectorAll('form'),
      thankyou = document.getElementById('thankyou');


forms.forEach(element => {
  element.addEventListener("submit", async (event) => {
    event.preventDefault();

    const phoneInput = element.getElementsByName('client-phone')[0];
    const phoneRegex = /^((\+7|7|8)+([0-9]){10})$/;

    if (!phoneRegex.test(phoneInput.value)) {
      alert("Пожалуйста, введите корректный телефонный номер РФ");
      return;
    }

    try {
      const response = await fetch("mail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(new FormData(element)).toString(),
      });

      const data = await response.json();
      if (data.status === "success") {
        thankyou.style.display = "block";

        setTimeout(() => {
          thankyou.style.display = "none";
          modal.style.display = "none";
          element.reset();
        }, 2000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при отправке формы");
    }
  });

});