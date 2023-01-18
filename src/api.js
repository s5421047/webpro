export async function fetchImages(breed) {
    const response = await fetch(
      `https://shibe.online/api/${breed}?count=12&urls=true&httpsUrls=true`
     
       
    );
    const data = await response.json();
    return data;
    }