(function () {
  'use strict';

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth',
    });
  };

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;
    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add('fixed-top');
        nextElement.classList.add('scrolled-offset');
      } else {
        selectHeader.classList.remove('fixed-top');
        nextElement.classList.remove('scrolled-offset');
      }
    };
    window.addEventListener('load', headerFixed);
    onscroll(document, headerFixed);
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    'click',
    '.navbar .dropdown > a',
    function (e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    'click',
    '.scrollto',
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          let navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      },
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on(
        'click',
        '#portfolio-flters li',
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove('filter-active');
          });
          this.classList.add('filter-active');

          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter'),
          });
          portfolioIsotope.on('arrangeComplete', function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox',
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();

const post = (url, data) => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });

const data = [];

const setCards = (term = '', category = '') => {
  let items = [];
  let cards = ``;
  const books_container = document.getElementById('books_container');

  if (term != '' || category != '') {
    if (category != '') {
      items = data.filter((e) => e.category.toLowerCase() == category && e.title.toLowerCase().match(term.toLowerCase().trim()));
    } else {
      items = data.filter((e) => e.title.toLowerCase().match(term.toLowerCase().trim()));
    }
  } else {
    items = data;
  }

  if (items.length == 0) {
    cards = `
    <div class="col-12 col-md-6 col-lg-4 text-center">
      <img src="./assets/img/questions-animate.svg"  alt="" />
      <p>Empty search results</p>
  </div>
    `;
  } else {
    items.forEach((el) => {
      cards += `
      <div class="col-12 col-lg-3 col-md-4 mb-3">
      <div class="card">
        <img src="./assets/img/${el.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${el.title}</h5>
          <p class="text-muted">${el.writer}</p>
          <div class="d-grid grid-gap-2">
            <a href="#" class="btn btn-primary" onclick="setModal(${el.id_book})" data-bs-toggle="modal" data-bs-target="#filter">Show filter</a>
          </div>
        </div>
      </div>
    </div>
      `;
    });
  }

  books_container.innerHTML = cards;
};

fetch('api.php?q=books')
  .then((e) => e.json())
  .then((e) => {
    data.push(...e);
    setCards();
  })
  .catch((e) => {
    console.error(e);
  });

const setModal = (id) => {
  const item = data.filter((e) => e.id_book == id)[0];
  document.querySelector('#id_book').value = id;
  document.querySelector('#img_filter').src = './assets/img/' + item.img;
  document.querySelector('.modal .modal-body .details').innerHTML = `
  <p><b>Title :</b> ${item.title}</p>
  <p><b>Written by :</b> ${item.writer}</p>
  <p><b>Category :</b> ${item.category}</p>
  <p class="text-justify">${item.filter}</p>
  `;

  fetch('api.php?q=comments&id_book=' + id)
    .then((e) => e.json())
    .then((e) => {
      setComments(e);
    })
    .catch((e) => {
      console.error(e);
    });
};

const setComments = (data) => {
  let list_items = ``;
  const list_group = document.querySelector('.comments .list-group');
  const username = document.getElementById('username').value;

  if (data.length == 0) {
    list_items = `
    <p>
      no comments yet
    </p>
    `;
  } else {
    data.forEach((el) => {
      list_items += `
        <div class="list-group-item list-group-item-action" aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${el.username}</h5>
            <!-- <small>3 days ago</small> -->
          </div>
          <p class="mb-5 text-muted">${el.body}</p>
          ${
            username != el.username || username == 'Anonymous'
              ? ''
              : `
          <small>
          <span onclick="editComment(${el.id_comment},${el.id_book},'${el.body}')" class="badge text-bg-warning text-decoration-none hoverable">Edit</span>
          <span onclick="deleteComment(${el.id_comment},${el.id_book})" class="badge text-bg-danger text-decoration-none hoverable">Delete</span>
          </small>
          `
          }
          </div>
          `;
    });
  }

  list_group.innerHTML = list_items;
};

const deleteComment = (id_comment, id_book) => {
  Swal.fire('Delete the comment?', 'it will be gone forever', 'question').then((result) => {
    if (result.isConfirmed) {
      fetch('api.php?q=delete_comment&id_comment=' + id_comment + '&id_book=' + id_book)
        .then((e) => e.json())
        .then((e) => {
          setComments(e);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  });
};

const editComment = async (id_comment, id_book, body) => {
  const { value: text } = await Swal.fire({
    input: 'textarea',
    inputValue: body,
    inputLabel: 'Edit your comment',
    showCancelButton: true,
  });

  if (text) {
    post('api.php?q=edit_comment', { id_comment, id_book, body: text })
      .then((e) => e.json())
      .then((e) => {
        setComments(e);
      })
      .catch((e) => {
        console.error(e);
      });
  }
};

const term = document.getElementById('term');
const category = document.getElementById('category');
const form_comment = document.getElementById('form_comment');

term.addEventListener('keyup', (e) => {
  setCards(e.target.value, category.value);
});

category.addEventListener('change', (e) => {
  setCards(term.value, e.target.value);
});

form_comment.addEventListener('submit', (e) => {
  e.preventDefault();
  const object = {};
  new FormData(form_comment).forEach(function (value, key) {
    object[key] = value;
  });
  post('api.php?q=add_comment', object)
    .then((e) => e.json())
    .then((e) => {
      setComments(e);
      form_comment.reset();
    });
});