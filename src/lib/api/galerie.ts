import { fetchAPI } from "./api";



interface GalerieImage {
    altText: string;
    sourceUrl: string;
}

interface GalerieEtiquettes {
    description?: string;
    name?: string;
    slug?: string;
    uri: string;
}

interface ImageDeLaGalerie {
    description?: string;
    image: GalerieImage;
    etiquette: GalerieEtiquettes[];
    titre: string;
}

interface Galerie {
    imageDeLaGalerie: ImageDeLaGalerie[]
}

export interface GalerieData {
    id: string;
    galerie: Galerie;
    slug: string;
    uri: string;
}

export async function getAllGaleriePage(): Promise<GalerieData | undefined> {
    const data = await fetchAPI(`
    {
        page(id: "cG9zdDo5Ng==") {
          id
          galerie {
            imageDeLaGalerie {
              description
              image {
                altText
                sourceUrl(size: _2048X2048)
              }
              etiquette {
                description
                name
                slug
                uri
              }
              titre
            }
          }
          slug
          uri
        }
      }
    `);
    return data?.page;
  }
