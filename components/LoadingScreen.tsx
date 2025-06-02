interface LoadingScreenProps {
  diagnosticInfo?: string | null
}

export default function LoadingScreen({ diagnosticInfo }: LoadingScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Carregando portfólio...</p>
        {diagnosticInfo && <p className="mt-2 text-xs text-gray-500 max-w-md mx-auto">{diagnosticInfo}</p>}
      </div>
    </div>
  )
}
