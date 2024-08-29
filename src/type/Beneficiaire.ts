import { Centre } from "./Centre";
import { ClassificationCas } from "./ClassificationCas";
import { Handicap } from "./Handicap";
import { Mendicite } from "./Mendicite";
import { Province } from "./Province";
import { Region } from "./Region";
import { Service } from "./Service";
import { SituationDeRue } from "./SituationDeRue";
import { SituationFamilial } from "./SituationFamilial";
import { SituationFinanciere } from "./SituationFinanciere";
import { SituationMedical } from "./SituationMedical";
import { Violance } from "./Violance";

export type Beneficiaire = {
  etat: string;
  etatDetails: string;
  id?: number;
  nom?: string;
  prenom?: string;
  sexe?: string;
  groupeAge?: string;
  scolarite?: boolean;
  niveauScolaire?: string;
  sejour?: string;
  territoire?: string;
  situationSocial?: string;
  centre?: Centre;
  province?: Province;
  classificationCas?: ClassificationCas;
  handicap?: Handicap;
  mendicite?: Mendicite;
  service?: Service;
  situationDeRue?: SituationDeRue;
  situationFamilial?: SituationFamilial;
  situationFinanciere?: SituationFinanciere;
  situationMedical?: SituationMedical;
  violance?: Violance;
  hasViolence?: boolean; 
  region?: Region;
  hasSituationDeRue?: boolean; 
  hasMendicite?: boolean;


};
