"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HomePage() {
  const [stats] = useState({
    totalAnalyses: 12450,
    activeUsers: 2847,
    forumPosts: 8392,
    toolsAvailable: 8
  });

  const features = [
    {
      title: "Analyse de Domaines",
      description: "WHOIS, DNS, sous-domaines et historique de sécurité",
      category: "Network Intelligence"
    },
    {
      title: "Métadonnées d'Images", 
      description: "Extraction EXIF, géolocalisation et analyse forensique",
      category: "Media Analysis"
    },
    {
      title: "Scanner d'URLs",
      description: "Vérification de sécurité, redirections et réputation",
      category: "Web Security"
    },
    {
      title: "Extracteur d'Emails",
      description: "Recherche et validation d'adresses depuis du texte",
      category: "Contact Intelligence"
    },
    {
      title: "Forum Communautaire",
      description: "Partage de techniques et discussion de cas d'études",
      category: "Community"
    },
    {
      title: "Rapports Détaillés",
      description: "Export PDF/JSON avec visualisations avancées",
      category: "Reporting"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-cyan-400">OSINT</div>
              <Badge variant="secondary" className="bg-cyan-900/30 text-cyan-300">
                Intelligence Platform
              </Badge>
            </div>
            <div className="flex space-x-4">
              <Link href="/tools">
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  Outils
                </Button>
              </Link>
              <Link href="/forum">
                <Button variant="ghost" className="text-slate-300 hover:text-white">
                  Forum
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white">
                  Connexion
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Plateforme OSINT Professionnelle
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Analysez, enquêtez et collaborez avec notre suite complète d'outils 
            Open Source Intelligence et notre communauté d'experts.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/tools">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
                Commencer l'Analyse
              </Button>
            </Link>
            <Link href="/forum">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Rejoindre la Communauté
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.totalAnalyses.toLocaleString()}</div>
            <div className="text-slate-400">Analyses Effectuées</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.activeUsers.toLocaleString()}</div>
            <div className="text-slate-400">Utilisateurs Actifs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.forumPosts.toLocaleString()}</div>
            <div className="text-slate-400">Posts Forum</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.toolsAvailable}</div>
            <div className="text-slate-400">Outils Disponibles</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-cyan-500/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                  <Badge variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                    {feature.category}
                  </Badge>
                </div>
                <CardDescription className="text-slate-400">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-12 border border-slate-700">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Prêt à commencer votre investigation ?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Accédez à nos outils OSINT professionnels et rejoignez une communauté 
            d'analystes partageant leurs expertises.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/tools">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
                Explorer les Outils
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                En Savoir Plus
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}