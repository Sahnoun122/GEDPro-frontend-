'use client';

import { useParams } from 'next/navigation';

export default function JobDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Détails de l'offre d'emploi
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Job: {slug}
        </h2>
        <p className="text-gray-600">
          Page de détail de l'offre d'emploi en cours de développement.
        </p>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mr-2">
            Postuler
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md">
            Retour
          </button>
        </div>
      </div>
    </div>
  );
}
