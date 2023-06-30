document.addEventListener("DOMContentLoaded", function () {


  
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }

  // Create a new Intersection Observer with the handler function
  let observer = new IntersectionObserver(handleIntersection);

  // Get all the elements you want to apply the animations to
  let elements = document.querySelectorAll(".animate");

  // Start observing each element
  elements.forEach((elem) => observer.observe(elem));

  // Set the scroll-snap behavior on sections
  let sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.style.scrollSnapAlign = "start";
  });

  // Wait for the entire page to load before running script
  window.onload = function () {
    let hero = document.querySelector("hero");
    let header = document.querySelector("header");
    let footer = document.querySelector("footer");
    let button = document.querySelector("#videobutton");
    let hamburgerButton = document.querySelector(".hamburger-menu");
    let normalMenu = document.querySelector(".normal-menu");
    let video = document.querySelector("#myvideo");
    let stopButton = document.querySelector("#stop-video");
    let section1Content = document.querySelector("#section1-content");
    let heroContent = document.querySelector(".hero-content");
    let animateElements = document.querySelectorAll(
      "header .animate-elem, #section1 .animate-elem"
    );
    let animateContainers = document.querySelectorAll(
      "header .animate, #section1 .animate"
    );

    let videoLoading = false;

    video.muted = true;

    function handleInteraction() {
      if (video.paused) {
        document.querySelector("#video-container").style.display = "flex";
        video.style.display = "block";
        stopButton.style.display = "block";
        setTimeout(() => video.play(), 100);
        header.style.display = "none";
        section1Content.style.display = "none";
        heroContent.style.display = "none";
        footer.style.display = "none";

        var overlayText = document.querySelector(".video-container-h1");

        setTimeout(function () {
          overlayText.style.display = "block";
          overlayText.classList.add("active");
        }, 5000);

        setTimeout(function () {
          overlayText.style.display = "none";
          overlayText.classList.remove("active");
        }, 10000);

        video.onended = function () {
          endVideo();
        };
      }
    }

    function resetAnimation() {
      animateContainers.forEach((container) => {
        container.classList.remove("active");
        setTimeout(function () {
          container.classList.add("active");
        }, 100);
      });
      animateElements.forEach((elem) => {
        let newElem = elem.cloneNode(true);
        elem.parentNode.replaceChild(newElem, elem);
      });
    }

    function detectSwipe(el, func) {
      let swipeDir,
          startX = 0,
          startY = 0,
          distX = 0,
          distY = 0,
          threshold = 100, //required min distance traveled to be considered swipe
          restraint = 100, // maximum distance allowed at the same time in perpendicular direction
          allowedTime = 300, // maximum time allowed to travel that distance
          elapsedTime,
          startTime;
  
          var heroContent = document.querySelector('hero'); 

          section1Content.addEventListener('touchstart', function (e) {
            let touchobj = e.changedTouches[0];
            swipeDir = 'none';
            dist = 0;
            startX = touchobj.pageX;
            startY = touchobj.pageY;
            startTime = new Date().getTime(); // record time when finger first makes contact with surface
        }, false);
        
        section1Content.addEventListener('touchmove', function (e) {
            let touchobj = e.changedTouches[0];
            distX = touchobj.pageX - startX;
            distY = touchobj.pageY - startY;
        }, false);
        
        section1Content.addEventListener('touchend', function (e) {
            let touchobj = e.changedTouches[0];
            elapsedTime = new Date().getTime() - startTime; // get time elapsed
            if (elapsedTime <= allowedTime) { // first condition for awipe met
                if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) { // 2nd condition for horizontal swipe met
                    swipeDir = (distX < 0) ? 'left' : 'right'; // if dist traveled is negative, it indicates left swipe
                } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) { // 2nd condition for vertical swipe met
                    swipeDir = (distY < 0) ? 'up' : 'down'; // if dist traveled is negative, it indicates up swipe
                }
            }
            // handle swipe directions
            if (func) func(swipeDir);
            e.preventDefault(); // prevent default click event
        }, false);
  }



    function endVideo() {
      document.querySelector("#video-container").style.display = "none";
      video.style.display = "none";
      stopButton.style.display = "none";
      header.style.display = "flex";
      heroContent.style.display = "flex";
      footer.style.display = "flex";
      hero.style.display = "none";
      resetAnimation();
      sections.forEach((section) => {
        section.style.display = "flex";
      });
      document.body.style.overflow = "auto";
      window.removeEventListener("wheel", handleInteraction, { passive: false });
    }

    stopButton.addEventListener("click", function () {
      video.pause();
      videoLoading = false; // Set the video loading flag to false
      endVideo();
    });

    // Check if the video is still loading
  video.addEventListener("loadeddata", function () {
    if (videoLoading) {
      // If the video is still loading and playback has started, set the flag to false
      videoLoading = false;
    }
  });

    window.addEventListener("wheel", handleInteraction, { passive: false });
    button.addEventListener("click", handleInteraction);
    hamburgerButton.addEventListener("click", handleInteraction);
    normalMenu.addEventListener("click", handleInteraction);
    detectSwipe(section1Content, handleInteraction);

  videoLoading = true;
  video.load();


  
    // Set initial active image and button
    document.getElementById("image1").classList.add("active");
    updateButtonIcon(); // Call the function to update button icons at the start

    // Handle button clicks
    document.getElementById("image-button1").addEventListener("click", function () {
      showImage("image1");
    });

    document.getElementById("image-button2").addEventListener("click", function () {
      showImage("image2");
    });

    document.getElementById("image-button3").addEventListener("click", function () {
      showImage("image3");
    });

    document.getElementById("image-button4").addEventListener("click", function () {
      showImage("image4");
    });

    // Function to show the active image
    function showImage(imageId) {
      const images = document.getElementsByClassName("image-container");
      for (let i = 0; i < images.length; i++) {
        images[i].classList.remove("active");
      }
      document.getElementById(imageId).classList.add("active");
      updateButtonIcon(); // Call the function to update button icons each time an image is activated
    }

    // Function to update button icons
    function updateButtonIcon() {
      const images = document.getElementsByClassName("image-container");
      for (let i = 0; i < images.length; i++) {
        const buttonId = "image-button" + (i + 1); // Construct the button id
        const button = document.getElementById(buttonId);
        const icon = button.querySelector("i");

        if (images[i].classList.contains("active")) {
          icon.classList.remove("fa-circle");
          icon.classList.add("fa-dot-circle");
        } else {
          icon.classList.remove("fa-dot-circle");
          icon.classList.add("fa-circle");
        }
      }
    }
    

    var currentIndex = 1; // Initial index of the displayed image

    var images = document.querySelectorAll(".clickable-image");
    var prevButton = document.getElementById("prevButton");
    var nextButton = document.getElementById("nextButton");
    
    images.forEach(function (image) {
      image.addEventListener("click", function () {
        // Find the currently large image
        var largeImage = document.querySelector(".large-image");
    
        // Swap classes between the clicked image and the currently large image
        largeImage.classList.remove("large-image");
        largeImage.classList.add("small-image");
    
        this.classList.remove("small-image");
        this.classList.add("large-image");
    
        // Update the current index
        currentIndex = parseInt(this.id.slice(-1));
      });
    });
    
    prevButton.addEventListener("click", function () {
      navigateImages("prev");
    });
    
    nextButton.addEventListener("click", function () {
      navigateImages("next");
    });
    
    function navigateImages(direction) {
      // Find the currently large image
      var largeImage = document.querySelector(".large-image");
    
      // Remove the large-image class from the current image
      largeImage.classList.remove("large-image");
    
      // Calculate the index of the next image based on the direction
      var newIndex;
      if (direction === "prev") {
        newIndex = currentIndex > 1 ? currentIndex - 1 : 6;
      } else if (direction === "next") {
        newIndex = currentIndex < 6 ? currentIndex + 1 : 1;
      }
    
      // Find the next image based on the new index
      var nextImage = document.getElementById("team-image" + newIndex);
    
      // Swap classes between the next image and the current large image
      nextImage.classList.remove("small-image");
      nextImage.classList.add("large-image");
    
      // Update the current index
      currentIndex = newIndex;
    }
    let imageBoxes = document.querySelectorAll('.imagebox');
    let popups = document.querySelectorAll('.popup-section4');
    let closeButtons = document.querySelectorAll('.popup-close');
    let section4 = document.getElementById('bg'); // Get the section you want to blur
      
    imageBoxes.forEach((imageBox, index) => {
      imageBox.addEventListener('click', function() {
        let popup = popups[index];
        if (popup) {
          popup.style.display = 'flex';
          section4.classList.add('blur'); // Add blur to the section when the popup opens
        }
      });
    });
  


    closeButtons.forEach((button, index) => {
      button.addEventListener('click', function() {
        let popup = popups[index];
        if (popup) {
          popup.style.display = 'none';
          section4.classList.remove('blur'); 
        }
      });
    });
  };
});