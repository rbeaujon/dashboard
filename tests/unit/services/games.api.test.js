const {GamesApi} = require("../../../src/services/API/games.api");


describe('UsersApi', () => {

  const expectedData = [
    {
      category: "casino",
      creation: "02/01/2022",
      id : 1,
      image: "https://img.freepik.com/premium-vector/bingo-lotto-keno-lottery-balls-with-numbers_53500-46.jpg?w=1380",
      name: "bingo",
      ranges: 18,
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
    const url = "http://yologroup.rbeaujon.com/games";
    const response = await GamesApi(header);
    expect(spy).toHaveBeenCalledWith(url, header);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();

    expect(response.status).toBe(200);
  })

  it('should make a successful call to the API', async () => {
  
    const response = await GamesApi(header);
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
      await GamesApi(header);
    } catch (e) {
      error = e;
    }
    
    expect(error).toBeDefined();
    expect(error.status).toBe(500);
    expect(error.message).toBe('Internal server error, the request return');
    
  
  });
});
