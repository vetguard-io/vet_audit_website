import { TrendingUp, Clock, AlertCircle } from 'lucide-react'

export default function ProblemSection() {
  const problems = [
    {
      icon: TrendingUp,
      title: '10-15% revenue loss',
      description: 'Clinics unknowingly lose $100-150K annually from unbilled services'
    },
    {
      icon: Clock,
      title: 'Manual audits are painful',
      description: 'Billing staff manually review charts for hours, still miss charges'
    },
    {
      icon: AlertCircle,
      title: 'No existing solution',
      description: 'Generic billing tools are $10K+/month and not built for vet practices'
    }
  ]

  return (
    <section className="bg-gray-900 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The problem</h2>
          <p className="text-xl text-gray-400">Billing leakage is costing you real money</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, i) => (
            <div key={i} className="bg-gray-800 p-8 rounded-lg border border-gray-700 hover:shadow-lg hover:shadow-black/20 transition">
              <problem.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">{problem.title}</h3>
              <p className="text-gray-400">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-950/50 border border-blue-800 rounded-lg p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-4 text-center">The cost of inaction</h3>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-blue-500 mb-2">$100K</p>
              <p className="text-gray-400">Annual loss for $1M clinic</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-500 mb-2">3-5</p>
              <p className="text-gray-400">Missed charges per day</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-500 mb-2">40 hrs</p>
              <p className="text-gray-400">Manual audit hours yearly</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-blue-500 mb-2">15%</p>
              <p className="text-gray-400">Revenue leakage rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
