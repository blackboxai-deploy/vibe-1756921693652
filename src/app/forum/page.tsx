"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Thread {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  isSticky?: boolean;
  tags: string[];
}

export default function ForumPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [threads, setThreads] = useState<Thread[]>([]);

  const categories = [
    { id: "all", name: "Toutes les Catégories", count: 156 },
    { id: "tools", name: "Outils OSINT", count: 43 },
    { id: "cases", name: "Études de Cas", count: 67 },
    { id: "tutorials", name: "Tutoriels", count: 28 },
    { id: "general", name: "Discussion Générale", count: 18 }
  ];

  const mockThreads: Thread[] = [
    {
      id: "1",
      title: "Nouvelle technique d'analyse de métadonnées avec ExifTool",
      author: "AnalysteOSINT",
      category: "tools",
      replies: 23,
      views: 456,
      lastActivity: "Il y a 2h",
      isSticky: true,
      tags: ["exiftool", "métadonnées", "images"]
    },
    {
      id: "2", 
      title: "Étude de cas : Retrouver l'origine d'une photo avec géolocalisation",
      author: "InvestigatorPro",
      category: "cases",
      replies: 15,
      views: 234,
      lastActivity: "Il y a 4h",
      tags: ["géolocalisation", "photo", "investigation"]
    },
    {
      id: "3",
      title: "Guide complet : OSINT sur les réseaux sociaux en 2024",
      author: "SocialIntel",
      category: "tutorials", 
      replies: 34,
      views: 1234,
      lastActivity: "Il y a 1 jour",
      tags: ["réseaux sociaux", "guide", "2024"]
    },
    {
      id: "4",
      title: "Outils automatisés vs analyse manuelle - votre avis ?",
      author: "OSINTNewbie",
      category: "general",
      replies: 8,
      views: 145,
      lastActivity: "Il y a 3h",
      tags: ["débat", "outils", "méthodologie"]
    },
    {
      id: "5",
      title: "Shodan + Censys : Comparaison des moteurs de recherche IoT",
      author: "TechAnalyst",
      category: "tools",
      replies: 19,
      views: 678,
      lastActivity: "Il y a 6h",
      tags: ["shodan", "censys", "iot", "comparaison"]
    }
  ];

  useEffect(() => {
    setThreads(mockThreads);
  }, []);

  const filteredThreads = threads.filter(thread => {
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         thread.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || thread.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      tools: "bg-blue-500",
      cases: "bg-green-500", 
      tutorials: "bg-yellow-500",
      general: "bg-purple-500"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-cyan-400">OSINT</Link>
              <Badge variant="secondary" className="bg-green-900/30 text-green-300">
                Forum Communautaire
              </Badge>
            </div>
            <div className="flex space-x-4">
              <Link href="/"><Button variant="ghost" className="text-slate-300 hover:text-white">Accueil</Button></Link>
              <Link href="/tools"><Button variant="ghost" className="text-slate-300 hover:text-white">Outils</Button></Link>
              <Link href="/profile"><Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white">Profil</Button></Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-green-500 bg-clip-text text-transparent">
            Forum OSINT
          </h1>
          <p className="text-slate-300 text-lg">
            Partagez vos techniques, posez vos questions et apprenez de la communauté
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Search */}
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Recherche</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Rechercher dans le forum..."
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="bg-slate-900/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Catégories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-cyan-500/20 border border-cyan-500'
                          : 'hover:bg-slate-800 border border-transparent'
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{category.name}</span>
                        <Badge variant="secondary" className="bg-slate-800 text-slate-300">
                          {category.count}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* New Thread Button */}
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                Nouveau Sujet
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedCategory === "all" ? "Tous les Sujets" : categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-slate-400 mt-1">
                    {filteredThreads.length} sujet{filteredThreads.length !== 1 ? 's' : ''} trouvé{filteredThreads.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Threads List */}
              <div className="space-y-3">
                {filteredThreads.map((thread) => (
                  <Card key={thread.id} className={`bg-slate-900/50 border-slate-700 hover:border-slate-600 cursor-pointer transition-colors ${thread.isSticky ? 'border-yellow-500/30' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {thread.isSticky && (
                              <Badge variant="secondary" className="bg-yellow-900/30 text-yellow-300 text-xs">
                                Épinglé
                              </Badge>
                            )}
                            <div className={`w-2 h-2 rounded-full ${getCategoryColor(thread.category)}`}></div>
                            <span className="text-sm text-slate-400 capitalize">
                              {categories.find(c => c.id === thread.category)?.name}
                            </span>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-white mb-2 hover:text-cyan-400 transition-colors">
                            {thread.title}
                          </h3>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                            <span>Par {thread.author}</span>
                            <span>•</span>
                            <span>{thread.replies} réponse{thread.replies !== 1 ? 's' : ''}</span>
                            <span>•</span>
                            <span>{thread.views} vue{thread.views !== 1 ? 's' : ''}</span>
                            <span>•</span>
                            <span>{thread.lastActivity}</span>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {thread.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredThreads.length === 0 && (
                  <Card className="bg-slate-900/50 border-slate-700">
                    <CardContent className="p-12 text-center">
                      <div className="text-4xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-white mb-2">Aucun sujet trouvé</h3>
                      <p className="text-slate-400">Essayez de modifier vos critères de recherche</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}