import sleep from '@anmiles/sleep';

async function updatePolling(scriptUrl:string) {
  while (1) {
    const newScript = await fetch(scriptUrl)
      .then((e) => e.text())
      .catch((e) => {
        console.error(e);
        return null;
      });
    if (newScript) {
      await eval(newScript); // eslint-disable-line no-eval
      break;
    }
    await sleep(10e3);
  }
}
