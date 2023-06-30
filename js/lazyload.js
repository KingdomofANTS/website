document.addEventListener("DOMContentLoaded", function() {
  let lazyItems = [].slice.call(document.querySelectorAll(".lazy"));

  let inView = (entry) => {
    return entry.intersectionRatio > 0;
  };

  let loadItem = (item) => {
    let source = item.querySelector('source');
    if (source) {
      let dataSrc = source.getAttribute("data-src");
      if (dataSrc) {
        source.src = dataSrc;
        item.onloadeddata = () => {
          source.removeAttribute("data-src");
          item.classList.remove("lazy");
        };
        item.load();
      }
    } else if (item.tagName.toLowerCase() === 'img') {
      let dataSrc = item.getAttribute("data-src");
      if (dataSrc) {
        item.src = dataSrc;
        item.onload = () => {
          item.removeAttribute("data-src");
          item.classList.remove("lazy");
        };
      }
    } else {
      let imageUrl = item.getAttribute("data-bg");
      if (imageUrl) {
        item.style.backgroundImage = `url('${imageUrl}')`;
        item.classList.remove("lazy");
      }
    }
  };

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (inView(entry)) {
        loadItem(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  lazyItems.forEach((item) => {
    observer.observe(item);
  });
});