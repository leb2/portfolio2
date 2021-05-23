export const PARTICLES_CONFIG =
    {
      fpsLimit: 30,
      particles: {
        number: {
          value: 40,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#3c5664"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
          polygon: {
            nb_sides: 5
          },
          image: {
            src: "images/github.svg",
            width: 100,
            height: 100
          }
        },
        opacity: {
          value: 1,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 2,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#3c5664",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onHover: {
            enable: true,
            mode: "bubble",
            parallax: {
              enable: false,
              force: 60,
              smooth: 10
            }
          },
          onClick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            lineLinked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 5,
            duration: 5,
            opacity: 1,
            speed: 3
          },
          repulse: {
            distance: 200
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
    }

