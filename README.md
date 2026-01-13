# 📘 Front-End GED RH – Documentation

## 1. Présentation du projet

Ce projet consiste à développer une **application Front-End en Next.js** destinée aux équipes **Ressources Humaines (RH)** afin d’interagir avec une plateforme **GED RH (Gestion Électronique des Documents RH)**.

L’objectif principal est d’offrir une **interface professionnelle, sécurisée, fluide et intuitive** permettant la gestion :

* des candidats
* des documents RH
* des entretiens
* des formulaires RH
* des comptes utilisateurs

Le projet repose fortement sur :

* le **Server-Side Rendering (SSR)** pour le SEO
* une **authentification sécurisée**
* une **gestion fine des rôles et permissions**

---

## 2. Objectifs fonctionnels

* Suivi structuré et visuel des candidats
* Gestion documentaire intelligente (OCR, skills)
* Planification des entretiens
* Notifications en temps réel
* Authentification et contrôle d’accès
* Support multi-organisation (optionnel / bonus)

---

## 3. Stack Front-End recommandée

* **Framework** : Next.js (App Router ou Pages Router)
* **Langage** : TypeScript
* **UI** : Tailwind CSS / MUI
* **Gestion d’état** : Zustand ou Redux Toolkit
* **Gestion des formulaires** : React Hook Form
* **Data fetching** : React Query / Fetch natif
* **Auth** : Cookies HttpOnly + Middleware Next.js

---

## 4. Architecture générale du projet

Le projet est structuré de manière modulaire afin de garantir :

* la lisibilité du code
* la maintenabilité
* la scalabilité

---

## 5. Structure des dossiers

```
   src/
   │
   ├── app/
   │   ├── (auth)/
   │   │   └── login/
   │   │       └── page.tsx
   │   │
   │   ├── (protected)/
   │   │   ├── dashboard/
   │   │   │   └── page.tsx
   │   │   │
   │   │   ├── candidats/
   │   │   │   ├── page.tsx
   │   │   │   └── [id]/
   │   │   │       └── page.tsx
   │   │   │
   │   │   ├── documents/
   │   │   │   └── page.tsx
   │   │   │
   │   │   ├── entretiens/
   │   │   │   └── page.tsx
   │   │   │
   │   │   ├── formulaires/
   │   │   │   ├── page.tsx
   │   │   │   ├── create/
   │   │   │   │   └── page.tsx
   │   │   │   ├── [formId]/
   │   │   │   │   ├── page.tsx
   │   │   │   │   └── builder/
   │   │   │   │       └── page.tsx
   │   │   │
   │   │   └── utilisateurs/
   │   │       └── page.tsx
   │   │
   │   ├── jobs/
   │   │   ├── page.tsx
   │   │   └── [slug]/
   │   │       └── page.tsx
   │   │
   │   ├── layout.tsx
   │   └── globals.css
   │
   ├── components/
   │   ├── ui/
   │   │   ├── Button.tsx
   │   │   ├── Input.tsx
   │   │   ├── Select.tsx
   │   │   ├── Modal.tsx
   │   │   └── Table.tsx
   │   │
   │   ├── layout/
   │   │   ├── Header.tsx
   │   │   ├── Sidebar.tsx
   │   │   └── Footer.tsx
   │   │
   │   ├── auth/
   │   │   └── LoginForm.tsx
   │   │
   │   └── shared/
   │       └── EmptyState.tsx
   │
   ├── features/
   │   ├── auth/
   │   │   ├── api.ts
   │   │   ├── hooks.ts
   │   │   └── types.ts
   │   │
   │   ├── candidats/
   │   │   ├── api.ts
   │   │   ├── components/
   │   │   └── types.ts
   │   │
   │   ├── documents/
   │   │   ├── api.ts
   │   │   └── types.ts
   │   │
   │   ├── entretiens/
   │   │   ├── api.ts
   │   │   └── types.ts
   │   │
   │   └── formulaires/
   │       ├── api.ts
   │       ├── components/
   │       │   ├── FormRenderer.tsx
   │       │   ├── FieldRenderer.tsx
   │       │   ├── FormBuilder.tsx
   │       │   ├── FieldEditor.tsx
   │       │   └── FormPreview.tsx
   │       ├── hooks.ts
   │       ├── types.ts
   │       └── utils.ts
   │
   ├── services/
   │   ├── http.service.ts
   │   └── api.ts
   │
   ├── stores/
   │   ├── auth.store.ts
   │   └── ui.store.ts
   │
   ├── middlewares/
   │   └── auth.middleware.ts
   │
   ├── hooks/
   │   ├── useAuth.ts
   │   ├── useRole.ts
   │   └── usePermissions.ts
   │
   ├── utils/
   │   ├── permissions.ts
   │   ├── constants.ts
   │   └── helpers.ts
   │
   ├── types/
   │   ├── user.ts
   │   ├── role.ts
   │   └── organisation.ts
   │
   └── styles/
      └── globals.css

```

---

## 6. Gestion de l’authentification

### Principe général

L’authentification repose sur :

* une session stockée dans des **cookies HttpOnly**
* une lecture côté **serveur et client**
* un contrôle d’accès via **middleware Next.js**

### Rôles supportés

* Administrateur RH
* RH
* Manager

Chaque rôle possède des permissions spécifiques qui impactent :

* l’accès aux pages
* l’affichage des menus
* les actions disponibles

---

## 7. Sécurisation des routes

La sécurité est appliquée à plusieurs niveaux :

1. **Middleware** :

   * Vérifie la présence d’une session valide
   * Redirige vers `/login` si nécessaire

2. **Pages SSR** :

   * Vérification de la session côté serveur
   * Protection SEO-safe

3. **Interface utilisateur** :

   * Masquage des boutons/actions non autorisés

---

## 8. Pages SSR – Offres d’emploi

Les pages suivantes sont obligatoirement rendues en SSR :

* Liste des offres d’emploi
* Détail d’une offre
* Formulaire de candidature

Objectifs :

* Indexation par les moteurs de recherche
* Performance
* Sécurité des données

---

## 9. Gestion multi-organisation (optionnel)

* Chaque utilisateur est rattaché à une organisation
* Les données sont strictement isolées
* L’organisation est identifiée via la session

---

## 10. Bonnes pratiques

* Séparation claire entre UI et logique métier
* Aucune logique sensible côté client uniquement
* Centralisation des permissions
* Composants réutilisables
* UX cohérente et professionnelle

---

## 11. Critères de réussite

* Authentification persistante après refresh
* Accès restreint selon le rôle
* Pages SSR protégées
* Interface claire et intuitive
* Projet lisible et maintenable

---

## 12. Évolutions possibles

* Mode dark
* Audit logs
* Historique des actions
* Internationalisation (i18n)
* Accessibilité (a11y)

---

📌 **Ce projet est conçu pour être présenté en entretien technique ou déployé en production.**
