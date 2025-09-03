import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { input } = await request.json();
    
    if (!input) {
      return NextResponse.json({ error: 'Texte à analyser requis' }, { status: 400 });
    }

    // Regex pour extraire les emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const extractedEmails = input.match(emailRegex) || [];
    
    // Simulation d'une analyse d'emails OSINT
    const mockAnalysis = {
      input_text: input.substring(0, 200) + (input.length > 200 ? '...' : ''),
      timestamp: new Date().toISOString(),
      extraction_results: {
        total_emails_found: extractedEmails.length,
        unique_emails: [...new Set(extractedEmails)],
        domains_found: [...new Set(extractedEmails.map((email: string) => email.split('@')[1]))],
        patterns_detected: [
          "Format standard d'email détecté",
          "Domaines professionnels identifiés",
          "Adresses personnelles trouvées"
        ]
      },
      detailed_analysis: extractedEmails.slice(0, 5).map((email: string, index: number) => ({
        email: email,
        domain: email.split('@')[1],
        validation: {
          format_valid: true,
          disposable: false,
          role_based: email.startsWith('admin@') || email.startsWith('info@') || email.startsWith('contact@'),
          mx_record_exists: true
        },
        osint_data: {
          social_media: {
            found_on_platforms: index % 3 === 0 ? ['LinkedIn', 'Twitter'] : index % 2 === 0 ? ['Facebook'] : [],
            profile_links: index % 3 === 0 ? ['https://linkedin.com/in/profile'] : []
          },
          breach_databases: {
            found_in_breaches: index === 0 ? ['Adobe (2013)', 'LinkedIn (2016)'] : [],
            risk_level: index === 0 ? 'medium' : 'low',
            last_breach: index === 0 ? '2016-05-17' : null
          },
          domain_info: {
            company: index % 2 === 0 ? 'Example Corp' : 'Personal Domain',
            industry: index % 2 === 0 ? 'Technology' : 'Individual',
            employee_count: index % 2 === 0 ? '50-100' : 'N/A'
          }
        },
        reputation: {
          spam_score: Math.floor(Math.random() * 20),
          blacklisted: false,
          trust_score: 85 - (index * 5)
        }
      })),
      domain_analysis: [...new Set(extractedEmails.map((email: string) => email.split('@')[1]))].slice(0, 3).map((domain: string) => ({
        domain: domain,
        type: domain.includes('gmail') || domain.includes('yahoo') || domain.includes('hotmail') ? 'Personal' : 'Professional',
        mx_records: [`mail.${domain}`, `smtp.${domain}`],
        security: {
          spf_record: true,
          dmarc_policy: 'quarantine',
          dkim_enabled: true
        },
        company_info: {
          name: domain.includes('gmail') ? 'Google Inc.' : `${domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1)} Corp`,
          employees_found: Math.floor(Math.random() * 50) + 10,
          estimated_size: 'Medium'
        }
      })),
      statistics: {
        personal_emails: extractedEmails.filter((email: string) => 
          email.includes('gmail') || email.includes('yahoo') || email.includes('hotmail')
        ).length,
        professional_emails: extractedEmails.filter((email: string) => 
          !email.includes('gmail') && !email.includes('yahoo') && !email.includes('hotmail')
        ).length,
        most_common_domain: extractedEmails.length > 0 ? 
          extractedEmails.map((email: string) => email.split('@')[1])
            .sort((a: string, b: string) => 
              extractedEmails.filter((v: string) => v.split('@')[1] === a).length - 
              extractedEmails.filter((v: string) => v.split('@')[1] === b).length
            ).pop() : 'N/A'
      },
      recommendations: [
        "Vérifier la validité des adresses avec un service de validation",
        "Rechercher les emails dans les bases de données de failles",
        "Analyser les domaines pour obtenir plus d'informations sur les organisations",
        "Utiliser les réseaux sociaux pour trouver plus d'informations sur les personnes",
        "Croiser les informations avec d'autres sources OSINT"
      ],
      privacy_notes: [
        "Respecter les réglementations sur la protection des données",
        "Ne pas utiliser ces informations à des fins malveillantes",
        "Vérifier la légalité de l'utilisation dans votre juridiction"
      ]
    };

    // Simulation d'un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500));

    return NextResponse.json({
      success: true,
      data: mockAnalysis
    });

  } catch (error) {
    console.error('Erreur analyse email:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'analyse des emails' }, 
      { status: 500 }
    );
  }
}