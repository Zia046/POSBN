// One-time helper: extracts Lucide icons (from react-icons) into site/icons.mjs so the site build has no dependencies.
const { createRequire } = require('module');
const req = createRequire('/opt/npm-tools/node_modules/');
const React = req('react');
const { renderToStaticMarkup } = req('react-dom/server');
const lu = req('react-icons/lu');
const names = {
  menu:'LuMenu', x:'LuX', arrowRight:'LuArrowRight', arrowLeft:'LuArrowLeft', check:'LuCheck', checkCircle:'LuCircleCheck',
  monitor:'LuMonitor', smartphone:'LuSmartphone', key:'LuKeyRound', sparkles:'LuSparkles', zap:'LuZap', layers:'LuLayers',
  shield:'LuShieldCheck', headphones:'LuHeadphones', wallet:'LuWallet', bulb:'LuLightbulb', pointer:'LuMousePointerClick',
  cpu:'LuCpu', code:'LuCode', bot:'LuBot', chat:'LuMessagesSquare', package:'LuPackage', receipt:'LuReceipt', cart:'LuShoppingCart',
  users:'LuUsers', truck:'LuTruck', chart:'LuChartColumn', trend:'LuTrendingUp', wifiOff:'LuWifiOff', drive:'LuHardDrive',
  printer:'LuPrinter', barcode:'LuScanBarcode', whatsapp:'LuMessageCircle', mail:'LuMail', phone:'LuPhone', facebook:'LuFacebook',
  download:'LuDownload', play:'LuPlay', chevDown:'LuChevronDown', chevLeft:'LuChevronLeft', chevRight:'LuChevronRight',
  external:'LuExternalLink', store:'LuStore', wrench:'LuWrench', calendar:'LuCalendarClock', image:'LuImage', clock:'LuClock',
  info:'LuInfo', alert:'LuTriangleAlert', lock:'LuLock', rocket:'LuRocket', target:'LuTarget', handshake:'LuHandshake',
  userCog:'LuUserCog', fileText:'LuFileText', building:'LuBuilding2', send:'LuSend', globe:'LuGlobe', database:'LuDatabaseBackup',
  badge:'LuBadgeCheck', hand:'LuHeartHandshake', coins:'LuCoins', rotate:'LuRotateCcw', search:'LuSearch', tag:'LuTag',
};
const out = {}; const missing = [];
for (const [k, n] of Object.entries(names)) {
  if (!lu[n]) { missing.push(n); continue; }
  const svg = renderToStaticMarkup(React.createElement(lu[n], {}));
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
  out[k] = inner;
}
const fs = require('fs');
fs.writeFileSync('site/icons.mjs', '// Lucide icons (ISC licence), extracted by tools/extract-icons.cjs\nexport default ' + JSON.stringify(out, null, 1) + ';\n');
console.log('icons:', Object.keys(out).length, 'missing:', missing);
