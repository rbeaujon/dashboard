const {UsersApi} = require("../../../src/services/API/users.api");


describe('UsersApi', () => {

  const expectedData = [
    {
      address: "123 Main St, Anytown USA",
      email: "johndoe@example.com",
      id: 1,
      level: "admin",
      name: "John Doe",
      pic: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfo",
      status: 1
    }
  ]; 
  const header = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(expectedData)
  };
	beforeEach(() => {  
    window.fetch = jest.fn().mockResolvedValue({
      json: async () => (expectedData),
      status: 200, 
      ok: true
    }); 
  })
	afterAll(() => { jest.clearAllMocks() })

  it('Should be called with the correct URL', async () => {
    jest.spyOn(window,'fetch').mockResolvedValue({
			json: async => [],
      status: 200, 
			ok: true
		})
    const spy = jest.spyOn(global, 'fetch');
    const url = "http://yologroup.rbeaujon.com/users";
    const response = await UsersApi(header);
    expect(spy).toHaveBeenCalledWith(url, header);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();

    expect(response.status).toBe(200);
  })

  it('should make a successful call to the API', async () => {
  
    const response = await UsersApi(header);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(expectedData);
  });
 
  it("should receive status error 500 if fail", async () => {
    jest.restoreAllMocks();

    window.fetch = jest.fn().mockRejectedValueOnce(({
        status: 500,
        message: 'Internal server error, the request return',
      })
    );
    
    let error;
    try {
      await UsersApi(header);
    } catch (e) {
      error = e;
    }
    
    expect(error).toBeDefined();
    expect(error.status).toBe(500);
    expect(error.message).toBe('Internal server error, the request return');
    
  
  });
});
