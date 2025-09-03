"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function ProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [user, setUser] = useState<any>(null);

  const mockUser = {
    username: "OSINTExpert",
    email: "expert@osint.com",
    joinDate: "Mars 2023",
    reputation: 1247,
    totalAnalyses: 143,
    forumPosts: 67,
    level: "Expert",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/86230c79-fcd3-41d4-a213-1852c86c6128.png"
  };

  const recentAnalyses = [
    {
      id: "1",
      type: "Domain Analysis",
      target: "suspicious-site.com",
      timestamp: "Il y a 2h",
      status: "completed",
      results: "Domaine créé récemment, serveurs suspects"
    },
    {
      id: "2", 
      type: "Image Metadata",
      target: "photo_evidence.jpg",
      timestamp: "Il y a 5h",
      status: "completed",
      results: "GPS: 48.8566° N, 2.3522° E (Paris)"
    },
    {
      id: "3",
      type: "URL Scanner",
      target: "phishing-attempt.net",
      timestamp: "Il y a 1 jour",
      status: "completed",
      results: "Site malveillant confirmé"
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de connexion
    if (loginData.username && loginData.password) {
      setIsLoggedIn(true);
      setUser(mockUser);
      localStorage.setItem('osint_user', JSON.stringify(mockUser));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('osint_user');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('osint_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Header Navigation */}
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-2xl font-bold text-cyan-400">OSINT</Link>
                <Badge variant="secondary" className="bg-purple-900/30 text-purple-300">
                  Authentification
                </Badge>
              </div>
              <div className="flex space-x-4">
                <Link href="/"><Button variant="ghost" className="text-slate-300 hover:text-white">Accueil</Button></Link>
                <Link href="/tools"><Button variant="ghost" className="text-slate-300 hover:text-white">Outils</Button></Link>
                <Link href="/forum"><Button variant="ghost" className="text-slate-300 hover:text-white">Forum</Button></Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-md mx-auto px-4 py-16">
          <Card className="bg-slate-900/50 border-slate-700">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-white mb-2">Connexion OSINT</CardTitle>
              <CardDescription className="text-slate-400">
                Accédez à votre dashboard personnel et à l'historique de vos analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-2">
                    Nom d'utilisateur
                  </label>
                  <Input
                    value={loginData.username}
                    onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                    placeholder="Votre nom d'utilisateur"
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-2">
                    Mot de passe
                  </label>
                  <Input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    placeholder="Votre mot de passe"
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                >
                  Se connecter
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-slate-400 text-sm">
                  Pas encore de compte ?{" "}
                  <Button variant="link" className="text-cyan-400 p-0 h-auto">
                    S'inscrire ici
                  </Button>
                </p>
              </div>

              <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
                <p className="text-xs text-slate-400">
                  <strong>Demo:</strong> Utilisez n'importe quel nom d'utilisateur et mot de passe pour accéder au dashboard de démonstration.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-cyan-400">OSINT</Link>
              <Badge variant="secondary" className="bg-purple-900/30 text-purple-300">
                Dashboard Personnel
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-slate-300">Bienvenue, {user.username}</span>
              <Button variant="outline" onClick={handleLogout} className="border-slate-600 text-slate-300 hover:bg-slate-800">
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Dashboard Personnel
          </h1>
          <p className="text-slate-300 text-lg">
            Gérez votre profil et consultez l'historique de vos analyses OSINT
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader className="text-center">
                <img
                  src={user.avatar}
                  alt="Avatar utilisateur"
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                  onError={(e) => {
                    e.currentTarget.src = "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7da9b382-3a46-4a81-8e77-73640273727e.png";
                  }}
                />
                <CardTitle className="text-white">{user.username}</CardTitle>
                <Badge variant="secondary" className="bg-cyan-900/30 text-cyan-300">
                  {user.level}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-slate-400">Réputation</div>
                  <div className="text-xl font-bold text-cyan-400">{user.reputation}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Analyses Totales</div>
                  <div className="text-xl font-bold text-white">{user.totalAnalyses}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Posts Forum</div>
                  <div className="text-xl font-bold text-white">{user.forumPosts}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Membre depuis</div>
                  <div className="text-white">{user.joinDate}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="recent" className="space-y-6">
              <TabsList className="bg-slate-900 border border-slate-700">
                <TabsTrigger value="recent" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
                  Analyses Récentes
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
                  Paramètres
                </TabsTrigger>
                <TabsTrigger value="stats" className="data-[state=active]:bg-slate-700 text-slate-300 data-[state=active]:text-white">
                  Statistiques
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="space-y-4">
                <Card className="bg-slate-900/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Analyses Récentes</CardTitle>
                    <CardDescription className="text-slate-400">
                      Historique de vos dernières investigations OSINT
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAnalyses.map((analysis) => (
                        <div key={analysis.id} className="p-4 bg-slate-800 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-white">{analysis.type}</h4>
                              <p className="text-sm text-slate-300">Cible: {analysis.target}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant="secondary" className="bg-green-900/30 text-green-300 mb-1">
                                {analysis.status}
                              </Badge>
                              <p className="text-xs text-slate-400">{analysis.timestamp}</p>
                            </div>
                          </div>
                          <p className="text-sm text-slate-400">{analysis.results}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card className="bg-slate-900/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Paramètres du Profil</CardTitle>
                    <CardDescription className="text-slate-400">
                      Modifiez vos informations personnelles
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-300 block mb-2">
                        Email
                      </label>
                      <Input
                        defaultValue={user.email}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-300 block mb-2">
                        Nom d'utilisateur
                      </label>
                      <Input
                        defaultValue={user.username}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                      Sauvegarder les Modifications
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-slate-900/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Analyses par Type</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Domaines</span>
                        <span className="text-white font-semibold">45</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Images</span>
                        <span className="text-white font-semibold">38</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">URLs</span>
                        <span className="text-white font-semibold">34</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Emails</span>
                        <span className="text-white font-semibold">26</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Activité Forum</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Sujets créés</span>
                        <span className="text-white font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Réponses</span>
                        <span className="text-white font-semibold">55</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Likes reçus</span>
                        <span className="text-white font-semibold">234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Likes donnés</span>
                        <span className="text-white font-semibold">156</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}