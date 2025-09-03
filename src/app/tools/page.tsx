"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ToolsPage() {
  const [activeAnalysis, setActiveAnalysis] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const tools = [
    {
      id: "domain",
      title: "Analyseur de Domaine",
      description: "WHOIS, DNS, sous-domaines et historique de sécurité",
      category: "Network",
      color: "bg-blue-500"
    },
    {
      id: "image",
      title: "Métadonnées d'Images",
      description: "Extraction EXIF, géolocalisation et analyse forensique",
      category: "Media",
      color: "bg-green-500"
    },
    {
      id: "url",
      title: "Scanner d'URLs",
      description: "Vérification de sécurité, redirections et réputation",
      category: "Web Security",
      color: "bg-yellow-500"
    },
    {
      id: "email",
      title: "Extracteur d'Emails",
      description: "Recherche et validation d'adresses depuis du texte",
      category: "Contact Intel",
      color: "bg-purple-500"
    }
  ];

  const runAnalysis = async (toolId: string, input: string) => {
    setLoading(true);
    setActiveAnalysis(toolId);
    
    try {
      const response = await fetch(`/api/osint/${toolId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input })
      });
      
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setResults({ error: "Erreur lors de l'analyse" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-cyan-400">OSINT</Link>
              <Badge variant="secondary" className="bg-blue-900/30 text-blue-300">
                Outils d'Analyse
              </Badge>
            </div>
            <div className="flex space-x-4">
              <Link href="/"><Button variant="ghost" className="text-slate-300 hover:text-white">Accueil</Button></Link>
              <Link href="/forum"><Button variant="ghost" className="text-slate-300 hover:text-white">Forum</Button></Link>
              <Link href="/profile"><Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white">Profil</Button></Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Suite d'Outils OSINT
          </h1>
          <p className="text-slate-300 text-lg">
            Analysez des domaines, images, URLs et plus encore avec nos outils spécialisés
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tools Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Outils Disponibles</CardTitle>
                <CardDescription className="text-slate-400">Sélectionnez un outil pour commencer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {tools.map((tool) => (
                  <div
                    key={tool.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      activeAnalysis === tool.id 
                        ? 'border-cyan-500 bg-cyan-500/10' 
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                    onClick={() => setActiveAnalysis(tool.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white">{tool.title}</h3>
                      <div className={`w-3 h-3 rounded-full ${tool.color}`}></div>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">{tool.description}</p>
                    <Badge variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Analysis Area */}
          <div className="lg:col-span-2">
            {!activeAnalysis ? (
              <Card className="bg-slate-900/50 border-slate-700">
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-white mb-2">Sélectionnez un Outil</h3>
                  <p className="text-slate-400">Choisissez un outil dans la sidebar pour commencer votre analyse OSINT</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <AnalysisTool
                  tool={tools.find(t => t.id === activeAnalysis)!}
                  onAnalyze={runAnalysis}
                  loading={loading}
                  results={results}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisTool({ tool, onAnalyze, loading, results }: any) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAnalyze(tool.id, input.trim());
    }
  };

  const getPlaceholder = () => {
    switch (tool.id) {
      case "domain": return "exemple.com";
      case "image": return "Collez une URL d'image ou uploadez un fichier";
      case "url": return "https://exemple.com/page";
      case "email": return "Collez du texte contenant des emails";
      default: return "Entrez vos données à analyser";
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${tool.color}`}></div>
              {tool.title}
            </CardTitle>
            <CardDescription className="text-slate-400 mt-2">
              {tool.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-slate-800 text-slate-300">
            {tool.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getPlaceholder()}
              className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-cyan-500 hover:bg-cyan-600 text-white w-full"
          >
            {loading ? "Analyse en cours..." : "Lancer l'Analyse"}
          </Button>
        </form>

        {results && (
          <div className="mt-6 p-4 bg-slate-800 rounded-lg">
            <h4 className="font-semibold text-white mb-3">Résultats</h4>
            <pre className="text-sm text-slate-300 whitespace-pre-wrap">
              {JSON.stringify(results, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}