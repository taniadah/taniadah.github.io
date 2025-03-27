/*
Autor: Tania Del Angel 
Date: 17.01.2024
*/
let index = 0;

(function (){
  "use strict";

  /*Obtener los elementos */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
     /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  /* Mobile nav toggle
  */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })
  /**
  * Scrool with ofset on links with a class name .scrollto
  */
  on('click', '#navbar .nav-link', function(e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }
      if(this.hash == '#about'){
        putAge();
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function() {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      let initial_nav = select(window.location.hash)

      if (initial_nav) {
        let header = select('#header')
        let navlinks = select('#navbar .nav-link', true)

        header.classList.add('header-top')

        navlinks.forEach((item) => {
          if (item.getAttribute('href') == window.location.hash) {
            item.classList.add('active')
          } else {
            item.classList.remove('active')
          }
        })

        setTimeout(function() {
          initial_nav.classList.add('section-show')
        }, 350);

        scrollto(window.location.hash)
      }
    }
  });
 
   /**
   * Skills animation
   */
   let skilsContent = select('.skills-content');
   if (skilsContent) {
     new Waypoint({
       element: skilsContent,
       offset: '80%',
       handler: function(direction) {
         let progress = select('.progress .progress-bar', true);
         progress.forEach((el) => {
           el.style.width = el.getAttribute('aria-valuenow') + '%'
         });
       }
     })
   }

  /*Move funtion*/
  const typed = select('.typed')
    if (typed) {
      let typed_strings = typed.getAttribute('data-typed-items')
      typed_strings = typed_strings.split(',')
      new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }    
})()

function putAge(){
  var today = new Date();
  //Restamos los años
  var años = today.getFullYear() - 2000;
  var mes = today.getMonth();
  if(mes<9){
    años-=1;
  }else if(mes==9 && today.getDay() < 30){
    años-=1;    
  }   
  object = document.getElementById('Edad').innerHTML = años.toString()+" años";
}



    function moveSlide(step) {
        const images = document.querySelectorAll(".carousel-images img");
        const totalImages = images.length;

        index += step;

        if (index < 0) {
            index = totalImages - 1;
        } else if (index >= totalImages) {
            index = 0;
        }

        document.querySelector(".carousel-images").style.transform = `translateX(-${index * 100}%)`;
    }