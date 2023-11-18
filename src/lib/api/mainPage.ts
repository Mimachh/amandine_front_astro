import { fetchAPI } from "./api";

export interface Image {
  altText: string;
  sourceUrl: string;
}

export interface MainPage {
  fieldGroupName: string;
  imageDeFond: Image;
}

export interface AboutSection {
  imageBasDroite: Image | null;
  imageBasGauche: Image | null;
  sousTitre: string | null;
  description: string | null;
  titre: string | null;
  imageBasMilieu: Image | null;
  imagePrincipale: Image | null;
}

export interface GarantieGroupe {
  description: string;
  titre: string;
  logoModeClair: Image | null;
  logoModeSombre: Image | null;
}
export interface GarantiePrestationSection {
  groupe1: GarantieGroupe | null;
  groupe2: GarantieGroupe | null;
  groupe3: GarantieGroupe | null;
  groupe4: GarantieGroupe | null;
}

interface ServicesSection {
  imageDeDroite: Image | null;
  titre: string | null;
  imageDeGauche: Image | null;
}

export interface PageData {
  page: {
    id: string;
    mainPage: MainPage;
    aboutSection: AboutSection;
    servicesSection: ServicesSection;
    garantiePrestation: GarantiePrestationSection;
  };
}

// export interface GraphQLResponse {
//   data: PageData;
// }

export async function getMainPage(): Promise<PageData | undefined> {
    try {
      const data = await fetchAPI(`
      {
        page(id: "accueil", idType: URI) {
          id
          mainPage {
            fieldGroupName
            imageDeFond {
              altText
              sourceUrl(size: HIGHSQUARE)
            }
          }
          aboutSection {
            imageBasDroite {
              altText
              sourceUrl(size: LANDSCAPE)
            }
            imageBasGauche {
              altText
              sourceUrl(size: LANDSCAPE)
            }
            sousTitre
            titre
            description
            imageBasMilieu {
              altText
              sourceUrl(size: LANDSCAPE)
            }
            imagePrincipale {
              altText
              sourceUrl(size: LANDSCAPE)
            }
          }
          servicesSection {
            imageDeDroite {
              altText
              sourceUrl(size: HIGHSQUARE)
            }
            titre
            imageDeGauche {
              altText
              sourceUrl(size: HIGHSQUARE)
            }
          }
          garantiePrestation {
            groupe1 {
              description
              titre
              logoModeClair {
                altText
                sourceUrl(size: THUMBNAIL)
              }
              logoModeSombre {
                altText
                sourceUrl(size: THUMBNAIL)
              }
            }
            groupe2 {
              description
              titre
              logoModeClair {
                altText
                sourceUrl(size: THUMBNAIL)
              }
              logoModeSombre {
                altText
                sourceUrl(size: THUMBNAIL)
              }
            }
            groupe3 {
              description
              titre
              logoModeClair {
                altText
                sourceUrl(size: THUMBNAIL)
              }
              logoModeSombre {
                altText
                sourceUrl(size: THUMBNAIL)
              }
            }
            groupe4 {
              description
              titre
              logoModeClair {
                altText
                sourceUrl(size: THUMBNAIL)
              }
              logoModeSombre {
                altText
                sourceUrl(size: THUMBNAIL)
              }
            }
          }
        }
      }
      `);
      console.log('Main page:', data); // Ajoutez cette ligne
  
      return data;
    } catch (error) {
      console.error('Error fetching primary menu:', error);
    }
  }