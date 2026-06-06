import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export function analyzeStrength(password: string): number {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  return strength;
}

export function categorizePassword(strength: number): string {
  if (strength <= 2) return "Weak";
  if (strength === 3) return "Moderate";
  return "Strong";
}

export interface PasswordAnalysis {
  password: string;
  hash: string;
  strength: number;
  category: string;
  id: number;
}

export async function analyzePassword(
  password: string,
  userId?: number
): Promise<PasswordAnalysis> {
  const hash = await hashPassword(password);
  const strength = analyzeStrength(password);
  const category = categorizePassword(strength);

  const entry = await prisma.passwordEntry.create({
    data: {
      password,
      hash,
      strength,
      category,
      userId: userId ?? undefined,
    },
  });

  return { password, hash, strength, category, id: entry.id };
}

export async function checkPasswordReuse(
  password: string,
  userId: number
): Promise<boolean> {
  const entry = await prisma.passwordEntry.findFirst({
    where: {
      userId,
      password: password,
    },
  });
  return !!entry;
}

export function suggestStrongerPassword(password: string): string[] {
  const suggestions: string[] = [];

  if (password.length < 8) {
    suggestions.push(password + "123!Ab");
  }
  if (!/[A-Z]/.test(password)) {
    suggestions.push(password + "ABC123!");
  }
  if (!/[0-9]/.test(password)) {
    suggestions.push(password + "1234");
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    suggestions.push(password + "!@#");
  }
  if (suggestions.length === 0) {
    suggestions.push("Consider using a passphrase: " + password + "Phrase" + "2024");
  }

  return suggestions.slice(0, 3);
}

export { prisma };