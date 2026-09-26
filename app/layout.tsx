import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Servyra — Le bon pro, au bon moment',
  description: 'Décris ton besoin, Servyra qualifie la demande et trouve les professionnels compatibles.',
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <><header className="nav"><div className="wrap navin"><a href="/" className="brand">Servy<span>yra</span></a><nav className="navlinks"><a href="/pros">Trouver un pro</a><a href="/intelligence">Intelligence</a><a href="/dashboard">Espace pro</a><a className="btn primary cta" href="/request">Faire une demande</a></nav></div></header>{children}<footer className="footer"><div className="wrap">Servyra — plateforme de mise en relation. Les chiffres et profils affichés dans le prototype sont des données de démonstration.</div></footer></>;
}