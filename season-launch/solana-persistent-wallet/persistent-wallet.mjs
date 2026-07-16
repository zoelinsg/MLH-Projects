import {
  createSolanaRpc,
  devnet,
  generateKeyPair,
  createKeyPairSignerFromBytes,
  createSignerFromKeyPair,
} from "@solana/kit";
import { readFile, writeFile } from "node:fs/promises";

const WALLET_FILE = "wallet.json";
const LAMPORTS_PER_SOL = 1_000_000_000;

const rpc = createSolanaRpc(
  devnet("https://api.devnet.solana.com"),
);

async function loadOrCreateWallet() {
  try {
    const data = JSON.parse(
      await readFile(WALLET_FILE, "utf-8"),
    );

    const secretBytes = new Uint8Array(data.secretKey);
    const wallet =
      await createKeyPairSignerFromBytes(secretBytes);

    console.log("Loaded existing wallet:");
    console.log(wallet.address);

    return wallet;
  } catch (error) {
    if (error?.code !== "ENOENT") {
      console.error("Unable to load wallet.json.");
      throw error;
    }

    const keyPair = await generateKeyPair(true);

    const publicKeyBytes = new Uint8Array(
      await crypto.subtle.exportKey(
        "raw",
        keyPair.publicKey,
      ),
    );

    const pkcs8 = await crypto.subtle.exportKey(
      "pkcs8",
      keyPair.privateKey,
    );

    const privateKeyBytes =
      new Uint8Array(pkcs8).slice(-32);

    const keypairBytes = new Uint8Array(64);
    keypairBytes.set(privateKeyBytes, 0);
    keypairBytes.set(publicKeyBytes, 32);

    await writeFile(
      WALLET_FILE,
      JSON.stringify(
        {
          secretKey: Array.from(keypairBytes),
        },
        null,
        2,
      ),
    );

    const wallet =
      await createSignerFromKeyPair(keyPair);

    console.log("Created new wallet:");
    console.log(wallet.address);
    console.log(`Saved locally to ${WALLET_FILE}`);

    return wallet;
  }
}

async function main() {
  const wallet = await loadOrCreateWallet();

  const { value: balance } = await rpc
    .getBalance(wallet.address)
    .send();

  const balanceInSol =
    Number(balance) / LAMPORTS_PER_SOL;

  console.log("\nAddress:");
  console.log(wallet.address);
  console.log(`Balance: ${balanceInSol} SOL`);

  if (balanceInSol === 0) {
    console.log("\nThis wallet has no Devnet SOL.");
    console.log(
      "Visit https://faucet.solana.com/ and fund:",
    );
    console.log(wallet.address);
  }
}

main().catch((error) => {
  console.error("Failed to run persistent wallet.");
  console.error(error);
  process.exitCode = 1;
});