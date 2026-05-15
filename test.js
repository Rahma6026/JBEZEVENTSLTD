const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('adminpanel.html', 'utf8');

const virtualConsole = new jsdom.VirtualConsole();
virtualConsole.on("jsdomError", (err) => {
  console.error("PAGE ERROR:", err);
});
virtualConsole.sendTo(console);

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost/",
  virtualConsole
});

setTimeout(() => {
  const container = dom.window.document.getElementById('services_container');
  console.log("Services container innerHTML length:", container ? container.innerHTML.length : "null");
  process.exit(0);
}, 3000);
