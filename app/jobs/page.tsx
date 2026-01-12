'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description: string;
  postedDate: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Charger la liste des offres d'emploi depuis l'API
    // Pour l'instant, on simule des données
    setTimeout(() => {
      setJobs([
        {
          id: '1',
          title: 'Développeur Frontend React',
          company: 'Tech Company',
          location: 'Paris, France',
          type: 'CDI',
          description: 'Nous recherchons un développeur frontend expérimenté...',
          postedDate: '2026-01-10'
        },
        {
          id: '2',
          title: 'Développeur Backend Node.js',
          company: 'Startup Inc',
          location: 'Lyon, France',
          type: 'CDD',
          description: 'Rejoignez notre équipe dynamique pour développer...',
          postedDate: '2026-01-08'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Chargement des offres...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Offres d'emploi</h1>
      
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <p className="text-gray-600">Aucune offre d'emploi disponible pour le moment.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {job.title}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <strong>{job.company}</strong> • {job.location} • {job.type}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {job.description}
                  </p>
                  <p className="text-sm text-gray-500">
                    Publié le {new Date(job.postedDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <div className="ml-4">
                  <Link 
                    href={`/jobs/${job.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md inline-block"
                  >
                    Voir détails
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
