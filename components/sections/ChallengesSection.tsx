'use client';
interface ChallengesSectionProps {
  title?: string;
  className?: string;
}

export default function ChallengesSection({
  title = 'Desafios e Aprendizados',
  className = 'py-16 bg-gradient-to-br from-blue-50 to-indigo-100',
}: ChallengesSectionProps) {
  return (
    <section id="desafios-aprendizados" className={className}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">🧠 {title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Principais desafios técnicos superados e aprendizados adquiridos no desenvolvimento de
            soluções digitais inovadoras.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Coluna de Desafios */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Principais Desafios Técnicos
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Performance vs Simplicidade</h4>
                  <p className="text-gray-600">
                    Equilibrar a performance do sistema com a simplicidade de uso, especialmente em
                    integrações de backend como autenticação e agendamento inteligente.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Arquitetura Escalável</h4>
                  <p className="text-gray-600">
                    Definir uma arquitetura escalável desde o início, pensando na manutenção e
                    futuras expansões - desafio comum em MVPs rápidos.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Conectividade Remota</h4>
                  <p className="text-gray-600">
                    Lidar com questões de conectividade em regiões remotas, onde fatores externos
                    influenciam diretamente na entrega do serviço.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Coluna de Aprendizados */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Aprendizados Significativos
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-indigo-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800">
                    Soluções para Necessidades Locais
                  </h4>
                  <p className="text-gray-600">
                    Transformar necessidades locais em soluções digitais viáveis, conectando
                    conhecimento técnico à realidade de pequenos negócios.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-indigo-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Experiência do Usuário</h4>
                  <p className="text-gray-600">
                    Priorizar a UX desde o primeiro rascunho, criando interfaces limpas, modernas e
                    acessíveis mesmo em soluções minimalistas.
                  </p>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-indigo-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-lg font-medium text-gray-800">Tecnologias Aplicadas</h4>
                  <p className="text-gray-600">
                    Domínio em infraestrutura de rede, automação CI/CD com GitHub Actions, e stacks
                    modernas como React, Next.js e TailwindCSS.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé da Seção */}
        <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-md border border-gray-100">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">💡 Nota Pessoal</h3>
          <p className="text-gray-600 mb-4">
            Encarar a criação de soluções locais como oportunidades de inovação é o que mais me
            motiva. Cada obstáculo vencido é também uma chance de gerar impacto positivo na vida
            real.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Como os desafios foram superados:</h4>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Busca por soluções inteligentes e bem documentadas</li>
              <li>Foco em entregas incrementais com testes em usuários reais</li>
              <li>Rota de melhorias constantes baseada em feedbacks</li>
              <li>Adaptação da stack conforme a maturidade do projeto</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
