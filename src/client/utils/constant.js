export const MenuDrawerItems = [
  'Utilisateurs',
  'Etablissements',
  'Verifications',
  'Planning',
  'Previsions',
];


// LDA => Laboratoire Départemental d'Analyse
// Period is number of controle every year

export const ControleBy = {
  habilitated: 'Organisme habilité',
  agent: 'Agent',
  lda: 'Laboratoire Départemental d\'Analyse',
  technicien: 'Technicien',
};

export const Enum = {
  Controle: [
    {
      name: 'Contrôle légionnelles',
      by: ControleBy.habilitated,
      period: 1,
    },
    {
      name: 'Contrôle',
      by: ControleBy.agent,
      period: 12,
    },
    {
      name: 'Détartrage',
      period: 2,
    },
    {
      name: 'Extincteur',
      by: ControleBy.technicien,
      period: 1,
    },
    {
      name: 'Extincteur visuel',
      period: 12,
    },
    {
      name: 'Electricité',
      period: 1,
    },
    {
      name: 'Blocs de secours',
      by: ControleBy.technicien,
      period: 1,
    },
    {
      name: 'Blocs de secours LED',
      period: 12,
    },
    {
      name: 'Blocs de secours coupure éléctrique',
      period: 2,
    },
    {
      name: 'Gaz',
      by: ControleBy.habilitated,
      period: 1,
    },
    {
      name: 'Incendie',
      by: ControleBy.technicien,
      period: 1,
    },
    {
      name: 'Incendie interne',
      period: 365,
    },
    {
      name: 'Incendie',
      by: ControleBy.habilitated,
      period: 1 / 3,
    },
    {
      name: 'Ascenceur',
      by: ControleBy.technicien,
      period: 52 / 6,
    },
    {
      name: 'Ascenceur annuel',
      by: ControleBy.technicien,
      period: 1,
    },
    {
      name: 'Ascenceur organisme',
      by: ControleBy.habilitated,
      period: 1 / 5,
    },
    {
      name: 'Machines, Object de levages..',
      by: ControleBy.habilitated,
      period: 12 / 4,
    },
    {
      name: 'Désenfumage',
      by: ControleBy.technicien,
      period: 1,
    },
    {
      name: 'Désenfumage mécanique',
      period: 1 / 3,
    },
    {
      name: 'Alarme type 4',
      by: ControleBy.technicien,
      period: 1,
    },
    {
      name: 'Evacuation (locaux avec sommeil)',
      period: 1,
    },
    {
      name: 'Evacuation',
      period: 1,
    },
    {
      name: 'RIA',
      by: ControleBy.technicien,
      period: 1,
    },
    {
      name: 'Chaudière',
      by: ControleBy.technicien,
      period: 1,
    },
    {
      name: 'Néttoyage hottes',
      period: 1,
    },
    {
      name: 'Néttoyage VMC',
      period: 1,
    },
    {
      name: 'Chambre froide',
      period: 1,
    },
    {
      name: 'Appareils de cuisson',
      period: 1,
    },
    {
      name: 'Ramonage',
      period: 1,
    },
    {
      name: 'Défibrilateurs',
      period: 12,
    },
    {
      name: 'LDA cuisine',
      by: ControleBy.lda,
      period: 6,
    },
    {
      name: 'LDA blanchisserie',
      by: ControleBy.lda,
      period: 6,
    },
    {
      name: 'Groupe électrogène (interne)',
      period: 1,
    },
    {
      name: 'Groupe électrogène',
      by: ControleBy.habilitated,
      period: 1,
    },
    {
      name: 'Chariots élévateurs',
      period: 1,
    },
    {
      name: 'Comission sécurité (3ans)',
      period: 1 / 3,
    },
    {
      name: 'Chariots élévateurs (5ans)',
      period: 1 / 5,
    },
  ],
};
