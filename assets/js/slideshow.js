let slideIndex = 0;

function showSlides() {
    const imageSlides = document.querySelectorAll(".mySlides");
    const textSlides = document.querySelectorAll(".mySlidesText");

    for (let i = 0; i < imageSlides.length; i++) {
        imageSlides[i].style.opacity = 0;
        textSlides[i].style.opacity = 0;
    }

    slideIndex++;
    if (slideIndex > imageSlides.length) {
        slideIndex = 1;
    }

    imageSlides[slideIndex - 1].style.opacity = 1;
    textSlides[slideIndex - 1].style.opacity = 1;

    setTimeout(showSlides, 5000); // Change slide every 5 seconds (adjust as needed)
}

document.addEventListener("DOMContentLoaded", function () {
    showSlides();

    // Immediately invoke the first iteration
    setTimeout(showSlides, 0);
});
