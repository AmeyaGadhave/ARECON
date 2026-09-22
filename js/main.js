/* Sheth Architects — site interactions */
(function () {
  "use strict";

  /* Header scroll state */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) header.classList.add("is-scrolled");
    else header.classList.remove("is-scrolled");

    var backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
      if (window.scrollY > 600) backToTop.classList.add("is-visible");
      else backToTop.classList.remove("is-visible");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Hero video parallax — background drifts slower than scroll for depth */
  var heroVideo = document.querySelector(".hero-video");
  var heroSection = document.querySelector(".hero");
  if (heroVideo && heroSection) {
    var heroTicking = false;
    function updateHeroParallax() {
      var rect = heroSection.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var offset = Math.max(0, -rect.top) * 0.25;
        heroVideo.style.transform = "translate3d(0," + offset + "px,0)";
      }
      heroTicking = false;
    }
    document.addEventListener(
      "scroll",
      function () {
        if (!heroTicking) {
          requestAnimationFrame(updateHeroParallax);
          heroTicking = true;
        }
      },
      { passive: true }
    );
    updateHeroParallax();
  }

  /* Generic scroll parallax — data-parallax="0.08" drifts an element as it crosses the viewport */
  var parallaxEls = document.querySelectorAll("[data-parallax]");
  if (parallaxEls.length) {
    var pxTicking = false;
    function updateParallaxEls() {
      var vh = window.innerHeight;
      parallaxEls.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.08;
        var rect = el.getBoundingClientRect();
        var centerOffset = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = "translate3d(0," + (-centerOffset * speed) + "px,0)";
      });
      pxTicking = false;
    }
    document.addEventListener(
      "scroll",
      function () {
        if (!pxTicking) {
          requestAnimationFrame(updateParallaxEls);
          pxTicking = true;
        }
      },
      { passive: true }
    );
    window.addEventListener("resize", updateParallaxEls);
    updateParallaxEls();
  }

  /* Expertise panels — click/tap sets the persistent active panel */
  var expertisePanels = document.querySelectorAll(".expertise-panel");
  if (expertisePanels.length) {
    expertisePanels.forEach(function (panel) {
      panel.addEventListener("click", function () {
        expertisePanels.forEach(function (p) { p.classList.remove("is-active"); });
        panel.classList.add("is-active");
      });
    });
  }

  /* Mobile nav toggle */
  var navToggle = document.querySelector(".nav-toggle");
  var mobileNav = document.querySelector(".mobile-nav");
  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("is-open");
      mobileNav.classList.toggle("is-open");
      document.body.style.overflow = mobileNav.classList.contains("is-open") ? "hidden" : "";
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navToggle.classList.remove("is-open");
        mobileNav.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* Back to top */
  var backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Animated counters */
  var counters = document.querySelectorAll("[data-counter]");
  if (counters.length) {
    var counterIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var target = parseFloat(el.getAttribute("data-counter"));
          var duration = 1600;
          var start = null;
          function step(ts) {
            if (start === null) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = target * eased;
            el.textContent = target % 1 !== 0 ? value.toFixed(1) : Math.floor(value);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
          }
          requestAnimationFrame(step);
          counterIO.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach(function (el) { counterIO.observe(el); });
  }

  /* Projects strip — native horizontal scroll (index.html) */
  var stripViewport = document.querySelector(".projects-strip-viewport");
  var stripTrack = document.querySelector(".projects-strip-track");
  if (stripViewport && stripTrack) {
    var stripArrows = document.querySelectorAll(".scroll-arrow");
    function stripScrollStep() {
      var card = stripTrack.querySelector(".strip-card");
      var cardWidth = card ? card.getBoundingClientRect().width : 300;
      return (cardWidth + 24) * 2;
    }
    function updateArrowState() {
      var maxScroll = stripViewport.scrollWidth - stripViewport.clientWidth - 2;
      stripArrows.forEach(function (btn) {
        var dir = parseInt(btn.getAttribute("data-dir"), 10);
        if (dir < 0) btn.disabled = stripViewport.scrollLeft <= 0;
        else btn.disabled = stripViewport.scrollLeft >= maxScroll;
      });
    }
    stripArrows.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var dir = parseInt(btn.getAttribute("data-dir"), 10);
        stripViewport.scrollBy({ left: dir * stripScrollStep(), behavior: "smooth" });
      });
    });
    stripViewport.addEventListener("scroll", updateArrowState, { passive: true });
    window.addEventListener("resize", updateArrowState);
    updateArrowState();

    /* Convert vertical wheel input to horizontal scroll while hovering the strip */
    stripViewport.addEventListener(
      "wheel",
      function (e) {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          stripViewport.scrollLeft += e.deltaY;
        }
      },
      { passive: false }
    );

    /* Click-and-drag scrolling for mouse users */
    var isDragging = false, dragStartX = 0, dragStartScroll = 0;
    stripTrack.addEventListener("mousedown", function (e) {
      isDragging = true;
      stripTrack.classList.add("is-dragging");
      dragStartX = e.pageX;
      dragStartScroll = stripViewport.scrollLeft;
    });
    window.addEventListener("mouseup", function () {
      isDragging = false;
      stripTrack.classList.remove("is-dragging");
    });
    window.addEventListener("mousemove", function (e) {
      if (!isDragging) return;
      e.preventDefault();
      stripViewport.scrollLeft = dragStartScroll - (e.pageX - dragStartX);
    });
  }

  /* Project filter (projects.html) */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll("[data-category]");
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var filter = btn.getAttribute("data-filter");
        projectCards.forEach(function (card) {
          var matches = filter === "all" || card.getAttribute("data-category") === filter;
          card.hidden = !matches;
        });
      });
    });
  }

  /* Testimonial slider */
  var slides = document.querySelectorAll(".testimonial-slide");
  var dots = document.querySelectorAll(".testimonial-dots button");
  if (slides.length) {
    var current = 0;
    function showSlide(i) {
      slides.forEach(function (s, idx) { s.classList.toggle("active", idx === i); });
      dots.forEach(function (d, idx) { d.classList.toggle("active", idx === i); });
      current = i;
    }
    dots.forEach(function (dot, idx) {
      dot.addEventListener("click", function () { showSlide(idx); });
    });
    setInterval(function () { showSlide((current + 1) % slides.length); }, 6000);
  }

  /* Lightbox for project gallery */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector(".ph-img");
    var lightboxClose = lightbox.querySelector(".lightbox-close");
    document.querySelectorAll("[data-lightbox]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        var srcHtml = trigger.querySelector(".ph-img");
        if (srcHtml && lightboxImg) lightboxImg.className = "ph-img " + srcHtml.className.replace("ph-img", "").trim();
        lightbox.classList.add("is-open");
        document.body.style.overflow = "hidden";
      });
    });
    function closeLightbox() {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* Project detail side-nav active state */
  var pdNavLinks = document.querySelectorAll(".pd-nav a");
  var pdSections = document.querySelectorAll(".pd-content h2[id]");
  if (pdNavLinks.length && pdSections.length && "IntersectionObserver" in window) {
    var pdIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            pdNavLinks.forEach(function (l) { l.classList.remove("active"); });
            var match = document.querySelector('.pd-nav a[href="#' + entry.target.id + '"]');
            if (match) match.classList.add("active");
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    pdSections.forEach(function (s) { pdIO.observe(s); });
  }

  /* Contact form (front-end validation + demo success state — no backend wired) */
  var contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }
      var successEl = document.querySelector(".form-success");
      if (successEl) {
        successEl.classList.add("is-visible");
        successEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      contactForm.reset();
    });
  }

  /* Custom cursor (desktop pointer devices only) */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var cursor = document.createElement("div");
    cursor.className = "cursor-dot";
    document.body.appendChild(cursor);
    document.addEventListener("mousemove", function (e) {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    });
    document.querySelectorAll("a, button, .project-card").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("is-hovering"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("is-hovering"); });
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
