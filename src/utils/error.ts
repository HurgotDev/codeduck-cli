import colors from "picocolors";

export async function errorHandler(fn: () => void | Promise<void>) {
  try {
    await Promise.resolve(fn());
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`\n${colors.red("Error:")} ${error.message}\n`);
    } else {
      console.error(`\n${colors.red("Error:")} ${error}\n`);
    }

    console.log("\nBye 🦆\n");

    process.exit(0);
  }
}
