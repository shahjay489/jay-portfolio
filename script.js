(() => {
  const heroParticles = document.getElementById("hero-particles");
  const heroNavToggle = document.getElementById("hero-nav-toggle");
  const heroTopNav = document.querySelector(".hero-top-nav");
  const heroNavLinks = document.getElementById("hero-nav-links");

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (targetId.length > 1) {
        event.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  heroNavToggle?.addEventListener("click", () => {
    heroTopNav?.classList.toggle("open");
    const expanded = heroTopNav?.classList.contains("open") ? "true" : "false";
    heroNavToggle.setAttribute("aria-expanded", expanded);
  });

  heroNavLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      heroTopNav?.classList.remove("open");
      heroNavToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const timelineDetails = document.querySelectorAll(".timeline-details details");
  const syncTimelineDetails = () => {
    const shouldOpen = window.innerWidth >= 900;
    timelineDetails.forEach((detail) => {
      if (shouldOpen) {
        detail.setAttribute("open", "");
      } else {
        detail.removeAttribute("open");
      }
    });
  };

  syncTimelineDetails();
  window.addEventListener("resize", syncTimelineDetails);

  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    const heroTimeline = gsap.timeline();
    heroTimeline
      .to(".reveal-line", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
      })
      .from(
        ".hero-subtitle",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-actions",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      );

    gsap.to(".hero-content", {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".hero-waves", {
      yPercent: -25,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.utils.toArray(".section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      });
    });

    gsap.from(".timeline-entry", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top 80%",
      },
    });

    gsap.from(".project-card", {
      scale: 0.95,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 80%",
      },
    });

    gsap.from(".contact-card", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 90%",
      },
    });

    gsap.to(".page-transition", {
      scaleY: 0,
      transformOrigin: "top",
      duration: 1.1,
      delay: 0.2,
      ease: "power2.inOut",
      onComplete() {
        document.querySelector(".page-transition")?.remove();
      },
    });
  } else {
    window.addEventListener("load", () => {
      document.querySelector(".page-transition")?.remove();
    });
  }

  const createParticles = () => {
    const total = 32;
    for (let i = 0; i < total; i += 1) {
      const particle = document.createElement("span");
      const size = Math.random() * 5 + 3;
      const delay = Math.random() * 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${delay}s`;
      particle.style.animationDuration = `${Math.random() * 6 + 4}s`;
      heroParticles.appendChild(particle);
    }
  };

  if (heroParticles) {
    createParticles();
  }

  const scrollTopButton = document.querySelector(".scroll-top");
  const updateScrollTopVisibility = () => {
    if (!scrollTopButton) return;
    const shouldShow = window.scrollY > window.innerHeight * 0.5;
    scrollTopButton.classList.toggle("visible", shouldShow);
  };

  window.addEventListener("scroll", updateScrollTopVisibility);
  updateScrollTopVisibility();

  scrollTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const tiltCards = document.querySelectorAll(".tilt-card");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = (x / rect.width - 0.5) * 20;
      const py = (y / rect.height - 0.5) * 20;
      card.style.transform = `rotateX(${py}deg) rotateY(${px}deg) translateZ(8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) translateZ(0)";
    });
  });

})();
