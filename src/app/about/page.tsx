"use client";

export default function About() {
  return (
    <div className="px-4 md:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">À Propos de Nous</h1>
        <p className="text-sm md:text-base text-gray-600">Découvrez notre histoire et notre mission</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notre Histoire</h2>
          <p className="text-gray-600 mb-4">
            Fondée avec la vision de rendre le commerce électronique plus accessible et plus humain,
            notre entreprise s&apos;efforce depuis ses débuts de créer une expérience d&apos;achat exceptionnelle
            pour nos clients.
          </p>
          <p className="text-gray-600">
            Nous avons commencé comme une petite boutique en ligne et avons grandi grâce à notre
            engagement envers la qualité et le service client. Aujourd&apos;hui, nous sommes fiers de
            servir des clients dans le monde entier.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notre Mission</h2>
          <p className="text-gray-600 mb-4">
            Notre mission est de fournir des produits de haute qualité à des prix compétitifs,
            tout en offrant une expérience d&apos;achat simple et agréable. Nous croyons que le
            commerce électronique devrait être accessible à tous.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Qualité garantie sur tous nos produits</li>
            <li>Service client réactif et professionnel</li>
            <li>Livraison rapide et sécurisée</li>
            <li>Prix compétitifs et transparents</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Nos Valeurs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Qualité</h3>
              <p className="text-gray-600">Nous ne proposons que des produits qui répondent à nos normes élevées.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Innovation</h3>
              <p className="text-gray-600">Nous cherchons constamment à améliorer notre service et nos produits.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Intégrité</h3>
              <p className="text-gray-600">Nous menons nos affaires avec honnêteté et transparence.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Service</h3>
              <p className="text-gray-600">La satisfaction de nos clients est notre priorité absolue.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Notre Équipe</h2>
          <p className="text-gray-600 mb-4">
            Notre équipe est composée de professionnels passionnés qui travaillent dur pour
            vous offrir la meilleure expérience d&apos;achat possible. Nous sommes fiers de notre
            diversité et de notre engagement envers l&apos;excellence.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="font-medium text-gray-800">+50</p>
              <p className="text-gray-600">Employés</p>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-800">+10000</p>
              <p className="text-gray-600">Clients Satisfaits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}