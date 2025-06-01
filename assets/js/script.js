document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Portfólio carregado com sucesso!")

  // Rolagem suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Animação de entrada para os cards de projeto
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Aplicar animação aos cards de projeto
  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
    observer.observe(card)
  })

  // Tooltip para segmentos da barra de linguagens
  document.querySelectorAll(".language-segment").forEach((segment) => {
    segment.addEventListener("mouseenter", function (e) {
      const tooltip = document.createElement("div")
      tooltip.className = "language-tooltip"
      tooltip.textContent = this.title
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        white-space: nowrap;
      `
      document.body.appendChild(tooltip)

      const updatePosition = (e) => {
        tooltip.style.left = e.pageX + 10 + "px"
        tooltip.style.top = e.pageY - 30 + "px"
      }

      updatePosition(e)
      this.addEventListener("mousemove", updatePosition)

      this.addEventListener(
        "mouseleave",
        () => {
          tooltip.remove()
        },
        { once: true },
      )
    })
  })

  // Contador animado para estatísticas
  const animateCounters = () => {
    document.querySelectorAll(".stats-badges img").forEach((img) => {
      const src = img.src
      const match = src.match(/Total_de_Projetos-(\d+)/)
      if (match) {
        const finalCount = Number.parseInt(match[1])
        let currentCount = 0
        const increment = Math.ceil(finalCount / 30)

        const counter = setInterval(() => {
          currentCount += increment
          if (currentCount >= finalCount) {
            currentCount = finalCount
            clearInterval(counter)
          }
          img.src = src.replace(/Total_de_Projetos-\d+/, `Total_de_Projetos-${currentCount}`)
        }, 50)
      }
    })
  }

  // Executar contador quando a seção de stats for visível
  const statsSection = document.querySelector(".stats-section")
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters()
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 },
    )

    statsObserver.observe(statsSection)
  }
})
