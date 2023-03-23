export const UsersApi = async (header) => {
  
  const url = "http://yologroup.rbeaujon.com/users";
  const response = await fetch(url, header);
  const data = await response.json();
  return {
    data: data,
    status: response.status
  }
}
