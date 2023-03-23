export const GamesApi = async (header) => {
  
  const url = "http://yologroup.rbeaujon.com/games";
  const response = await fetch(url, header);
  const data = await response.json();
  return {
    data: data,
    status: response.status
  }
}

