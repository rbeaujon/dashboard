export const UsersApi = async (header) => {
  
  const url = "http://192.168.0.35:3001/users";
  const response = await fetch(url, header);
  const data = await response.json();
  return {
    data: data,
    status: response.status
  }
}
