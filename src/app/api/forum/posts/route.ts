import { NextRequest, NextResponse } from 'next/server';

interface Post {
  id: string;
  threadId: string;
  content: string;
  author: string;
  createdAt: string;
  votes: number;
  isAnswer?: boolean;
}

const mockPosts: Post[] = [
  {
    id: "p1",
    threadId: "1",
    content: "Excellente approche ! J'ai testé cette méthode sur plusieurs images et les résultats sont impressionnants. Avez-vous essayé avec des images en RAW ?",
    author: "PhotoForensics",
    createdAt: "2024-03-14T11:20:00Z",
    votes: 5
  },
  {
    id: "p2", 
    threadId: "1",
    content: "Merci pour ce partage ! Une question : est-ce que cette technique fonctionne également avec les images qui ont été recompressées ?",
    author: "OSINTLearner",
    createdAt: "2024-03-14T15:45:00Z",
    votes: 2
  },
  {
    id: "p3",
    threadId: "2",
    content: "Fantastique case study ! La partie sur l'analyse des ombres pour déterminer l'heure est particulièrement intelligente.",
    author: "GeoAnalyst",
    createdAt: "2024-03-13T18:30:00Z",
    votes: 7,
    isAnswer: true
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get('threadId');

    if (!threadId) {
      return NextResponse.json(
        { error: 'ID de discussion requis' }, 
        { status: 400 }
      );
    }

    const posts = mockPosts
      .filter(post => post.threadId === threadId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return NextResponse.json({
      success: true,
      data: posts,
      total: posts.length
    });

  } catch (error) {
    console.error('Erreur récupération posts:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { threadId, content, author } = await request.json();

    if (!threadId || !content || !author) {
      return NextResponse.json(
        { error: 'ID discussion, contenu et auteur requis' }, 
        { status: 400 }
      );
    }

    const newPost: Post = {
      id: `p${Date.now()}`,
      threadId,
      content,
      author,
      createdAt: new Date().toISOString(),
      votes: 0
    };

    // Dans un vrai système, on sauvegarderait en base de données
    mockPosts.push(newPost);

    return NextResponse.json({
      success: true,
      data: newPost,
      message: 'Message posté avec succès'
    }, { status: 201 });

  } catch (error) {
    console.error('Erreur création post:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du message' }, 
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { postId, action } = await request.json();

    if (!postId || !action) {
      return NextResponse.json(
        { error: 'ID du message et action requis' }, 
        { status: 400 }
      );
    }

    const post = mockPosts.find(p => p.id === postId);
    if (!post) {
      return NextResponse.json(
        { error: 'Message non trouvé' }, 
        { status: 404 }
      );
    }

    // Gérer les votes
    if (action === 'upvote') {
      post.votes += 1;
    } else if (action === 'downvote') {
      post.votes -= 1;
    } else if (action === 'mark_answer') {
      post.isAnswer = true;
    }

    return NextResponse.json({
      success: true,
      data: post,
      message: 'Action effectuée avec succès'
    });

  } catch (error) {
    console.error('Erreur mise à jour post:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du message' }, 
      { status: 500 }
    );
  }
}