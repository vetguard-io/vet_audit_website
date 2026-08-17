import { Check, Zap } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    'SOAP note analysis with vet-specific abbreviations',
    'Confidence scoring (high/medium/low)',
    'Multi-clinic support',
    'Weekly email digest (coming soon)',
    'Staff training module (coming soon)',
    'API access for integrations',
    'ezyVet integration',
    'Cornerstone integration',
    'Manual paste support'
  ]

  const integrations = [
    { name: 'ezyVet', desc: 'Auto-pull SOAP notes and invoices. Seamless workflow.' },
    { name: 'Cornerstone', desc: 'Auto-pull SOAP notes and invoices. Seamless workflow.' },
    { name: 'Manual paste', desc: 'Works with any PIMS system. Copy-paste in seconds.' }
  ]

  return (
    <section id="features" className="bg-gray-900 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Built for vet practices</h2>
          <p className="text-xl text-gray-400">Works seamlessly with your existing tools</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-8">Features</h3>
            <div className="space-y-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8">Integrations</h3>
            <div className="space-y-4">
              {integrations.map((integration, i) => (
                <div key={i} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:shadow-lg hover:shadow-black/20 transition">
                  <div className="flex items-start gap-3 mb-2">
                    <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <h4 className="font-bold text-gray-100">{integration.name}</h4>
                  </div>
                  <p className="text-gray-400 text-sm">{integration.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6">Security & compliance</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="font-bold mb-2">Encryption</p>
              <p className="text-gray-400">SOAP notes encrypted at rest and in transit</p>
            </div>
            <div>
              <p className="font-bold mb-2">Privacy</p>
              <p className="text-gray-400">We never sell or share your data</p>
            </div>
            <div>
              <p className="font-bold mb-2">Data retention</p>
              <p className="text-gray-400">Deleted 30 days after cancellation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
