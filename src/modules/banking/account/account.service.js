import {createAccountInRepository,getAccountInRepository, deleteAccountInRepository} from './account.repository.js';
import { z } from "zod";
import { HttpBadRequest, HttpForbidden } from "@httpx/exception";

const AccountSchema = z.object({
    user_id:z.string().min(2)  , 
    type:z.string(), 
    balance: z.number().min(0).default(0) 
});


export async function createAccount(data) {
  const result = AccountSchema.safeParse(data);
  if (result.success) {
    return createAccountInRepository(result.data);
  } else {
    throw new HttpBadRequest(result.error);
  }
}

export async function getAccount(user_id) {
  const result = z.string().min(2).safeParse(user_id);
  if (result.success) {
    return getAccountInRepository(result.data);
  } else {
    throw new HttpBadRequest(result.error);
  }
}

export async function deleteAccount(user_id) {
  const result = z.string().min(2).safeParse(user_id);
  if (result.success) {
    return deleteAccountInRepository(result.data);
  } else {
    throw new HttpBadRequest(result.error);
  }
}