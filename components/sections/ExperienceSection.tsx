interface ExperienceItem {
  title: string
  company: string
  period: string
  description: string[]
  borderColor: string
}

const experiences: ExperienceItem[] = [
  {
    title: "Desenvolvedor Full Stack",
    company: "Empresa XYZ",
    period: "2023 - Presente",
    description: [
      "Desenvolvimento de aplicações web usando React, Node.js e TypeScript",
      "Implementação de APIs RESTful e integração com bancos de dados",
      "Colaboração em equipes ágeis usando metodologias Scrum",
    ],
    borderColor: "border-blue-600",
  },
  {
    title: "Desenvolvedor Frontend",
    company: "Startup ABC",
    period: "2022 - 2023",
    description: [
      "Criação de interfaces responsivas e acessíveis",
      "Otimização de performance e SEO",
      "Implementação de testes automatizados",
    ],
    borderColor: "border-green-600",
  },
]

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Experiência</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={index} className={`bg-white rounded-lg p-6 shadow-md border-l-4 ${experience.borderColor}`}>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{experience.title}</h3>
                  <span className="text-gray-500 text-sm">{experience.period}</span>
                </div>
                <p className="text-gray-600 mb-3">{experience.company}</p>
                <ul className="text-gray-700 space-y-1">
                  {experience.description.map((item, itemIndex) => (
                    <li key={itemIndex}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
