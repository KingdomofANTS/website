document.addEventListener("DOMContentLoaded", function() {
  function initializeParticles(containerId, particlesSettings) {
    particlesJS(containerId, particlesSettings);
  }

  // Particle settings for container 1
  initializeParticles("particles-js1", {
    particles: {
      // Particle settings for container 1
      shape: {
        type: "image",
        image: {
          src: "images/StarCoin.png" // Replace with the actual path to your image file for container 1
        }
      },
      // Other particle settings for container 1
      // ...
    },
    // Other configuration settings for container 1
    // ...
  });

  // Particle settings for container 2
  initializeParticles("particles-js2", {
    particles: {
      // Particle settings for container 2
      shape: {
        type: "image",
        image: {
          src: "images/StarPurpe.png" // Replace with the actual path to your image file for container 2
        }
      },
      // Other particle settings for container 2
      // ...
    },
    // Other configuration settings for container 2
    // ...
  });

  // Particle settings for container 3
  initializeParticles("particles-js3", {
    particles: {
      // Particle settings for container 3
      shape: {
        type: "image",
        image: {
          src: "images/StarBlue.png" // Replace with the actual path to your image file for container 3
        }
      },
      // Other particle settings for container 3
      // ...
    },
    // Other configuration settings for container 3
    // ...
  });

  // Particle settings for container 4
  initializeParticles("particles-js4", {
    particles: {
      // Particle settings for container 4
      shape: {
        type: "image",
        image: {
          src: "images/StarWhite.png" // Replace with the actual path to your image file for container 4
        }
      },
      // Other particle settings for container 4
      // ...
    },
    // Other configuration settings for container 4
    // ...
  });

  // Intersection Observer callback function
  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const containerId = entry.target.id;

        let imageSrc = "";

        // Set the image source based on the container ID
        if (containerId === "particles-js1") {
          imageSrc = "images/StarCoin.png"; // Replace with the actual path to your image file for container 1
        } else if (containerId === "particles-js2") {
          imageSrc = "images/StarPurpe.png"; // Replace with the actual path to your image file for container 2
        } else if (containerId === "particles-js3") {
          imageSrc = "images/StarBlue.png"; // Replace with the actual path to your image file for container 3
        } else if (containerId === "particles-js4") {
          imageSrc = "images/StarWhite.png"; // Replace with the actual path to your image file for container 4
        }

        initializeParticles(containerId, {
          particles: {
            number: {
              value: 100, // Adjust the number of particles as desired
              density: {
                enable: true,
                value_area: 400
              }
            },
            color: {
              value: ["#fff"] // Set the color of the particles
            },
            shape: {
              type: "image",
              image: {
                src: imageSrc
              },
              stroke: {
                width: 0,
                color: ["#B558DA", "#F070EC", "#F27CF4"]
              },
            },
            opacity: {
              value: 1,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.3,
                sync: false
              }
            },
            size: {
              value: 14, // Adjust the size of the particles
              random: true,
              anim: {
                enable: false,
                speed: 60,
                size_min: 1,
                sync: false
              }
            },
            line_linked: {
              enable: false,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2, // Adjust the speed of particle movement
              direction: "none",
              random: false,
              straight: false,
              out_mode: "bounce",
              bounce: false,
              attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: false,
                mode: "repulse"
              },
              onclick: {
                enable: false,
                mode: "grab"
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 100,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
          });

        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection);

  const particlesContainers = document.querySelectorAll('.particles-container');

  particlesContainers.forEach((container) => {
    observer.observe(container);
  });
});