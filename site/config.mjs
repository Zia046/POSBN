// =====================================================================
//  BURHAN NEXUS - CENTRAL SITE CONFIGURATION
//  Edit this ONE file to change company details, contact info, products,
//  pricing, screenshots, downloads and FAQs. Then rebuild (Netlify does it
//  automatically after every push to GitHub).
// =====================================================================

export default {
  // The public address of the website (used for sitemap, canonical links, social sharing)
  siteUrl: 'https://posbn.netlify.app',

  company: {
    name: 'BURHAN NEXUS',
    brand: 'Burhan Nexus',
    tagline: 'Technology That Simplifies Business.',
    statement: 'Smart Software. Innovative Solutions. Better Business.',
    logo: '/assets/img/logo.png',
    logoSmall: '/assets/img/logo-sm.png',
    ogImage: '/assets/img/og-image.jpg',
    intro:
      'Burhan Nexus is a technology-focused software company dedicated to developing practical, reliable, and user-friendly digital solutions. We transform everyday challenges into smart software experiences, helping businesses operate more efficiently and individuals achieve more through technology.',
    mission:
      'Our mission is to make technology accessible, useful, and affordable by creating intelligent software solutions that simplify business operations and improve everyday productivity.',
  },

  // ---- Contact details (leave a value empty to hide it on the site) ----
  contact: {
    whatsapp: '923475093446', // country code, no + and no spaces
    phoneDisplay: '0347 5093446',
    email: 'Ziaullah.046@gmail.com',
    facebook: '', // e.g. 'https://www.facebook.com/yourpage'  <-- PLEASE ADD
    address: '', // optional, shown on Contact and About pages when filled
    hours: '', // optional, e.g. 'Mon-Sat, 10am-8pm'
  },

  // ---- Google Analytics 4: paste your Measurement ID, e.g. 'G-XXXXXXXXXX' ----
  analytics: { ga4Id: '' },

  // ---- Contact form ----
  // 'netlify' = messages arrive in your Netlify dashboard (Forms tab)
  // 'none'    = form is disabled and visitors are pointed to WhatsApp / email
  form: { mode: 'netlify' },

  // =====================================================================
  //  PRODUCTS
  //  status: 'available' | 'coming-soon'
  // =====================================================================
  products: [
    {
      slug: 'pos-desktop',
      name: 'Burhan Nexus POS — Desktop',
      short: 'Desktop POS',
      category: 'Business Management Software',
      badge: 'Desktop Application',
      icon: 'monitor',
      status: 'available',
      summary:
        'A powerful offline point of sale and business management solution designed to simplify sales, inventory, purchasing, customer management, and business reporting.',
      intro:
        'Burhan Nexus POS — Desktop runs on your Windows computer and keeps your whole shop in one place: bills, stock, purchases, customers, suppliers, cash and reports. It is built for real shop counters: fast to learn, quick to use, and it does not need the internet.',
      features: [
        { icon: 'receipt', title: 'Fast Billing', text: 'Search by name, tag, ID or barcode, add items in seconds and print on A4 or an 80 mm thermal printer.' },
        { icon: 'package', title: 'Inventory Management', text: 'Track every product, see low-stock items in red and always know what is on your shelf.' },
        { icon: 'cart', title: 'Purchase Management', text: 'Record stock purchases and supplier payments. Your stock updates automatically on save.' },
        { icon: 'users', title: 'Customer Management', text: 'Keep each customer’s account, balance and history, and collect payments with printed vouchers.' },
        { icon: 'truck', title: 'Supplier Management', text: 'Maintain supplier accounts and see exactly how much you owe and to whom.' },
        { icon: 'chart', title: 'Sales Reports', text: 'Daily closing, invoice-wise sales summary and customer transactions with Excel and PDF export.' },
        { icon: 'trend', title: 'Profit & Loss Reports', text: 'Understand your profit for the month and the year, including repair income.' },
      ],
      moreTitle: 'Built for mobile and retail shops',
      moreFeatures: [
        { icon: 'smartphone', title: 'IMEI tracking & warranty', text: 'Single or double IMEI per phone. Search any IMEI to see who sold it, when, and at what rate.' },
        { icon: 'barcode', title: 'Barcode & price labels', text: 'Print barcode and price labels, and scan to add products to a bill.' },
        { icon: 'whatsapp', title: 'WhatsApp reminders', text: 'Send payment reminders with the message already written.' },
        { icon: 'calendar', title: 'Installments (Qist)', text: 'Create installment plans, see late installments in red and print a due list.' },
        { icon: 'wrench', title: 'Repair jobs', text: 'Take phones for repair, print a slip and track status until delivery.' },
        { icon: 'userCog', title: 'Staff accounts & audit log', text: 'Give staff their own login and see who changed what.' },
        { icon: 'database', title: 'Automatic backup', text: 'Backups run automatically, with an extra copy to a USB drive.' },
        { icon: 'printer', title: 'Thermal & A4 printing', text: 'Print receipts, invoices and vouchers on 80 mm, 58 mm or A4.' },
      ],
      screenshots: [
        { key: 'dashboard', title: 'POS Dashboard', src: '/assets/screenshots/pos-dashboard.webp', alt: 'Burhan Nexus POS Desktop dashboard showing sales, stock, profit and charts' },
        { key: 'billing', title: 'Sales & Billing', src: '/assets/screenshots/sales-billing.webp', alt: 'Burhan Nexus POS Desktop sale invoice window with product search and totals' },
        { key: 'home', title: 'Home Screen', src: '/assets/screenshots/pos-home.webp', alt: 'Burhan Nexus POS Desktop home screen with one-click access to sales, purchase and reports' },
        { key: 'inventory', title: 'Inventory Management', src: '/assets/screenshots/inventory-management.png', alt: 'Burhan Nexus POS Desktop inventory management screen' },
        { key: 'purchase', title: 'Purchase Management', src: '/assets/screenshots/purchase-management.png', alt: 'Burhan Nexus POS Desktop stock purchase screen' },
        { key: 'reports', title: 'Business Reports', src: '/assets/screenshots/business-reports.png', alt: 'Burhan Nexus POS Desktop business reports screen' },
      ],
      video: { url: '', title: 'Burhan Nexus POS — Desktop demonstration' }, // YouTube embed URL, e.g. https://www.youtube.com/embed/XXXX
      offline: {
        title: 'Works fully offline',
        text:
          'Your shop should never stop because the internet did. Burhan Nexus POS — Desktop runs entirely on your own computer. Your business data is stored on that computer in an encrypted database, so billing, stock and reports keep working with no connection at all.',
        points: [
          'No internet needed for daily work',
          'Data stays on your computer, encrypted',
          'Automatic backups, with an extra copy to USB',
          'Move to a new computer by restoring a backup',
        ],
      },
      requirements: [
        'Windows PC or laptop',
        'No internet connection required for daily use',
        'Activation Key linked to your computer (it shows a Machine Code on first start)',
        'Optional: thermal receipt printer (80 mm or 58 mm), A4 printer, barcode scanner',
      ],
      pricing: {
        title: 'Simple, one-time pricing',
        text: 'Try it free for one month in your own shop. Pay once only if you want to keep it.',
        plans: [
          {
            name: 'Burhan Nexus POS — Desktop',
            price: 'PKR 10,000',
            period: 'one-time price',
            highlight: '1 month free trial',
            includes: ['Full software for your shop', 'Setup guidance', 'Support on WhatsApp and email', 'User manual included'],
          },
        ],
        note: 'Prices may change. Message us for the latest offer.',
      },
      faqs: [
        { q: 'Is the free trial really free?', a: 'Yes. You can use the software for one month free. You only pay the one-time price if you decide to keep using it.' },
        { q: 'Do I need the internet to use it?', a: 'No. Daily work runs fully offline. Your data stays on your own computer.' },
        { q: 'Which computer do I need?', a: 'A Windows PC or laptop. The Activation Key works on the computer it was made for.' },
        { q: 'Can I move to a new computer?', a: 'Yes. Take a backup file from the old computer, install the software on the new one, and restore the backup from the Utilities menu.' },
        { q: 'Which printers can I use?', a: 'Thermal receipt printers (80 mm or 58 mm) and normal A4 printers.' },
        { q: 'Is my data safe?', a: 'Your data is stored encrypted on your computer and the software makes automatic backups. You can also keep a copy on a USB drive.' },
      ],
      waMessage: 'Hello, I am interested in Burhan Nexus POS — Desktop. I would like more information and the 1 month free trial.',
    },

    {
      slug: 'pos-mobile',
      name: 'Burhan Nexus POS — Mobile',
      short: 'Mobile POS',
      category: 'Mobile Business Application',
      badge: 'Mobile Application',
      icon: 'smartphone',
      status: 'coming-soon',
      summary: 'A mobile business management solution designed to bring essential business operations to your smartphone.',
      intro:
        'Burhan Nexus POS — Mobile puts the essentials of running a shop on your Android phone: sales, purchases, customers, suppliers, expenses and reports, all designed to work offline.',
      // Keep this list in line with what the app can actually do.
      features: [
        { icon: 'receipt', title: 'Sales & POS invoices', text: 'Make sales invoices on your phone and share PDF receipts.' },
        { icon: 'cart', title: 'Purchases & stock', text: 'Record purchases and keep your stock up to date.' },
        { icon: 'rotate', title: 'Returns', text: 'Handle sale and purchase returns with the accounts adjusted automatically.' },
        { icon: 'users', title: 'Customers, suppliers & ledger', text: 'See what customers owe you and what you owe suppliers.' },
        { icon: 'coins', title: 'Expenses', text: 'Record shop expenses by category and period.' },
        { icon: 'chart', title: 'Reports with charts', text: 'Sales, profit and expenses for today, this week, this month or any range.' },
        { icon: 'barcode', title: 'Barcode scanning & printing', text: 'Scan with the phone camera and print barcode labels as a PDF.' },
        { icon: 'send', title: 'Payment reminder SMS', text: 'Send a payment reminder to a customer who owes money, straight from the phone.' },
      ],
      moreTitle: '',
      moreFeatures: [],
      screenshots: [
        { key: 'm1', title: 'Mobile Dashboard', src: '/assets/screenshots/mobile-dashboard.png', alt: 'Burhan Nexus POS Mobile dashboard' },
        { key: 'm2', title: 'Mobile Sales', src: '/assets/screenshots/mobile-sales.png', alt: 'Burhan Nexus POS Mobile sale screen' },
        { key: 'm3', title: 'Mobile Reports', src: '/assets/screenshots/mobile-reports.png', alt: 'Burhan Nexus POS Mobile reports screen' },
      ],
      video: { url: '', title: 'Burhan Nexus POS — Mobile demonstration' },
      offline: {
        title: 'Offline-first by design',
        text: 'The app keeps your shop data on your phone, so you can work without a connection.',
        points: ['Works without internet', 'Data stays on your phone'],
      },
      requirements: ['Android 8.0 or newer', 'Optional: camera permission for barcode scanning', 'Optional: SMS permission for payment reminders (standard SMS charges apply)'],
      pricing: { title: 'Pricing', text: 'Pricing for the mobile app will be announced at launch.', plans: [], note: '' },
      faqs: [
        { q: 'When will the mobile app be available?', a: 'The mobile app is still in development. Message us on WhatsApp and we will tell you when it is ready.' },
        { q: 'Which phones will it support?', a: 'Android phones running Android 8.0 or newer.' },
        { q: 'Will it work without internet?', a: 'Yes. It is designed offline-first.' },
      ],
      waMessage: 'Hello, I would like to know more about Burhan Nexus POS — Mobile.',
    },

    {
      slug: 'product-code-decoder',
      name: 'Burhan Nexus Product Code Decoder',
      short: 'Product Code Decoder',
      category: 'Business Utility Software',
      badge: 'Android Application',
      icon: 'key',
      status: 'coming-soon',
      summary: 'An innovative product coding solution that helps shopkeepers encode product purchase prices using a customizable numeric-to-alphabetic coding formula.',
      intro:
        'Many shopkeepers write the purchase price of an item on its tag in code, so staff and customers cannot read the cost. The Product Code Decoder turns that habit into a simple tool: convert a price into your private letter code, and turn a code back into a price, instantly.',
      features: [
        { icon: 'lock', title: 'Price to Code', text: 'Type a purchase price and get your letter code to write on the tag.' },
        { icon: 'search', title: 'Code to Price', text: 'Type a code and see the real price straight away.' },
        { icon: 'userCog', title: 'Your own formula', text: 'Choose your own letter for each digit, so your code is private to your shop.' },
      ],
      moreTitle: '',
      moreFeatures: [],
      screenshots: [
        { key: 'd1', title: 'Product Code Decoder', src: '/assets/screenshots/product-code-decoder.png', alt: 'Burhan Nexus Product Code Decoder app screen' },
      ],
      video: { url: '', title: 'Burhan Nexus Product Code Decoder demonstration' },
      concept: {
        title: 'How product coding works',
        text: 'You choose ten different letters, one for each digit from 0 to 9. A price is then written using those letters instead of numbers. The table below is only an example. In the app you set your own letters.',
        exampleKey: 'BLACKHORSE', // illustrative only (10 different letters, one per digit 0-9)
        steps: [
          { title: 'Choose your letters', text: 'Pick ten different letters, one for each digit 0 to 9. No letter can repeat.' },
          { title: 'Encode the price', text: 'Replace each digit of the purchase price with its letter.' },
          { title: 'Write it on the tag', text: 'Only you and your trusted staff know what the letters mean.' },
        ],
      },
      offline: { title: '', text: '', points: [] },
      requirements: ['Android phone (version to be announced)'],
      pricing: { title: 'Pricing', text: 'Pricing will be announced at launch.', plans: [], note: '' },
      faqs: [
        { q: 'Can I use my own letters?', a: 'Yes. The formula is customizable so every shop can have its own private code.' },
        { q: 'Is the example on this page my real code?', a: 'No. The example is for illustration only. Always choose your own letters.' },
        { q: 'When will it be available?', a: 'Message us on WhatsApp and we will tell you when it is ready.' },
      ],
      waMessage: 'Hello, I would like to know more about the Burhan Nexus Product Code Decoder.',
    },

    {
      slug: '',
      name: 'Upcoming Innovations',
      short: 'Upcoming',
      category: 'Coming Soon',
      badge: 'Coming Soon',
      icon: 'sparkles',
      status: 'coming-soon',
      summary: 'We are continuously working on new digital products and innovative software solutions.',
      features: [],
    },
  ],

  // =====================================================================
  //  SERVICES
  // =====================================================================
  services: [
    { icon: 'monitor', title: 'Desktop Software Development', text: 'Reliable Windows applications built around the way your business actually works.', points: ['Billing, inventory and accounting tools', 'Offline-first and fast', 'Printing, barcode and reporting'] },
    { icon: 'smartphone', title: 'Android Application Development', text: 'Practical Android apps that bring your business tools to your phone.', points: ['Clean, simple screens', 'Works with or without internet', 'Camera, SMS and sharing features'] },
    { icon: 'layers', title: 'Custom Business Software', text: 'Software designed for your exact process when off-the-shelf tools do not fit.', points: ['Requirements discussed with you', 'Built step by step', 'Documented and supported'] },
    { icon: 'bot', title: 'Business Automation Solutions', text: 'Remove repetitive manual work with tools that do it for you.', points: ['Automatic calculations and reports', 'Reminders and notifications', 'Fewer errors, more time'] },
    { icon: 'chat', title: 'Software Consultation', text: 'Honest advice on choosing, planning and improving the software your business uses.', points: ['Understand your needs first', 'Clear options and costs', 'A practical roadmap'] },
  ],
  process: [
    { title: 'Discuss', text: 'We listen to your business and your goals.' },
    { title: 'Plan', text: 'We agree the features, scope and approach.' },
    { title: 'Build', text: 'We develop and show you progress as we go.' },
    { title: 'Support', text: 'We help you start and stay supported.' },
  ],

  // =====================================================================
  //  WHY CHOOSE US
  // =====================================================================
  why: [
    { icon: 'bulb', title: 'Practical Innovation', text: 'New ideas that solve real, everyday problems in your shop.' },
    { icon: 'pointer', title: 'User-Friendly Design', text: 'Simple screens your staff can learn quickly.' },
    { icon: 'cpu', title: 'Smart Business Solutions', text: 'Software that understands how small businesses really run.' },
    { icon: 'shield', title: 'Reliable Performance', text: 'Fast, stable software that keeps working at the counter.' },
    { icon: 'wallet', title: 'Affordable Technology', text: 'Fair, one-time pricing instead of heavy monthly fees.' },
    { icon: 'headphones', title: 'Dedicated Support', text: 'Real help from the people who built the software.' },
  ],

  // =====================================================================
  //  SOLUTIONS (who we help)
  // =====================================================================
  solutions: [
    { icon: 'smartphone', title: 'Mobile Phone Shops', text: 'Sell phones and accessories with the tracking a mobile shop needs.', points: ['IMEI tracking and warranty', 'Repair jobs and slips', 'Installments (Qist) with due list', 'Product price coding'], product: 'pos-desktop' },
    { icon: 'store', title: 'General & Retail Stores', text: 'Run everyday retail with fast billing and tidy stock.', points: ['Barcode scanning and price labels', 'Low-stock alerts', 'Thermal and A4 printing', 'Daily closing report'], product: 'pos-desktop' },
    { icon: 'coins', title: 'Credit & Installment Businesses', text: 'Keep track of who owes what and collect it on time.', points: ['Customer accounts and balances', 'Cash recovery vouchers', 'WhatsApp payment reminders', 'Outstanding (baqayajat) report'], product: 'pos-desktop' },
    { icon: 'wrench', title: 'Repair & Service Centers', text: 'Take jobs in, track them and get paid.', points: ['Repair slips with status', 'Advance and final payment', 'Parts cost and repair income', 'Customer notification message'], product: 'pos-desktop' },
  ],

  // =====================================================================
  //  DOWNLOADS  (leave url empty until a file is really published)
  // =====================================================================
  downloads: [
    {
      product: 'pos-desktop',
      name: 'Burhan Nexus POS — Desktop',
      platform: 'Windows',
      version: '', // e.g. '1.0.0'
      releaseDate: '', // e.g. '1 December 2026'
      size: '', // e.g. '85 MB'
      url: '', // direct download link
      requirements: ['Windows PC or laptop', 'No internet connection required for daily use', 'Activation Key (Machine Code shown on first start)'],
      notes: [], // e.g. ['Initial release']
      waMessage: 'Hello, please send me the demo of Burhan Nexus POS — Desktop.',
    },
    {
      product: 'pos-mobile',
      name: 'Burhan Nexus POS — Mobile',
      platform: 'Android',
      version: '',
      releaseDate: '',
      size: '',
      url: '',
      requirements: ['Android 8.0 or newer'],
      notes: [],
      waMessage: 'Hello, I would like to know when Burhan Nexus POS — Mobile will be available.',
    },
    {
      product: 'product-code-decoder',
      name: 'Burhan Nexus Product Code Decoder',
      platform: 'Android',
      version: '',
      releaseDate: '',
      size: '',
      url: '',
      requirements: ['Android phone'],
      notes: [],
      waMessage: 'Hello, I would like to know when the Burhan Nexus Product Code Decoder will be available.',
    },
  ],

  // =====================================================================
  //  GENERAL FAQ
  // =====================================================================
  faqGroups: [
    {
      title: 'About Burhan Nexus',
      items: [
        { q: 'What does Burhan Nexus do?', a: 'We build practical software: desktop applications, Android apps and business management tools that make daily operations simpler.' },
        { q: 'Can you build custom software for my business?', a: 'Yes. We offer custom business software, automation and consultation. Contact us and tell us what you need.' },
        { q: 'How can I contact you?', a: 'Message us on WhatsApp, send an email, or use the contact form on our Contact page.' },
      ],
    },
    {
      title: 'Burhan Nexus POS — Desktop',
      items: [
        { q: 'Is the free trial really free?', a: 'Yes. You can use the software for one month free. You only pay the one-time price if you decide to keep using it.' },
        { q: 'How much does it cost?', a: 'The price is PKR 10,000, paid once. There is no monthly fee. Prices may change, so message us for the latest offer.' },
        { q: 'Do I need the internet?', a: 'No. Daily work runs fully offline and your data stays on your own computer.' },
        { q: 'Which computer do I need?', a: 'A Windows PC or laptop. The Activation Key works on the computer it was made for.' },
        { q: 'Which printers work?', a: 'Thermal receipt printers (80 mm or 58 mm) and normal A4 printers.' },
        { q: 'Is my data safe?', a: 'Your data is encrypted on your computer and the software makes automatic backups. You can also keep a copy on a USB drive.' },
        { q: 'Can I move to a new computer?', a: 'Yes. Restore a backup from the old computer on the new one. Ask us and we will guide you.' },
      ],
    },
    {
      title: 'Mobile app & Product Code Decoder',
      items: [
        { q: 'Are the mobile app and the decoder available now?', a: 'They are still in development. Message us on WhatsApp and we will tell you when they are ready.' },
        { q: 'Which phones will they support?', a: 'Android phones. The mobile POS is planned for Android 8.0 or newer.' },
      ],
    },
    {
      title: 'Support',
      items: [
        { q: 'How do I get support?', a: 'Call or message us on WhatsApp, or send an email. We will help you.' },
        { q: 'Do you provide a user manual?', a: 'Yes. A user manual is included with the desktop software.' },
      ],
    },
  ],
};
