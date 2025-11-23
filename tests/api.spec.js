import { test, expect } from "@playwright/test";
import { Console } from "console";

const baseURL = "https://restful-booker.herokuapp.com";

let createdBookingId;
let token;

test.describe.serial("@API Restful-booker API тесты", () => {
  test("Создание нового бронирования", async ({ request }) => {
    const bookingData = {
      firstname: "Stas",
      lastname: "Krav",
      totalprice: 650,
      depositpaid: false,
      bookingdates: {
        checkin: "2025-11-19",
        checkout: "2025-11-23",
      },
      additionalneeds: "Breakfast",
    };

    const response = await request.post(`${baseURL}/booking`, {
      data: bookingData,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    createdBookingId = responseBody.bookingid;

    console.log("Создан bookingid:", createdBookingId);
    expect(createdBookingId).toBeTruthy();
  });

  test("Получение данных бронирования по ID", async ({ request }) => {
    const response = await request.get(
      `${baseURL}/booking/${createdBookingId}`
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("Тело ответа:", responseBody);

    expect(responseBody.firstname).toBe("Stas");
    expect(responseBody.lastname).toBe("Krav");
  });

  test("Получение токена", async ({ request }) => {
    const tokenData = {
      username: "admin",
      password: "password123",
    };
    const response = await request.post(`${baseURL}/auth`, {
      data: tokenData,
    });

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    token = responseBody.token;

    console.log("Получен токен:", token);
    expect(token).toBeTruthy();
  });

  test("Обновление данных бронирования", async ({ request }) => {
    const updatedData = {
      firstname: "New name",
      lastname: "Krav",
      totalprice: 999,
      depositpaid: false,
      bookingdates: {
        checkin: "2025-11-19",
        checkout: "2025-11-23",
      },
      additionalneeds: "Breakfast",
    };
    const response = await request.put(
      `${baseURL}/booking/${createdBookingId}`,
      {
        data: updatedData,
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("Ответ на PUT:", responseBody);

    expect(responseBody.firstname).toBe("New name");
    expect(responseBody.totalprice).toBe(999);
  });

  test("Удаление бронирования", async ({ request }) => {
    const response = await request.delete(
      `${baseURL}/booking/${createdBookingId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );
    expect(response.status()).toBe(201);
  });

  test("Проверка на бронирование после удаления ", async ({ request }) => {
    const response = await request.get(
      `${baseURL}/booking/${createdBookingId}`
    );

    expect(response.status()).toBe(404);
  });
});
