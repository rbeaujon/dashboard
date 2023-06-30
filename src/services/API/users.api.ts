export const UsersApi = async (header:any) => {
  
  // const url = "http://yologroup.rbeaujon.com/users";
  const url = "http://localhost:3001/users";
  const response = await fetch(url, header);
  const data = await response.json();
  return {
    data: data,
    status: response.status
  }
}
