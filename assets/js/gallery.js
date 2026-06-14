(function () {
  "use strict";

  var gallery = document.querySelector("[data-gallery]");
  var lightbox = document.querySelector("[data-lightbox]");

  if (!gallery || !lightbox) {
    return;
  }

  var thumbnails = Array.from(gallery.querySelectorAll(".screenshot-thumb"));
  var image = lightbox.querySelector(".lightbox-image");
  var closeButton = lightbox.querySelector(".lightbox-close");
  var previousButton = lightbox.querySelector(".lightbox-prev");
  var nextButton = lightbox.querySelector(".lightbox-next");
  var currentIndex = 0;
  var lastFocused = null;

  function showImage(index) {
    currentIndex = (index + thumbnails.length) % thumbnails.length;
    var thumbnailImage = thumbnails[currentIndex].querySelector("img");
    image.src = thumbnails[currentIndex].dataset.full;
    image.alt = thumbnailImage.alt;
  }

  function openLightbox(index, trigger) {
    lastFocused = trigger;
    showImage(index);
    lightbox.hidden = false;
    document.body.classList.add("lightbox-open");
    closeButton.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    image.src = "";
    document.body.classList.remove("lightbox-open");

    if (lastFocused) {
      lastFocused.focus();
    }
  }

  thumbnails.forEach(function (thumbnail, index) {
    thumbnail.addEventListener("click", function () {
      openLightbox(index, thumbnail);
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  previousButton.addEventListener("click", function () {
    showImage(currentIndex - 1);
  });
  nextButton.addEventListener("click", function () {
    showImage(currentIndex + 1);
  });

  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    } else if (event.key === "ArrowLeft") {
      showImage(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      showImage(currentIndex + 1);
    } else if (event.key === "Tab") {
      var controls = [closeButton, previousButton, nextButton];
      var first = controls[0];
      var last = controls[controls.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}());
