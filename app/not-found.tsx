import Link from 'next/link';
export default function NotFound(){return <main className="page"><div className="wrap center"><div className="card"><h1>Page introuvable</h1><p className="muted">Cette page n'existe pas.</p><Link className="btn primary" href="/">Retour à l'accueil</Link></div></div></main>}
