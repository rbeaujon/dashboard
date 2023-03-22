"use strict";

var _require = require("../../../src/services/API/games.api"),
    GamesApi = _require.GamesApi;

describe('UsersApi', function () {
  var expectedData = [{
    category: "casino",
    creation: "02/01/2022",
    id: 1,
    image: "https://img.freepik.com/premium-vector/bingo-lotto-keno-lottery-balls-with-numbers_53500-46.jpg?w=1380",
    name: "bingo",
    ranges: 18,
    status: 1
  }];
  var header = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(expectedData)
  };
  beforeEach(function () {
    window.fetch = jest.fn().mockResolvedValue({
      json: function json() {
        return regeneratorRuntime.async(function json$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", expectedData);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        });
      },
      status: 200,
      ok: true
    });
  });
  afterAll(function () {
    jest.clearAllMocks();
  });
  it('Should be called with the correct URL', function _callee() {
    var spy, url, response;
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            jest.spyOn(window, 'fetch').mockResolvedValue({
              json: function json(async) {
                return [];
              },
              status: 200,
              ok: true
            });
            spy = jest.spyOn(global, 'fetch');
            url = "http://192.168.0.35:3001/games";
            _context2.next = 5;
            return regeneratorRuntime.awrap(GamesApi(header));

          case 5:
            response = _context2.sent;
            expect(spy).toHaveBeenCalledWith(url, header);
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockRestore();
            expect(response.status).toBe(200);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it('should make a successful call to the API', function _callee2() {
    var response;
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(GamesApi(header));

          case 2:
            response = _context3.sent;
            expect(response.status).toBe(200);
            expect(response.data).toEqual(expectedData);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it("should receive status error 500 if fail", function _callee3() {
    var error;
    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            jest.restoreAllMocks();
            window.fetch = jest.fn().mockRejectedValueOnce({
              status: 500,
              message: 'Internal server error, the request return'
            });
            _context4.prev = 2;
            _context4.next = 5;
            return regeneratorRuntime.awrap(GamesApi(header));

          case 5:
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](2);
            error = _context4.t0;

          case 10:
            expect(error).toBeDefined();
            expect(error.status).toBe(500);
            expect(error.message).toBe('Internal server error, the request return');

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[2, 7]]);
  });
});