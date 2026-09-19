/* =========================================================
   VIP YACHTS — MASTER SCRIPT
   Single source of truth for all site behaviour.
   ========================================================= */

(function () {
  'use strict';

  /* =========================================================
     1. PATH HELPERS
     Determine relative path prefix so links work from any
     nesting depth (root vs /pages/).
     ========================================================= */
  function getBasePath() {
    // Pages inside /pages/ need to go up one level to reach root assets.
    var path = window.location.pathname;
    return /\/pages\//.test(path) ? '../' : '';
  }
  var BASE = getBasePath();

  function getCurrentPage() {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return file.replace('.html', '') || 'index';
  }
  var CURRENT_PAGE = getCurrentPage();

  /* =========================================================
     2. FLEET DATA — SINGLE SOURCE OF TRUTH
     Used by: homepage fleet preview, fleet listing + filters,
     yacht detail pages, booking flow selectors & pricing.
     ========================================================= */
  var YACHTS = [
    {
      id: 'enterprise-48',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Enterprise 50',
      tagline: 'Experience the Grandeur',
      pricePerHour: 600,
      guests: 15,
      cabins: 1,
      washrooms: 1,
      length: 48,
      crew: 3,
      image: 'images/yacht-enterprise-48-hero.jpg',
      gallery: [
        'images/yacht-enterprise-48-exterior-1.jpg',
        'images/yacht-enterprise-48-exterior-2.jpg',
        'images/yacht-enterprise-48-exterior-3.jpg',
        'images/yacht-enterprise-48-helm.jpg',
        'images/yacht-enterprise-48-salon-1.jpg',
        'images/yacht-enterprise-48-salon-2.jpg',
        'images/yacht-enterprise-48-salon-3.jpg',
        'images/yacht-enterprise-48-sundeck-seating.jpg',
        'images/yacht-enterprise-48-master-cabin.jpg'
      ],
      description: 'Crafted with genuine skill, Vip Enterprise 50 is a 48-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and an unforgettable luxury escapade at sea.',
      overview: 'Vip Enterprise 50 accommodates up to 15 guests for day charters and also boasts an overnight capacity for 2, complete with extra quarters for a dedicated crew of 2. A main salon anchors the interior, with jetski and a variety of water sports available for guest enjoyment.',
      features: ['Main salon', 'Jetski included', 'Water sports available', 'Bimini-shaded flybridge', 'Sundeck seating', 'Onboard crew of 2'],
      decks: [
        { name: 'Flybridge', detail: 'Shaded helm and open-air seating with skyline views.' },
        { name: 'Main Deck', detail: 'Main salon with dining and lounge seating.' },
        { name: 'Lower Deck', detail: 'Master cabin, sized for 2 overnight guests.' }
      ]
    },
    {
      id: 'grand-82',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Grand 85',
      tagline: 'Highly Recommended Luxury Yacht in Dubai',
      pricePerHour: null, // Price on Request
      guests: 35,
      cabins: 4,
      washrooms: 4,
      length: 82,
      crew: 4,
      image: 'images/yacht-grand-82-hero.jpg',
      gallery: [
        'images/yacht-grand-82-saloon-1.jpg',
        'images/yacht-grand-82-saloon-2.jpg',
        'images/yacht-grand-82-saloon-3.jpg',
        'images/yacht-grand-82-saloon-4.jpg',
        'images/yacht-grand-82-sunbed.jpg',
        'images/yacht-grand-82-jacuzzi.jpg',
        'images/yacht-grand-82-sunbed-jacuzzi-bow.jpg',
        'images/yacht-grand-82-upperdeck-bar.jpg',
        'images/yacht-grand-82-aft-table.jpg',
        'images/yacht-grand-82-back-table.jpg',
        'images/yacht-grand-82-bar-counter.jpg',
        'images/yacht-grand-82-bedroom-1.jpg',
        'images/yacht-grand-82-bedroom-2.jpg',
        'images/yacht-grand-82-bathroom.jpg'
      ],
      description: 'An 82-foot luxury yacht with capacity for 35 guests, featuring a premium jacuzzi with water temperature control and a special-edition upper deck with bar counter and seating.',
      overview: 'Vip Grand 85 pairs a spacious sun bed forward with a premium jacuzzi offering water temperature control. The upper deck bar counter and teak-decked sitting area suit large groups, while a premium finished back table with swimming hydraulic jumper and a fully stocked inside bar counter round out the entertaining spaces. Four bedrooms and four washrooms accommodate overnight and large day-charter groups alike, with a bright, brand-new saloon furnished throughout in luxury quality brands.',
      features: ['Premium jacuzzi with temperature control', 'Spacious bow sun bed', 'Upper deck bar counter & seating', 'Swimming hydraulic jumper', 'Fully stocked bar counter', '4 bedrooms, 4 washrooms', 'Ambiance lighting & premium sound system'],
      decks: [
        { name: 'Upper Deck', detail: 'Bar counter, teak seating area, and open-air lounge.' },
        { name: 'Main Deck', detail: 'Premium saloon, back table with hydraulic swim jumper, and inside bar.' },
        { name: 'Lower Deck', detail: 'Four bedrooms, each with access to one of four washrooms.' }
      ]
    },
    {
      id: 'big-daddy-90',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Big Daddy 90',
      tagline: 'Step Into a New Echelon of Opulent Sailing Indulgence',
      pricePerHour: 3000,
      guests: 50,
      cabins: 4,
      washrooms: 4,
      length: 90,
      crew: 5,
      image: 'images/yacht-big-daddy-90-hero.jpg',
      gallery: [
        'images/yacht-big-daddy-90-exterior-1.jpg',
        'images/yacht-big-daddy-90-exterior-2.jpg',
        'images/yacht-big-daddy-90-salon.jpg',
        'images/yacht-big-daddy-90-helm.jpg',
        'images/yacht-big-daddy-90-sunbed.jpg',
        'images/yacht-big-daddy-90-lower-deck-stairs.jpg',
        'images/yacht-big-daddy-90-master-cabin.jpg',
        'images/yacht-big-daddy-90-twin-room.jpg',
        'images/yacht-big-daddy-90-flybridge.jpg'
      ],
      description: 'The Big Daddy Premium Yacht is a 90-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Vip Big Daddy 90 accommodates up to 50 guests for day charters and boasts an overnight capacity for 8, complete with extra quarters for a dedicated crew of 5. Luxurious cabins, including Master, VIP, Double, and Twin, each come with an en-suite bathroom. A main salon with dining area and bar, spacious flybridge, and spacious bathtub round out the experience, alongside jetski and a variety of water sports.',
      features: ['Master, VIP, Double & Twin cabins, each en-suite', 'Spacious flybridge', 'Spacious bathtub', 'Main salon with dining area and bar', 'Jetski included', 'Water sports available', 'Live BBQ & international cuisine on request'],
      decks: [
        { name: 'Flybridge', detail: 'Artificial turf lounge, helm station, and open skyline views.' },
        { name: 'Main Deck', detail: 'Salon with dining area and bar, plus helm lounge seating.' },
        { name: 'Lower Deck', detail: 'Master cabin, VIP, double, and twin cabins, each with en-suite bathroom.' }
      ]
    },
    {
      id: 'majesty-101',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Majesty 101',
      tagline: 'Step Into a New Echelon of Opulent Sailing Indulgence',
      pricePerHour: 6000,
      guests: 50,
      cabins: 4,
      washrooms: 4,
      length: 101,
      crew: 5,
      image: 'images/yacht-majesty-101-hero.jpg',
      gallery: [
        'images/yacht-majesty-101-exterior-1.jpg',
        'images/yacht-majesty-101-exterior-2.jpg',
        'images/yacht-majesty-101-salon.jpg',
        'images/yacht-majesty-101-dining-1.jpg',
        'images/yacht-majesty-101-dining-2.jpg',
        'images/yacht-majesty-101-sunbed.jpg',
        'images/yacht-majesty-101-jacuzzi.jpg',
        'images/yacht-majesty-101-helm.jpg',
        'images/yacht-majesty-101-master-cabin.jpg',
        'images/yacht-majesty-101-flybridge.jpg'
      ],
      description: 'The Majesty Premium Yacht is a 101-ft / 31-meter masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Vip Majesty 101 accommodates up to 50 guests for day charters and boasts an overnight capacity for 8, complete with extra quarters for a dedicated crew of 5. Luxurious cabins, including Master, VIP, Double, and Twin, each come with an en-suite bathroom. The main salon features a dining area and bar, while the spacious flybridge offers its own dining area, bar, and sunbeds. A jacuzzi with relaxed seating area, jetski, and a variety of water sports round out the experience.',
      features: ['Master, VIP, Double & Twin cabins, each en-suite', 'Flybridge with dining area, bar & sunbeds', 'Jacuzzi with relaxed seating', 'Main salon with dining area and bar', 'Jetski included', 'Water sports available', 'Cruising speed of 18 knots'],
      decks: [
        { name: 'Flybridge', detail: 'Dedicated dining area, bar, and sunbeds with panoramic views.' },
        { name: 'Main Deck', detail: 'Salon with dining area and bar, plus helm station.' },
        { name: 'Lower Deck', detail: 'Master cabin, VIP, double, and twin cabins, each with en-suite bathroom.' }
      ]
    },
    {
      id: 'schaefer-480',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Schaffer 50',
      tagline: 'A Comfortable Introduction to Yachting',
      pricePerHour: 600,
      guests: 12,
      cabins: 2,
      washrooms: 1,
      length: 48,
      crew: 3,
      image: 'images/yacht-schaefer-480-exterior-1.jpg',
      gallery: [
        'images/yacht-schaefer-480-exterior-2.jpg',
        'images/yacht-schaefer-480-exterior-3.jpg',
        'images/yacht-schaefer-480-salon.jpg',
        'images/yacht-schaefer-480-dinette.jpg',
        'images/yacht-schaefer-480-galley.jpg',
        'images/yacht-schaefer-480-master-cabin.jpg',
        'images/yacht-schaefer-480-twin-cabin.jpg',
        'images/yacht-schaefer-480-aft-lounge.jpg',
        'images/yacht-schaefer-480-bow-sundeck.jpg',
        'images/yacht-schaefer-480-flybridge-top.jpg',
        'images/yacht-schaefer-480-upper-deck.jpg'
      ],
      description: 'Vip Schaffer 50 offers a comfortable, well-appointed charter for smaller groups, with a shaded flybridge, cream leather saloon, and two guest cabins below deck.',
      overview: 'Estimated specifications based on vessel size and configuration shown. Vip Schaffer 50 carries a two-cabin layout (a wood-paneled master cabin and a twin-bed second cabin) with a cream leather saloon, marble-topped galley, and dinette. The bow sundeck and aft lounge provide ample outdoor seating, and the shaded flybridge tops off the layout with additional open-air space.',
      features: ['Two-cabin layout (master + twin)', 'Cream leather saloon', 'Marble-topped galley & dinette', 'Shaded flybridge', 'Bow sundeck', 'Aft lounge seating'],
      decks: [
        { name: 'Flybridge', detail: 'Shaded open-air seating above the main deck.' },
        { name: 'Main Deck', detail: 'Saloon, dinette, and galley with marble countertops.' },
        { name: 'Lower Deck', detail: 'Master cabin and twin cabin, sharing one washroom.' }
      ]
    },
    {
      id: 'mayyas-75',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Mayyas 75',
      tagline: 'Experience the Grandeur',
      pricePerHour: 900,
      guests: 30,
      cabins: 2,
      washrooms: 2,
      length: 75,
      crew: 3,
      image: 'images/yacht-mayyas-75-hero.jpg',
      gallery: ['images/yacht-mayyas-75-exterior.jpg', 'images/yacht-mayyas-75-exterior-2.jpg', 'images/yacht-mayyas-75-interior.jpg'],
      description: 'Crafted with genuine skill, Vip Mayyas 75 is a 75-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Vip Mayyas 75 accommodates up to 30 guests for day charters and boasts an overnight capacity for 3, complete with extra quarters for a dedicated crew of 3. Luxurious cabins, including Master and Twin, each come with an en-suite bathroom. A main salon with bar area and a spacious flybridge round out the experience, alongside jetski and a variety of water sports.',
      features: ['Master & Twin cabins, each en-suite', 'Main salon with bar area', 'Spacious flybridge', 'Jetski included', 'Water sports available'],
      decks: [
        { name: 'Flybridge', detail: 'Open-air seating with dining table and skyline views.' },
        { name: 'Main Deck', detail: 'Salon with bar area and helm station.' },
        { name: 'Lower Deck', detail: 'Master cabin and twin cabin, each with en-suite bathroom.' }
      ]
    },
    {
      id: 'majesty-88',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Majesty 88',
      tagline: 'Step Into a New Echelon of Opulent Sailing Indulgence',
      pricePerHour: 3000,
      guests: 50,
      cabins: 4,
      washrooms: 4,
      length: 88,
      crew: 5,
      image: 'images/yacht-majesty-88-hero.jpg',
      gallery: ['images/yacht-majesty-88-exterior.jpg', 'images/yacht-majesty-88-interior.jpg'],
      description: 'Crafted with genuine skill, the Majesty Premium Yacht is an 88-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Vip Majesty 88 accommodates up to 50 guests for day charters and boasts an overnight capacity for 8, complete with extra quarters for a dedicated crew of 5. Luxurious cabins, including Master, VIP, Double, and Twin, each come with an en-suite bathroom. The main salon features a dining area and bar, while the spacious flybridge offers its own dining area, bar, and sunbeds. A jacuzzi with relaxed seating area, jetski, and a variety of water sports round out the experience.',
      features: ['Master, VIP, Double & Twin cabins, each en-suite', 'Flybridge with dining area, bar & sunbeds', 'Jacuzzi with relaxed seating', 'Main salon with dining area and bar', 'Jetski included', 'Water sports available', 'Cruising speed of 18 knots'],
      decks: [
        { name: 'Flybridge', detail: 'Dedicated dining area, bar, and sunbeds with panoramic views.' },
        { name: 'Main Deck', detail: 'Salon with dining area and bar, plus helm station.' },
        { name: 'Lower Deck', detail: 'Master cabin, VIP, double, and twin cabins, each with en-suite bathroom.' }
      ]
    },
    {
      id: 'majesty-59',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Majesty 59',
      tagline: 'Explore a Fresh Realm of Exclusive Yacht Charters',
      pricePerHour: 800,
      guests: 25,
      cabins: 1,
      washrooms: 1,
      length: 59,
      crew: 3,
      image: 'images/yacht-majesty-59-exterior.jpg', // no dedicated hero photo was supplied for this yacht — using the exterior shot as the card/hero image instead
      gallery: ['images/yacht-majesty-59-exterior.jpg', 'images/yacht-majesty-59-interior.jpg'],
      description: 'Crafted with genuine skill, the Majesty Premium Yacht is a 59-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Vip Majesty 59 accommodates up to 25 guests for day charters and boasts an overnight capacity for 2, complete with extra quarters for a dedicated crew of 2. The Master cabin comes with an en-suite bathroom. A main salon with dining area and a spacious flybridge featuring its own dining area round out the experience, alongside jetski and a variety of water sports.',
      features: ['Master cabin, en-suite', 'Main salon with dining area', 'Spacious flybridge with dining area', 'Jetski included', 'Water sports available'],
      decks: [
        { name: 'Flybridge', detail: 'Open-air seating with dining area and helm station.' },
        { name: 'Main Deck', detail: 'Salon with dining area.' },
        { name: 'Lower Deck', detail: 'Master cabin with en-suite bathroom.' }
      ]
    },
    {
      id: 'jasmine-55',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Jasmine 55',
      tagline: 'Experience the Grandeur',
      pricePerHour: 700,
      guests: 22,
      cabins: 4,
      washrooms: 4,
      length: 55,
      crew: 3,
      image: 'images/yacht-jasmine-55-hero.jpg',
      gallery: ['images/yacht-jasmine-55-exterior.jpg', 'images/yacht-jasmine-55-interior.jpg'],
      description: 'Crafted with genuine skill, the Vip Jasmine 55 Premium Yacht is a 55-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Vip Jasmine 55 accommodates up to 22 guests for day charters and boasts an overnight capacity for 2, complete with extra quarters for a dedicated crew of 2. Luxurious cabins, including Master, VIP, Double, and Twin, each come with an en-suite bathroom. A main salon and spacious flybridge round out the experience, alongside jetski and a variety of water sports.',
      features: ['Master, VIP, Double & Twin cabins, each en-suite', 'Main salon', 'Spacious flybridge', 'Jetski included', 'Water sports available'],
      decks: [
        { name: 'Flybridge', detail: 'Open-air seating with helm station and skyline views.' },
        { name: 'Main Deck', detail: 'Main salon and galley area.' },
        { name: 'Lower Deck', detail: 'Master, VIP, double, and twin cabins, each with en-suite bathroom.' }
      ]
    },
    {
      id: 'carmen-140',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip Carmen 140',
      tagline: 'A Mega Yacht Escape on the Water',
      pricePerHour: 10000,
      guests: 80,
      cabins: 5,
      washrooms: 5, // TODO: assumed 1 per cabin — not stated in source brochure, needs client confirmation
      length: 140,
      crew: 5,
      // TODO — IMAGE SOURCING FLAG: photos below were extracted from a client-supplied PDF that
      // is a generic "Really Great Site" (Canva) yacht-brochure template, not a client photoshoot.
      // Confirm with the client whether these are actually photos of their Vip Carmen 140 or stock/template
      // imagery before this goes live — same watermark/stock concern as the FLAGGED- assets.
      image: 'images/yacht-carmen-140-hero.jpg',
      gallery: [
        'images/yacht-carmen-140-exterior-1.jpg',
        'images/yacht-carmen-140-salon.jpg',
        'images/yacht-carmen-140-helm.jpg',
        'images/yacht-carmen-140-dining.jpg',
        'images/yacht-carmen-140-bar.jpg',
        'images/yacht-carmen-140-master-cabin.jpg',
        'images/yacht-carmen-140-vip-cabin.jpg',
        'images/yacht-carmen-140-guest-cabin.jpg',
        'images/yacht-carmen-140-bathroom.jpg',
        'images/yacht-carmen-140-jacuzzi.jpg',
        'images/yacht-carmen-140-flybridge.jpg',
        'images/yacht-carmen-140-upper-lounge.jpg'
      ],
      description: 'A 140-ft mega yacht offering a huge, elegantly designed saloon and capacity for 80 guests, delivering a grand-scale luxury escapade at sea.',
      overview: 'Vip Carmen 140 accommodates up to 80 guests for day charters, with 5 guest cabins including a master bedroom with panoramic mid-sea views. A wraparound main saloon anchors the interior, complemented by a formal dining area, stocked bar counter, and multi-helm bridge. The middle-deck jacuzzi and open flybridge lounge offer additional entertaining space, with a second upper-deck lounge for large groups.',
      features: ['5 guest cabins', 'Master bedroom with panoramic sea views', 'Huge main saloon', 'Formal dining area', 'Stocked bar counter', 'Middle-deck jacuzzi', 'Open flybridge lounge', 'Second upper-deck lounge'],
      decks: [
        { name: 'Flybridge', detail: 'Open-air lounge seating with marina and skyline views.' },
        { name: 'Upper Deck', detail: 'Second lounge with wraparound seating.' },
        { name: 'Main Deck', detail: 'Grand saloon, formal dining area, and bar counter.' },
        { name: 'Middle Deck', detail: 'Jacuzzi with sea views.' },
        { name: 'Lower Deck', detail: '5 guest cabins including master bedroom, each with en-suite bathroom.' }
      ]
    },
    {
      id: 'benetti-100',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Vip Benetti 100',
      tagline: 'A New Addition to the Fleet',
      pricePerHour: 12000,
      guests: 50,
      cabins: 4,
      washrooms: null, // TODO: not yet provided — needs client input
      length: 110,
      crew: 5,
      image: 'images/yacht-benetti-100-hero.jpg',
      gallery: [
        'images/yacht-benetti-100-salon.jpg',
        'images/yacht-benetti-100-aft-deck.jpg',
        'images/yacht-benetti-100-bathroom.jpg',
        'images/yacht-benetti-100-galley.jpg',
        'images/yacht-benetti-100-stern.jpg',
        'images/yacht-benetti-100-salon-panorama.jpg',
        'images/yacht-benetti-100-master-cabin.jpg',
        'images/yacht-benetti-100-exterior-1.jpg',
        'images/yacht-benetti-100-bow.jpg',
        'images/yacht-benetti-100-exterior-2.jpg',
        'images/yacht-benetti-100-corridor.jpg',
        'images/yacht-benetti-100-aft-lounge.jpg',
        'images/yacht-benetti-100-flybridge.jpg'
      ],
      description: 'A 110ft Benetti superyacht with capacity for 50 guests, featuring high-end interiors and full crew service, built for large gatherings from birthday parties to corporate events.',
      overview: 'Vip Benetti 100 is built for ultimate performance and perfect for large gatherings — whether it\'s a birthday party, a corporate event, a wedding celebration, or a cruise with friends. The yacht\'s high-end interiors feature premium furnishings and full crew service, catering to your every need throughout the journey. Guests can enjoy gourmet meals, sip on refreshing drinks, and take in the beautiful scenery in a relaxed, elegant setting. For those who love adventure, the yacht also offers exciting water activities — swim, snorkel, or simply relax on deck while soaking in the sun. With its smooth cruising experience and world-class hospitality, Vip Benetti 100 guarantees an unforgettable voyage on the waters of Dubai.',
      features: ['Spacious layout for large gatherings & events', 'High-end interiors with premium furnishings', 'Full crew service throughout the charter', 'Gourmet catering & refreshments on board', 'Swimming & snorkeling water activities', 'Smooth, stable cruising experience', '4 guest cabins'],
      decks: [
        { name: 'Main Deck', detail: 'Elegant saloon and dining area with premium interiors, ideal for gourmet dining and entertaining.' },
        { name: 'Upper Deck & Flybridge', detail: 'Open-air lounge and sun deck for soaking in the views.' },
        { name: 'Lower Deck', detail: '4 guest cabins with full crew service throughout your charter.' }
      ]
    },
    {
      id: 'aarna-90',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip Aarna 91',
      tagline: 'Sunseeker Elegance, Refit for 2023',
      pricePerHour: null, // Price on Request
      guests: 8,
      cabins: 4,
      washrooms: 4, // TODO: assumed 1 per cabin — not stated in source brochure, needs client confirmation
      length: 91,
      crew: 5,
      image: 'images/yacht-aarna-90-exterior-1.jpg',
      gallery: [
        'images/yacht-aarna-90-exterior-1.jpg',
        'images/yacht-aarna-90-foredeck.jpg',
        'images/yacht-aarna-90-aft-dining.jpg',
        'images/yacht-aarna-90-dining-spread.jpg',
        'images/yacht-aarna-90-grill.jpg',
        'images/yacht-aarna-90-flybridge-lounge.jpg',
        'images/yacht-aarna-90-sundeck-lounge.jpg',
        'images/yacht-aarna-90-main-salon.jpg',
        'images/yacht-aarna-90-dining-table.jpg',
        'images/yacht-aarna-90-bar.jpg',
        'images/yacht-aarna-90-staircase.jpg',
        'images/yacht-aarna-90-master-cabin.jpg'
      ],
      description: 'A 91-ft Sunseeker built in 2009 and refit in 2023, Vip Aarna 91 pairs a striking dark hull with warm, classic wood interiors for an elegant charter experience.',
      overview: 'Vip Aarna 91 accommodates up to 8 guests in 4 cabins (2 double, 2 twin), supported by a crew of 5. Twin MTU 12 V2000 M93 engines power her, and the deck spaces are set up for gourmet alfresco dining, with a built-in grill and a well-stocked bar.',
      features: ['4 cabins (2 double, 2 twin)', 'Crew of 5', 'Onboard grill', 'Alfresco dining areas', 'Stocked bar', 'Twin MTU engines', '2023 refit'],
      decks: [
        { name: 'Flybridge', detail: 'Shaded lounge seating with bar and skyline views.' },
        { name: 'Upper Deck', detail: 'Aft dining area and open sundeck.' },
        { name: 'Main Deck', detail: 'Main salon and formal dining table.' },
        { name: 'Lower Deck', detail: '4 cabins (2 double, 2 twin), each with en-suite bathroom.' }
      ]
    },
    {
      id: 'princess-x95',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip Princess X95',
      tagline: 'Closer to a Superyacht Than Her Class',
      pricePerHour: 15000,
      guests: 12,
      cabins: '4–5',
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 95,
      crew: 4,
      image: 'images/yacht-princess-x95-exterior-1.jpg',
      gallery: [
        'images/yacht-princess-x95-exterior-1.jpg',
        'images/yacht-princess-x95-aft-cockpit.jpg',
        'images/yacht-princess-x95-interior-collage-1.jpg',
        'images/yacht-princess-x95-interior-collage-2.jpg',
        'images/yacht-princess-x95-bathroom.jpg',
        'images/yacht-princess-x95-interior-collage-3.jpg',
        'images/yacht-princess-x95-exterior-side.jpg'
      ],
      description: 'Charter the ultimate in style, space and innovation aboard this 2023 Vip Princess X95, delivering an exceptional cruising experience with expansive volumes, refined design, and effortless comfort.',
      overview: 'The Vip Princess X95 welcomes up to 12 guests for day charters and sleeps 10, with generous indoor and outdoor areas for relaxation and entertaining. The main deck saloon is filled with natural light through floor-to-ceiling windows, flowing into the aft cockpit lounge, while the flybridge offers multiple seating and sunbathing zones for alfresco dining and sunset cruises.',
      features: ['Floor-to-ceiling saloon windows', 'Aft cockpit lounge', 'Flybridge dining and sunbathing zones', 'Contemporary interiors', 'Sleeps 10 overnight'],
      decks: [
        { name: 'Flybridge', detail: 'Multiple seating and sunbathing zones for alfresco dining and sunset cruises.' },
        { name: 'Main Deck', detail: 'Light-filled saloon flowing into the aft cockpit lounge.' },
        { name: 'Lower Deck', detail: 'Guest cabins, sleeps up to 10 overnight.' }
      ]
    },
    {
      id: 'thunder-49m',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip Thunder 50',
      tagline: 'A 49m Superyacht by Oceanfast',
      pricePerHour: 18000,
      guests: 12,
      cabins: '5–6',
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 164,
      crew: 5,
      image: 'images/yacht-thunder-49m-exterior-1.jpg',
      gallery: [
        'images/yacht-thunder-49m-exterior-1.jpg',
        'images/yacht-thunder-49m-aerial-pool.jpg',
        'images/yacht-thunder-49m-foredeck-pool.jpg',
        'images/yacht-thunder-49m-sundeck-lounge.jpg',
        'images/yacht-thunder-49m-dining-room.jpg',
        'images/yacht-thunder-49m-lounge.jpg',
        'images/yacht-thunder-49m-master-suite.jpg',
        'images/yacht-thunder-49m-master-bathroom.jpg',
        'images/yacht-thunder-49m-guest-cabin-1.jpg',
        'images/yacht-thunder-49m-guest-cabin-2.jpg',
        'images/yacht-thunder-49m-pool-deck.jpg'
      ],
      description: 'THUNDER is a 49m superyacht built in Australia by Oceanfast, with striking looks and interior spaces designed by Roberto Cavalli and Jon Bannenberg, and a magnificent heated pool on the foredeck.',
      overview: 'Vip Thunder 50 reaches a top speed of 40.0 knots, cruises at 30.0 knots, and has a maximum cruising range of 1000nm at 18.0 knots, with power from MTU CODAG engines. Her onboard facilities are rivalled only by her striking Roberto Cavalli and Jon Bannenberg-designed interiors, headlined by a heated pool on the foredeck.',
      features: ['Heated foredeck pool', 'Roberto Cavalli & Jon Bannenberg interior design', 'MTU CODAG engines', '40-knot top speed', 'Gross tonnage 445 GT'],
      decks: [
        { name: 'Sundeck', detail: 'Heated foredeck pool with surrounding lounge seating.' },
        { name: 'Upper Deck', detail: 'Formal dining room and lounge.' },
        { name: 'Main Deck', detail: 'Master suite and guest cabins.' }
      ]
    },
    {
      id: 'khalili',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip Khalili',
      tagline: 'A Refined Superyacht Charter',
      pricePerHour: 10000,
      guests: 40,
      cabins: 4,
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 107,
      crew: 5,
      image: 'images/yacht-khalili-exterior-1.jpg',
      gallery: [
        'images/yacht-khalili-exterior-1.jpg',
        'images/yacht-khalili-exterior-2.jpg',
        'images/yacht-khalili-exterior-front.jpg',
        'images/yacht-khalili-exterior-aft.jpg',
        'images/yacht-khalili-sundeck-lounge.jpg',
        'images/yacht-khalili-cabin-1.jpg',
        'images/yacht-khalili-twin-cabin.jpg',
        'images/yacht-khalili-cabin-2.jpg',
        'images/yacht-khalili-lounge-1.jpg',
        'images/yacht-khalili-lounge-2.jpg',
        'images/yacht-khalili-lounge-tv.jpg',
        'images/yacht-khalili-bar.jpg',
        'images/yacht-khalili-outdoor-dining.jpg',
        'images/yacht-khalili-deck-seating.jpg',
        'images/yacht-khalili-deck-lounge-2.jpg',
        'images/yacht-khalili-flybridge-bar.jpg',
        'images/yacht-khalili-flybridge-dining.jpg'
      ],
      description: 'Vip Khalili is a refined superyacht offering spacious lounge interiors, a fully stocked entertainment lounge with games and a large screen, and multiple outdoor deck areas for dining and relaxing.',
      overview: 'Vip Khalili features an expansive main salon with wraparound seating and formal dining, plus a lower-deck entertainment lounge complete with a large screen, chess and backgammon tables, and a full bar spread. Outdoor deck space includes a shaded aft lounge, an open sundeck bar, and multiple dining and seating areas with skyline and sea views.',
      features: ['Entertainment lounge with large screen', 'Chess and backgammon tables', 'Full bar spread', 'Multiple outdoor dining areas', 'Twin and double cabins'],
      decks: [
        { name: 'Sundeck', detail: 'Open bar, dining, and lounge seating.' },
        { name: 'Upper Deck', detail: 'Shaded aft lounge with dining and seating.' },
        { name: 'Main Deck', detail: 'Main salon, formal dining, and entertainment lounge.' },
        { name: 'Lower Deck', detail: 'Twin and double cabins.' }
      ]
    },
    {
      id: 'sanlorenzo-sx88',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip San Lorenzo 88',
      tagline: 'Italian Design, Dubai Skyline',
      pricePerHour: null, // Price on Request
      guests: 12,
      cabins: 4,
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 88,
      crew: 4,
      image: 'images/yacht-sanlorenzo-sx88-hero.jpg',
      gallery: ['images/yacht-sanlorenzo-sx88-exterior.jpg', 'images/yacht-sanlorenzo-sx88-interior.jpg'],
      description: 'Experience unmatched luxury aboard the Vip San Lorenzo 88, a masterpiece of Italian yacht design with expansive indoor and outdoor living spaces.',
      overview: 'The Vip San Lorenzo 88 boasts a spacious salon with panoramic views, a fully equipped galley, and beautifully designed cabins accommodating up to eight guests in ultimate comfort. The vast aft deck and swim platform provide the perfect setting for sunbathing or diving into Dubai\'s crystal-clear waters, while advanced onboard technology ensures a seamless cruising experience.',
      features: ['Panoramic-view salon', 'Fully equipped galley', 'Vast aft deck & swim platform', 'Advanced onboard technology', 'Accommodates up to 8 guests'],
      decks: [
        { name: 'Upper Deck', detail: 'Open-air lounge and dining with skyline views.' },
        { name: 'Main Deck', detail: 'Panoramic salon and aft dining area.' },
        { name: 'Lower Deck', detail: 'Guest cabins accommodating up to 8 guests.' }
      ]
    },
    {
      id: 'fynesse',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip Fynesse',
      tagline: 'Classic Superyacht, Dubai Waters',
      pricePerHour: null, // Price on Request
      guests: null, // TODO: not stated in source brochure — needs client input
      cabins: null, // TODO: not stated in source brochure — needs client input
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: null, // TODO: not stated in source brochure — needs client input
      crew: 4,
      image: 'images/yacht-fynesse-hero.jpg',
      gallery: ['images/yacht-fynesse-exterior.jpg', 'images/yacht-fynesse-interior.jpg'],
      description: 'Vip Fynesse is a classic tri-deck superyacht offering a spacious sundeck jacuzzi, wraparound lounge seating, and an elegant formal dining room, cruising against Dubai\'s iconic skyline.',
      overview: 'Vip Fynesse features a sundeck jacuzzi with shaded lounge seating, an upper-deck lounge bar with wraparound seating, and a main-deck formal dining room seating large groups in style. Cabins are finished with classic furnishings for a refined charter experience.',
      features: ['Sundeck jacuzzi with shade canopy', 'Upper-deck lounge bar', 'Formal dining room', 'Wraparound outdoor seating', 'Classic tri-deck styling'],
      decks: [
        { name: 'Sundeck', detail: 'Shaded jacuzzi and lounge seating.' },
        { name: 'Upper Deck', detail: 'Lounge bar with wraparound seating.' },
        { name: 'Main Deck', detail: 'Formal dining room and salon.' }
      ]
    },
    {
      id: 'matrix',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip Matrix',
      tagline: 'Sleek Sport Cruiser',
      pricePerHour: 5500,
      guests: 30,
      cabins: 4,
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 82,
      crew: 3,
      image: 'images/yacht-matrix-hero.jpg',
      gallery: ['images/yacht-matrix-exterior.jpg', 'images/yacht-matrix-interior.jpg'],
      description: 'Vip Matrix is a striking black-hulled sport yacht cruising Dubai\'s waters, featuring a sleek flybridge, an open aft deck dining area, and a bright, contemporary main salon.',
      overview: 'Vip Matrix pairs an aggressive black hull with an open flybridge helm and lounge seating, a teak-decked aft cockpit set for alfresco dining, and a light-filled main salon with wraparound seating. Cabins offer twin and double configurations with en-suite bathrooms.',
      features: ['Flybridge helm & lounge seating', 'Teak aft cockpit dining', 'Contemporary main salon', 'Twin & double cabins', 'Striking black hull'],
      decks: [
        { name: 'Flybridge', detail: 'Helm station with open-air lounge seating.' },
        { name: 'Main Deck', detail: 'Salon, dining, and aft cockpit lounge.' },
        { name: 'Lower Deck', detail: 'Twin and double cabins, each with en-suite bathroom.' }
      ]
    },
    {
      id: 'encore',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip Encore 140',
      tagline: '140ft Tri-Deck Super Yacht',
      pricePerHour: 15000,
      guests: 30, // per source brochure: up to 30 guests
      cabins: 5, // per source brochure: 5 cabins (1 owner, 2 VIP, 2 double)
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 140,
      crew: 5,
      image: 'images/yacht-encore-hero.jpg',
      gallery: ['images/yacht-encore-exterior.jpg', 'images/yacht-encore-interior.jpg'],
      description: 'Vip Encore 140 is a 140ft tri-deck superyacht with a fully private owner\'s deck, a dedicated sky lounge, and timeless styling with beautiful furnishings throughout.',
      overview: 'Vip Encore 140\'s 100% owner\'s deck offers a fully private salon and forward jacuzzi pool deck, isolated from cameras for total privacy. Five cabins accommodate up to 12 guests overnight (1 owner, 2 VIP, 2 double), while the prized sky lounge offers a relaxed space for cocktails and entertaining. She can carry up to 10 crew and up to 30 guests for day charters, with 7-star hospitality service throughout.',
      features: ['100% private owner\'s deck with forward jacuzzi', 'Dedicated sky lounge', '5 cabins: 1 owner, 2 VIP, 2 double', 'Formal dining room', '7-star hospitality service', 'Carries up to 10 crew'],
      decks: [
        { name: 'Owner\'s Deck', detail: 'Fully private salon and forward jacuzzi pool deck, isolated from cameras.' },
        { name: 'Sky Lounge', detail: 'Relaxed space for cocktails and entertaining with ocean views.' },
        { name: 'Main Deck', detail: 'Formal dining room and salon.' },
        { name: 'Lower Deck', detail: '5 cabins: 1 owner, 2 VIP, 2 double, sleeping up to 12 guests.' }
      ]
    },
    {
      id: 'notika',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Vip Notika',
      tagline: 'Sport Yacht Charter',
      pricePerHour: null, // Price on Request
      guests: 12,
      cabins: 4,
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 107,
      crew: 4,
      image: 'images/yacht-notika-hero.jpg',
      gallery: ['images/yacht-notika-exterior.jpg', 'images/yacht-notika-interior.jpg'],
      description: 'Vip Notika is a sleek sport yacht offering a spacious sundeck lounge, an open flybridge dining and bar area, and a comfortable main salon set up for entertaining.',
      overview: 'Vip Notika\'s sundeck lounge and flybridge dining/bar area give guests multiple spaces to relax and entertain, while the main salon and formal dining area provide comfortable indoor space with sea views. Cabins offer double and twin configurations with en-suite bathrooms.',
      features: ['Sundeck lounge seating', 'Flybridge dining and bar', 'Main salon with sea views', 'Formal dining area', 'Double & twin cabins'],
      decks: [
        { name: 'Flybridge', detail: 'Open-air dining and bar area with lounge seating.' },
        { name: 'Main Deck', detail: 'Salon and formal dining area.' },
        { name: 'Lower Deck', detail: 'Double and twin cabins, each with en-suite bathroom.' }
      ]
    }
  ];

  /* =========================================================
     2b. SPEED BOATS — SINGLE SOURCE OF TRUTH
     A separate category from the yacht fleet (day charters /
     quick rides rather than full yacht hire). Reuses the same
     card/detail rendering helpers as YACHTS where the shapes
     overlap (image, name, pricePerHour, etc.).
     ========================================================= */
  var SPEEDBOATS = [
    {
      id: 'speedboat-42',
      name: '42 FT Speed Boat',
      tagline: 'High-Speed Thrills on Dubai\'s Waters',
      pricePerHour: 350,
      guests: null, // TODO: not yet provided — needs client input
      length: 42,
      image: 'images/speedboat-42-hero.jpg',
      description: 'Experience high-speed thrills with our speed boat rentals — perfect for quick coastal cruises, sightseeing, and water adventures.',
      overview: 'Experience high-speed thrills with our speed boat rentals — perfect for quick coastal cruises, sightseeing, and water adventures. Enjoy comfort, safety, and stunning views with every ride.'
    }
  ];

  /* =========================================================
     3. PACKAGES & ADD-ONS — SINGLE SOURCE OF TRUTH
     ========================================================= */
  var PACKAGES = [
    { id: 'sunset-cruise', name: 'Sunset Cruise', hours: 2, price: 15000, popular: false, description: 'A short, golden-hour cruise along the Marina skyline. Ideal for couples or a quick celebration.' },
    { id: 'half-day', name: 'Half Day', hours: 4, price: 30000, popular: false, description: 'Four hours on the water, enough time to swim, anchor up for lunch, and cruise the coastline at a relaxed pace.' },
    { id: 'full-day', name: 'Full Day', hours: 8, price: 55000, popular: true, description: 'A full day at sea with time to explore further out, anchor for extended swimming, and enjoy an unhurried onboard lunch.' },
    { id: 'overnight', name: 'Overnight', hours: 24, price: 90000, popular: false, description: 'A full 24 hours onboard, including an overnight anchorage, for guests who want the complete live-aboard experience.' }
  ];

  var ADDONS = [
    { id: 'bbq-meal', name: 'BBQ / Premium Meal', price: 5000, description: 'A grilled onboard menu prepared and served by our crew.' },
    { id: 'birthday-decor', name: 'Birthday Decoration', price: 3000, description: 'Balloons, banner, and table styling for onboard celebrations.' },
    { id: 'dj-system', name: 'DJ System', price: 4000, description: 'Professional sound system with a curated playlist or live DJ on request.' },
    { id: 'photographer', name: 'Photographer', price: 6000, description: 'A dedicated photographer for up to two hours of your charter.' },
    { id: 'jet-ski', name: 'Jet Ski', price: 8000, description: 'One jet ski with fuel, included for the duration of your charter.' },
    { id: 'banana-ride', name: 'Banana Ride', price: null, description: 'An inflatable banana boat ride towed behind the yacht — a fun, high-energy activity for groups.' } // TODO: price not yet provided — needs client input
  ];

  // Booking and payment are handled over WhatsApp, not through the site —
  // two numbers so there's a fallback if one is unreachable. Digits-only
  // form is what wa.me links require; the display form is for showing to
  // guests (tel: links, footer, contact page).
  var WHATSAPP_NUMBERS = [
    { digits: '971544033888', display: '+971 54 403 3888' },
    { digits: '971545763101', display: '+971 54 576 3101' }
  ];

  // Google Apps Script Web App URL that logs each booking as a row in a
  // Google Sheet — this is what makes the booking reference a real,
  // persistent record instead of just text in a WhatsApp message. Set this
  // after deploying the Apps Script (see setup instructions). Left blank,
  // logging is silently skipped and the site still works exactly as before.
  var SHEET_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzt0kIXA6TC6o1khSINsGigbFnECMEAJAnEa3Ls-n3agYd1WKxgNEwc6tH-j4rGIFVXPg/exec';
  // Matches the SHARED_TOKEN constant in the Apps Script — a light deterrent
  // against random internet bots spamming the sheet via a leaked/guessed URL.
  var SHEET_WEBHOOK_TOKEN = 'vy-booking-2026';

  // Expose to other scripts on the page (booking flow, admin, etc.)
  window.VIPYachts = {
    YACHTS: YACHTS,
    SPEEDBOATS: SPEEDBOATS,
    PACKAGES: PACKAGES,
    ADDONS: ADDONS,
    WHATSAPP_NUMBERS: WHATSAPP_NUMBERS,
    BASE: BASE,
    // Same Apps Script Web App used for logging bookings also backs the real
    // admin login + dashboard data (see google-apps-script/booking-backend.gs).
    SHEET_WEBHOOK_URL: SHEET_WEBHOOK_URL
  };

  /* =========================================================
     4. UTILITIES
     ========================================================= */
  function formatAED(amount) {
    return 'AED ' + Number(amount).toLocaleString('en-US');
  }
  window.VIPYachts.formatAED = formatAED;

  // Some yachts are priced "on request" rather than a fixed hourly rate (see
  // pricePerHour: null entries in the YACHTS list above). Rendering "AED 0 /
  // hr" for those would look like a pricing bug, so every price display
  // should go through this instead of calling formatAED directly on a
  // yacht's pricePerHour.
  function formatYachtPrice(amount) {
    return amount ? formatAED(amount) + ' / hr' : 'Price on Request';
  }
  window.VIPYachts.formatYachtPrice = formatYachtPrice;

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  // Escapes free-text values (customer-entered booking details, form fields)
  // before they're concatenated into innerHTML strings elsewhere on the site.
  // Without this, a name/phone/etc. containing HTML would be parsed as markup
  // instead of displayed as text.
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  window.VIPYachts.escapeHtml = escapeHtml;

  function getYachtById(id) {
    return YACHTS.filter(function (y) { return y.id === id; })[0] || null;
  }
  window.VIPYachts.getYachtById = getYachtById;

  function getPackageById(id) {
    return PACKAGES.filter(function (p) { return p.id === id; })[0] || null;
  }
  window.VIPYachts.getPackageById = getPackageById;

  function generateBookingReference() {
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var ref = 'VY-';
    for (var i = 0; i < 6; i++) {
      ref += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return ref;
  }
  window.VIPYachts.generateBookingReference = generateBookingReference;

  // A yacht with no image/gallery yet (image: '') has genuinely never had a
  // photo supplied — that's different from a real photo file 404ing, so it
  // gets its own honest placeholder instead of an <img> tag that's certain
  // to fail. Yachts that DO have a path still go through <img>+onerror, in
  // case that specific file is ever temporarily unavailable.
  function yachtCardMediaHtml(yacht, altSuffix) {
    if (!yacht.image) {
      return '<div class="img-fallback">Images will be uploaded soon</div>';
    }
    var alt = yacht.name + (altSuffix || '');
    var escapedName = yacht.name.replace(/'/g, "\\'");
    return '<img src="' + BASE + yacht.image + '" alt="' + alt + '" ' +
      'onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'img-fallback\',textContent:\'' + escapedName + '\'}))">';
  }
  window.VIPYachts.yachtCardMediaHtml = yachtCardMediaHtml;

  // Several yachts have unconfirmed specs (see TODOs in the YACHTS list above)
  // — rendering those fields directly would print the literal word "null".
  function formatSpec(value, suffix) {
    return (value === null || value === undefined || value === '') ? '—' : value + (suffix || '');
  }
  window.VIPYachts.formatSpec = formatSpec;

  // Yacht listings (fleet, booking, admin) show smallest-to-largest by
  // length within each tier — Classic yachts before Premium, and within
  // each tier the shortest boat first. A yacht with no confirmed length
  // yet sorts to the end of its tier rather than implying it's the
  // smallest. Returns a new sorted array; never mutates the input.
  function sortYachtsByLength(yachts) {
    function tierRank(tier) { return tier === 'classic' ? 0 : 1; }
    return yachts.slice().sort(function (a, b) {
      var tierDiff = tierRank(a.tier) - tierRank(b.tier);
      if (tierDiff !== 0) return tierDiff;
      var la = (a.length === null || a.length === undefined) ? Infinity : a.length;
      var lb = (b.length === null || b.length === undefined) ? Infinity : b.length;
      return la - lb;
    });
  }
  window.VIPYachts.sortYachtsByLength = sortYachtsByLength;

  function whatsappLink(digits, message) {
    return 'https://wa.me/' + digits + (message ? '?text=' + encodeURIComponent(message) : '');
  }
  window.VIPYachts.whatsappLink = whatsappLink;

  // Fire-and-forget: logs a booking to the Google Sheet backing
  // SHEET_WEBHOOK_URL. Never blocks or breaks the booking flow — if the URL
  // isn't configured, or the request fails for any reason (offline, sheet
  // misconfigured, etc.), the WhatsApp handoff (the actual source of truth)
  // still works exactly the same either way.
  function logBookingToSheet(fields) {
    if (!SHEET_WEBHOOK_URL) return;
    try {
      var body = new URLSearchParams(Object.assign({ action: 'logBooking', token: SHEET_WEBHOOK_TOKEN }, fields));
      // mode: 'no-cors' sidesteps CORS entirely for this write-only call —
      // Apps Script Web Apps don't reliably send the CORS headers needed
      // for the browser to read a response, so this doesn't try to.
      fetch(SHEET_WEBHOOK_URL, { method: 'POST', mode: 'no-cors', body: body }).catch(function () {});
    } catch (e) { /* logging is best-effort only */ }
  }
  window.VIPYachts.logBookingToSheet = logBookingToSheet;

  /* =========================================================
     5. HEADER + FOOTER TEMPLATES
     ========================================================= */
  function buildHeader() {
    var navItems = [
      { href: 'index', label: 'Home', key: 'index' },
      {
        label: 'Yachts',
        key: 'yachts-menu',
        activeKeys: ['fleet', 'speedboats'],
        children: [
          { href: 'pages/speedboats', label: 'Speed Boat', key: 'speedboats' },
          { href: 'pages/fleet?tier=classic', label: 'Classic Yacht', key: 'fleet' },
          { href: 'pages/fleet?tier=premium', label: 'Premium Yacht', key: 'fleet' }
        ]
      },
      { href: 'pages/packages', label: 'Packages', key: 'packages' },
      { href: 'pages/experiences', label: 'Experiences', key: 'experiences' },
      { href: 'pages/gallery', label: 'Gallery', key: 'gallery' },
      { href: 'pages/about', label: 'About', key: 'about' },
      { href: 'pages/contact', label: 'Contact', key: 'contact' }
    ];

    var caretSvg = '<svg class="nav-caret" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    var linksHtml = navItems.map(function (item) {
      if (item.children) {
        var menuActive = item.activeKeys.indexOf(CURRENT_PAGE) > -1 ? ' is-active' : '';
        var subHtml = item.children.map(function (c) {
          return '<a href="' + BASE + c.href + '">' + c.label + '</a>';
        }).join('');
        return (
          '<div class="nav-dropdown">' +
            '<button type="button" class="nav-dropdown-toggle' + menuActive + '" aria-expanded="false">' + item.label + caretSvg + '</button>' +
            '<div class="nav-dropdown-menu">' + subHtml + '</div>' +
          '</div>'
        );
      }
      var href = BASE + item.href;
      var active = CURRENT_PAGE === item.key ? ' is-active' : '';
      var ariaCurrent = CURRENT_PAGE === item.key ? ' aria-current="page"' : '';
      return '<a href="' + href + '" class="' + active.trim() + '"' + ariaCurrent + '>' + item.label + '</a>';
    }).join('');

    var mobileLinksHtml = navItems.map(function (item, i) {
      var delay = ' style="transition-delay:' + (i * 0.04) + 's"';
      if (item.children) {
        var menuActive = item.activeKeys.indexOf(CURRENT_PAGE) > -1 ? ' is-active' : '';
        var subHtml = item.children.map(function (c) {
          return '<a href="' + BASE + c.href + '" class="mobile-submenu-link">' + c.label + '</a>';
        }).join('');
        return (
          '<div class="mobile-nav-group"' + delay + '>' +
            '<button type="button" class="mobile-nav-toggle' + menuActive + '" aria-expanded="false">' + item.label + caretSvg + '</button>' +
            '<div class="mobile-submenu">' + subHtml + '</div>' +
          '</div>'
        );
      }
      var href = BASE + item.href;
      var active = CURRENT_PAGE === item.key ? ' is-active' : '';
      var ariaCurrent = CURRENT_PAGE === item.key ? ' aria-current="page"' : '';
      return '<a href="' + href + '" class="' + active.trim() + '"' + ariaCurrent + delay + '>' + item.label + '</a>';
    }).join('');

    var header = document.createElement('header');
    header.className = 'site-header';
    header.id = 'site-header';
    header.innerHTML =
      '<div class="container">' +
        '<a href="' + BASE + 'index" class="brand" aria-label="VIP Yachts home">' +
          '<img src="' + BASE + 'images/favicon.png" alt="VIP Yachts logo" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'brand-fallback\',textContent:\'VY\'}))">' +
          '<span>VIP Yachts</span>' +
        '</a>' +
        '<nav class="main-nav" aria-label="Primary">' +
          '<div class="nav-links">' + linksHtml + '</div>' +
        '</nav>' +
        '<div class="header-cta">' +
          '<a href="' + BASE + 'pages/booking" class="btn btn-outline">Book Now</a>' +
          '<button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav">' +
            '<span></span><span></span><span></span>' +
          '</button>' +
        '</div>' +
      '</div>';

    var mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobile-nav';
    mobileNav.setAttribute('role', 'dialog');
    mobileNav.setAttribute('aria-modal', 'true');
    mobileNav.setAttribute('aria-label', 'Mobile navigation');
    mobileNav.innerHTML = mobileLinksHtml + '<a href="' + BASE + 'pages/booking" class="btn btn-gold" style="transition-delay:' + (navItems.length * 0.04) + 's">Book Now</a>';

    document.body.insertBefore(mobileNav, document.body.firstChild);
    document.body.insertBefore(header, document.body.firstChild);

    // Scroll transition (skip on pages without a transparent hero — header still works, just always solid via CSS if not home)
    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else if (qs('.hero')) {
        header.classList.remove('is-scrolled');
      }
    }
    if (!qs('.hero')) {
      header.classList.add('is-scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Desktop "Yachts" dropdown
    qsa('.nav-dropdown', header).forEach(function (dropdown) {
      var btn = qs('.nav-dropdown-toggle', dropdown);
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = dropdown.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    });
    document.addEventListener('click', function () {
      qsa('.nav-dropdown.is-open', header).forEach(function (d) {
        d.classList.remove('is-open');
        qs('.nav-dropdown-toggle', d).setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        qsa('.nav-dropdown.is-open', header).forEach(function (d) {
          d.classList.remove('is-open');
          qs('.nav-dropdown-toggle', d).setAttribute('aria-expanded', 'false');
        });
      }
    });

    // Mobile "Yachts" accordion
    qsa('.mobile-nav-toggle', mobileNav).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var group = btn.closest('.mobile-nav-group');
        var isOpen = group.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });
    });

    // Hamburger toggle
    var toggle = qs('#nav-toggle');
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile nav on link click or Escape
    qsa('a', mobileNav).forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        mobileNav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
        document.body.style.overflow = '';
      }
    });
  }

  function buildFooter() {
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          '<div class="footer-brand">' +
            '<a href="' + BASE + 'index" class="brand" aria-label="VIP Yachts home">' +
              '<img src="' + BASE + 'images/favicon.png" alt="VIP Yachts logo" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'brand-fallback\',textContent:\'VY\'}))">' +
              '<span>VIP Yachts</span>' +
            '</a>' +
            '<p>Premium yacht charters from Dubai Marina and Dubai Harbour, built around effortless service and an unforgettable time on the water.</p>' +
            '<div class="footer-social">' +
              '<a href="https://www.instagram.com/vipyacht.dxb" target="_blank" rel="noopener" aria-label="VIP Yachts on Instagram">' +
                '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.9 0-184.9zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>' +
              '</a>' +
              '<a href="https://facebook.com" target="_blank" rel="noopener" aria-label="VIP Yachts on Facebook">' +
                '<svg viewBox="0 0 320 512" aria-hidden="true"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>' +
              '</a>' +
              '<a href="' + whatsappLink(WHATSAPP_NUMBERS[0].digits) + '" target="_blank" rel="noopener" aria-label="Message VIP Yachts on WhatsApp">' +
                '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.61 1.908 6.482L4 29l7.716-1.878A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm6.98 16.87c-.297.836-1.47 1.53-2.408 1.73-.64.136-1.475.245-4.29-.922-3.602-1.492-5.92-5.14-6.1-5.38-.177-.24-1.457-1.94-1.457-3.7 0-1.76.92-2.62 1.246-2.98.326-.36.71-.45.947-.45.237 0 .474.002.68.012.218.01.51-.083.798.608.297.71.998 2.454 1.086 2.633.088.18.147.39.03.63-.118.24-.177.39-.353.6-.177.21-.372.47-.532.63-.177.177-.362.368-.155.723.207.355.92 1.518 1.976 2.46 1.358 1.212 2.503 1.588 2.858 1.766.355.177.562.148.77-.09.207-.24.887-1.035 1.124-1.39.237-.355.474-.296.798-.178.325.118 2.06.972 2.413 1.148.354.177.59.266.68.414.088.148.088.856-.208 1.69z"/></svg>' +
              '</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Explore</h4>' +
            '<ul>' +
              '<li><a href="' + BASE + 'pages/fleet">Our Yachts</a></li>' +
              '<li><a href="' + BASE + 'pages/speedboats">Speed Boats</a></li>' +
              '<li><a href="' + BASE + 'pages/packages">Packages</a></li>' +
              '<li><a href="' + BASE + 'pages/experiences">Experiences</a></li>' +
              '<li><a href="' + BASE + 'pages/gallery">Gallery</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Company</h4>' +
            '<ul>' +
              '<li><a href="' + BASE + 'pages/about">About Us</a></li>' +
              '<li><a href="' + BASE + 'pages/faq">FAQs</a></li>' +
              '<li><a href="' + BASE + 'pages/contact">Contact</a></li>' +
              '<li><a href="' + BASE + 'pages/booking">Book Now</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Dubai Marina & Dubai Harbour</h4>' +
            '<address>' +
              '<span>Dubai Marina & Dubai Harbour, Dubai, UAE</span>' +
              '<span><a href="tel:+' + WHATSAPP_NUMBERS[0].digits + '">' + WHATSAPP_NUMBERS[0].display + '</a> / <a href="tel:+' + WHATSAPP_NUMBERS[1].digits + '">' + WHATSAPP_NUMBERS[1].display + '</a></span>' +
              '<span><a href="mailto:vipyachtllc@gmail.com">vipyachtllc@gmail.com</a></span>' +
              '<span>Daily, 8:00 AM – 10:00 PM</span>' +
            '</address>' +
          '</div>' +
        '</div>' +
        '<hr class="divider">' +
        '<div class="footer-bottom">' +
          '<span>&copy; ' + new Date().getFullYear() + ' VIP Yachts. All rights reserved.</span>' +
          '<div class="footer-bottom-links">' +
            '<a href="' + BASE + 'pages/faq">FAQs</a>' +
            '<a href="' + BASE + 'pages/contact">Contact</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(footer);
  }

  function buildWhatsAppFab() {
    var greeting = 'Hi VIP Yachts! I have a question about chartering a yacht.';
    var fab = document.createElement('a');
    fab.className = 'whatsapp-fab';
    fab.href = whatsappLink(WHATSAPP_NUMBERS[0].digits, greeting);
    fab.target = '_blank';
    fab.rel = 'noopener';
    fab.setAttribute('aria-label', 'Chat with VIP Yachts on WhatsApp');
    fab.innerHTML =
      '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.7 4.61 1.908 6.482L4 29l7.716-1.878A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm6.98 16.87c-.297.836-1.47 1.53-2.408 1.73-.64.136-1.475.245-4.29-.922-3.602-1.492-5.92-5.14-6.1-5.38-.177-.24-1.457-1.94-1.457-3.7 0-1.76.92-2.62 1.246-2.98.326-.36.71-.45.947-.45.237 0 .474.002.68.012.218.01.51-.083.798.608.297.71.998 2.454 1.086 2.633.088.18.147.39.03.63-.118.24-.177.39-.353.6-.177.21-.372.47-.532.63-.177.177-.362.368-.155.723.207.355.92 1.518 1.976 2.46 1.358 1.212 2.503 1.588 2.858 1.766.355.177.562.148.77-.09.207-.24.887-1.035 1.124-1.39.237-.355.474-.296.798-.178.325.118 2.06.972 2.413 1.148.354.177.59.266.68.414.088.148.088.856-.208 1.69z"/></svg>';
    document.body.appendChild(fab);
  }

  /* =========================================================
     6. FADE-UP SCROLL REVEAL (shared across pages)
     ========================================================= */
  function initFadeUps() {
    // Only target elements not already being watched/revealed, so calling this
    // again after new content is injected doesn't re-process already-visible items.
    var items = qsa('.fade-up:not(.is-visible)').filter(function (el) {
      return !el.hasAttribute('data-fade-observed');
    });
    if (!items.length) return;
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) {
      el.setAttribute('data-fade-observed', 'true');
      observer.observe(el);
    });
  }

  /* =========================================================
     7. INIT — build shared chrome, then hand off to
     page-specific init functions if present.
     ========================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    // The admin dashboard uses its own sidebar shell, not the public site chrome.
    if (CURRENT_PAGE !== 'admin') {
      buildHeader();
      buildFooter();
      buildWhatsAppFab();
    }
    initFadeUps();

    // Page-specific modules attach themselves to window.VIPYachtsPages[pageKey].
    // These modules often inject new .fade-up elements into the DOM (e.g. yacht
    // cards, package cards) AFTER the scan above already ran, so those elements
    // would never be observed and would stay permanently invisible (opacity: 0
    // from .fade-up with no .is-visible ever added). Re-run the scan afterward
    // to pick up anything the page module just created.
    if (window.VIPYachtsPages && typeof window.VIPYachtsPages[CURRENT_PAGE] === 'function') {
      window.VIPYachtsPages[CURRENT_PAGE]();
      initFadeUps();
    }
  });

  window.VIPYachtsPages = window.VIPYachtsPages || {};
  window.VIPYachtsUtil = { qs: qs, qsa: qsa };
})();
