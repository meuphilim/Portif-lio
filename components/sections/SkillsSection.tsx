interface SkillCategory {
  title: string
  icon: string
  skills: string[]
  color: string
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "🎨",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
    color: "blue-600",
  },
  {
    title: "Backend",
    icon: "⚙️",
    skills: ["Node.js", "Python", "Express.js", "PostgreSQL", "MongoDB", "REST APIs"],
    color: "green-600",
  },
  {
    title: "Ferramentas",
    icon: "🔧",
    skills: ["Git", "Docker", "AWS", "Vercel", "GitHub Actions", "VS Code"],
    color: "purple-600",
  },
]

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">🛠️ Habilidades Técnicas</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">{category.icon}</span>
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.skills.map((skill) => (
                  <div key={skill} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div className={`bg-${category.color} h-2 rounded-full`} style={{ width: "85%" }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
