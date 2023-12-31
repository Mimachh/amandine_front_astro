// const API_URL = "https://amandine-server.kmllr.fr/graphql";
const API_URL = "https://www.reservation-back.amandine-nails.fr/graphql";



export async function fetchAPI(query, { variables } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });
  
    const json = await res.json();
    if (json.errors) {
      console.log(json.errors);
      throw new Error('Failed to fetch API');
    }
  
    return json.data;
  }


  export async function getAllPagesWithSlugs() {
    const data = await fetchAPI(`
    {
      pages(first: 10000) {
        edges {
          node {
            slug
          }
        }
      }
    }
    `);
    return data?.pages;
  }


  export async function getPageBySlug(slug) {
    const data = await fetchAPI(`
    {
      page(id: "${slug}", idType: URI) {
        title
        content
      }
    }
    `);
    return data?.page;
  }




  // MENU
  export async function getPrimaryMenu() {
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
    return data?.menus?.nodes[0];
  }



