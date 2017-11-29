const headers = {
//   'Access-Control-Allow-Origin': '*',
   'Authorization': 'true'
};


export function fetchCategories () {
  return fetch('http://localhost:3001/categories', { headers })
    .then((res) => res.json())
    .then(({ categories }) => categories);
}