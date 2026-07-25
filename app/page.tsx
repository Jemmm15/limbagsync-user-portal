'use client';

import { useState } from 'react';
import { Users, Monitor, User } from 'lucide-react';

export default function LimbagSyncPortal() {
  const [selectedPortal, setSelectedPortal] = useState<string | null>(null);

  const portals = [
    {
      id: 'customer',
      title: 'Customer',
      description: 'Fast, account-free online ordering and order tracking.',
      icon: User,
    },
    {
      id: 'branch',
      title: 'Branch Staff',
      description: 'Daily operations portal for branch sales and print queues.',
      icon: Monitor,
    },
    {
      id: 'owner',
      title: 'Owner',
      description: 'Gain real-time insights with prescriptive alerts and centralized control.',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">LimbagSync User Portal</h1>
        <p className="text-gray-600 mb-8">Please select your portal to continue.</p>

        <div className="space-y-4">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.id}
                onClick={() => setSelectedPortal(portal.id)}
                className={`w-full p-4 rounded-2xl transition-all duration-200 flex items-start gap-4 border-l-4 ${
                  selectedPortal === portal.id
                    ? 'border-l-blue-600 bg-blue-100 shadow-md'
                    : 'border-l-blue-500 bg-blue-50 hover:bg-blue-100'
                }`}
              >
                <Icon className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 text-base">{portal.title}</h3>
                  <p className="text-gray-600 text-sm leading-snug">{portal.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        {selectedPortal && (
          <button className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200">
            Continue to {portals.find((p) => p.id === selectedPortal)?.title}
          </button>
        )}
      </div>
    </div>
  );
}
