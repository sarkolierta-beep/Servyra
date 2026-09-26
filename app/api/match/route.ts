import { NextResponse } from 'next/server';

const categories = ['Débarras','Ménage','Jardinage','Déménagement','Montage de meubles','Petits travaux','Transport','Autre'];

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const text = `${body.description || ''} ${body.category || ''}`.toLowerCase();
  const rules: Record<string,string[]> = {
    'Débarras':['canapé','encombrant','débarras','jeter','vide maison'],
    'Ménage':['ménage','nettoyage','nettoyer','vitres'],
    'Jardinage':['jardin','haie','pelouse','tondre','arbre'],
    'Déménagement':['déménagement','cartons','meuble à déplacer'],
    'Montage de meubles':['ikea','montage','meuble à monter'],
    'Petits travaux':['bricolage','peinture','fixer','réparer'],
    'Transport':['transport','livrer','livraison','camionnette']
  };
  let category = categories.includes(body.category) ? body.category : 'Autre';
  let score = 0.45;
  for (const [candidate, words] of Object.entries(rules)) {
    const hits = words.filter(w => text.includes(w)).length;
    if (hits > 0 && hits / words.length > score - 0.35) { category = candidate; score = Math.min(0.98, 0.62 + hits * 0.08); }
  }
  return NextResponse.json({ category, score: Number(score.toFixed(2)), message: `Catégorie détectée : ${category}` });
}