// Initialize Locomotive Scroll for smooth scrolling with #main
const locoScroll = new LocomotiveScroll({
    el: document.querySelector('#main'), // Targeting the main content by ID
    smooth: true, // Enables smooth scrolling
  });
  
  // Function to open the side navigation
  function OpenSideNav() {
    const t1 = gsap.timeline();
    const open = document.querySelector('.search');
    const searchPage = document.querySelector('.search-content');
    const close = document.querySelector('.hide');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
  
    gsap.to(navLinks, {
      display: 'none',
      onComplete: () => {
        gsap.to(nav, {
          width: '14%',
          left: '32%',
          onComplete: () => locoScroll.update(), // Refresh Locomotive Scroll context
        });
      },
    });
    t1.to(open, {
      opacity: 0,
      onComplete: () => {
        t1.to(searchPage, {
          right: '0',
          onComplete: () => locoScroll.update(), // Refresh Locomotive Scroll
        });
        t1.to(close, {
          display: 'flex',
        });
      },
    });
  }
  
  // Function to close the sidebar
  function CloseSideBar() {
    const t1 = gsap.timeline();
    const open = document.querySelector('.search');
    const searchPage = document.querySelector('.search-content');
    const close = document.querySelector('.hide');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelector('.nav-links');
  
    t1.to(close, {
      display: 'none',
      duration: 0.1,
      onComplete: () => {
        t1.to(open, {
          opacity: 1,
          onComplete: () => locoScroll.update(), // Refresh Locomotive Scroll
        });
      },
    });
    t1.to(searchPage, {
      right: '-150%',
      onComplete: () => locoScroll.update(), // Refresh Locomotive Scroll
    });
    gsap.to(nav, {
      width: '50%',
      left: '50%',
      duration: 0.2,
      onComplete: () => {
        gsap.to(navLinks, {
          display: 'flex',
          onComplete: () => locoScroll.update(), // Refresh Locomotive Scroll
        });
      },
    });
  }
  
  // Function to dynamically show/hide navbar on scroll
  function DyanamicNav() {
    let lastScrollY = 0; // Track the last scroll position
    const navBar = document.getElementById('nav-bar');
    const hideNavDuration = 0.5; // Duration for hiding/revealing nav
  
    locoScroll.on('scroll', (args) => {
      const currentScrollY = args.scroll.y; // Get the current scroll position from Locomotive Scroll
  
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        if (!navBar.classList.contains('hidden')) {
          gsap.to(navBar, {
            y: '-200%', // moves the nav bar out of view (adjust based on your nav height)
            duration: hideNavDuration,
            onComplete: () => navBar.classList.add('hidden'),
          });
        }
      } else if (currentScrollY < lastScrollY - 5) {
        // Scrolling up with a small threshold
        if (navBar.classList.contains('hidden')) {
          gsap.to(navBar, {
            y: '0%',
            duration: hideNavDuration,
            onComplete: () => navBar.classList.remove('hidden'),
          });
        }
      }
  
      lastScrollY = currentScrollY; // Update last scroll position
    });
  }
  
  // Initialize the dynamic navbar functionality
  DyanamicNav();
  