"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Alex Richardson",
      role: "Lead OSINT Analyst", 
      expertise: "Digital Forensics, Threat Intelligence",
      avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b8e8c009-875a-4f0a-93cc-45c6cdd8e1b5.png"
    },
    {
      name: "Sarah Chen",
      role: "Social Media Intelligence",
      expertise: "Social Networks, People Search",
      avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1025c9bf-6eb9-4e3a-b8df-060dc04613c9.png"
    },
    {
      name: "Marcus Weber",
      role: "Technical Infrastructure",
      expertise: "Network Analysis, Domain Research",
      avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/dd7c6c4f-2dbd-4781-b4b8-9bdc282c55bd.png"
    },
    {
      name: "Emma Lopez",
      role: "Community Manager",
      expertise: "Education, Training, Support",
      avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/aaf973ac-32f6-4456-8847-cead39d5fb74.png"
    }
  ];

  const features = [
    {
      title: "Outils Professionnels",
      description: "Suite complète d'outils OSINT pour l'analyse de domaines, images, URLs et plus",
      icon: "🔧"
    },
    {
      title: "Forum Communautaire",
      description: "Espace de discussion pour partager techniques et cas d'études",
      icon: "💬"
    },
    {
      title: "Analyses Approfondies",
      description: "Métadonnées, géolocalisation, historique de sécurité et rapports détaillés",
      icon: "🔍"
    },
    {
      title: "Open Source",
      description: "Plateforme basée sur des outils et méthodologies open source",
      icon: "🌐"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-cyan-400">OSINT</Link>
              <Badge variant="secondary" className="bg-indigo-900/30 text-indigo-300">
                À Propos
              </Badge>
            </div>
            <div className="flex space-x-4">
              <Link href="/"><Button variant="ghost" className="text-slate-300 hover:text-white">Accueil</Button></Link>
              <Link href="/tools"><Button variant="ghost" className="text-slate-300 hover:text-white">Outils</Button></Link>
              <Link href="/forum"><Button variant="ghost" className="text-slate-300 hover:text-white">Forum</Button></Link>
              <Link href="/profile"><Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white">Profil</Button></Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            À Propos de la Plateforme
          </h1>
          <p className="text-xl text-slate-300 max-w-4xl mx-auto">
            Notre mission est de démocratiser l'accès aux outils d'Open Source Intelligence 
            et de créer une communauté d'analystes partageant leurs connaissances et expertises.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Notre Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto">
                Nous croyons que l'information ouverte et accessible est essentielle dans notre monde numérique. 
                Notre plateforme combine des outils OSINT professionnels avec une communauté active d'analystes, 
                de chercheurs et d'enquêteurs. Que vous soyez journaliste, enquêteur, chercheur en sécurité ou 
                simplement curieux, nos outils vous aideront à découvrir et analyser l'information publique 
                de manière éthique et responsable.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-900/50 border-slate-700 text-center">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Notre Équipe
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-slate-900/50 border-slate-700 text-center">
                <CardHeader>
                  <img
                    src={member.avatar}
                    alt={`${member.name} - ${member.role}`}
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                    onError={(e) => {
                      e.currentTarget.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c9c0bd12-d002-44df-8203-2bbaa08865ab.png";
                    }}
                  />
                  <CardTitle className="text-white text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-cyan-400 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm">
                    {member.expertise}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-16">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Technologies & Outils</CardTitle>
              <CardDescription className="text-slate-400 text-center">
                Aperçu des technologies qui alimentent notre plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Frontend</h3>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">Next.js 14</Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">React</Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">Tailwind CSS</Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">shadcn/ui</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">OSINT Tools</h3>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">WHOIS API</Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">DNS Analysis</Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">EXIF Extraction</Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">URL Scanning</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Backend</h3>
                  <div className="space-y-2">
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">Node.js</Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">API Routes</Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">TypeScript</Badge>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300">Vercel</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ethics Section */}
        <div className="mb-16">
          <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">Éthique & Responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-300 text-lg leading-relaxed max-w-4xl mx-auto mb-6">
                Nous nous engageons à promouvoir l'utilisation éthique des techniques OSINT. 
                Tous nos outils sont conçus pour analyser uniquement des informations publiquement 
                disponibles, dans le respect de la vie privée et des réglementations en vigueur.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">Données Publiques Uniquement</h4>
                  <p className="text-slate-400">Analyse limitée aux informations publiquement accessibles</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">Respect de la Vie Privée</h4>
                  <p className="text-slate-400">Protection des données personnelles et confidentielles</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">Usage Légal</h4>
                  <p className="text-slate-400">Conformité avec les lois et réglementations locales</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6 text-white">
                Rejoignez Notre Communauté
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                Commencez vos investigations OSINT dès aujourd'hui et connectez-vous 
                avec des experts du monde entier.
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/tools">
                  <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white px-8">
                    Explorer les Outils
                  </Button>
                </Link>
                <Link href="/forum">
                  <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                    Rejoindre le Forum
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}