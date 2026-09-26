'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  return <main className="container narrow"><section className="card authCard"><p className="eyebrow">SERVYRA</p><h1>Connexion</h1><p>La connexion réelle sera activée avec le fournisseur d’authentification choisi au déploiement.</p><label>Email<input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="toi@email.com" /></label><label>Mot de passe<input type="password" placeholder="••••••••" /></label><button className="button" onClick={()=>setMessage('Connexion prête à être branchée à l’authentification sécurisée.')}>Se connecter</button>{message && <p className="notice">{message}</p>}</section></main>; 
}