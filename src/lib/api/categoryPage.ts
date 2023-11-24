import { fetchAPI } from "./api";

 // CATEGORY
 export async function getAllCategories() {
    const data = await fetchAPI(`
    {
      categories(first: 100) {
        edges {
          node {
            categoryId
            slug
            uri
            description
            count
          }
        }
      }
    }
    `);
    return data?.categories.edges;
  }
  
  export async function getCategoryBySlug(slug) {
    const data = await fetchAPI(`
    {
      category(id: "${slug}", idType: SLUG) {
        name
        description
        // Ajoutez d'autres champs nécessaires
      }
    }
    `);
    return data?.category;
  }