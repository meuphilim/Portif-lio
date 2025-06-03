/**
 * Template para criar novas seções do portfólio
 *
 * Para usar este template:
 * 1. Copie este arquivo
 * 2. Renomeie para o nome da sua seção (ex: TestimonialsSection.tsx)
 * 3. Substitua os comentários TODO com seu conteúdo
 * 4. Ajuste as props conforme necessário
 * 5. Importe e use na página principal
 */

interface SectionTemplateProps {
  // TODO: Defina as props necessárias para sua seção
  title?: string;
  data?: any[];
  // Adicione outras props conforme necessário
}

export default function SectionTemplate({ title = 'Nova Seção', data = [] }: SectionTemplateProps) {
  return (
    <section
      id="nova-secao" // TODO: Altere o ID para corresponder à sua seção
      className="py-16 bg-white" // TODO: Ajuste as classes de estilo conforme necessário
    >
      <div className="container mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {/* TODO: Adicione um emoji e título apropriados */}🎯 {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {/* TODO: Adicione uma descrição da seção */}
            Descrição da nova seção do portfólio.
          </p>
        </div>

        {/* Conteúdo Principal */}
        <div className="max-w-6xl mx-auto">
          {/* TODO: Implemente o layout da sua seção */}

          {/* Exemplo de grid para cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow"
              >
                {/* TODO: Customize o conteúdo do card */}
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Item {index + 1}</h3>
                <p className="text-gray-600">Conteúdo do item...</p>
              </div>
            ))}
          </div>

          {/* Exemplo de conteúdo centralizado */}
          <div className="text-center mt-12">
            {/* TODO: Adicione call-to-action ou conteúdo adicional */}
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Ação Principal
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Exemplos de variações de layout:
 *
 * 1. Seção com fundo colorido:
 * className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100"
 *
 * 2. Seção com fundo escuro:
 * className="py-16 bg-gray-900 text-white"
 *
 * 3. Layout de duas colunas:
 * <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
 *
 * 4. Timeline vertical:
 * <div className="space-y-8">
 *   {data.map((item, index) => (
 *     <div key={index} className="flex items-start space-x-4">
 *       <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
 *       <div className="flex-1">...</div>
 *     </div>
 *   ))}
 * </div>
 *
 * 5. Cards com hover effects:
 * className="transform hover:scale-105 transition-transform duration-300"
 */
