import { generateKeyPairSigner } from "@solana/kit";

const wallet = await generateKeyPairSigner();

console.log("Your new wallet address:");
console.log(wallet.address);

console.log("\nThis public address is safe to share.");
console.log("The private key exists only in memory and is not saved.");