import { createInterface } from "node:readline/promises";
import { Writable } from "node:stream";
import type { Opt } from "./type";

export async function input(
	question: string,
	opt: Opt = "string",
): Promise<string | number> {
	let muted = false;
	const mutableStdout = new Writable({
		write: (chunk, encoding, callback) => {
			if (!muted) {
				process.stdout.write(chunk, encoding);
			}
			callback();
		},
	});

	const rl = createInterface({
		input: process.stdin,
		output: mutableStdout,
		terminal: true,
	});

	try {
		while (true) {
			if (opt === "password") {
				process.stdout.write(question);
				muted = true;
			}

			let value = await rl.question(opt === "password" ? "" : question);

			if (opt === "password") {
				muted = false;
				process.stdout.write("\n");
			}

			value = value.trim();

			if (opt === "int") {
				const parse = parseInt(value, 10);
				if (!Number.isNaN(parse)) return parse;
				console.log("Please enter a valid integer");
			} else if (opt === "float") {
				const parse = parseFloat(value);
				if (!Number.isNaN(parse)) return parse;
				console.log("Please enter a valid number");
			} else if (opt === "email") {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (emailRegex.test(value)) return value;
				console.log("Please enter a valid email address");
			} else {
				if (value.length > 0) return value;
				console.log(
					opt === "password"
						? "Password cannot be empty"
						: "Please enter a non-empty string.",
				);
			}
		}
	} finally {
		rl.close();
	}
}

export async function confirm(
	question: string,
	defaultValue = true,
): Promise<boolean> {
	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	try {
		const suffix = defaultValue ? " [Y/n] " : " [y/N] ";
		while (true) {
			const res = (await rl.question(question + suffix)).toLowerCase().trim();
			if (res === "") return defaultValue;
			if (res === "y" || res === "yes" || res === "true") return true;
			if (res === "n" || res === "no" || res === "false") return false;
			console.log("Please enter 'y' or 'n'");
		}
	} finally {
		rl.close();
	}
}

export async function select(
	question: string,
	choices: string[],
): Promise<string> {
	if (choices.length === 0) throw new Error("Choices array cannot be empty");

	const rl = createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	try {
		console.log(question);
		for (let i = 0; i < choices.length; i++) {
			console.log(`${i + 1}) ${choices[i]}`);
		}

		while (true) {
			const res = (await rl.question("Select an option (number): ")).trim();
			const index = parseInt(res, 10) - 1;
			if (!Number.isNaN(index) && index >= 0 && index < choices.length) {
				return choices[index];
			}
			console.log(`Please enter a number between 1 and ${choices.length}`);
		}
	} finally {
		rl.close();
	}
}
