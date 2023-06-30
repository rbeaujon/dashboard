export const GamesApi = async (header:any) => {
  
  // const url = "http://yologroup.rbeaujon.com/games";
  const url = "http://localhost:3001/games";
  const response = await fetch(url, header);
  const data = await response.json();
  return {
    data: data,
    status: response.status
  }
}

