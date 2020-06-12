let anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors){
    anchor.addEventListener("click", (event) => {
        event.preventDefault();
        let blockID = anchor.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
            behavior: "smooth",
            block: "start"
        }) 
    });
}

document.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;
    const header = document.getElementById("header");
  
    if (scrollTop > 150) {
      header.classList.add("fixed");
    } 
    else {
      header.classList.remove("fixed");
    }
  });


@@include('_banner.js');
@@include('_team.js');
@@include('_contacts.js');


