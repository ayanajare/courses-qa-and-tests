import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAccount } from "./account.service.js";
import { sql } from "../../../infrastructure/db"; // Connexion réelle à la base
import { createAccountInRepository, updateAccountInRepository } from "./account.repository.js";
import { HttpBadRequest } from "@httpx/exception";

describe("Integration - createAccount", () => {
  let createdAccountId;

  beforeAll(async () => {
    // Optionnel : setup avant tests (ex : clear la table accounts)
    await sql`DELETE FROM accounts`;
  });

  afterAll(async () => {
    // Nettoyage : supprimer les comptes créés pendant le test
    if (createdAccountId) {
      await sql`DELETE FROM accounts WHERE id = ${createdAccountId}`;
    }
    // Fermer la connexion à la DB
    await sql.end();
  });

  it("should create an account with valid data", async () => {
    const validAccount = {
      userId: 1,
      amount: 1000,
    };

    const result = await createAccount(validAccount);

    console.log(result)

    
    expect(result).toHaveProperty("userid");
    expect(result.userid).toBe(1);
    expect(result.amount).toBe(1000);
    expect(createAccountInRepository).toBeCalledTimes(1);

    createdAccountId = result.id;

    // Vérifie que l'account existe bien en base
    const [dbAccount] = await sql`
      SELECT * FROM accounts WHERE userId = ${result.userid}
    `;

    expect(dbAccount).toBeDefined();
    expect(dbAccount.userid).toBe(1);
    expect(dbAccount.amount).toBe(1000);
  });
});
