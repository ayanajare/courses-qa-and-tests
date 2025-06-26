import { createAccount, getAccount , deleteAccount} from "./account.service.js";
import { vi, describe, it, expect, afterEach} from "vitest";
import { createAccountInRepository, getAccountInRepository, deleteAccountInRepository } from "./account.repository.js";

vi.mock("./account.repository", async (importOriginal) => ({
    ...(await importOriginal()),
    createAccountInRepository: vi.fn((data) => {
        return {
            user_id: data.user_id,
            type: data.type,
            balance: data.balance,
        };
    }),
    getAccountInRepository: vi.fn((user_id) => {
        return {
            user_id: data.user_id,
            type: data.type,
            balance: data.balance,
        };
    }),
    deleteAccountInRepository: vi.fn((user_id) => {
        return {
            user_id: user_id,
        };
    }),
}));

describe("Account Service", () => {
    it("should create an account successfully", async () => {
        const accountData = {
            user_id: "01",
            type: "checking",
            balance: 1000,
        };

        const result = await createAccount(accountData);
        expect(result).toEqual(accountData);
    });

});


it("should trigger a forbidden error when account creation", async () => {
    expect(createAccount({
      user_id: "01",
    })).rejects.toThrowError("Bad request");
});


it("should get an account successfully", async () => {
    const accountData = {
        user_id: "01",
        type: "checking",
        balance: 1000,
    };

    getAccountInRepository.mockReturnValue(accountData);

    const result = await getAccount(accountData.user_id);
    expect(result).toHaveProperty("user_id", "01");
    expect(result).toHaveProperty("type", "checking");
    expect(result.balance).toBeTypeOf("number");
    expect(result).toHaveProperty("balance", 1000);
    expect(getAccountInRepository).toBeDefined();
});

it("should delete the account successfully", async () => {
    const accountData = {
        user_id: "01",
        type: "checking",
        balance: 1000,
    };
    deleteAccountInRepository.mockReturnValue(accountData);
    const result = await deleteAccount(accountData.user_id);
    expect(deleteAccountInRepository).toBeCalledTimes(1);
    expect(result).toBeDefined();
});


it("should trigger a bad request error when deleting an account with invalid user_id", async () => {
    const accountData = {
        user_id: "100",
        type: "checking",
        balance: 1000,
    };
    deleteAccountInRepository.mockReturnValue(accountData.user_id);

     expect(deleteAccount({
      user_id: "100",
    })).rejects.toThrowError("Bad request");
});
