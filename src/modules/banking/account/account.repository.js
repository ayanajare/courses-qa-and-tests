import { sql } from "../../../infrastructure/db";

async function createAccountInRepository({ user_id, type, balance = 0 }) {
    const account = await sql`
        INSERT INTO account (user_id, type, balance)
        VALUES (${user_id}, ${type},${balance})
        RETURNING *;
    `;
    return account[0];
}

async function getAccountInRepository({ user_id }) {
    const account = await sql`
        SELECT * FROM account
        WHERE user_id = ${user_id}
    `;
    return account[0];
}

async function deleteAccountInRepository({ user_id }) {
    const result = await sql`
        DELETE FROM account
        WHERE user_id = ${user_id}
    `;
    return result;
}