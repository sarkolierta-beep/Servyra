'use client';

import { useMemo, useState } from 'react';

const initialPros = [
  { name: 'Pro Débarras Paris', category: 'Débarras', status: 'Actif', leads: 12 },
  { name: 'Maison Claire', category: 'Ménage', status: 'Actif', leads: 8 },
  { name: 'Montage Express', category: 'Montage de meubles', status: 'En attente', leads: 4 },
];

export default function AdminPage() {
  const [tab, setTab] = useState('Vue générale');
  const [pros] = useState(initialPros);
  const stats = useMemo(() => ({ demandes: 24, pros: pros.length, revenus: 0, pubs: 0 }), [pros]);

  return (
    <main className="container">
      <section className="hero compact">
        <p className="eyebrow">ESPACE PROPRIÉTAIRE</p>
        <h1>Ton centre de contrôle SERVYRA.</h1>
        <p className="lead">Ici, tu pilotes les demandes, professionnels, revenus, publicité et l’activité du moteur de matching.</p>
      </section>

      <nav className="adminNav" aria-label="Administration">
        {['Vue générale', 'Demandes', 'Professionnels', 'Revenus', 'Publicité', 'Intelligence'].map((item) => (
          <button key={item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)}>{item}</button>
        ))}
      </nav>

      {tab === 'Vue générale' && <>
        <section className="grid statsGrid">
          <article className="card"><span>Demandes</span><strong>{stats.demandes}</strong><small>démo — à connecter à la base</small></article>
          <article className="card"><span>Professionnels</span><strong>{stats.pros}</strong><small>profils de démonstration</small></article>
          <article className="card"><span>Revenus</span><strong>{stats.revenus.toFixed(2)} €</strong><small>aucun paiement réel connecté</small></article>
          <article className="card"><span>Publicité</span><strong>{stats.pubs.toFixed(2)} €</strong><small>emplacements prêts</small></article>
        </section>
        <section className="card"><h2>À faire avant les premières ventes</h2><ul className="cleanList"><li>Connecter une base de données sécurisée.</li><li>Activer l'authentification et protéger cet espace.</li><li>Connecter Stripe et son webhook.</li><li>Ajouter les vrais professionnels.</li><li>Renseigner les CGU, confidentialité et règles de commission.</li></ul></section>
      </>}

      {tab === 'Professionnels' && <section className="card"><h2>Professionnels</h2><div className="tableWrap"><table><thead><tr><th>Nom</th><th>Catégorie</th><th>Statut</th><th>Demandes</th></tr></thead><tbody>{pros.map(p => <tr key={p.name}><td>{p.name}</td><td>{p.category}</td><td>{p.status}</td><td>{p.leads}</td></tr>)}</tbody></table></div></section>}
      {tab !== 'Vue générale' && tab !== 'Professionnels' && <section className="card"><h2>{tab}</h2><p>Module d’administration préparé. Les données réelles seront alimentées après connexion de la base et des services correspondants.</p></section>}
    </main>
  );
}