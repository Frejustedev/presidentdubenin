import type { GameEvent } from "@/lib/types";

/**
 * 150 evenements - LE SEPTENNAT v2.0
 * Source : SEPTENNAT_150_EVENTS_v2
 * Adapte au moteur (tresor/armee, conditions aplaties).
 */
export const EVENTS: GameEvent[] = [

// ═══════════════ CHAÎNE 1 — COMPLOT MILITAIRE (5) ═══════════════

{ id:1, title:"Murmures dans les casernes", desc:"Le renseignement rapporte des réunions secrètes d'officiers à Camp Togbin. Un colonel récemment muté exprime son mécontentement ouvertement.", icon:"🎖️", cat:"SÉCURITÉ", year:1, rarity:"common", chainId:"complot_1",
  a:{ label:"Surveiller discrètement", fx:{peuple:0,tresor:0,armee:-2,pouvoir:5}, tags:["vigilance"], nextChain:"complot_2a" },
  b:{ label:"Ignorer les rumeurs", fx:{peuple:0,tresor:0,armee:3,pouvoir:-3}, tags:["ignore_rumeurs"], nextChain:"complot_2b" }},

{ id:2, title:"Un informateur confirme", desc:"Un sous-officier loyaliste révèle un stockage d'armes clandestin. Le meneur serait un vétéran frustré de l'opération Mirador, décoré mais marginalisé.", icon:"🔍", cat:"SÉCURITÉ", year:2, rarity:"uncommon", chainId:"complot_2a", requireTags:["vigilance"],
  a:{ label:"Arrestations préventives", fx:{peuple:-8,tresor:-2,armee:12,pouvoir:-8}, tags:["purge_armee"], nextChain:"complot_3p" },
  b:{ label:"Infiltrer le réseau", fx:{peuple:0,tresor:-2,armee:5,pouvoir:8}, tags:["infiltration"], nextChain:"complot_3i" }},

{ id:3, title:"Armes découvertes à Togbin", desc:"Des fusils et grenades sont trouvés dans un hangar militaire. La presse l'apprend avant vous. L'opposition crie au complot fabriqué par le pouvoir.", icon:"💣", cat:"SÉCURITÉ", year:2, rarity:"uncommon", chainId:"complot_2b", requireTags:["ignore_rumeurs"],
  a:{ label:"Tout révéler au public", fx:{peuple:5,tresor:-2,armee:8,pouvoir:8}, tags:["transparence_coup"] },
  b:{ label:"Étouffer l'affaire", fx:{peuple:-5,tresor:0,armee:-8,pouvoir:-5}, tags:["etouffe"], nextChain:"complot_coup" }},

{ id:4, title:"Les familles manifestent", desc:"Les proches des militaires arrêtés bloquent la route Cotonou-Parakou. Certains soldats en poste sympathisent. La tension est palpable.", icon:"✊", cat:"PEUPLE", year:3, rarity:"uncommon", chainId:"complot_3p", requireTags:["purge_armee"],
  a:{ label:"Indemniser les familles", fx:{peuple:10,tresor:-8,armee:5,pouvoir:3}, tags:["indemnise"] },
  b:{ label:"Tenir la ligne dure", fx:{peuple:-10,tresor:0,armee:6,pouvoir:-6}, tags:["ligne_dure"] }},

{ id:5, title:"Coup d'État en cours", desc:"L'aube. Des blindés encerclent la Marina. La TV diffuse un communiqué militaire : le CMR annonce votre destitution. La Garde républicaine tient le palais.", icon:"⚔️", cat:"SÉCURITÉ", year:3, rarity:"legendary", chainId:"complot_coup", requireTags:["etouffe"],
  a:{ label:"Appeler le Nigeria à l'aide", fx:{peuple:5,tresor:-8,armee:8,pouvoir:-12}, tags:["aide_nigeria","coup_survive"] },
  b:{ label:"Résister seul", fx:{peuple:8,tresor:-5,armee:-12,pouvoir:5}, tags:["resistance_seul"] }},

// ═══════════════ CHAÎNE 2 — CRISE DU COTON (4) ═══════════════

{ id:6, title:"Chute des cours du coton", desc:"Les cours mondiaux chutent de 35%. Le Bénin produit 632 000 tonnes. Des centaines de milliers de familles du centre et du nord en dépendent.", icon:"📉", cat:"ÉCONOMIE", year:1, rarity:"common", chainId:"coton_1",
  a:{ label:"Subventionner les paysans", fx:{peuple:12,tresor:-12,armee:2,pouvoir:2}, tags:["sub_coton"], nextChain:"coton_2s" },
  b:{ label:"Accélérer la GDIZ textile", fx:{peuple:-6,tresor:8,armee:0,pouvoir:3}, tags:["gdiz_textile"], nextChain:"coton_2g" }},

{ id:7, title:"Paysans surendettés", desc:"Les subventions n'ont pas suffi. Les cotonculteurs du Borgou s'endettent, certains vendent leurs terres. La colère gronde dans les villages.", icon:"🔥", cat:"PEUPLE", year:2, rarity:"uncommon", chainId:"coton_2s", requireTags:["sub_coton"],
  a:{ label:"Effacer les dettes agricoles", fx:{peuple:10,tresor:-14,armee:0,pouvoir:5}, tags:["dette_effacee"] },
  b:{ label:"Reconversion vers le cajou", fx:{peuple:-5,tresor:6,armee:0,pouvoir:3}, tags:["reconversion"] }},

{ id:8, title:"Grève à la GDIZ", desc:"10 000 ouvriers textiles de Glo-Djigbé protestent contre les cadences et les bas salaires. Les investisseurs étrangers menacent de partir.", icon:"🏭", cat:"ÉCONOMIE", year:2, rarity:"uncommon", chainId:"coton_2g", requireTags:["gdiz_textile"],
  a:{ label:"Imposer un code du travail", fx:{peuple:10,tresor:-8,armee:0,pouvoir:6}, tags:["code_travail"] },
  b:{ label:"Protéger les investisseurs", fx:{peuple:-12,tresor:10,armee:0,pouvoir:-4}, tags:["pro_invest"] }},

{ id:9, title:"Premier textile Made in Bénin", desc:"Le Bénin exporte du tissu fini pour la première fois — plus du coton brut. La GDIZ transforme 15% de la production. Un tournant historique.", icon:"🎉", cat:"ÉCONOMIE", year:4, rarity:"rare", requireTags:["gdiz_textile"],
  a:{ label:"Taxer l'export de brut", fx:{peuple:-4,tresor:12,armee:0,pouvoir:6}, tags:["taxe_brut"] },
  b:{ label:"Garder le modèle mixte", fx:{peuple:5,tresor:6,armee:0,pouvoir:3}, tags:["mixte"] }},

// ═══════════════ CHAÎNE 3 — MENACE DU NORD (5) ═══════════════

{ id:10, title:"Attaque à Tanguiéta", desc:"Le JNIM attaque un poste militaire près de la Pendjari. 8 soldats tués. L'attaque la plus proche d'une ville depuis le début de l'opération Mirador.", icon:"💥", cat:"SÉCURITÉ", year:1, rarity:"common", chainId:"nord_1",
  a:{ label:"Renforcer Mirador", fx:{peuple:-3,tresor:-8,armee:10,pouvoir:3}, tags:["mirador+"], nextChain:"nord_2" },
  b:{ label:"Dialogue avec les chefs locaux", fx:{peuple:5,tresor:0,armee:-4,pouvoir:6}, tags:["dialogue_nord"], nextChain:"nord_2b" }},

{ id:11, title:"Embuscade dans le parc W", desc:"Un convoi tombe dans une embuscade à la frontière nigérienne. 12 soldats tués. Le JNIM diffuse une vidéo. Le moral de l'armée chute.", icon:"⚔️", cat:"SÉCURITÉ", year:2, rarity:"common", chainId:"nord_2",
  a:{ label:"Frappe aérienne massive", fx:{peuple:-5,tresor:-10,armee:12,pouvoir:3}, tags:["frappe_aerienne"] },
  b:{ label:"Repli stratégique", fx:{peuple:-8,tresor:4,armee:-8,pouvoir:-6}, tags:["repli"] }},

{ id:12, title:"Les bergers informateurs", desc:"Des éleveurs peuls proposent d'espionner les djihadistes en échange de pâturages protégés. L'armée est méfiante envers les Peuls.", icon:"🐄", cat:"SÉCURITÉ", year:2, rarity:"uncommon", chainId:"nord_2b", requireTags:["dialogue_nord"],
  a:{ label:"Accepter le pacte", fx:{peuple:8,tresor:-2,armee:8,pouvoir:5}, tags:["alliance_peul"] },
  b:{ label:"Refuser, trop risqué", fx:{peuple:-5,tresor:0,armee:-3,pouvoir:2}, tags:["refuse_peul"] }},

{ id:13, title:"Karimama attaquée", desc:"La ville de Karimama subit une attaque directe. Civils tués, marché brûlé. Première frappe djihadiste sur une agglomération. La panique gagne le nord.", icon:"🔥", cat:"SÉCURITÉ", year:3, rarity:"uncommon", chainId:"nord_3",
  a:{ label:"État d'urgence au nord", fx:{peuple:-10,tresor:-6,armee:14,pouvoir:-4}, tags:["etat_urgence"] },
  b:{ label:"Armer les milices locales", fx:{peuple:4,tresor:-4,armee:6,pouvoir:-6}, tags:["milices"], nextChain:"nord_4" }},

{ id:14, title:"Les milices dérapent", desc:"Les milices que vous avez armées commettent des exactions contre des villages peuls. Amnesty publie un rapport accablant. L'image du Bénin se dégrade.", icon:"⚠️", cat:"POUVOIR", year:4, rarity:"rare", chainId:"nord_4", requireTags:["milices"],
  a:{ label:"Dissoudre les milices", fx:{peuple:8,tresor:0,armee:-10,pouvoir:10}, tags:["dissout_milices"] },
  b:{ label:"Couvrir les abus", fx:{peuple:-12,tresor:0,armee:4,pouvoir:-14}, tags:["couvre_abus"] }},

// ═══════════════ CHAÎNE 4 — SCANDALE (4) ═══════════════

{ id:15, title:"Comptes offshore au Panama", desc:"Un journal publie des documents : votre directeur de cabinet possède des comptes cachés à l'étranger. Il nie. Les preuves sont ambiguës mais troublantes.", icon:"💰", cat:"POUVOIR", year:2, rarity:"common", chainId:"scandal_1",
  a:{ label:"Exiger sa démission", fx:{peuple:10,tresor:-3,armee:0,pouvoir:8}, tags:["limoge_cabinet"], nextChain:"scandal_2p" },
  b:{ label:"Le soutenir publiquement", fx:{peuple:-8,tresor:3,armee:0,pouvoir:-5}, tags:["soutien_corrompu"], nextChain:"scandal_2s" }},

{ id:16, title:"Enquête de la CRIET", desc:"La CRIET ouvre une enquête. Votre ancien directeur de cabinet menace de parler. L'opposition jubile et demande une commission parlementaire.", icon:"⚖️", cat:"POUVOIR", year:3, rarity:"uncommon", chainId:"scandal_2s", requireTags:["soutien_corrompu"],
  a:{ label:"Laisser la justice agir", fx:{peuple:8,tresor:0,armee:0,pouvoir:10}, tags:["justice_suit"] },
  b:{ label:"Pression sur les juges", fx:{peuple:-5,tresor:0,armee:0,pouvoir:-14}, tags:["pression_juges"] }},

{ id:17, title:"#PrésidentIntègre", desc:"Votre gestion ferme du scandale devient virale. La diaspora applaudit. Mais vous avez perdu un allié politique clé et le parti gronde.", icon:"👏", cat:"POUVOIR", year:3, rarity:"uncommon", chainId:"scandal_2p", requireTags:["limoge_cabinet"],
  a:{ label:"Audit général anticorruption", fx:{peuple:10,tresor:-5,armee:0,pouvoir:12}, tags:["audit_general"] },
  b:{ label:"Passer à autre chose", fx:{peuple:3,tresor:0,armee:0,pouvoir:4}, tags:["page_tournee"] }},

{ id:18, title:"Révélations en cascade", desc:"L'ex-directeur parle à la presse internationale. Il accuse plusieurs ministres. Le FMI suspend un décaissement de 35 millions USD.", icon:"📰", cat:"POUVOIR", year:4, rarity:"rare", requireTags:["pression_juges"],
  a:{ label:"Remaniement ministériel total", fx:{peuple:8,tresor:-8,armee:-2,pouvoir:8}, tags:["remaniement"] },
  b:{ label:"Nier en bloc", fx:{peuple:-14,tresor:-5,armee:0,pouvoir:-12}, tags:["deni"] }},

// ═══════════════ CHAÎNE 5 — CRISE NIGER (4) ═══════════════

{ id:19, title:"Le Niger ferme sa frontière", desc:"Niamey accuse le Bénin d'héberger des espions et ferme la frontière. Le pipeline pétrole est menacé. 80% du fret nigérien passait par Cotonou.", icon:"🚧", cat:"ÉCONOMIE", year:1, rarity:"common", chainId:"niger_1",
  a:{ label:"Négocier via la CEDEAO", fx:{peuple:-2,tresor:-4,armee:3,pouvoir:8}, tags:["cedeao_niger"], nextChain:"niger_2" },
  b:{ label:"Riposte commerciale", fx:{peuple:4,tresor:-8,armee:-4,pouvoir:-5}, tags:["riposte_niger"], nextChain:"niger_2b" }},

{ id:20, title:"Le pipeline bloqué", desc:"Le Niger bloque le pipeline pétrole. La Chine, qui l'a financé, fait pression sur les deux pays. Des milliards de FCFA de transit sont en jeu.", icon:"🛢️", cat:"ÉCONOMIE", year:2, rarity:"uncommon", chainId:"niger_2",
  a:{ label:"Accepter la médiation chinoise", fx:{peuple:-3,tresor:10,armee:0,pouvoir:-10}, tags:["deal_chine"] },
  b:{ label:"Porter l'affaire à l'UA", fx:{peuple:0,tresor:-4,armee:2,pouvoir:10}, tags:["ua_niger"] }},

{ id:21, title:"Tirs à la frontière", desc:"Des soldats nigériens tirent sur des contrebandiers béninois à Malanville. Un civil tué. La presse parle d'acte de guerre. L'opinion est en colère.", icon:"💥", cat:"SÉCURITÉ", year:2, rarity:"uncommon", chainId:"niger_2b", requireTags:["riposte_niger"],
  a:{ label:"Déployer des troupes", fx:{peuple:6,tresor:-5,armee:-6,pouvoir:-4}, tags:["troupes_frontiere"] },
  b:{ label:"Retenue diplomatique", fx:{peuple:-8,tresor:-2,armee:4,pouvoir:8}, tags:["retenue"] }},

{ id:22, title:"Sommet secret à Abuja", desc:"Le Nigeria propose une médiation secrète entre vous et la junte nigérienne. Condition : reconnaissance mutuelle et réouverture commerciale progressive.", icon:"🤝", cat:"POUVOIR", year:3, rarity:"rare", chainId:"niger_3", requireTags:["cedeao_niger"],
  a:{ label:"Accepter le sommet", fx:{peuple:3,tresor:10,armee:4,pouvoir:8}, tags:["paix_niger"] },
  b:{ label:"Refuser de légitimer la junte", fx:{peuple:4,tresor:-6,armee:-2,pouvoir:10}, tags:["refuse_junte"] }},

// ═══════════════ CHAÎNE 6 — JUSTICE (4) ═══════════════

{ id:23, title:"La CRIET critiquée", desc:"Un collectif d'avocats et d'ONG dénonce la CRIET comme instrument politique. Le barreau menace une grève. La pression internationale monte.", icon:"⚖️", cat:"POUVOIR", year:1, rarity:"common", chainId:"justice_1",
  a:{ label:"Réformer la CRIET", fx:{peuple:8,tresor:0,armee:-2,pouvoir:12}, tags:["reforme_criet"], nextChain:"justice_2" },
  b:{ label:"Défendre l'institution", fx:{peuple:-6,tresor:2,armee:2,pouvoir:-10}, tags:["defend_criet"] }},

{ id:24, title:"Prisonniers politiques", desc:"La réforme oblige à revoir les dossiers. 12 détenus pourraient être libérés — dont des proches de l'ancien régime condamnés pour « complot ».", icon:"🔓", cat:"POUVOIR", year:2, rarity:"uncommon", chainId:"justice_2", requireTags:["reforme_criet"],
  a:{ label:"Tous les libérer", fx:{peuple:10,tresor:0,armee:-6,pouvoir:14}, tags:["liberation"] },
  b:{ label:"Au cas par cas", fx:{peuple:4,tresor:0,armee:2,pouvoir:6}, tags:["selective"] }},

{ id:25, title:"Indépendance judiciaire", desc:"Le Conseil de la magistrature demande une réforme constitutionnelle garantissant l'indépendance des juges. Vos alliés y voient une menace à votre contrôle.", icon:"🏛️", cat:"POUVOIR", year:4, rarity:"uncommon",
  a:{ label:"Soutenir la réforme", fx:{peuple:6,tresor:0,armee:0,pouvoir:12}, tags:["justice_indep"] },
  b:{ label:"Reporter sine die", fx:{peuple:-4,tresor:0,armee:0,pouvoir:-8}, tags:["reforme_reportee"] }},

{ id:26, title:"Bénin modèle judiciaire", desc:"Transparency International classe le Bénin top 5 africain pour la justice. Les investisseurs affluent. La Banque mondiale triple son enveloppe.", icon:"🌟", cat:"ÉCONOMIE", year:6, rarity:"rare", requireTags:["justice_indep"],
  a:{ label:"Capitaliser à l'international", fx:{peuple:4,tresor:10,armee:0,pouvoir:8}, tags:["diplo_justice"] },
  b:{ label:"Rester humble", fx:{peuple:6,tresor:4,armee:0,pouvoir:4}, tags:["humilite"] }},

// ═══════════════ CHAÎNE 7 — DIASPORA (4) ═══════════════

{ id:27, title:"Marche de la diaspora", desc:"Des milliers de Béninois à Paris, New York et Abidjan manifestent pour le droit de vote et d'investissement. Les transferts représentent 5% du PIB.", icon:"🌍", cat:"PEUPLE", year:1, rarity:"common", chainId:"diaspora_1",
  a:{ label:"Créer un guichet diaspora", fx:{peuple:8,tresor:8,armee:0,pouvoir:4}, tags:["guichet_diaspora"], nextChain:"diaspora_2" },
  b:{ label:"Ignorer les revendications", fx:{peuple:-8,tresor:-6,armee:0,pouvoir:-2}, tags:["ignore_diaspora"] }},

{ id:28, title:"Bulle immobilière diaspora", desc:"Le guichet attire 50 milliards FCFA mais les projets immobiliers gonflent les prix à Cotonou. Les locaux ne peuvent plus acheter de terrain.", icon:"🏗️", cat:"ÉCONOMIE", year:3, rarity:"uncommon", chainId:"diaspora_2", requireTags:["guichet_diaspora"],
  a:{ label:"Plafonner les prix fonciers", fx:{peuple:8,tresor:-6,armee:0,pouvoir:4}, tags:["plafond_foncier"] },
  b:{ label:"Laisser le marché libre", fx:{peuple:-10,tresor:10,armee:0,pouvoir:-2}, tags:["libre_foncier"] }},

{ id:29, title:"Médecins de la diaspora", desc:"Des médecins béninois de l'étranger proposent de rentrer avec un statut fiscal avantageux. Le corps médical local craint la concurrence et les inégalités.", icon:"🧠", cat:"ÉCONOMIE", year:4, rarity:"uncommon",
  a:{ label:"Créer le statut retour", fx:{peuple:-4,tresor:10,armee:0,pouvoir:6}, tags:["retour_diaspora"] },
  b:{ label:"Protéger les locaux", fx:{peuple:6,tresor:-2,armee:0,pouvoir:2}, tags:["protege_locaux"] }},

{ id:30, title:"Droit de vote à l'étranger", desc:"La diaspora demande des circonscriptions électorales à l'étranger. L'opposition y voit un réservoir de voix pour le pouvoir.", icon:"🗳️", cat:"POUVOIR", year:5, rarity:"rare",
  a:{ label:"Créer les circonscriptions", fx:{peuple:4,tresor:0,armee:0,pouvoir:10}, tags:["vote_diaspora"] },
  b:{ label:"Soumettre au référendum", fx:{peuple:2,tresor:-2,armee:0,pouvoir:6}, tags:["ref_diaspora"] }},

// ═══════════════ CHAÎNE 8 — ÉNERGIE (4) ═══════════════

{ id:31, title:"Coupures à Cotonou", desc:"Trois jours de blackout paralysent la capitale. Les usines de la GDIZ tournent au ralenti. Les commerçants de Dantokpa sont furieux.", icon:"⚡", cat:"ÉCONOMIE", year:1, rarity:"common", chainId:"energie_1",
  a:{ label:"Acheter au Ghana en urgence", fx:{peuple:4,tresor:-8,armee:0,pouvoir:-4}, tags:["achat_ghana"], nextChain:"energie_2" },
  b:{ label:"Plan solaire accéléré", fx:{peuple:-2,tresor:-6,armee:0,pouvoir:4}, tags:["plan_solaire"], nextChain:"energie_2s" }},

{ id:32, title:"Rosatom propose le nucléaire", desc:"La Russie propose une mini-centrale nucléaire à Sèmè-Kpodji. Financement attractif, mais conditions diplomatiques lourdes. La France proteste vivement.", icon:"☢️", cat:"ÉCONOMIE", year:2, rarity:"uncommon", chainId:"energie_2",
  a:{ label:"Accepter l'offre russe", fx:{peuple:2,tresor:12,armee:-2,pouvoir:-14}, tags:["nucleaire_russe"] },
  b:{ label:"Diversifier les partenaires", fx:{peuple:0,tresor:3,armee:0,pouvoir:8}, tags:["diversif_energie"] }},

{ id:33, title:"Solaire dans le nord", desc:"200 villages du nord ont l'électricité pour la première fois. Les enfants étudient le soir. Mais les panneaux chinois tombent en panne après 18 mois.", icon:"☀️", cat:"PEUPLE", year:3, rarity:"uncommon", chainId:"energie_2s", requireTags:["plan_solaire"],
  a:{ label:"Exiger la qualité premium", fx:{peuple:4,tresor:-6,armee:0,pouvoir:3}, tags:["qualite_solaire"] },
  b:{ label:"Quantité d'abord", fx:{peuple:8,tresor:3,armee:0,pouvoir:-2}, tags:["quantite_solaire"] }},

{ id:34, title:"Autonomie énergétique 60%", desc:"Le Bénin produit 60% de son électricité. Mais une panne au Nigeria coupe les 40% restants. Vos réserves tiennent 48 heures. L'horloge tourne.", icon:"🔋", cat:"ÉCONOMIE", year:5, rarity:"rare",
  a:{ label:"Rationnement strict", fx:{peuple:-10,tresor:-4,armee:2,pouvoir:-2}, tags:["rationnement"] },
  b:{ label:"Acheter à prix d'or au Togo", fx:{peuple:2,tresor:-12,armee:0,pouvoir:4}, tags:["achat_togo"] }},

// ═══════════════ CHAÎNE 9 — PRESSE (4) ═══════════════

{ id:35, title:"Journaliste arrêté", desc:"Un reporter d'investigation est emprisonné après un article sur la corruption dans les marchés publics. RSF classe le Bénin 113e mondial.", icon:"📰", cat:"POUVOIR", year:1, rarity:"common", chainId:"presse_1",
  a:{ label:"Libérer le journaliste", fx:{peuple:6,tresor:0,armee:-2,pouvoir:10}, tags:["presse_libre"], nextChain:"presse_2l" },
  b:{ label:"Laisser la justice suivre", fx:{peuple:-4,tresor:0,armee:2,pouvoir:-8}, tags:["presse_muselée"], nextChain:"presse_2m" }},

{ id:36, title:"L'UE conditionne son aide", desc:"L'Union européenne conditionne 50 millions d'euros d'aide à des progrès sur la liberté de presse. RSF menace un déclassement au rang de « prédateur ».", icon:"🇪🇺", cat:"POUVOIR", year:2, rarity:"uncommon", chainId:"presse_2m", requireTags:["presse_muselée"],
  a:{ label:"Céder aux pressions", fx:{peuple:6,tresor:6,armee:0,pouvoir:8}, tags:["cede_presse"] },
  b:{ label:"Dénoncer l'ingérence", fx:{peuple:-2,tresor:-8,armee:0,pouvoir:-12}, tags:["denonce_UE"] }},

{ id:37, title:"Hub médiatique ouest-africain", desc:"Grâce à la liberté de presse, le Bénin attire des rédactions internationales. Mais les fake news prolifèrent aussi, déstabilisant l'opinion.", icon:"📱", cat:"POUVOIR", year:3, rarity:"uncommon", chainId:"presse_2l", requireTags:["presse_libre"],
  a:{ label:"Loi contre les fake news", fx:{peuple:-6,tresor:0,armee:2,pouvoir:-4}, tags:["loi_fake"] },
  b:{ label:"Éducation aux médias", fx:{peuple:4,tresor:-2,armee:0,pouvoir:6}, tags:["edu_medias"] }},

{ id:38, title:"La presse révèle un scandale", desc:"Un média indépendant démasque un détournement dans un projet routier. Le coupable est arrêté. La presse libre vous a rendu service.", icon:"🏆", cat:"POUVOIR", year:5, rarity:"rare", requireTags:["edu_medias"],
  a:{ label:"Poursuivre le coupable", fx:{peuple:10,tresor:4,armee:0,pouvoir:12}, tags:["justice_presse"] },
  b:{ label:"Étouffer le scandale", fx:{peuple:-8,tresor:0,armee:0,pouvoir:-10}, tags:["etouffe_scandale"] }},

// ═══════════════ CHAÎNE 10 — ÉPIDÉMIE (3) ═══════════════

{ id:39, title:"Fièvre dans l'Alibori", desc:"Une fièvre hémorragique frappe l'Alibori. 15 morts en deux semaines. L'OMS propose une équipe. Le ministère de la Santé minimise la gravité.", icon:"🦠", cat:"PEUPLE", year:2, rarity:"common", chainId:"epidemie_1",
  a:{ label:"Accepter l'aide OMS", fx:{peuple:8,tresor:2,armee:0,pouvoir:-4}, tags:["aide_oms"], nextChain:"epidemie_2" },
  b:{ label:"Gérer en interne", fx:{peuple:-4,tresor:-6,armee:0,pouvoir:4}, tags:["gestion_interne"], nextChain:"epidemie_2b" }},

{ id:40, title:"L'épidémie s'étend", desc:"La fièvre atteint Parakou. Hôpitaux saturés, personnel épuisé. Les réseaux sociaux amplifient la panique. Le nord est paralysé.", icon:"🏥", cat:"PEUPLE", year:3, rarity:"uncommon", chainId:"epidemie_2b", requireTags:["gestion_interne"],
  a:{ label:"Appel à la diaspora médicale", fx:{peuple:6,tresor:-4,armee:0,pouvoir:2}, tags:["diaspora_med"] },
  b:{ label:"Quarantaine stricte", fx:{peuple:-12,tresor:-8,armee:4,pouvoir:-4}, tags:["quarantaine"] }},

{ id:41, title:"Vaccin disponible", desc:"L'OMS développe un vaccin efficace mais il n'y a que 2 millions de doses pour 15 millions de Béninois. Qui vacciner en priorité ?", icon:"💉", cat:"PEUPLE", year:3, rarity:"uncommon", chainId:"epidemie_2", requireTags:["aide_oms"],
  a:{ label:"Priorité au nord (épicentre)", fx:{peuple:4,tresor:0,armee:4,pouvoir:6}, tags:["vaccin_nord"] },
  b:{ label:"Priorité Cotonou (économie)", fx:{peuple:-6,tresor:6,armee:0,pouvoir:-4}, tags:["vaccin_sud"] }},

// ═══════════════ CHAÎNE 11 — IA & AUTOMATISATION [PROSPECTIF] (4) ═══════════════

{ id:42, title:"L'IA remplace des emplois", desc:"2029. Les plateformes de ride-hailing et l'IA menacent 200 000 emplois informels — zémidjans, secrétaires, comptables. La jeunesse est inquiète.", icon:"🤖", cat:"ÉCONOMIE", year:4, rarity:"common", chainId:"ia_1",
  a:{ label:"Taxer les plateformes IA", fx:{peuple:6,tresor:-6,armee:0,pouvoir:4}, tags:["taxe_ia"], nextChain:"ia_2" },
  b:{ label:"Accélérer la transition", fx:{peuple:-8,tresor:10,armee:0,pouvoir:3}, tags:["transition_ia"], nextChain:"ia_2b" }},

{ id:43, title:"Révolte des zémidjans 3.0", desc:"Les zémidjans bloquent Cotonou pendant 5 jours. Ils brûlent des véhicules autonomes. L'économie informelle se bat pour sa survie contre le progrès.", icon:"🔥", cat:"PEUPLE", year:5, rarity:"uncommon", chainId:"ia_2", requireTags:["taxe_ia"],
  a:{ label:"Programme de reconversion", fx:{peuple:8,tresor:-8,armee:2,pouvoir:5}, tags:["reconversion_ia"] },
  b:{ label:"Disperser par la force", fx:{peuple:-14,tresor:4,armee:4,pouvoir:-8}, tags:["force_ia"] }},

{ id:44, title:"Sèmè City devient un hub IA", desc:"Le campus Sèmè City attire des géants tech. 5 000 emplois créés en IA, mais uniquement pour les diplômés. La fracture numérique s'élargit.", icon:"🚀", cat:"ÉCONOMIE", year:5, rarity:"uncommon", chainId:"ia_2b", requireTags:["transition_ia"],
  a:{ label:"Formation IA pour tous", fx:{peuple:8,tresor:-6,armee:0,pouvoir:6}, tags:["formation_ia"] },
  b:{ label:"Laisser le marché décider", fx:{peuple:-6,tresor:8,armee:0,pouvoir:-2}, tags:["marche_ia"] }},

{ id:45, title:"Deepfake présidentiel", desc:"2031. Une vidéo deepfake vous montre accepter un pot-de-vin. Virale sur WhatsApp en 2h. Fausse, mais le mal est fait. Personne ne sait plus quoi croire.", icon:"🎭", cat:"POUVOIR", year:6, rarity:"rare",
  a:{ label:"Démenti vidéo en direct", fx:{peuple:4,tresor:0,armee:0,pouvoir:8}, tags:["dementi_deepfake"] },
  b:{ label:"Couper WhatsApp", fx:{peuple:-12,tresor:-6,armee:3,pouvoir:-14}, tags:["coupure_whatsapp"] }},

// ═══════════════ CHAÎNE 12 — ÉROSION CÔTIÈRE [PROSPECTIF] (3) ═══════════════

{ id:46, title:"La mer avance", desc:"2028. Cotonou perd 10 mètres de côte par an. Un quartier entier de Fidjrossè est menacé. 50 000 habitants doivent être relogés. Le temps presse.", icon:"🌊", cat:"PEUPLE", year:3, rarity:"common", chainId:"erosion_1",
  a:{ label:"Mur de protection côtier", fx:{peuple:4,tresor:-12,armee:0,pouvoir:4}, tags:["mur_cotier"], nextChain:"erosion_2" },
  b:{ label:"Relocalisation des habitants", fx:{peuple:-8,tresor:-6,armee:0,pouvoir:-4}, tags:["relocalise"], nextChain:"erosion_2b" }},

{ id:47, title:"Le mur tient, mais...", desc:"Le mur côtier protège Fidjrossè mais détourne l'érosion vers l'est. Sèmè-Kpodji est maintenant menacé. La nature ne négocie pas.", icon:"🏗️", cat:"ÉCONOMIE", year:5, rarity:"uncommon", chainId:"erosion_2", requireTags:["mur_cotier"],
  a:{ label:"Étendre le mur (très coûteux)", fx:{peuple:2,tresor:-14,armee:0,pouvoir:2}, tags:["mur_etendu"] },
  b:{ label:"Accepter le recul côtier", fx:{peuple:-6,tresor:0,armee:0,pouvoir:-4}, tags:["accepte_recul"] }},

{ id:48, title:"Réfugiés climatiques internes", desc:"2031. 100 000 déplacés climatiques du littoral s'installent dans les quartiers périphériques. Les tensions sociales explosent. Le nord refuse de les accueillir.", icon:"🏚️", cat:"PEUPLE", year:6, rarity:"uncommon", chainId:"erosion_2b", requireTags:["relocalise"],
  a:{ label:"Plan national de relocalisation", fx:{peuple:6,tresor:-10,armee:2,pouvoir:6}, tags:["plan_relocalisation"] },
  b:{ label:"Laisser les communes gérer", fx:{peuple:-8,tresor:0,armee:-4,pouvoir:-4}, tags:["communes_seules"] }},

// ═══════════════ ÉVÉNEMENTS AUTONOMES — ANNÉE 1 (12) ═══════════════

{ id:49, title:"Premiers 100 jours", desc:"La presse dresse votre bilan. Les syndicats demandent une hausse du SMIG. Le patronat menace de délocaliser si vous cédez.", icon:"📋", cat:"ÉCONOMIE", year:1, rarity:"common",
  a:{ label:"Augmenter le SMIG", fx:{peuple:12,tresor:-8,armee:0,pouvoir:2}, tags:["hausse_smig"] },
  b:{ label:"Reporter à l'an 2", fx:{peuple:-6,tresor:4,armee:0,pouvoir:-2}, tags:["report_smig"] }},

{ id:50, title:"Visite officielle à Paris", desc:"L'Élysée vous invite. La France offre coopération militaire au nord et investissements au port. Mais l'opinion africaine est anti-France.", icon:"🇫🇷", cat:"POUVOIR", year:1, rarity:"common",
  a:{ label:"Accepter le partenariat", fx:{peuple:-4,tresor:8,armee:6,pouvoir:-6}, tags:["france"] },
  b:{ label:"Diversifier les alliances", fx:{peuple:6,tresor:-2,armee:-2,pouvoir:8}, tags:["diversif_diplo"] }},

{ id:51, title:"Inondations à Cotonou", desc:"Pluies torrentielles. 30 000 sinistrés à Akpakpa et Fidjrossè. Les réseaux accusent le gouvernement d'inaction sur le drainage urbain.", icon:"🌊", cat:"PEUPLE", year:1, rarity:"common",
  a:{ label:"Plan d'urgence national", fx:{peuple:8,tresor:-8,armee:0,pouvoir:4}, tags:["urgence_inondation"] },
  b:{ label:"Aide ciblée minimale", fx:{peuple:-6,tresor:-2,armee:0,pouvoir:-4}, tags:["aide_min"] }},

{ id:52, title:"Vodun Days à Ouidah", desc:"Le 10 janvier approche. Les Vodun Days attirent le monde entier. Des groupes évangéliques demandent la fin de la fête nationale du Vodun.", icon:"🐍", cat:"PEUPLE", year:1, rarity:"common",
  a:{ label:"Maintenir et amplifier", fx:{peuple:10,tresor:4,armee:2,pouvoir:4}, tags:["vodun_fort"] },
  b:{ label:"Réduire au minimum", fx:{peuple:-12,tresor:-2,armee:-2,pouvoir:-6}, tags:["vodun_faible"] }},

{ id:53, title:"La Chine propose un port", desc:"Pékin offre un port en eau profonde à Sèmè. Conditions : bail 99 ans et base logistique navale. Le port de Cotonou serait déclassé.", icon:"🇨🇳", cat:"ÉCONOMIE", year:1, rarity:"common",
  a:{ label:"Accepter l'offre chinoise", fx:{peuple:2,tresor:14,armee:-4,pouvoir:-12}, tags:["port_chinois"] },
  b:{ label:"Moderniser Cotonou nous-mêmes", fx:{peuple:-2,tresor:-4,armee:2,pouvoir:8}, tags:["modernise_cotonou"] }},

{ id:54, title:"Grève des zémidjans", desc:"Les conducteurs de moto-taxis protestent contre la digitalisation de leurs licences. Cotonou est paralysé. 200 000 emplois directs.", icon:"🏍️", cat:"PEUPLE", year:1, rarity:"common",
  a:{ label:"Suspendre la digitalisation", fx:{peuple:8,tresor:-4,armee:2,pouvoir:-4}, tags:["suspend_digit"] },
  b:{ label:"Maintenir la réforme", fx:{peuple:-10,tresor:6,armee:-2,pouvoir:4}, tags:["digit_forcee"] }},

// ═══════════════ BOUFFÉE D'AIR 1 ═══════════════
{ id:55, title:"Bonne récolte de coton", desc:"La saison est exceptionnelle : 700 000 tonnes, record historique. Le Bénin devient le premier producteur africain devant le Mali.", icon:"🌿", cat:"ÉCONOMIE", year:1, rarity:"common",
  a:{ label:"Exporter massivement", fx:{peuple:4,tresor:10,armee:0,pouvoir:2}, tags:["export_coton"] },
  b:{ label:"Transformer localement", fx:{peuple:6,tresor:6,armee:0,pouvoir:4}, tags:["transfo_locale"] }},

// ═══════════════ ÉVÉNEMENTS AUTONOMES — ANNÉE 2 (12) ═══════════════

{ id:56, title:"Pénurie de kpayo", desc:"L'essence de contrebande du Nigeria se raréfie. Les prix du carburant flambent. Le secteur informel, qui dépend du kpayo, est paralysé.", icon:"⛽", cat:"ÉCONOMIE", year:2, rarity:"common",
  a:{ label:"Subventionner le carburant", fx:{peuple:8,tresor:-10,armee:0,pouvoir:2}, tags:["sub_carburant"] },
  b:{ label:"Laisser les prix monter", fx:{peuple:-10,tresor:4,armee:-2,pouvoir:-4}, tags:["prix_libre"] }},

{ id:57, title:"Étudiants en colère à l'UAC", desc:"Les étudiants d'Abomey-Calavi occupent le campus. Ils exigent des bourses, des labos et la fin du harcèlement sexuel. La police encercle.", icon:"🎓", cat:"PEUPLE", year:2, rarity:"common",
  a:{ label:"Négocier avec les étudiants", fx:{peuple:8,tresor:-6,armee:-2,pouvoir:4}, tags:["dialogue_etudiants"] },
  b:{ label:"Évacuer par la force", fx:{peuple:-14,tresor:2,armee:4,pouvoir:-10}, tags:["force_etudiants"] }},

{ id:58, title:"Le cajou en or", desc:"Le prix mondial de la noix de cajou explose. Le Bénin est le 5e producteur mondial. Transformer ici ou exporter brut ?", icon:"🥜", cat:"ÉCONOMIE", year:2, rarity:"common",
  a:{ label:"Interdire l'export brut", fx:{peuple:-8,tresor:10,armee:0,pouvoir:4}, tags:["interdit_brut"] },
  b:{ label:"Double voie libre", fx:{peuple:6,tresor:4,armee:0,pouvoir:-2}, tags:["libre_cajou"] }},

{ id:59, title:"Amazone Air en difficulté", desc:"La compagnie aérienne nationale accumule les retards et les pertes. Le secteur privé demande sa privatisation. Le prestige national est en jeu.", icon:"✈️", cat:"ÉCONOMIE", year:2, rarity:"common",
  a:{ label:"Injecter des fonds publics", fx:{peuple:-2,tresor:-8,armee:0,pouvoir:4}, tags:["renfloue_amazone"] },
  b:{ label:"Privatiser", fx:{peuple:-4,tresor:6,armee:0,pouvoir:-6}, tags:["privatise_amazone"] }},

{ id:60, title:"Transhumance meurtrière", desc:"Affrontements entre éleveurs peuls et agriculteurs dans le Borgou. 18 morts. Les villages s'arment. Le conflit menace de dégénérer.", icon:"🌾", cat:"SÉCURITÉ", year:2, rarity:"common",
  a:{ label:"Couloirs de transhumance", fx:{peuple:6,tresor:-4,armee:4,pouvoir:6}, tags:["couloirs"] },
  b:{ label:"Interdire la transhumance", fx:{peuple:-6,tresor:2,armee:8,pouvoir:-4}, tags:["interdit_transhumance"] }},

{ id:61, title:"Réforme foncière", desc:"80% des terrains n'ont pas de titre officiel. Les conflits fonciers engorgent les tribunaux. Un cadastre digital pourrait tout changer.", icon:"📋", cat:"ÉCONOMIE", year:2, rarity:"common",
  a:{ label:"Cadastre digital national", fx:{peuple:4,tresor:8,armee:2,pouvoir:6}, tags:["cadastre"] },
  b:{ label:"Reporter la réforme", fx:{peuple:-2,tresor:-2,armee:-2,pouvoir:-2}, tags:["report_foncier"] }},

{ id:62, title:"Fake news virale", desc:"Un faux message WhatsApp annonce que le port a été vendu à la Chine. Émeutes à Abomey. C'est faux, mais la rumeur enfle dangereusement.", icon:"📱", cat:"PEUPLE", year:2, rarity:"common",
  a:{ label:"Démenti officiel immédiat", fx:{peuple:4,tresor:0,armee:-2,pouvoir:4}, tags:["dementi"] },
  b:{ label:"Couper internet", fx:{peuple:-12,tresor:-6,armee:4,pouvoir:-14}, tags:["coupure_internet"] }},

// ═══════════════ BOUFFÉE D'AIR 2 ═══════════════
{ id:63, title:"Don du Japon", desc:"Le Japon offre 30 milliards FCFA pour le développement. À vous de choisir le secteur prioritaire. Les deux options sont bénéfiques.", icon:"🇯🇵", cat:"ÉCONOMIE", year:2, rarity:"common",
  a:{ label:"Investir dans la santé", fx:{peuple:10,tresor:-2,armee:0,pouvoir:4}, tags:["sante_japon"] },
  b:{ label:"Investir dans l'éducation", fx:{peuple:8,tresor:4,armee:0,pouvoir:4}, tags:["education_japon"] }},

// ═══════════════ ÉVÉNEMENTS AUTONOMES — ANNÉE 3 (14) ═══════════════

{ id:64, title:"Corruption au port", desc:"Un audit révèle un détournement de 15 milliards FCFA par an aux douanes de Cotonou. Le syndicat menace de bloquer le port si vous sévissez.", icon:"🚢", cat:"ÉCONOMIE", year:3, rarity:"common",
  a:{ label:"Purge des douanes", fx:{peuple:8,tresor:-6,armee:0,pouvoir:8}, tags:["purge_douanes"] },
  b:{ label:"Réforme progressive", fx:{peuple:-2,tresor:4,armee:0,pouvoir:-4}, tags:["reforme_douce"] }},

{ id:65, title:"Spiro veut le monopole", desc:"Spiro, champion béninois des motos électriques, demande un monopole sur les motos neuves à Cotonou. Les importateurs de thermiques se révoltent.", icon:"🔋", cat:"ÉCONOMIE", year:3, rarity:"common",
  a:{ label:"Accorder le monopole", fx:{peuple:-6,tresor:10,armee:0,pouvoir:-2}, tags:["monopole_spiro"] },
  b:{ label:"Concurrence ouverte", fx:{peuple:4,tresor:2,armee:0,pouvoir:4}, tags:["libre_moto"] }},

{ id:66, title:"Crise du logement", desc:"Le prix du ciment a triplé. Les jeunes ne peuvent plus construire. Un bidonville géant se forme à la périphérie de Cotonou.", icon:"🏚️", cat:"PEUPLE", year:3, rarity:"common",
  a:{ label:"Programme logement social", fx:{peuple:10,tresor:-10,armee:2,pouvoir:4}, tags:["logement_social"] },
  b:{ label:"Libéraliser le foncier", fx:{peuple:-4,tresor:6,armee:-2,pouvoir:-2}, tags:["liberal_foncier"] }},

{ id:67, title:"Restitution des trésors royaux", desc:"La France restitue 12 nouvelles œuvres du Dahomey. Le musée de Porto-Novo peut organiser une exposition mondiale. Occasion unique.", icon:"🏛️", cat:"PEUPLE", year:3, rarity:"common",
  a:{ label:"Expo internationale", fx:{peuple:8,tresor:6,armee:0,pouvoir:6}, tags:["expo_royale"] },
  b:{ label:"Garder pour usage local", fx:{peuple:4,tresor:-2,armee:0,pouvoir:2}, tags:["culture_locale"] }},

{ id:68, title:"Sécheresse dans l'Atacora", desc:"La pire sécheresse en 20 ans. Récoltes détruites. 200 000 personnes menacées de famine. Les ONG demandent un accès humanitaire immédiat.", icon:"☀️", cat:"PEUPLE", year:3, rarity:"common",
  a:{ label:"Déclarer l'urgence alimentaire", fx:{peuple:6,tresor:-6,armee:0,pouvoir:-4}, tags:["urgence_alim"] },
  b:{ label:"Aide discrète sans panique", fx:{peuple:-4,tresor:-2,armee:0,pouvoir:4}, tags:["discret_famine"] }},

{ id:69, title:"L'opposition propose un pacte", desc:"Les Démocrates, sous un nouveau leader, proposent un dialogue national. Pacte de non-agression en échange d'une réforme électorale.", icon:"🤝", cat:"POUVOIR", year:3, rarity:"common",
  a:{ label:"Accepter le dialogue", fx:{peuple:6,tresor:0,armee:2,pouvoir:12}, tags:["dialogue_oppo"] },
  b:{ label:"Conditions inacceptables", fx:{peuple:-4,tresor:0,armee:-2,pouvoir:-10}, tags:["refuse_oppo"] }},

{ id:70, title:"Sodabi mortel", desc:"Du sodabi frelaté tue 30 personnes dans le Zou. Le CES avait recommandé une régulation. Les distillateurs artisanaux protestent contre toute interdiction.", icon:"☠️", cat:"PEUPLE", year:3, rarity:"common",
  a:{ label:"Interdire le sodabi artisanal", fx:{peuple:-10,tresor:2,armee:2,pouvoir:-4}, tags:["interdit_sodabi"] },
  b:{ label:"Réguler sans interdire", fx:{peuple:4,tresor:-2,armee:0,pouvoir:4}, tags:["regule_sodabi"] }},

{ id:71, title:"Turquie : drones Bayraktar", desc:"Ankara propose des drones de combat pour le nord. En échange : contrats d'infrastructure et une base diplomatique élargie au Bénin.", icon:"🇹🇷", cat:"SÉCURITÉ", year:3, rarity:"uncommon",
  a:{ label:"Acheter les drones turcs", fx:{peuple:-2,tresor:-6,armee:12,pouvoir:-4}, tags:["drones_turcs"] },
  b:{ label:"Développer nos propres drones", fx:{peuple:4,tresor:-8,armee:2,pouvoir:8}, tags:["drones_locaux"] }},

// ═══════════════ BOUFFÉE D'AIR 3 ═══════════════
{ id:72, title:"Victoire des Guépards", desc:"L'équipe nationale de football se qualifie pour la CAN. Le pays est en liesse. Une victoire qui rassemble toutes les régions du Bénin.", icon:"⚽", cat:"PEUPLE", year:3, rarity:"common",
  a:{ label:"Investir dans le sport", fx:{peuple:10,tresor:-4,armee:0,pouvoir:4}, tags:["invest_sport"] },
  b:{ label:"Célébration nationale", fx:{peuple:8,tresor:0,armee:2,pouvoir:6}, tags:["celebration"] }},

// ═══════════════ ÉVÉNEMENTS AUTONOMES — ANNÉE 4 (14) ═══════════════

{ id:73, title:"Cyber-attaque bancaire", desc:"Des hackers attaquent le système bancaire. 5 milliards FCFA volatilisés. Le paiement mobile est paralysé pendant 3 jours.", icon:"💻", cat:"ÉCONOMIE", year:4, rarity:"common",
  a:{ label:"Agence de cybersécurité", fx:{peuple:2,tresor:-6,armee:6,pouvoir:4}, tags:["cybersec"] },
  b:{ label:"Experts étrangers d'urgence", fx:{peuple:-2,tresor:-2,armee:4,pouvoir:-4}, tags:["cyber_etrangers"] }},

{ id:74, title:"Boom à Ganvié", desc:"La Venise de l'Afrique reçoit 500 000 visiteurs en un an. Mais les habitants vivent dans la pauvreté et menacent de bloquer l'accès.", icon:"🏖️", cat:"ÉCONOMIE", year:4, rarity:"common",
  a:{ label:"Taxe tourisme pour les locaux", fx:{peuple:10,tresor:-2,armee:0,pouvoir:4}, tags:["taxe_tourisme"] },
  b:{ label:"Investir dans l'hôtellerie", fx:{peuple:-4,tresor:10,armee:0,pouvoir:2}, tags:["hotel_ganvie"] }},

{ id:75, title:"Trafic de cocaïne au port", desc:"La DEA alerte : Cotonou est devenu une plaque tournante de la cocaïne vers l'Europe. Des officiels seraient complices. La pression monte.", icon:"🚨", cat:"SÉCURITÉ", year:4, rarity:"common",
  a:{ label:"Coopération avec la DEA", fx:{peuple:-2,tresor:-4,armee:10,pouvoir:6}, tags:["coop_dea"] },
  b:{ label:"Enquête nationale seule", fx:{peuple:2,tresor:0,armee:2,pouvoir:-4}, tags:["enquete_solo"] }},

{ id:76, title:"Startup Sèmè City valorisée", desc:"Une fintech incubée à Sèmè City vaut 100 millions USD. Elle veut déménager au Kenya pour un meilleur écosystème. Le Bénin pourrait perdre sa pépite.", icon:"🚀", cat:"ÉCONOMIE", year:4, rarity:"common",
  a:{ label:"Zone franche tech", fx:{peuple:-2,tresor:10,armee:0,pouvoir:6}, tags:["zone_tech"] },
  b:{ label:"La laisser partir", fx:{peuple:-4,tresor:-4,armee:0,pouvoir:-4}, tags:["fuite_startup"] }},

{ id:77, title:"Le Sénat contesté", desc:"Le nouveau Sénat est accusé d'être un club VIP. Les anciens présidents y siègent de droit. La société civile demande son ouverture.", icon:"🏛️", cat:"POUVOIR", year:4, rarity:"common",
  a:{ label:"Ouvrir à la société civile", fx:{peuple:8,tresor:0,armee:0,pouvoir:10}, tags:["senat_ouvert"] },
  b:{ label:"Garder le format actuel", fx:{peuple:-6,tresor:0,armee:0,pouvoir:-6}, tags:["senat_ferme"] }},

{ id:78, title:"ARCH en déficit", desc:"L'assurance maladie universelle couvre 3M de Béninois mais le système est en déficit. Il faut augmenter les cotisations ou réduire la couverture.", icon:"🏥", cat:"PEUPLE", year:4, rarity:"common",
  a:{ label:"Subvention de l'État", fx:{peuple:8,tresor:-10,armee:0,pouvoir:4}, tags:["sub_arch"] },
  b:{ label:"Augmenter les cotisations", fx:{peuple:-6,tresor:4,armee:0,pouvoir:2}, tags:["hausse_cotis"] }},

{ id:79, title:"Imam radical à Djougou", desc:"Un prédicateur gagne en influence dans le nord musulman. Il prêche contre le gouvernement « impie ». Le renseignement vous alerte.", icon:"🕌", cat:"SÉCURITÉ", year:4, rarity:"uncommon",
  a:{ label:"Dialogue interreligieux", fx:{peuple:6,tresor:0,armee:-2,pouvoir:6}, tags:["dialogue_relig"] },
  b:{ label:"Surveillance renforcée", fx:{peuple:-6,tresor:0,armee:8,pouvoir:-4}, tags:["surveillance_imam"] }},

{ id:80, title:"Barrage sur le Mono", desc:"Un barrage hydroélectrique pourrait fournir 30% des besoins. Mais il inonderait des villages et des forêts sacrées Vodun.", icon:"🌊", cat:"ÉCONOMIE", year:4, rarity:"uncommon",
  a:{ label:"Construire le barrage", fx:{peuple:-8,tresor:12,armee:0,pouvoir:-4}, tags:["barrage"] },
  b:{ label:"Alternatives renouvelables", fx:{peuple:6,tresor:-4,armee:0,pouvoir:6}, tags:["renouvelables"] }},

{ id:81, title:"Palais d'Abomey restaurés", desc:"L'UNESCO finance la restauration des palais royaux. Mais les travaux déplaceraient 500 familles vivant sur le site classé.", icon:"🏰", cat:"PEUPLE", year:4, rarity:"uncommon",
  a:{ label:"Restauration complète", fx:{peuple:-4,tresor:6,armee:0,pouvoir:6}, tags:["restauration"] },
  b:{ label:"Restauration partielle", fx:{peuple:4,tresor:2,armee:0,pouvoir:2}, tags:["partielle"] }},

{ id:82, title:"Béninois champion du monde", desc:"Un athlète béninois remporte l'or aux championnats du monde. Le pays est en liesse. Il demande un centre sportif national.", icon:"🏅", cat:"PEUPLE", year:4, rarity:"common",
  a:{ label:"Construire le centre sportif", fx:{peuple:10,tresor:-6,armee:0,pouvoir:4}, tags:["centre_sport"] },
  b:{ label:"Félicitations symboliques", fx:{peuple:-4,tresor:0,armee:0,pouvoir:-2}, tags:["felicite_vide"] }},

// ═══════════════ BOUFFÉE D'AIR 4 ═══════════════
{ id:83, title:"Investissement record BRVM", desc:"Des entreprises béninoises lèvent 50 milliards FCFA à la bourse d'Abidjan. La confiance des investisseurs dans le Bénin atteint un sommet.", icon:"📈", cat:"ÉCONOMIE", year:4, rarity:"common",
  a:{ label:"Créer une bourse à Cotonou", fx:{peuple:2,tresor:10,armee:0,pouvoir:6}, tags:["bourse_cotonou"] },
  b:{ label:"Renforcer le partenariat BRVM", fx:{peuple:4,tresor:8,armee:0,pouvoir:4}, tags:["brvm_renforce"] }},

// ═══════════════ ÉVÉNEMENTS AUTONOMES — ANNÉE 5 [PROSPECTIF] (14) ═══════════════

{ id:84, title:"Le FCFA en question", desc:"2030. Le débat sur le passage du FCFA à l'Eco s'intensifie. Le Nigeria pousse, la France freine. La zone UEMOA est divisée.", icon:"💱", cat:"ÉCONOMIE", year:5, rarity:"uncommon",
  a:{ label:"Soutenir l'Eco", fx:{peuple:6,tresor:-4,armee:0,pouvoir:8}, tags:["eco"] },
  b:{ label:"Prudence, garder le FCFA", fx:{peuple:-4,tresor:6,armee:0,pouvoir:-4}, tags:["fcfa"] }},

{ id:85, title:"ZLECAF : libre-échange africain", desc:"2030. La Zone de libre-échange continentale s'active. Les produits béninois accèdent à 1,4 milliard de consommateurs — mais la concurrence aussi.", icon:"🌍", cat:"ÉCONOMIE", year:5, rarity:"uncommon",
  a:{ label:"Ouvrir les frontières", fx:{peuple:-4,tresor:10,armee:0,pouvoir:6}, tags:["zlecaf_ouverte"] },
  b:{ label:"Protéger l'industrie locale", fx:{peuple:6,tresor:-4,armee:0,pouvoir:-2}, tags:["protectionisme"] }},

{ id:86, title:"Fibre optique nationale", desc:"Le Bénin a le meilleur internet d'Afrique de l'Ouest. Les data centers se multiplient. Mais ça facilite aussi la surveillance et les fake news.", icon:"🌐", cat:"ÉCONOMIE", year:5, rarity:"common",
  a:{ label:"Internet libre et ouvert", fx:{peuple:6,tresor:8,armee:-4,pouvoir:6}, tags:["internet_libre"] },
  b:{ label:"Filtrage et contrôle", fx:{peuple:-8,tresor:4,armee:4,pouvoir:-10}, tags:["filtre_internet"] }},

{ id:87, title:"Retrait militaire français", desc:"2030. La France retire ses conseillers militaires du Bénin. Les forces du nord perdent un soutien technique crucial face au JNIM.", icon:"🇫🇷", cat:"SÉCURITÉ", year:5, rarity:"uncommon",
  a:{ label:"Coopération avec les USA", fx:{peuple:-2,tresor:4,armee:6,pouvoir:-4}, tags:["coop_usa"] },
  b:{ label:"Autonomie militaire totale", fx:{peuple:8,tresor:-8,armee:-4,pouvoir:10}, tags:["autonomie_mil"] }},

{ id:88, title:"Exode rural massif", desc:"2030. Les jeunes du nord fuient vers Cotonou. La capitale est saturée. Les bidonvilles s'étendent. Le ressentiment monte entre nord et sud.", icon:"🏙️", cat:"PEUPLE", year:5, rarity:"common",
  a:{ label:"Développer les villes secondaires", fx:{peuple:6,tresor:-8,armee:2,pouvoir:4}, tags:["villes_second"] },
  b:{ label:"Laisser faire", fx:{peuple:-8,tresor:0,armee:-4,pouvoir:-4}, tags:["ignore_exode"] }},

{ id:89, title:"Élections municipales", desc:"Les municipales approchent. L'opposition présente des candidats partout. Vos alliés vous demandent de « sécuriser » le scrutin en leur faveur.", icon:"🗳️", cat:"POUVOIR", year:5, rarity:"common",
  a:{ label:"Élections transparentes", fx:{peuple:10,tresor:0,armee:0,pouvoir:10}, tags:["elections_transparentes"] },
  b:{ label:"Avantager vos alliés", fx:{peuple:-10,tresor:0,armee:2,pouvoir:-12}, tags:["elections_biaisees"] }},

{ id:90, title:"Wagner repéré dans le nord", desc:"2030. Des éléments Africa Corps (ex-Wagner) sont repérés dans les mines d'or artisanales du nord. Ils prospectent et recrutent.", icon:"🕵️", cat:"SÉCURITÉ", year:5, rarity:"rare",
  a:{ label:"Expulsion immédiate", fx:{peuple:2,tresor:-2,armee:6,pouvoir:8}, tags:["expulse_wagner"] },
  b:{ label:"Surveiller sans agir", fx:{peuple:0,tresor:0,armee:-6,pouvoir:-4}, tags:["tolere_wagner"] }},

{ id:91, title:"CAN 2031 au Bénin ?", desc:"La CAF propose au Bénin de co-organiser la CAN 2031. Il faut 3 stades et des infrastructures. Coût colossal mais prestige immense.", icon:"⚽", cat:"ÉCONOMIE", year:5, rarity:"uncommon",
  a:{ label:"Accepter la candidature", fx:{peuple:10,tresor:-14,armee:0,pouvoir:6}, tags:["can_benin"] },
  b:{ label:"Décliner poliment", fx:{peuple:-4,tresor:4,armee:0,pouvoir:-2}, tags:["decline_can"] }},

{ id:92, title:"Record de chaleur : 47°C", desc:"2031. Parakou enregistre 47°C. Les hôpitaux débordent. Le changement climatique frappe le Sahel de plein fouet. Le nord suffoque.", icon:"🌡️", cat:"PEUPLE", year:5, rarity:"common",
  a:{ label:"Plan climat national", fx:{peuple:4,tresor:-8,armee:0,pouvoir:6}, tags:["plan_climat"] },
  b:{ label:"Mesures d'urgence ponctuelles", fx:{peuple:-2,tresor:-2,armee:0,pouvoir:-2}, tags:["urgence_climat"] }},

{ id:93, title:"Le Bénin dans l'espace", desc:"2031. Un programme spatial ouest-africain propose un satellite d'observation. Utile pour l'agriculture et la sécurité. Coût : 20 milliards FCFA.", icon:"🛰️", cat:"ÉCONOMIE", year:5, rarity:"rare",
  a:{ label:"Investir dans le satellite", fx:{peuple:-2,tresor:-6,armee:8,pouvoir:10}, tags:["satellite"] },
  b:{ label:"Acheter des images existantes", fx:{peuple:0,tresor:2,armee:2,pouvoir:-2}, tags:["images_sat"] }},

{ id:94, title:"Migration clandestine", desc:"2031. Des centaines de jeunes tentent la traversée vers l'Europe via le Niger et la Libye. 12 morts en mer. Les familles accusent le manque d'emploi.", icon:"🚤", cat:"PEUPLE", year:5, rarity:"common",
  a:{ label:"Programme emploi jeunesse", fx:{peuple:8,tresor:-10,armee:0,pouvoir:4}, tags:["emploi_jeunes"] },
  b:{ label:"Campagne anti-migration", fx:{peuple:-4,tresor:0,armee:2,pouvoir:-2}, tags:["anti_migr"] }},

// ═══════════════ BOUFFÉE D'AIR 5 ═══════════════
{ id:95, title:"Prix Nobel de la Paix ?", desc:"2031. Votre gestion du conflit avec le Niger et du terrorisme au nord vous vaut une nomination au Prix Nobel de la Paix. Le monde observe.", icon:"🕊️", cat:"POUVOIR", year:5, rarity:"rare", requireTags:["paix_niger"],
  a:{ label:"Accepter humblement", fx:{peuple:8,tresor:4,armee:4,pouvoir:12}, tags:["nobel"] },
  b:{ label:"Refuser la politisation", fx:{peuple:4,tresor:0,armee:0,pouvoir:6}, tags:["refuse_nobel"] }},

// ═══════════════ ÉVÉNEMENTS AUTONOMES — ANNÉE 6 [PROSPECTIF] (12) ═══════════════

{ id:96, title:"Bilan économique du FMI", desc:"2032. Le FMI publie un rapport : croissance de 7%, mais 28% de pauvreté. Le miracle béninois est « réel mais inachevé ». La presse titre.", icon:"📊", cat:"ÉCONOMIE", year:6, rarity:"common",
  a:{ label:"Programme de redistribution", fx:{peuple:12,tresor:-8,armee:0,pouvoir:4}, tags:["redistribution"] },
  b:{ label:"Cap sur la croissance pure", fx:{peuple:-6,tresor:8,armee:0,pouvoir:2}, tags:["croissance"] }},

{ id:97, title:"Route Porto-Novo — Parakou", desc:"La RN1 est enfin terminée après 4 ans. Le trajet passe de 10h à 4h. Le nord n'est plus isolé. Un moment historique.", icon:"🛣️", cat:"ÉCONOMIE", year:6, rarity:"common",
  a:{ label:"Inauguration nationale", fx:{peuple:8,tresor:6,armee:4,pouvoir:6}, tags:["inaugure_route"] },
  b:{ label:"Prolonger vers Malanville", fx:{peuple:4,tresor:-4,armee:6,pouvoir:2}, tags:["route_malanville"] }},

{ id:98, title:"Fuite des médecins", desc:"2032. 400 médecins ont quitté le pays en 2 ans. L'hôpital de Parakou fonctionne avec un seul chirurgien. Les syndicats menacent la grève.", icon:"🩺", cat:"PEUPLE", year:6, rarity:"common",
  a:{ label:"Tripler les salaires médicaux", fx:{peuple:6,tresor:-12,armee:0,pouvoir:4}, tags:["salaires_med"] },
  b:{ label:"Service national médical", fx:{peuple:-4,tresor:-4,armee:0,pouvoir:-6}, tags:["service_med"] }},

{ id:99, title:"Grève générale", desc:"2032. Les syndicats appellent à 48h de grève. Vie chère, inégalités, autoritarisme. Le pays est paralysé. C'est le test de votre mandat.", icon:"✊", cat:"PEUPLE", year:6, rarity:"common",
  a:{ label:"Table ronde nationale", fx:{peuple:10,tresor:-6,armee:-2,pouvoir:8}, tags:["table_ronde"] },
  b:{ label:"Réquisition et fermeté", fx:{peuple:-14,tresor:4,armee:6,pouvoir:-10}, tags:["requisition"] }},

{ id:100, title:"Pollution de l'Ouémé", desc:"Les usines de la GDIZ déversent des produits chimiques dans le fleuve. Poissons morts, enfants malades. Les écologistes manifestent.", icon:"🏭", cat:"PEUPLE", year:6, rarity:"uncommon", requireTags:["gdiz_textile"],
  a:{ label:"Fermer les usines fautives", fx:{peuple:10,tresor:-12,armee:0,pouvoir:6}, tags:["ferme_usines"] },
  b:{ label:"Amendes symboliques", fx:{peuple:-10,tresor:4,armee:0,pouvoir:-6}, tags:["amendes"] }},

{ id:101, title:"Trafic de vidomègon", desc:"Un réseau de trafic d'enfants est démantelé à Dantokpa. Les vidomègon sont exploités. L'UNICEF demande des mesures exemplaires.", icon:"👶", cat:"PEUPLE", year:6, rarity:"uncommon",
  a:{ label:"Loi pénale renforcée", fx:{peuple:10,tresor:-2,armee:4,pouvoir:8}, tags:["loi_enfants"] },
  b:{ label:"Campagne de sensibilisation", fx:{peuple:4,tresor:-1,armee:0,pouvoir:2}, tags:["sensibilise"] }},

{ id:102, title:"Diplomate en disgrâce", desc:"Votre ambassadeur à l'ONU filmé ivre lors d'une réception. La vidéo est virale. Le Bénin est moqué sur les réseaux sociaux internationaux.", icon:"🥂", cat:"POUVOIR", year:6, rarity:"common",
  a:{ label:"Rappeler l'ambassadeur", fx:{peuple:4,tresor:0,armee:0,pouvoir:6}, tags:["rappel_ambass"] },
  b:{ label:"Minimiser l'incident", fx:{peuple:-2,tresor:0,armee:0,pouvoir:-4}, tags:["minimise"] }},

{ id:103, title:"Retraites en crise", desc:"Le Fonds National de Retraite affiche 30 milliards FCFA de déficit. Les retraités non payés depuis 3 mois manifestent au ministère.", icon:"👴", cat:"PEUPLE", year:6, rarity:"common",
  a:{ label:"Renflouer le fonds", fx:{peuple:8,tresor:-10,armee:0,pouvoir:2}, tags:["renfloue_retraites"] },
  b:{ label:"Réforme paramétrique", fx:{peuple:-6,tresor:4,armee:0,pouvoir:-4}, tags:["reforme_retraite"] }},

{ id:104, title:"Bénin au Conseil de sécurité", desc:"2032. Le Bénin brigue un siège non-permanent à l'ONU. Votre politique étrangère sera scrutée. L'Afrique du Sud est aussi candidate.", icon:"🇺🇳", cat:"POUVOIR", year:6, rarity:"uncommon",
  a:{ label:"Campagne diplomatique", fx:{peuple:2,tresor:-4,armee:0,pouvoir:12}, tags:["onu"] },
  b:{ label:"Soutenir l'Afrique du Sud", fx:{peuple:0,tresor:0,armee:0,pouvoir:4}, tags:["soutien_rsa"] }},

{ id:105, title:"Dette souveraine tendue", desc:"2032. Le ratio dette/PIB atteint 62%. L'Eurobond arrive à échéance. S&P menace une dégradation. Le FMI demande de l'austérité.", icon:"📉", cat:"ÉCONOMIE", year:6, rarity:"uncommon",
  a:{ label:"Austérité budgétaire", fx:{peuple:-8,tresor:10,armee:0,pouvoir:4}, tags:["austerite"] },
  b:{ label:"Renégocier la dette", fx:{peuple:4,tresor:-4,armee:0,pouvoir:6}, tags:["renegocie_dette"] }},

{ id:106, title:"Naufrage au large de Cotonou", desc:"Un bateau de pêche coule. 40 morts. Pas de gilets de sauvetage. Les familles accusent le laxisme sur la sécurité maritime.", icon:"⚓", cat:"PEUPLE", year:6, rarity:"common",
  a:{ label:"Normes de sécurité maritime", fx:{peuple:6,tresor:-4,armee:4,pouvoir:4}, tags:["securite_mer"] },
  b:{ label:"Fonds d'aide aux familles", fx:{peuple:4,tresor:-2,armee:0,pouvoir:2}, tags:["aide_naufrage"] }},

// ═══════════════ BOUFFÉE D'AIR 6 ═══════════════
{ id:107, title:"Classement Mo Ibrahim positif", desc:"2032. La Fondation Mo Ibrahim classe le Bénin dans le top 10 africain pour la gouvernance. Les investisseurs applaudissent. Votre cote monte.", icon:"🏆", cat:"POUVOIR", year:6, rarity:"uncommon",
  a:{ label:"Remercier et continuer", fx:{peuple:6,tresor:6,armee:2,pouvoir:8}, tags:["mo_ibrahim"] },
  b:{ label:"Utiliser pour la comm politique", fx:{peuple:2,tresor:4,armee:0,pouvoir:4}, tags:["comm_politique"] }},

// ═══════════════ ÉVÉNEMENTS AUTONOMES — ANNÉE 7 (10) ═══════════════

{ id:108, title:"La tentation du 3e mandat", desc:"2033. Vos partisans veulent modifier la Constitution. Le peuple est divisé. L'UA et la CEDEAO observent. C'est LE choix de votre vie.", icon:"📜", cat:"POUVOIR", year:7, rarity:"legendary",
  a:{ label:"Refuser et partir dignement", fx:{peuple:15,tresor:4,armee:4,pouvoir:18}, tags:["refuse_3e"] },
  b:{ label:"Modifier la Constitution", fx:{peuple:-18,tresor:-6,armee:-10,pouvoir:-20}, tags:["3e_mandat"] }},

{ id:109, title:"Choisir votre dauphin", desc:"Le parti vous demande de désigner un successeur. Deux candidats : un technocrate compétent sans charisme, ou un populiste charismatique imprévisible.", icon:"👑", cat:"POUVOIR", year:7, rarity:"common",
  a:{ label:"Le technocrate", fx:{peuple:-4,tresor:8,armee:2,pouvoir:6}, tags:["dauphin_techno"] },
  b:{ label:"Le populiste", fx:{peuple:8,tresor:-4,armee:-4,pouvoir:-2}, tags:["dauphin_pop"] }},

{ id:110, title:"Archives présidentielles", desc:"Un historien demande l'ouverture des archives de votre mandat. Certaines révéleraient des décisions controversées. Transparence ou secret ?", icon:"📚", cat:"POUVOIR", year:7, rarity:"common",
  a:{ label:"Tout ouvrir au public", fx:{peuple:8,tresor:0,armee:-2,pouvoir:12}, tags:["archives_pub"] },
  b:{ label:"Classification 30 ans", fx:{peuple:-6,tresor:0,armee:4,pouvoir:-6}, tags:["archives_class"] }},

{ id:111, title:"Dernière adresse à la nation", desc:"Votre dernier discours de président. Le pays attend. Bilan triomphaliste ou humilité devant les insuffisances ?", icon:"🎙️", cat:"POUVOIR", year:7, rarity:"common",
  a:{ label:"Discours d'humilité", fx:{peuple:10,tresor:0,armee:2,pouvoir:12}, tags:["discours_humble"] },
  b:{ label:"Discours triomphaliste", fx:{peuple:-4,tresor:2,armee:0,pouvoir:-2}, tags:["triomphe"] }},

{ id:112, title:"Transition du pouvoir", desc:"Le jour de la passation approche. Des proches vous conseillent de retarder pour « protéger vos intérêts ». Le monde observe.", icon:"🗳️", cat:"POUVOIR", year:7, rarity:"common",
  a:{ label:"Transition exemplaire", fx:{peuple:12,tresor:4,armee:4,pouvoir:15}, tags:["transition_ok"] },
  b:{ label:"Retarder la passation", fx:{peuple:-15,tresor:-6,armee:-8,pouvoir:-18}, tags:["retarde"] }},

{ id:113, title:"Bilan climatique 2033", desc:"Le Bénin a planté 50 millions d'arbres mais perdu 200 km² de forêt. La côte a reculé de 70 mètres. Le bilan environnemental est mitigé.", icon:"🌱", cat:"PEUPLE", year:7, rarity:"common",
  a:{ label:"Plan de reforestation final", fx:{peuple:6,tresor:-4,armee:0,pouvoir:4}, tags:["reforest"] },
  b:{ label:"Laisser au successeur", fx:{peuple:-4,tresor:0,armee:0,pouvoir:-2}, tags:["laisse_climat"] }},

{ id:114, title:"Fondation présidentielle", desc:"Vous créez une fondation à votre nom pour continuer à servir le pays après le pouvoir. L'opposition accuse un instrument d'influence.", icon:"🏛️", cat:"POUVOIR", year:7, rarity:"common",
  a:{ label:"Fondation d'éducation", fx:{peuple:6,tresor:-2,armee:0,pouvoir:6}, tags:["fondation_edu"] },
  b:{ label:"Retraite complète", fx:{peuple:4,tresor:0,armee:0,pouvoir:4}, tags:["retraite"] }},

{ id:115, title:"Le legs du Septennat", desc:"Le dernier jour. Vous quittez la Marina. Le drapeau flotte. Le Bénin est-il plus fort, plus juste, plus libre qu'il y a sept ans ?", icon:"🇧🇯", cat:"POUVOIR", year:7, rarity:"legendary",
  a:{ label:"Partir le cœur léger", fx:{peuple:12,tresor:4,armee:4,pouvoir:15}, tags:["depart_digne"] },
  b:{ label:"Partir avec amertume", fx:{peuple:-8,tresor:-4,armee:-6,pouvoir:-12}, tags:["amertume"] }},

// ═══════════════ ÉVÉNEMENTS CONDITIONNELS RARES (Années variables) ═══════════════

{ id:116, title:"Militaire en exil prépare un retour", desc:"Le colonel qui a fui après la purge prépare un retour depuis un pays de l'AES. Il recrute des mercenaires et publie des vidéos menaçantes.", icon:"🎖️", cat:"SÉCURITÉ", year:4, rarity:"rare", requireTags:["purge_armee"],
  a:{ label:"Demander son extradition", fx:{peuple:0,tresor:-2,armee:6,pouvoir:8}, tags:["extradition"] },
  b:{ label:"Le laisser s'épuiser", fx:{peuple:0,tresor:0,armee:-6,pouvoir:-4}, tags:["ignore_exil"] }},

{ id:117, title:"Alliance Bénin-Ghana-Togo", desc:"2029. Le Ghana et le Togo proposent une alliance de défense côtière contre le terrorisme et le trafic maritime. Une première dans le Golfe de Guinée.", icon:"🤝", cat:"SÉCURITÉ", year:4, rarity:"uncommon",
  a:{ label:"Rejoindre l'alliance", fx:{peuple:2,tresor:-2,armee:10,pouvoir:8}, tags:["alliance_cotiere"] },
  b:{ label:"Rester non-aligné", fx:{peuple:0,tresor:0,armee:-2,pouvoir:2}, tags:["non_aligne"] }},

{ id:118, title:"Cotonou ville intelligente", desc:"2030. Un projet de smart city pour Cotonou : capteurs, feux intelligents, collecte de données. Mais la vie privée des citoyens est menacée.", icon:"🏙️", cat:"ÉCONOMIE", year:5, rarity:"uncommon",
  a:{ label:"Smart city avec garde-fous", fx:{peuple:4,tresor:8,armee:4,pouvoir:6}, tags:["smart_city"] },
  b:{ label:"Trop de surveillance", fx:{peuple:6,tresor:-2,armee:0,pouvoir:4}, tags:["refuse_smart"] }},

{ id:119, title:"Le Bénin exporte de l'énergie", desc:"2031. Grâce aux investissements solaires, le Bénin produit un surplus d'électricité. Le Togo et le Nigeria veulent en acheter.", icon:"⚡", cat:"ÉCONOMIE", year:6, rarity:"rare", requireTags:["plan_solaire"],
  a:{ label:"Vendre au Togo et au Nigeria", fx:{peuple:4,tresor:12,armee:2,pouvoir:8}, tags:["export_energie"] },
  b:{ label:"Baisser les prix nationaux", fx:{peuple:10,tresor:-2,armee:0,pouvoir:4}, tags:["prix_bas"] }},

{ id:120, title:"Déforestation critique", desc:"2031. Le Bénin a perdu 40% de sa couverture forestière en 20 ans. L'objectif zéro déforestation 2030 est un échec. Les sols s'érodent.", icon:"🌳", cat:"PEUPLE", year:6, rarity:"uncommon",
  a:{ label:"Moratoire sur le bois", fx:{peuple:-4,tresor:-6,armee:0,pouvoir:4}, tags:["moratoire_bois"] },
  b:{ label:"Programme de reboisement", fx:{peuple:4,tresor:-4,armee:0,pouvoir:2}, tags:["reboisement"] }},

// ═══════════════ ÉVÉNEMENTS FILET DE SÉCURITÉ (déclenchés quand jauge < 15) ═══════════════

{ id:121, title:"Le peuple gronde", desc:"ALERTE : La confiance du peuple est au plus bas. Des manifestations spontanées éclatent partout. Un geste fort est nécessaire immédiatement.", icon:"🚨", cat:"PEUPLE", year:1, rarity:"common", maxGauge:{key:"peuple",value:15},
  a:{ label:"Discours + mesures sociales", fx:{peuple:12,tresor:-8,armee:0,pouvoir:0}, tags:["sauvetage_peuple"] },
  b:{ label:"Subventions alimentaires", fx:{peuple:10,tresor:-6,armee:0,pouvoir:-2}, tags:["sub_alim"] }},

{ id:122, title:"Crise de trésorerie", desc:"ALERTE : Les caisses sont presque vides. Les fonctionnaires risquent de ne pas être payés ce mois. Il faut agir d'urgence.", icon:"🚨", cat:"ÉCONOMIE", year:1, rarity:"common", maxGauge:{key:"tresor",value:15},
  a:{ label:"Emprunt d'urgence au FMI", fx:{peuple:-2,tresor:12,armee:0,pouvoir:-4}, tags:["emprunt_fmi"] },
  b:{ label:"Taxe exceptionnelle riches", fx:{peuple:4,tresor:10,armee:0,pouvoir:-2}, tags:["taxe_riches"] }},

{ id:123, title:"L'armée vacille", desc:"ALERTE : Le moral des troupes est au plus bas. Des désertions sont signalées. Le nord est vulnérable. Il faut restaurer la confiance.", icon:"🚨", cat:"SÉCURITÉ", year:1, rarity:"common", maxGauge:{key:"armee",value:15},
  a:{ label:"Prime de risque pour le nord", fx:{peuple:0,tresor:-8,armee:12,pouvoir:0}, tags:["prime_nord"] },
  b:{ label:"Discours aux troupes + équipement", fx:{peuple:0,tresor:-6,armee:10,pouvoir:2}, tags:["equipe_armee"] }},

{ id:124, title:"Isolement politique total", desc:"ALERTE : Vous n'avez presque plus d'alliés. L'Assemblée vous conteste. La société civile vous ignore. Vous êtes seul au pouvoir.", icon:"🚨", cat:"POUVOIR", year:1, rarity:"common", maxGauge:{key:"pouvoir",value:15},
  a:{ label:"Main tendue à l'opposition", fx:{peuple:4,tresor:0,armee:0,pouvoir:12}, tags:["main_tendue"] },
  b:{ label:"Remaniement d'ouverture", fx:{peuple:2,tresor:-2,armee:0,pouvoir:10}, tags:["ouverture"] }},

// ═══════════════ ÉVÉNEMENTS COMMUNS SUPPLÉMENTAIRES ═══════════════

{ id:125, title:"Hausse des prix alimentaires", desc:"Le prix du riz importé augmente de 40% suite à la crise en Asie. Les ménages béninois dépensent déjà 60% de leur revenu en nourriture.", icon:"🍚", cat:"PEUPLE", year:2, rarity:"common",
  a:{ label:"Bloquer les prix", fx:{peuple:8,tresor:-8,armee:0,pouvoir:2}, tags:["prix_bloques"] },
  b:{ label:"Promouvoir le local", fx:{peuple:-4,tresor:4,armee:0,pouvoir:4}, tags:["consomme_local"] }},

{ id:126, title:"Scandale au FNRB", desc:"Un audit du Fonds National de Retraite révèle des placements hasardeux. 10 milliards FCFA investis dans des projets fictifs.", icon:"💸", cat:"ÉCONOMIE", year:3, rarity:"common",
  a:{ label:"Poursuivre les responsables", fx:{peuple:8,tresor:-4,armee:0,pouvoir:8}, tags:["poursuit_fnrb"] },
  b:{ label:"Restructurer en silence", fx:{peuple:-4,tresor:2,armee:0,pouvoir:-4}, tags:["silence_fnrb"] }},

{ id:127, title:"Coupure de câble sous-marin", desc:"2029. Le câble internet sous-marin qui connecte le Bénin à l'Europe est sectionné. Le pays est coupé du monde numérique pendant 72h.", icon:"🌐", cat:"ÉCONOMIE", year:4, rarity:"common",
  a:{ label:"Investir dans un câble redondant", fx:{peuple:2,tresor:-8,armee:2,pouvoir:4}, tags:["cable_redondant"] },
  b:{ label:"Accord avec le Togo pour backup", fx:{peuple:0,tresor:-2,armee:0,pouvoir:2}, tags:["backup_togo"] }},

{ id:128, title:"Jeunesse et Tik Tok politique", desc:"2030. La jeunesse béninoise utilise TikTok pour critiquer le gouvernement. Des vidéos virales moquent vos ministres. Rire ou interdire ?", icon:"📱", cat:"POUVOIR", year:5, rarity:"common",
  a:{ label:"Embrasser le dialogue digital", fx:{peuple:8,tresor:0,armee:0,pouvoir:6}, tags:["dialog_digital"] },
  b:{ label:"Restreindre les réseaux", fx:{peuple:-10,tresor:-4,armee:2,pouvoir:-10}, tags:["censure_tiktok"] }},

{ id:129, title:"Coopération spatiale avec l'Inde", desc:"2031. L'Inde propose un partenariat spatial et technologique au Bénin. Formation d'ingénieurs, transfert de technologie, prix avantageux.", icon:"🇮🇳", cat:"ÉCONOMIE", year:6, rarity:"uncommon",
  a:{ label:"Accepter le partenariat indien", fx:{peuple:2,tresor:6,armee:2,pouvoir:6}, tags:["partenariat_inde"] },
  b:{ label:"Rester avec les partenaires existants", fx:{peuple:0,tresor:0,armee:0,pouvoir:2}, tags:["statu_quo_diplo"] }},

{ id:130, title:"Grèves dans l'éducation", desc:"Les enseignants du primaire sont en grève depuis 3 semaines. 2 millions d'enfants sans école. Les parents sont furieux.", icon:"📚", cat:"PEUPLE", year:3, rarity:"common",
  a:{ label:"Négocier une hausse salariale", fx:{peuple:8,tresor:-8,armee:0,pouvoir:4}, tags:["hausse_profs"] },
  b:{ label:"Réquisitionner les enseignants", fx:{peuple:-10,tresor:2,armee:2,pouvoir:-6}, tags:["requisition_profs"] }},

// ═══════════════ ÉVÉNEMENTS RARES SUPPLÉMENTAIRES ═══════════════

{ id:131, title:"Gisement de lithium découvert", desc:"2030. Un gisement de lithium est découvert dans l'Atacora. Les batteries du monde en ont besoin. Mais l'exploitation détruirait des terres agricoles.", icon:"💎", cat:"ÉCONOMIE", year:5, rarity:"rare",
  a:{ label:"Exploiter le lithium", fx:{peuple:-6,tresor:14,armee:0,pouvoir:4}, tags:["lithium"] },
  b:{ label:"Moratoire environnemental", fx:{peuple:6,tresor:-4,armee:0,pouvoir:4}, tags:["moratoire_lithium"] }},

{ id:132, title:"Pandémie mondiale 2.0", desc:"2031. Une nouvelle pandémie frappe le monde. Le Bénin est relativement épargné mais les frontières doivent-elles être fermées ?", icon:"🦠", cat:"PEUPLE", year:6, rarity:"rare",
  a:{ label:"Fermer les frontières", fx:{peuple:-4,tresor:-10,armee:4,pouvoir:4}, tags:["frontieres_fermees"] },
  b:{ label:"Gestes barrières sans fermeture", fx:{peuple:4,tresor:-2,armee:-2,pouvoir:2}, tags:["gestes_barrieres"] }},

{ id:133, title:"Le Nigeria en crise politique", desc:"2032. Le Nigeria entre en crise politique majeure. Des millions de réfugiés affluent vers le Bénin. Cotonou est submergé.", icon:"🇳🇬", cat:"PEUPLE", year:7, rarity:"rare",
  a:{ label:"Accueillir les réfugiés", fx:{peuple:6,tresor:-10,armee:-4,pouvoir:8}, tags:["accueil_refugies"] },
  b:{ label:"Fermer la frontière", fx:{peuple:-8,tresor:4,armee:6,pouvoir:-6}, tags:["frontiere_fermee_ng"] }},

// ═══════════════ ÉVÉNEMENTS FINAUX D'AJUSTEMENT ═══════════════

{ id:134, title:"Coopérative agricole modèle", desc:"Une coopérative de femmes du Mono produit de l'huile de palme bio exportée en Europe. Elles demandent un soutien pour s'étendre.", icon:"🌴", cat:"ÉCONOMIE", year:3, rarity:"common",
  a:{ label:"Subventionner les coopératives", fx:{peuple:8,tresor:4,armee:0,pouvoir:4}, tags:["coop_femmes"] },
  b:{ label:"Les laisser croître seules", fx:{peuple:-2,tresor:2,armee:0,pouvoir:0}, tags:["autonomie_coop"] }},

{ id:135, title:"Hackathon national", desc:"Sèmè City organise un hackathon national. 500 jeunes développeurs créent des apps pour la santé, l'agriculture et l'éducation.", icon:"💡", cat:"ÉCONOMIE", year:2, rarity:"common",
  a:{ label:"Financer les meilleures apps", fx:{peuple:6,tresor:4,armee:0,pouvoir:4}, tags:["hackathon"] },
  b:{ label:"Événement symbolique", fx:{peuple:2,tresor:0,armee:0,pouvoir:2}, tags:["hackathon_sym"] }},

{ id:136, title:"Premier Béninois à la Cour de La Haye", desc:"2030. Un juriste béninois est élu juge à la CPI. Fierté nationale. Il propose que le Bénin ratifie le Statut de Rome sans réserves.", icon:"⚖️", cat:"POUVOIR", year:5, rarity:"uncommon",
  a:{ label:"Ratifier sans réserves", fx:{peuple:4,tresor:0,armee:-2,pouvoir:10}, tags:["cpi_ratifie"] },
  b:{ label:"Ratifier avec réserves", fx:{peuple:0,tresor:0,armee:2,pouvoir:4}, tags:["cpi_reserves"] }},

{ id:137, title:"Le vaudou dans le monde", desc:"2029. Netflix produit une série sur le Vodun béninois. Succès mondial. Le tourisme religieux explose, mais les puristes crient à la marchandisation.", icon:"🎬", cat:"PEUPLE", year:4, rarity:"uncommon",
  a:{ label:"Soutenir le projet", fx:{peuple:6,tresor:8,armee:0,pouvoir:4}, tags:["netflix_vodun"] },
  b:{ label:"Protéger le sacré", fx:{peuple:4,tresor:-2,armee:0,pouvoir:2}, tags:["protege_vodun"] }},

{ id:138, title:"Université panafricaine à Abomey", desc:"2031. L'UA propose de créer une université panafricaine à Abomey-Calavi. 10 000 étudiants de tout le continent. Prestige et emplois.", icon:"🎓", cat:"ÉCONOMIE", year:6, rarity:"uncommon",
  a:{ label:"Accueillir l'université", fx:{peuple:6,tresor:6,armee:0,pouvoir:8}, tags:["univ_panafricaine"] },
  b:{ label:"Renforcer l'existante d'abord", fx:{peuple:4,tresor:-2,armee:0,pouvoir:2}, tags:["renforce_uac"] }},

{ id:139, title:"Soudure alimentaire difficile", desc:"La période de soudure est plus longue que prévu. Les greniers sont vides dans le nord. Les enfants souffrent de malnutrition aiguë.", icon:"🌾", cat:"PEUPLE", year:4, rarity:"common",
  a:{ label:"Distribuer les stocks stratégiques", fx:{peuple:8,tresor:-6,armee:2,pouvoir:2}, tags:["stocks_distribues"] },
  b:{ label:"Attendre la prochaine récolte", fx:{peuple:-8,tresor:0,armee:-2,pouvoir:-4}, tags:["attente_recolte"] }},

{ id:140, title:"Pêche illégale dans nos eaux", desc:"Des chalutiers chinois pêchent illégalement dans les eaux béninoises. Les pêcheurs artisanaux perdent leur gagne-pain. Que faire ?", icon:"🐟", cat:"ÉCONOMIE", year:3, rarity:"common",
  a:{ label:"Patrouilles maritimes", fx:{peuple:6,tresor:-4,armee:6,pouvoir:4}, tags:["patrouille_mer"] },
  b:{ label:"Négocier des licences", fx:{peuple:-4,tresor:6,armee:0,pouvoir:-4}, tags:["licences_peche"] }},

{ id:141, title:"Innovation médicale béninoise", desc:"Un chercheur béninois développe un test rapide de paludisme par smartphone. L'OMS veut le déployer en Afrique. Fierté nationale.", icon:"🔬", cat:"ÉCONOMIE", year:5, rarity:"uncommon",
  a:{ label:"Produire au Bénin", fx:{peuple:6,tresor:8,armee:0,pouvoir:8}, tags:["medtech_benin"] },
  b:{ label:"Licencier à une multinationale", fx:{peuple:-2,tresor:6,armee:0,pouvoir:-2}, tags:["licence_multi"] }},

{ id:142, title:"Monnaie numérique BCEAO", desc:"2031. La BCEAO lance un e-CFA. Les paiements deviennent traçables. Moins de fraude, mais aussi moins de liberté pour l'informel.", icon:"💳", cat:"ÉCONOMIE", year:6, rarity:"uncommon",
  a:{ label:"Adoption obligatoire", fx:{peuple:-6,tresor:10,armee:2,pouvoir:4}, tags:["ecfa_oblig"] },
  b:{ label:"Adoption volontaire", fx:{peuple:4,tresor:4,armee:0,pouvoir:2}, tags:["ecfa_volontaire"] }},

{ id:143, title:"Frontière rouverte avec le Niger", desc:"2029. Après 3 ans de fermeture, le Niger propose de rouvrir sa frontière. Le commerce reprend mais les djihadistes aussi pourraient en profiter.", icon:"🚧", cat:"ÉCONOMIE", year:4, rarity:"uncommon", requireTags:["paix_niger"],
  a:{ label:"Réouverture avec contrôles stricts", fx:{peuple:4,tresor:10,armee:-4,pouvoir:6}, tags:["frontiere_rouverte"] },
  b:{ label:"Réouverture progressive", fx:{peuple:2,tresor:6,armee:2,pouvoir:4}, tags:["progressive_niger"] }},

{ id:144, title:"Explosion du e-commerce", desc:"2030. Les achats en ligne explosent au Bénin. Les commerçants de Dantokpa perdent des clients. Ils bloquent le marché pendant 3 jours.", icon:"🛒", cat:"ÉCONOMIE", year:5, rarity:"common",
  a:{ label:"Taxer le e-commerce", fx:{peuple:-4,tresor:-2,armee:0,pouvoir:-4}, tags:["taxe_ecommerce"] },
  b:{ label:"Former les commerçants au digital", fx:{peuple:6,tresor:4,armee:0,pouvoir:4}, tags:["digital_dantokpa"] }},

{ id:145, title:"Mosquée controversée à Cotonou", desc:"Un riche donateur du Golfe veut construire la plus grande mosquée d'Afrique de l'Ouest à Cotonou. Le sud chrétien et vodun s'y oppose.", icon:"🕌", cat:"PEUPLE", year:3, rarity:"uncommon",
  a:{ label:"Autoriser la construction", fx:{peuple:-6,tresor:4,armee:-2,pouvoir:-4}, tags:["mosquee"] },
  b:{ label:"Proposer un lieu de culte interreligieux", fx:{peuple:6,tresor:-2,armee:2,pouvoir:6}, tags:["interreligieux"] }},

{ id:146, title:"Émigration des infirmières", desc:"2031. Le Canada recrute 500 infirmières béninoises. Les hôpitaux du nord sont vidés. Le système de santé vacille dans les zones rurales.", icon:"🩺", cat:"PEUPLE", year:6, rarity:"common",
  a:{ label:"Interdire le recrutement étranger", fx:{peuple:-4,tresor:0,armee:0,pouvoir:-4}, tags:["interdit_recrutement"] },
  b:{ label:"Augmenter les salaires infirmiers", fx:{peuple:6,tresor:-8,armee:0,pouvoir:4}, tags:["salaires_inf"] }},

{ id:147, title:"Aide humanitaire controversée", desc:"Une ONG occidentale distribue de la nourriture dans le nord sans coordination avec le gouvernement. L'humiliation est perçue par l'opinion.", icon:"🏳️", cat:"POUVOIR", year:4, rarity:"common",
  a:{ label:"Expulser l'ONG", fx:{peuple:-4,tresor:0,armee:0,pouvoir:8}, tags:["expulse_ong"] },
  b:{ label:"Intégrer dans le dispositif national", fx:{peuple:4,tresor:2,armee:0,pouvoir:4}, tags:["integre_ong"] }},

{ id:148, title:"Assemblée de la jeunesse", desc:"2030. Des jeunes leaders demandent la création d'une Assemblée de la Jeunesse avec un pouvoir consultatif sur les lois. Innovation démocratique.", icon:"✨", cat:"POUVOIR", year:5, rarity:"uncommon",
  a:{ label:"Créer l'Assemblée Jeunesse", fx:{peuple:10,tresor:-2,armee:0,pouvoir:8}, tags:["assemblee_jeunes"] },
  b:{ label:"Commission consultative simple", fx:{peuple:4,tresor:0,armee:0,pouvoir:2}, tags:["commission_jeunes"] }},

{ id:149, title:"Accord de Cotonou renouvelé", desc:"L'accord de partenariat UE-ACP arrive à échéance. Les nouvelles conditions sont moins favorables au Bénin. L'UE durcit ses exigences.", icon:"🇪🇺", cat:"ÉCONOMIE", year:4, rarity:"common",
  a:{ label:"Accepter les nouvelles conditions", fx:{peuple:-2,tresor:6,armee:0,pouvoir:-4}, tags:["accord_ue"] },
  b:{ label:"Négocier en bloc avec la CEDEAO", fx:{peuple:2,tresor:2,armee:0,pouvoir:8}, tags:["bloc_cedeao"] }},

{ id:150, title:"Dernière page de l'histoire", desc:"Le peuple attend. Le pays a changé. Pour le meilleur ? Pour le pire ? C'est maintenant que l'histoire vous juge. Qu'avez-vous construit ?", icon:"📖", cat:"POUVOIR", year:7, rarity:"common",
  a:{ label:"Sourire et partir", fx:{peuple:8,tresor:2,armee:2,pouvoir:10}, tags:["sourire_final"] },
  b:{ label:"Dernière promesse", fx:{peuple:4,tresor:0,armee:0,pouvoir:4}, tags:["promesse_finale"] }},

];
