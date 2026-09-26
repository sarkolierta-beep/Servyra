'use client';

import { useState } from 'react';

const examples = [
  'Je dois débarrasser un canapé samedi matin à Paris 13e',
  'Je cherche quelqu’un pour monter une armoire IKEA demain',
  'Il me faut un petit transport avec camionnette ce week-end',
];

export default function Home() {
  const [text, setText] = useState(examples[0]);

  return (
    <main>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">Moteur intelligent de services locaux</div>
          <h1>Tu demandes.<br/><span style={{color:'var(--accent)'}}>Servyra comprend.</span><br/>Tu choisis.</h1>
          <p>Un seul message pour expliquer ton besoin. Servyra le transforme en demande claire, repère les bons critères et prépare la mise en relation avec les professionnels adaptés.</p>
          <div className="heroActions">
            <a href="/request" className="btn green">Décrire mon besoin →</a>
            <a href="/pros" className="btn light">Voir les professionnels</a>
          </div>
          <div className="demoBox">
            <div className="demoLabel">ESSAI RAPIDE</div>
            <div className="demoInputRow">
              <input className="input" aria-label="Exemple de demande" value={text} onChange={(e) => setText(e.target.value)} />
              <a className="btn green" href={`/request?demo=${encodeURIComponent(text)}`}>Tester →</a>
            </div>
            <div className="pillrow">{examples.map((item, i) => (
              <button className="pill demoPill" key={item} onClick={() => setText(item)}>{i + 1}. {item}</button>
            ))}</div>
            <small>Exemple de démonstration — aucun professionnel réel n'est réservé à cette étape.</small>
          </div>
          <div className="stats">
            <div className="stat"><strong>1 demande</strong><span>tu expliques ton besoin une fois</span></div>
            <div className="stat"><strong>+ de signaux utiles</strong><span>le matching peut s'affiner avec les retours autorisés</span></div>
            <div className="stat"><strong>4 leviers</strong><span>commissions, leads, options pro et publicité</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="eyebrow">Pourquoi revenir sur Servyra</div>
          <h2>Moins chercher. Plus décider.</h2>
          <p className="muted">L'expérience est pensée pour enlever les étapes inutiles : décrire, comprendre, comparer, choisir.</p>
          <div className="grid3">
            <div className="card"><div className="icon">⚡</div><h3>Rapide à comprendre</h3><p className="muted">Pas besoin de connaître le nom exact du métier. Décris simplement ce que tu veux faire.</p></div>
            <div className="card"><div className="icon">🛡️</div><h3>Confiance visible</h3><p className="muted">La version publique pourra afficher vérification, avis, zone d'intervention et disponibilité de façon lisible.</p></div>
            <div className="card"><div className="icon">🎯</div><h3>Des résultats utiles</h3><p className="muted">Le moteur peut classer les professionnels selon des critères concrets plutôt que seulement selon le nom d'une catégorie.</p></div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="wrap twoCol">
          <div>
            <div className="eyebrow">Le parcours</div>
            <h2>Trois étapes. Pas de prise de tête.</h2>
            <div className="stepsSimple">
              <div><span>01</span><b>Décris</b><p>Explique ton besoin avec tes mots.</p></div>
              <div><span>02</span><b>Compare</b><p>Servyra prépare des profils compatibles à vérifier.</p></div>
              <div><span>03</span><b>Choisis</b><p>Tu gardes la main sur le professionnel et le prix final.</p></div>
            </div>
          </div>
          <div className="trustCard">
            <div className="eyebrow">Transparence</div>
            <h3>Pas de faux compteur.</h3>
            <p>Les statistiques affichées ici sont celles du prototype. Les chiffres réels viendront des données réelles du service.</p>
            <div className="trustChecks"><div>✓ Profils clairement identifiés</div><div>✓ Publicités signalées</div><div>✓ Données personnelles protégées en production</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Un moteur qui apprend sans inventer</h2>
          <p className="muted maxText">Chaque interaction utile peut améliorer le classement des résultats : catégorie, zone, disponibilité, réponse et satisfaction. En production, seuls des signaux autorisés, contrôlés et suffisamment agrégés doivent alimenter le système.</p>
          <div className="grid3">
            <div className="card"><div className="icon">🧠</div><h3>Matching adaptatif</h3><p className="muted">Le système apprend quels critères conduisent réellement à une bonne mise en relation.</p></div>
            <div className="card"><div className="icon">👥</div><h3>Effet réseau</h3><p className="muted">Davantage de demandes et de professionnels peuvent apporter davantage de signaux de qualité.</p></div>
            <div className="card"><div className="icon">📈</div><h3>Monétisation multiple</h3><p className="muted">Une audience active peut soutenir plusieurs sources de revenus, sans abonnement obligatoire pour le public.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="adSlot"><span>ESPACE PARTENAIRE</span><b>Votre marque peut apparaître ici</b><small>Publicité clairement identifiée — ciblage par contexte, pas vente de données personnelles.</small></div>
        </div>
      </section>
    </main>
  );
}
