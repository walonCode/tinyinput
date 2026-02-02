import * as readline from "node:readline/promises";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { confirm, input, select } from "../src/index";

// Mock readline/promises
vi.mock("readline/promises", () => {
	return {
		createInterface: vi.fn(),
	};
});

describe("tinyinput", () => {
	let mockRl: any;

	beforeEach(() => {
		vi.clearAllMocks();
		mockRl = {
			question: vi.fn(),
			close: vi.fn(),
		};
		(readline.createInterface as any).mockReturnValue(mockRl);
	});

	describe("input", () => {
		it("should return a string when opt is 'string'", async () => {
			mockRl.question.mockResolvedValueOnce("hello");
			const result = await input("Question?", "string");
			expect(result).toBe("hello");
			expect(mockRl.question).toHaveBeenCalledWith("Question?");
			expect(mockRl.close).toHaveBeenCalled();
		});

		it("should return an integer when opt is 'int'", async () => {
			mockRl.question.mockResolvedValueOnce("42");
			const result = await input("Age?", "int");
			expect(result).toBe(42);
			expect(mockRl.close).toHaveBeenCalled();
		});

		it("should return a float when opt is 'float'", async () => {
			mockRl.question.mockResolvedValueOnce("3.14");
			const result = await input("Pi?", "float");
			expect(result).toBe(3.14);
			expect(mockRl.close).toHaveBeenCalled();
		});

		it("should retry if invalid integer is provided", async () => {
			mockRl.question
				.mockResolvedValueOnce("abc") // Invalid
				.mockResolvedValueOnce("10"); // Valid

			const result = await input("Number?", "int");
			expect(result).toBe(10);
			expect(mockRl.question).toHaveBeenCalledTimes(2);
		});

		it("should retry if empty string is provided when opt is 'string'", async () => {
			mockRl.question
				.mockResolvedValueOnce("") // Invalid
				.mockResolvedValueOnce("   ") // Invalid (trimmed)
				.mockResolvedValueOnce("Valid"); // Valid

			const result = await input("Name?", "string");
			expect(result).toBe("Valid");
			expect(mockRl.question).toHaveBeenCalledTimes(3);
		});

		it("should default to 'string' if opt is not provided", async () => {
			mockRl.question.mockResolvedValueOnce("default value");
			const result = await input("Prompt?");
			expect(result).toBe("default value");
		});

		it("should return a trimmed string for email if valid", async () => {
			mockRl.question.mockResolvedValueOnce(" test@example.com ");
			const result = await input("Email?", "email");
			expect(result).toBe("test@example.com");
		});

		it("should retry if invalid email is provided", async () => {
			mockRl.question
				.mockResolvedValueOnce("invalid-email")
				.mockResolvedValueOnce("valid@email.com");

			const result = await input("Email?", "email");
			expect(result).toBe("valid@email.com");
			expect(mockRl.question).toHaveBeenCalledTimes(2);
		});

		it("should return password if non-empty", async () => {
			mockRl.question.mockResolvedValueOnce("secret123");
			const result = await input("Password:", "password");
			expect(result).toBe("secret123");
		});

		it("should retry if empty password is provided", async () => {
			mockRl.question
				.mockResolvedValueOnce("")
				.mockResolvedValueOnce("password123");

			const result = await input("Password:", "password");
			expect(result).toBe("password123");
			expect(mockRl.question).toHaveBeenCalledTimes(2);
		});
	});

	describe("confirm", () => {
		it("should return true for 'y'", async () => {
			mockRl.question.mockResolvedValueOnce("y");
			const result = await confirm("Sure?");
			expect(result).toBe(true);
		});

		it("should return false for 'n'", async () => {
			mockRl.question.mockResolvedValueOnce("n");
			const result = await confirm("Sure?");
			expect(result).toBe(false);
		});

		it("should return default value for empty input", async () => {
			mockRl.question.mockResolvedValueOnce("");
			const result = await confirm("Sure?", true);
			expect(result).toBe(true);
		});
	});

	describe("select", () => {
		it("should return the chosen option", async () => {
			mockRl.question.mockResolvedValueOnce("2");
			const result = await select("Choose:", ["A", "B", "C"]);
			expect(result).toBe("B");
		});

		it("should retry if index is out of bounds", async () => {
			mockRl.question
				.mockResolvedValueOnce("5") // Invalid
				.mockResolvedValueOnce("1"); // Valid
			const result = await select("Choose:", ["A", "B", "C"]);
			expect(result).toBe("A");
			expect(mockRl.question).toHaveBeenCalledTimes(2);
		});
	});
});
