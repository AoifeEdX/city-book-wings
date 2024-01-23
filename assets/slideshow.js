let slideIndex = 0;

function showSlides() {
    const imageSlides = document.getElementsByClassName("mySlides");
    const textSlides = document.getElementsByClassName("mySlidesText");

    for (let i = 0; i < imageSlides.length; i++) {
        imageSlides[i].style.display = "none";
        textSlides[i].classList.remove("show");
    }

    slideIndex++;
    if (slideIndex > imageSlides.length) {
        slideIndex = 1;
    }

    imageSlides[slideIndex - 1].style.display = "block";
    textSlides[slideIndex - 1].classList.add("show");

    setTimeout(showSlides, 5000); // Change slide every 5 seconds (adjust as needed)
}

document.addEventListener("DOMContentLoaded", function () {
    showSlides();
});