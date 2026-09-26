'use client';

import { useEffect, useMemo, useState } from 'react';

const key='servyra-learning-events';

function classify(text:string){
  const t=text.toLowerCase();
  if(/canap|encombr|débarras|debar|vide maison/.test(t))return'Débarras';
  if(/ménage|nettoy/.test(t))return'Ménage';
  if(/jardin|pelouse|haie|tondre|arbre/.test(t))return'Jardinage';
  if(/démén|carton|appartement/.test(t))return'Déménagement';
  if(/ikea|meuble|montage/.test(t))return'Montage de meubles';
  if(/peinture|mur|perceuse|répar|bricolage/.test(t))return'Petits travaux';
  if(/transport|livrer|livraison|camionnette/.test(t))return'Transport';
  return'Autre';
}

const matches:Record<string,string[]> = {
  'Débarras':["Débarras & Transport local","Enlèvement d'encombrants","Débarras de mobilier"],
  'Ménage':['Ménage à domicile','Nettoyage ponctuel',"Nettoyage après déménagement"],
  'Jardinage':['Entretien de jardin',"Taille de haies","Tonte et entretien"],
  'Déménagement':["Petit déménagement","Aide au chargement","Transport avec utilitaire"],
  'Montage de meubles':['Montage de meubles','Montage IKEA','Pose et assemblage'],
  'Petits travaux':["Bricolage à domicile","Petites réparations","Peinture et finitions"],
  'Transport':['Transport local',"Livraison avec utilitaire","Enlèvement et livraison"],
  'Autre':['Service local à préciser','Besoin sur mesure','Mise en relation à qualifier'],
};

export default function Request(){
  const [text,setText]=useState('');
  useEffect(()=>{
    const demo=new URLSearchParams(window.location.search).get('demo');
    if(demo) setText(demo);
  },[]);
  const [city,setCity]=useState('Paris');
  const [date,setDate]=useState('');
  const [budget,setBudget]=useState('');
  const [sent,setSent]=useState(false);
  const category=useMemo(()=>classify(text),[text]);

  function submit(){
    try {
      const events=JSON.parse(localStorage.getItem(key)||'[]');
      events.push({type:'request_created',category,score:1});
      localStorage.setItem(key,JSON.stringify(events));
    } catch {}
    setSent(true);
  }

  return <main className="page">
    <div className="wrap">
      <div className="pageHead">
        <div className="eyebrow">Demande intelligente</div>
        <h1>Dis-moi ce qu’il te faut.</h1>
        <p className="muted">Écris normalement. Le moteur détecte le type de service et prépare une demande exploitable.</p>
      </div>

      {sent
        ? <div className="successPanel">
            <div className="success"><b>Ta demande est prête.</b><br/>Servyra a identifié « {category} » et prépare les critères de mise en relation.</div>
            <div className="card matchPreview">
              <div><div className="eyebrow">Aperçu du matching</div><h2>Profils à comparer</h2><p className="muted">Démonstration : ces résultats illustrent le parcours. Ils ne correspondent pas encore à des professionnels réellement connectés.</p></div>
              <div className="matchList">{(matches[category]||matches.Autre).map((m,i)=><div className="matchItem" key={m}><span className="matchRank">{i+1}</span><div><b>{m}</b><span className="small muted">{city} · compatibilité à calculer</span></div><span className="small">Voir</span></div>)}</div>
              <a className="btn green" href="/pros">Voir les profils de démonstration →</a>
            </div>
          </div>
        : <div className="formGrid">
            <section className="card">
              <div className="field"><label className="label">Ton besoin</label><textarea className="textarea bigInput" value={text} onChange={e=>setText(e.target.value)} placeholder="Ex : Je dois faire débarrasser un canapé samedi matin…"/></div>
              <div className="field"><label className="label">Ville / zone</label><input className="input" value={city} onChange={e=>setCity(e.target.value)}/></div>
              <div className="inline">
                <div className="field"><label className="label">Quand ?</label><input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)}/></div>
                <div className="field"><label className="label">Budget indicatif</label><input className="input" value={budget} onChange={e=>setBudget(e.target.value)} placeholder="ex. 150 €"/></div>
              </div>
              <button className="btn green" disabled={!text.trim()} onClick={submit}>Préparer mon matching →</button>
              <p className="small muted formHint">Aucun paiement et aucune réservation réelle à cette étape.</p>
            </section>
            <aside className="heroCard">
              <div><div className="eyebrow">Ce que Servyra comprend</div><h2 style={{fontSize:32,margin:'15px 0 8px'}}>{category}</h2><p style={{color:'#c8c8c8',lineHeight:1.6}}>{text||'Ton message apparaîtra ici.'}</p></div>
              <div className="pillrow"><span className="pill">{city||'Zone à préciser'}</span>{date&&<span className="pill">{date}</span>}<span className="pill">Matching adaptatif</span></div>
            </aside>
          </div>}
    </div>
  </main>;
}
