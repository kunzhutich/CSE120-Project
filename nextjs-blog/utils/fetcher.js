const fetcher = (url) => {
    const sa = sessionStorage.getItem("sa");
    return fetch(url, {
      headers: {
        'SA': sa,
      },
    }).then((r) => r.json());
  };
  
  export default fetcher;