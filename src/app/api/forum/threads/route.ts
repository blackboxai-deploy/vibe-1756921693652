import { NextRequest, NextResponse } from 'next/server';

interface Thread {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  createdAt: string;
  isSticky?: boolean;
  tags: string[];
  votes: number;
}

const mockThreads: Thread[] = [
  {
    id: "1",
    title: "Nouvelle technique d'analyse de métadonnées avec ExifTool",
    content: "Je viens de découvrir une nouvelle approche pour extraire des métadonnées cachées...",
    author: "AnalysteOSINT",
    category: "tools",
    replies: 23,
    views: 456,
    lastActivity: "2024-03-15T14:30:00Z",
    createdAt: "2024-03-14T09:15:00Z",
    isSticky: true,
    tags: ["exiftool", "métadonnées", "images"],
    votes: 15
  },
  {
    id: "2",
    title: "Étude de cas : Retrouver l'origine d'une photo avec géolocalisation",
    content: "Voici comment j'ai réussi à identifier la localisation exacte d'une photo...",
    author: "InvestigatorPro",
    category: "cases",
    replies: 15,
    views: 234,
    lastActivity: "2024-03-15T12:45:00Z",
    createdAt: "2024-03-13T16:20:00Z",
    tags: ["géolocalisation", "photo", "investigation"],
    votes: 8
  },
  {
    id: "3",
    title: "Guide complet : OSINT sur les réseaux sociaux en 2024",
    content: "Mise à jour complète des techniques OSINT pour les réseaux sociaux...",
    author: "SocialIntel",
    category: "tutorials",
    replies: 34,
    views: 1234,
    lastActivity: "2024-03-14T18:30:00Z",
    createdAt: "2024-03-12T10:00:00Z",
    tags: ["réseaux sociaux", "guide", "2024"],
    votes: 42
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'recent';

    let filteredThreads = [...mockThreads];

    // Filtrer par catégorie
    if (category && category !== 'all') {
      filteredThreads = filteredThreads.filter(thread => thread.category === category);
    }

    // Filtrer par recherche
    if (search) {
      const searchLower = search.toLowerCase();
      filteredThreads = filteredThreads.filter(thread => 
        thread.title.toLowerCase().includes(searchLower) ||
        thread.content.toLowerCase().includes(searchLower) ||
        thread.author.toLowerCase().includes(searchLower) ||
        thread.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Trier
    switch (sort) {
      case 'popular':
        filteredThreads.sort((a, b) => b.votes - a.votes);
        break;
      case 'replies':
        filteredThreads.sort((a, b) => b.replies - a.replies);
        break;
      case 'views':
        filteredThreads.sort((a, b) => b.views - a.views);
        break;
      case 'recent':
      default:
        filteredThreads.sort((a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
        break;
    }

    return NextResponse.json({
      success: true,
      data: filteredThreads,
      total: filteredThreads.length
    });

  } catch (error) {
    console.error('Erreur récupération threads:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des discussions' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, category, tags, author } = await request.json();

    if (!title || !content || !category || !author) {
      return NextResponse.json(
        { error: 'Titre, contenu, catégorie et auteur requis' }, 
        { status: 400 }
      );
    }

    const newThread: Thread = {
      id: Date.now().toString(),
      title,
      content,
      author,
      category,
      replies: 0,
      views: 0,
      lastActivity: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      tags: tags || [],
      votes: 0
    };

    // Dans un vrai système, on sauvegarderait en base de données
    mockThreads.unshift(newThread);

    return NextResponse.json({
      success: true,
      data: newThread,
      message: 'Discussion créée avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur création thread:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création de la discussion' }, 
      { status: 500 }
    );
  }
}