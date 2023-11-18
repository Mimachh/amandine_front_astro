import { fetchAPI } from "./api";

export interface PrimaryMenuNode {
    path: string;
    label: string;
    connectedNode: {
      node: {
        slug: string;
      };
    };
  }
  
  export interface PrimaryMenuData {
    menuItems: {
      edges: Array<{
        node: PrimaryMenuNode;
      }>;
    };
  }

  export async function getPrimaryMenu(): Promise<PrimaryMenuData | undefined> {
    try {
      const data = await fetchAPI(`
      {
        menus(where: {location: PRIMARY}) {
          nodes {
            menuItems {
              edges {
                node {
                  path
                  label
                  connectedNode {
                    node {
                      ... on Page {
                        isPostsPage
                        slug
                      }
                      
                    }
                  }
                }
              }
            }
          }
        }
      }
      `);
      // console.log('Primary Menu Data:', data); // Ajoutez cette ligne
      return data?.menus?.nodes[0];
    } catch (error) {
      console.error('Error fetching primary menu:', error);
    }
  }