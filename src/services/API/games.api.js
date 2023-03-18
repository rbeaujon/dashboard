export const GetGamesApi = async (header) => {
  
  const url = "http://192.168.0.35:3001/games";
  const response = await fetch(url, header);
  const data = await response.json();
  return {
    data: data,
    status: response.status
  }
}
