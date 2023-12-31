import listenForTransactions from './query-arweave.js';
import sendSlackMessage from './ping.js'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function mainLoop() {
  while (true) {
    const transactionTags = await listenForTransactions();

    if (transactionTags !== false) {
      await sendSlackMessage(transactionTags)
    }

    await delay(20000);
  }
}

mainLoop().catch((error) => {
  console.error('An error occurred:', error);
});
console.log('Whats On Arweave: **LIVE**')

