function OpenSideNav(){
    const t1 = gsap.timeline()
    const open = document.querySelector('.search')
    const searchPage = document.querySelector('.search-content')
    const close = document.querySelector('.hide')
    const nav = document.querySelector('.nav')
    const navLinks = document.querySelector('.nav-links')

    gsap.to(navLinks,{
        display:'none',
        onComplete:()=>{
            gsap.to(nav,{
                width:'14%',
                left:'32%'
            })
        }
    })
    t1.to(open,{
        opacity:0,
        onComplete:()=>{
            t1.to(searchPage,{
                right:'0'
            })
            t1.to(close,{
                display:'flex'
            })
        }
    })
}

function CloseSideBar(){


    const t1 = gsap.timeline()
    const open = document.querySelector('.search')
    const searchPage = document.querySelector('.search-content')
    const close = document.querySelector('.hide')
    const nav = document.querySelector('.nav')
    const navLinks = document.querySelector('.nav-links')



    t1.to(close,{
        display:'none',
        duration:.1,
        onComplete:()=>{
            t1.to(open,{
                opacity:1
            })
        }
    })
    t1.to(searchPage,{
        right:'-150%'
    })
     gsap.to(nav,{
        width:'50%',
        left:'50%',
        duration:.6,
        onComplete:()=>{
            gsap.to(navLinks,{
                display:'flex'
            })
        }
    })
}

function DyanamicNav(){
    let lastScrollY = window.scrollY;
const navBar = document.getElementById('nav-bar');
const hideNavDuration = .5; // Duration for hiding/revealing nav

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > lastScrollY) {
    // Scrolling down
    if (!navBar.classList.contains('hidden')) {
      gsap.to(navBar, {
        y: '-200%', // moves the nav bar out of view (adjust based on your nav height)
        duration: hideNavDuration,
        onComplete: () => navBar.classList.add('hidden')
      });
    }
  } else if (currentScrollY < lastScrollY - 5) {
    // Scrolling up with a small threshold
    if (navBar.classList.contains('hidden')) {
      gsap.to(navBar, {
        y: '0%',
        duration: hideNavDuration,
        onComplete: () => navBar.classList.remove('hidden')
      });
    }
  }

  lastScrollY = currentScrollY;
});

}

DyanamicNav()

