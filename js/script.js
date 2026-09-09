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
      name: 'Enterprise',
      tagline: 'Experience the Grandeur',
      pricePerDay: 35000,
      guests: 15,
      cabins: 1,
      washrooms: 1,
      length: 48,
      crew: 2,
      speedKnots: 20,
      year: 2019,
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
      video: '',
      description: 'Crafted with genuine skill, Enterprise is a 48-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and an unforgettable luxury escapade at sea.',
      overview: 'Enterprise accommodates up to 15 guests for day charters and also boasts an overnight capacity for 2, complete with extra quarters for a dedicated crew of 2. A main salon anchors the interior, with jetski and a variety of water sports available for guest enjoyment.',
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
      name: 'Grand 82',
      tagline: 'Highly Recommended Luxury Yacht in Dubai',
      pricePerDay: 70000,
      guests: 35,
      cabins: 4,
      washrooms: 4,
      length: 82,
      crew: 4,
      speedKnots: 24,
      year: 2022,
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
      video: '',
      description: 'An 82-foot luxury yacht with capacity for 35 guests, featuring a premium jacuzzi with water temperature control and a special-edition upper deck with bar counter and seating.',
      overview: 'Grand 82 pairs a spacious sun bed forward with a premium jacuzzi offering water temperature control. The upper deck bar counter and teak-decked sitting area suit large groups, while a premium finished back table with swimming hydraulic jumper and a fully stocked inside bar counter round out the entertaining spaces. Four bedrooms and four washrooms accommodate overnight and large day-charter groups alike, with a bright, brand-new saloon furnished throughout in luxury quality brands.',
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
      name: 'Big Daddy 90',
      tagline: 'Step Into a New Echelon of Opulent Sailing Indulgence',
      pricePerDay: 80000,
      guests: 50,
      cabins: 4,
      washrooms: 4,
      length: 90,
      crew: 5,
      speedKnots: 8,
      year: 2021,
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
      video: '',
      description: 'The Big Daddy Premium Yacht is a 90-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Big Daddy 90 accommodates up to 50 guests for day charters and boasts an overnight capacity for 8, complete with extra quarters for a dedicated crew of 5. Luxurious cabins — Master, VIP, Double, and Twin — each come with an en-suite bathroom. A main salon with dining area and bar, spacious flybridge, and spacious bathtub round out the experience, alongside jetski and a variety of water sports.',
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
      name: 'Majesty 101',
      tagline: 'Step Into a New Echelon of Opulent Sailing Indulgence',
      pricePerDay: 90000,
      guests: 50,
      cabins: 4,
      washrooms: 4,
      length: 101,
      crew: 5,
      speedKnots: 18,
      year: 2022,
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
      video: '',
      description: 'The Majesty Premium Yacht is a 101-ft / 31-meter masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Majesty 101 accommodates up to 50 guests for day charters and boasts an overnight capacity for 8, complete with extra quarters for a dedicated crew of 5. Luxurious cabins — Master, VIP, Double, and Twin — each come with an en-suite bathroom. The main salon features a dining area and bar, while the spacious flybridge offers its own dining area, bar, and sunbeds. A jacuzzi with relaxed seating area, jetski, and a variety of water sports round out the experience.',
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
      name: 'Schaefer 480',
      tagline: 'A Comfortable Introduction to Yachting',
      pricePerDay: 32000,
      guests: 12,
      cabins: 2,
      washrooms: 1,
      length: 48,
      crew: 2,
      speedKnots: 20,
      year: 2020,
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
      video: '',
      description: 'Schaefer 480 offers a comfortable, well-appointed charter for smaller groups, with a shaded flybridge, cream leather saloon, and two guest cabins below deck.',
      overview: 'Estimated specifications based on vessel size and configuration shown. Schaefer 480 carries a two-cabin layout — a wood-paneled master cabin and a twin-bed second cabin — with a cream leather saloon, marble-topped galley, and dinette. The bow sundeck and aft lounge provide ample outdoor seating, and the shaded flybridge tops off the layout with additional open-air space.',
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
      name: 'Mayyas',
      tagline: 'Experience the Grandeur',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: 30,
      cabins: 2,
      washrooms: 2,
      length: 75,
      crew: 3,
      speedKnots: null,
      year: null,
      image: '', // TODO: image not yet added — pending brochure asset upload
      gallery: [], // TODO: gallery images not yet added — pending brochure asset upload
      video: '',
      description: 'Crafted with genuine skill, Mayyas is a 75-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Mayyas accommodates up to 30 guests for day charters and boasts an overnight capacity for 3, complete with extra quarters for a dedicated crew of 3. Luxurious cabins — Master and Twin — each come with an en-suite bathroom. A main salon with bar area and a spacious flybridge round out the experience, alongside jetski and a variety of water sports.',
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
      name: 'Majesty 88',
      tagline: 'Step Into a New Echelon of Opulent Sailing Indulgence',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: 50,
      cabins: 4,
      washrooms: 4,
      length: 88,
      crew: 5,
      speedKnots: 18,
      year: null,
      image: '', // TODO: image not yet added — pending brochure asset upload
      gallery: [], // TODO: gallery images not yet added — pending brochure asset upload
      video: '',
      description: 'Crafted with genuine skill, the Majesty Premium Yacht is an 88-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Majesty 88 accommodates up to 50 guests for day charters and boasts an overnight capacity for 8, complete with extra quarters for a dedicated crew of 5. Luxurious cabins — Master, VIP, Double, and Twin — each come with an en-suite bathroom. The main salon features a dining area and bar, while the spacious flybridge offers its own dining area, bar, and sunbeds. A jacuzzi with relaxed seating area, jetski, and a variety of water sports round out the experience.',
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
      name: 'Majesty 59',
      tagline: 'Explore a Fresh Realm of Exclusive Yacht Charters',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: 25,
      cabins: 1,
      washrooms: 1,
      length: 59,
      crew: 2,
      speedKnots: null,
      year: null,
      image: '', // TODO: image not yet added — pending brochure asset upload
      gallery: [], // TODO: gallery images not yet added — pending brochure asset upload
      video: '',
      description: 'Crafted with genuine skill, the Majesty Premium Yacht is a 59-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Majesty 59 accommodates up to 25 guests for day charters and boasts an overnight capacity for 2, complete with extra quarters for a dedicated crew of 2. The Master cabin comes with an en-suite bathroom. A main salon with dining area and a spacious flybridge featuring its own dining area round out the experience, alongside jetski and a variety of water sports.',
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
      name: 'Jasmine',
      tagline: 'Experience the Grandeur',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: 22,
      cabins: 4,
      washrooms: 4,
      length: 55,
      crew: 2,
      speedKnots: null,
      year: null,
      image: '', // TODO: image not yet added — pending brochure asset upload
      gallery: [], // TODO: gallery images not yet added — pending brochure asset upload
      video: '',
      description: 'Crafted with genuine skill, the Jasmine Premium Yacht is a 55-ft masterpiece gracing the waters of Dubai, delivering opulent sailing and providing an unforgettable luxury escapade at sea.',
      overview: 'Jasmine accommodates up to 22 guests for day charters and boasts an overnight capacity for 2, complete with extra quarters for a dedicated crew of 2. Luxurious cabins — Master, VIP, Double, and Twin — each come with an en-suite bathroom. A main salon and spacious flybridge round out the experience, alongside jetski and a variety of water sports.',
      features: ['Master, VIP, Double & Twin cabins, each en-suite', 'Main salon', 'Spacious flybridge', 'Jetski included', 'Water sports available'],
      decks: [
        { name: 'Flybridge', detail: 'Open-air seating with helm station and skyline views.' },
        { name: 'Main Deck', detail: 'Main salon and galley area.' },
        { name: 'Lower Deck', detail: 'Master, VIP, double, and twin cabins, each with en-suite bathroom.' }
      ]
    },
    {
      id: 'carmen-140',
      tier: 'classic',
      tierLabel: 'Classic Tier',
      name: 'Carmen',
      tagline: 'A Mega Yacht Escape on the Water',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: 80,
      cabins: 5,
      washrooms: 5, // TODO: assumed 1 per cabin — not stated in source brochure, needs client confirmation
      length: 140,
      crew: null, // TODO: not stated in source brochure — needs client input
      speedKnots: null,
      year: null,
      // TODO — IMAGE SOURCING FLAG: photos below were extracted from a client-supplied PDF that
      // is a generic "Really Great Site" (Canva) yacht-brochure template, not a client photoshoot.
      // Confirm with the client whether these are actually photos of their Carmen or stock/template
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
      video: '',
      description: 'A 140-ft mega yacht offering a huge, elegantly designed saloon and capacity for 80 guests, delivering a grand-scale luxury escapade at sea.',
      overview: 'Carmen accommodates up to 80 guests for day charters, with 5 guest cabins including a master bedroom with panoramic mid-sea views. A wraparound main saloon anchors the interior, complemented by a formal dining area, stocked bar counter, and multi-helm bridge. The middle-deck jacuzzi and open flybridge lounge offer additional entertaining space, with a second upper-deck lounge for large groups.',
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
      id: 'aarna-90',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Aarna',
      tagline: 'Sunseeker Elegance, Refit for 2023',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: 8,
      cabins: 4,
      washrooms: 4, // TODO: assumed 1 per cabin — not stated in source brochure, needs client confirmation
      length: 91,
      crew: 5,
      speedKnots: null,
      year: 2009, // refit 2023
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
      video: '',
      description: 'A 91-ft Sunseeker built in 2009 and refit in 2023, Aarna pairs a striking dark hull with warm, classic wood interiors for an elegant charter experience.',
      overview: 'Aarna accommodates up to 8 guests in 4 cabins (2 double, 2 twin), supported by a crew of 5. Twin MTU 12 V2000 M93 engines power her, and the deck spaces are set up for gourmet alfresco dining, with a built-in grill and a well-stocked bar.',
      features: ['4 cabins (2 double, 2 twin)', 'Crew of 5', 'Onboard grill', 'Alfresco dining areas', 'Stocked bar', 'Twin MTU engines', '2023 refit'],
      decks: [
        { name: 'Flybridge', detail: 'Shaded lounge seating with bar and skyline views.' },
        { name: 'Upper Deck', detail: 'Aft dining area and open sundeck.' },
        { name: 'Main Deck', detail: 'Main salon and formal dining table.' },
        { name: 'Lower Deck', detail: '4 cabins (2 double, 2 twin), each with en-suite bathroom.' }
      ]
    },
    {
      id: 'notorious-2023',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Notorious',
      tagline: 'Sleek Performance Cruiser',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: null, // TODO: not stated in source brochure — needs client input
      cabins: null, // TODO: not stated in source brochure — needs client input
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: null, // TODO: not stated in source brochure — needs client input
      crew: null, // TODO: not stated in source brochure — needs client input
      speedKnots: null,
      year: 2023,
      image: 'images/yacht-notorious-2023-exterior-1.jpg',
      gallery: [
        'images/yacht-notorious-2023-exterior-1.jpg',
        'images/yacht-notorious-2023-exterior-2.jpg',
        'images/yacht-notorious-2023-exterior-3.jpg',
        'images/yacht-notorious-2023-aft-lounge.jpg',
        'images/yacht-notorious-2023-sundeck.jpg',
        'images/yacht-notorious-2023-flybridge-seating.jpg',
        'images/yacht-notorious-2023-aft-deck-dining.jpg',
        'images/yacht-notorious-2023-main-salon.jpg',
        'images/yacht-notorious-2023-salon-lounge.jpg',
        'images/yacht-notorious-2023-master-cabin.jpg',
        'images/yacht-notorious-2023-bathroom.jpg',
        'images/yacht-notorious-2023-guest-cabin-1.jpg',
        'images/yacht-notorious-2023-guest-cabin-2.jpg'
      ],
      video: '',
      description: 'Notorious is a sleek black-hulled cruiser set against the Dubai skyline, offering an open flybridge, aft lounge seating, and warm wood-finished interiors.',
      overview: 'Notorious offers an open flybridge with a wet bar and dining area, an aft cockpit lounge with alfresco dining, and a bright main salon with a formal dining table. Cabins are finished in polished wood with en-suite bathrooms.',
      features: ['Open flybridge with bar', 'Aft cockpit lounge', 'Alfresco dining', 'Formal dining table', 'Jetski/watersports platform'],
      decks: [
        { name: 'Flybridge', detail: 'Open-air seating, wet bar, and sun loungers.' },
        { name: 'Main Deck', detail: 'Salon, formal dining table, and aft cockpit lounge.' },
        { name: 'Lower Deck', detail: 'Cabins with en-suite bathrooms.' }
      ]
    },
    {
      id: 'princess-x95',
      tier: 'premium',
      tierLabel: 'Premium Tier',
      name: 'Princess X95',
      tagline: 'Closer to a Superyacht Than Her Class',
      pricePerDay: 120000,
      guests: 12,
      cabins: null, // TODO: not stated in source brochure — needs client input
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 95,
      crew: null, // TODO: not stated in source brochure — needs client input
      speedKnots: null,
      year: 2023,
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
      video: '',
      description: 'Charter the ultimate in style, space and innovation aboard this 2023 Princess X95, delivering an exceptional cruising experience with expansive volumes, refined design, and effortless comfort.',
      overview: 'The Princess X95 welcomes up to 12 guests for day charters and sleeps 10, with generous indoor and outdoor areas for relaxation and entertaining. The main deck saloon is filled with natural light through floor-to-ceiling windows, flowing into the aft cockpit lounge, while the flybridge offers multiple seating and sunbathing zones for alfresco dining and sunset cruises.',
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
      name: 'Thunder',
      tagline: 'A 49m Superyacht by Oceanfast',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: null, // TODO: not stated in source brochure — needs client input
      cabins: null, // TODO: not stated in source brochure — needs client input
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 50, // 49.9m / 164ft, rounded
      crew: null, // TODO: not stated in source brochure — needs client input
      speedKnots: 19, // cruising speed per brochure; top speed 40.0kn
      year: null, // TODO: build year not stated in source brochure — needs client input
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
      video: '',
      description: 'THUNDER is a 49m superyacht built in Australia by Oceanfast, with striking looks and interior spaces designed by Roberto Cavalli and Jon Bannenberg, and a magnificent heated pool on the foredeck.',
      overview: 'Thunder reaches a top speed of 40.0 knots, cruises at 30.0 knots, and has a maximum cruising range of 1000nm at 18.0 knots, with power from MTU CODAG engines. Her onboard facilities are rivalled only by her striking Roberto Cavalli and Jon Bannenberg-designed interiors, headlined by a heated pool on the foredeck.',
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
      name: 'Khalili',
      tagline: 'A Refined Superyacht Charter',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: null, // TODO: not stated in source brochure — needs client input
      cabins: null, // TODO: not stated in source brochure — needs client input
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: null, // TODO: not stated in source brochure — needs client input
      crew: null, // TODO: not stated in source brochure — needs client input
      speedKnots: null,
      year: null, // TODO: build year not stated in source brochure — needs client input
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
      video: '',
      description: 'Khalili is a refined superyacht offering spacious lounge interiors, a fully stocked entertainment lounge with games and a large screen, and multiple outdoor deck areas for dining and relaxing.',
      overview: 'Khalili features an expansive main salon with wraparound seating and formal dining, plus a lower-deck entertainment lounge complete with a large screen, chess and backgammon tables, and a full bar spread. Outdoor deck space includes a shaded aft lounge, an open sundeck bar, and multiple dining and seating areas with skyline and sea views.',
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
      name: 'San Lorenzo SX88',
      tagline: 'Italian Design, Dubai Skyline',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: 8, // TODO: cabins accommodate up to 8 guests per source brochure — needs client confirmation
      cabins: null, // TODO: not stated in source brochure — needs client input
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 88, // TODO: model designation "SX88" — needs client confirmation of exact LOA
      crew: null, // TODO: not stated in source brochure — needs client input
      speedKnots: null,
      year: null, // TODO: build year not stated in source brochure — needs client input
      image: '', // TODO: image not yet added — pending brochure asset upload
      gallery: [], // TODO: gallery images not yet added — pending brochure asset upload
      video: '',
      description: 'Experience unmatched luxury aboard the Sanlorenzo SX88, a masterpiece of Italian yacht design with expansive indoor and outdoor living spaces.',
      overview: 'The SX88 boasts a spacious salon with panoramic views, a fully equipped galley, and beautifully designed cabins accommodating up to eight guests in ultimate comfort. The vast aft deck and swim platform provide the perfect setting for sunbathing or diving into Dubai\'s crystal-clear waters, while advanced onboard technology ensures a seamless cruising experience.',
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
      name: 'Fynesse',
      tagline: 'Classic Superyacht, Dubai Waters',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: null, // TODO: not stated in source brochure — needs client input
      cabins: null, // TODO: not stated in source brochure — needs client input
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: null, // TODO: not stated in source brochure — needs client input
      crew: null, // TODO: not stated in source brochure — needs client input
      speedKnots: null,
      year: null, // TODO: build year not stated in source brochure — needs client input
      image: '', // TODO: image not yet added — pending brochure asset upload
      gallery: [], // TODO: gallery images not yet added — pending brochure asset upload
      video: '',
      description: 'Fynesse is a classic tri-deck superyacht offering a spacious sundeck jacuzzi, wraparound lounge seating, and an elegant formal dining room, cruising against Dubai\'s iconic skyline.',
      overview: 'Fynesse features a sundeck jacuzzi with shaded lounge seating, an upper-deck lounge bar with wraparound seating, and a main-deck formal dining room seating large groups in style. Cabins are finished with classic furnishings for a refined charter experience.',
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
      name: 'Matrix',
      tagline: 'Sleek Sport Cruiser',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: null, // TODO: not stated in source brochure — needs client input
      cabins: null, // TODO: not stated in source brochure — needs client input
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: null, // TODO: not stated in source brochure — needs client input
      crew: null, // TODO: not stated in source brochure — needs client input
      speedKnots: null,
      year: null, // TODO: build year not stated in source brochure — needs client input
      image: '', // TODO: image not yet added — pending brochure asset upload
      gallery: [], // TODO: gallery images not yet added — pending brochure asset upload
      video: '',
      description: 'Matrix is a striking black-hulled sport yacht cruising Dubai\'s waters, featuring a sleek flybridge, an open aft deck dining area, and a bright, contemporary main salon.',
      overview: 'Matrix pairs an aggressive black hull with an open flybridge helm and lounge seating, a teak-decked aft cockpit set for alfresco dining, and a light-filled main salon with wraparound seating. Cabins offer twin and double configurations with en-suite bathrooms.',
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
      name: 'Encore',
      tagline: '140ft Tri-Deck Super Yacht',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: 30, // per source brochure: up to 30 guests
      cabins: 5, // per source brochure: 5 cabins (1 owner, 2 VIP, 2 double)
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: 140,
      crew: 10, // per source brochure: capable of carrying up to 10 crew
      speedKnots: null,
      year: null, // TODO: build year not stated in source brochure — needs client input
      image: '', // TODO: image not yet added — pending brochure asset upload
      gallery: [], // TODO: gallery images not yet added — pending brochure asset upload
      video: '',
      description: 'Encore is a 140ft tri-deck superyacht with a fully private owner\'s deck, a dedicated sky lounge, and timeless styling with beautiful furnishings throughout.',
      overview: 'Encore\'s 100% owner\'s deck offers a fully private salon and forward jacuzzi pool deck, isolated from cameras for total privacy. Five cabins accommodate up to 12 guests overnight (1 owner, 2 VIP, 2 double), while the prized sky lounge offers a relaxed space for cocktails and entertaining. She can carry up to 10 crew and up to 30 guests for day charters, with 7-star hospitality service throughout.',
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
      name: 'Notika',
      tagline: 'Sport Yacht Charter',
      pricePerDay: null, // TODO: pricing not provided in source brochure — needs client input
      guests: null, // TODO: not stated in source brochure — needs client input
      cabins: null, // TODO: not stated in source brochure — needs client input
      washrooms: null, // TODO: not stated in source brochure — needs client input
      length: null, // TODO: not stated in source brochure — needs client input
      crew: null, // TODO: not stated in source brochure — needs client input
      speedKnots: null,
      year: null, // TODO: build year not stated in source brochure — needs client input
      image: '', // TODO: image not yet added — pending brochure asset upload
      gallery: [], // TODO: gallery images not yet added — pending brochure asset upload
      video: '',
      description: 'Notika is a sleek sport yacht offering a spacious sundeck lounge, an open flybridge dining and bar area, and a comfortable main salon set up for entertaining.',
      overview: 'Notika\'s sundeck lounge and flybridge dining/bar area give guests multiple spaces to relax and entertain, while the main salon and formal dining area provide comfortable indoor space with sea views. Cabins offer double and twin configurations with en-suite bathrooms.',
      features: ['Sundeck lounge seating', 'Flybridge dining and bar', 'Main salon with sea views', 'Formal dining area', 'Double & twin cabins'],
      decks: [
        { name: 'Flybridge', detail: 'Open-air dining and bar area with lounge seating.' },
        { name: 'Main Deck', detail: 'Salon and formal dining area.' },
        { name: 'Lower Deck', detail: 'Double and twin cabins, each with en-suite bathroom.' }
      ]
    }
  ];


  /* =========================================================
     3. PACKAGES & ADD-ONS — SINGLE SOURCE OF TRUTH
     ========================================================= */
  var PACKAGES = [
    { id: 'sunset-cruise', name: 'Sunset Cruise', hours: 2, price: 15000, popular: false, description: 'A short, golden-hour cruise along the Marina skyline. Ideal for couples or a quick celebration.' },
    { id: 'half-day', name: 'Half Day', hours: 4, price: 30000, popular: false, description: 'Four hours on the water — enough time to swim, anchor up for lunch, and cruise the coastline at a relaxed pace.' },
    { id: 'full-day', name: 'Full Day', hours: 8, price: 55000, popular: true, description: 'A full day at sea with time to explore further out, anchor for extended swimming, and enjoy an unhurried onboard lunch.' },
    { id: 'overnight', name: 'Overnight', hours: 24, price: 90000, popular: false, description: 'A full 24 hours onboard, including an overnight anchorage, for guests who want the complete live-aboard experience.' }
  ];

  var ADDONS = [
    { id: 'bbq-meal', name: 'BBQ / Premium Meal', price: 5000, description: 'A grilled onboard menu prepared and served by our crew.' },
    { id: 'birthday-decor', name: 'Birthday Decoration', price: 3000, description: 'Balloons, banner, and table styling for onboard celebrations.' },
    { id: 'dj-system', name: 'DJ System', price: 4000, description: 'Professional sound system with a curated playlist or live DJ on request.' },
    { id: 'photographer', name: 'Photographer', price: 6000, description: 'A dedicated photographer for up to two hours of your charter.' },
    { id: 'jet-ski', name: 'Jet Ski', price: 8000, description: 'One jet ski with fuel, included for the duration of your charter.' },
    { id: 'drone-photography', name: 'Drone Photography', price: 7000, description: 'Aerial photos and video of your yacht and group during the charter.' }
  ];

  // Expose to other scripts on the page (booking flow, admin, etc.)
  window.VIPYachts = {
    YACHTS: YACHTS,
    PACKAGES: PACKAGES,
    ADDONS: ADDONS,
    BASE: BASE
  };

  /* =========================================================
     4. UTILITIES
     ========================================================= */
  function formatAED(amount) {
    return 'AED ' + Number(amount).toLocaleString('en-US');
  }
  window.VIPYachts.formatAED = formatAED;

  // Several yachts in the fleet don't have a confirmed day rate yet (see TODOs
  // in the YACHTS list above). Rendering "AED 0 / day" for those would look
  // like a pricing bug, so every price display should go through this instead
  // of calling formatAED directly on a yacht's pricePerDay.
  function formatYachtPrice(amount) {
    return amount ? formatAED(amount) + ' / day' : 'Price on Request';
  }
  window.VIPYachts.formatYachtPrice = formatYachtPrice;

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

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

  /* =========================================================
     5. HEADER + FOOTER TEMPLATES
     ========================================================= */
  function buildHeader() {
    var navItems = [
      { href: 'index.html', label: 'Home', key: 'index' },
      { href: 'pages/fleet.html', label: 'Yachts', key: 'fleet' },
      { href: 'pages/packages.html', label: 'Packages', key: 'packages' },
      { href: 'pages/experiences.html', label: 'Experiences', key: 'experiences' },
      { href: 'pages/gallery.html', label: 'Gallery', key: 'gallery' },
      { href: 'pages/about.html', label: 'About', key: 'about' },
      { href: 'pages/contact.html', label: 'Contact', key: 'contact' }
    ];

    var linksHtml = navItems.map(function (item) {
      var href = BASE + item.href;
      var active = CURRENT_PAGE === item.key ? ' is-active' : '';
      var ariaCurrent = CURRENT_PAGE === item.key ? ' aria-current="page"' : '';
      return '<a href="' + href + '" class="' + active.trim() + '"' + ariaCurrent + '>' + item.label + '</a>';
    }).join('');

    var mobileLinksHtml = navItems.map(function (item, i) {
      var href = BASE + item.href;
      var active = CURRENT_PAGE === item.key ? ' is-active' : '';
      var ariaCurrent = CURRENT_PAGE === item.key ? ' aria-current="page"' : '';
      var delay = ' style="transition-delay:' + (i * 0.04) + 's"';
      return '<a href="' + href + '" class="' + active.trim() + '"' + ariaCurrent + delay + '>' + item.label + '</a>';
    }).join('');

    var header = document.createElement('header');
    header.className = 'site-header';
    header.id = 'site-header';
    header.innerHTML =
      '<div class="container">' +
        '<a href="' + BASE + 'index.html" class="brand" aria-label="VIP Yachts home">' +
          '<img src="' + BASE + 'images/logo.png" alt="VIP Yachts logo" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'brand-fallback\',textContent:\'VY\'}))">' +
          '<span>VIP Yachts</span>' +
        '</a>' +
        '<nav class="main-nav" aria-label="Primary">' +
          '<div class="nav-links">' + linksHtml + '</div>' +
        '</nav>' +
        '<div class="header-cta">' +
          '<a href="' + BASE + 'pages/booking.html" class="btn btn-outline">Book Now</a>' +
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
    mobileNav.innerHTML = mobileLinksHtml + '<a href="' + BASE + 'pages/booking.html" class="btn btn-gold" style="transition-delay:' + (navItems.length * 0.04) + 's">Book Now</a>';

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
            '<a href="' + BASE + 'index.html" class="brand" aria-label="VIP Yachts home">' +
              '<img src="' + BASE + 'images/logo.png" alt="VIP Yachts logo" onerror="this.replaceWith(Object.assign(document.createElement(\'span\'),{className:\'brand-fallback\',textContent:\'VY\'}))">' +
              '<span>VIP Yachts</span>' +
            '</a>' +
            '<p>Premium yacht charters from Dubai Marina Yacht Club, built around effortless service and an unforgettable time on the water.</p>' +
            '<div class="footer-social">' +
              '<a href="https://instagram.com" target="_blank" rel="noopener" aria-label="VIP Yachts on Instagram">IG</a>' +
              '<a href="https://facebook.com" target="_blank" rel="noopener" aria-label="VIP Yachts on Facebook">FB</a>' +
              '<a href="https://wa.me/971500000000" target="_blank" rel="noopener" aria-label="Message VIP Yachts on WhatsApp">WA</a>' +
            '</div>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Explore</h4>' +
            '<ul>' +
              '<li><a href="' + BASE + 'pages/fleet.html">Our Yachts</a></li>' +
              '<li><a href="' + BASE + 'pages/packages.html">Packages</a></li>' +
              '<li><a href="' + BASE + 'pages/experiences.html">Experiences</a></li>' +
              '<li><a href="' + BASE + 'pages/gallery.html">Gallery</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Company</h4>' +
            '<ul>' +
              '<li><a href="' + BASE + 'pages/about.html">About Us</a></li>' +
              '<li><a href="' + BASE + 'pages/faq.html">FAQs</a></li>' +
              '<li><a href="' + BASE + 'pages/contact.html">Contact</a></li>' +
              '<li><a href="' + BASE + 'pages/booking.html">Book Now</a></li>' +
            '</ul>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4>Dubai Marina Yacht Club</h4>' +
            '<address>' +
              '<span>Marina Walk, Dubai Marina, Dubai, UAE</span>' +
              '<span><a href="tel:+97145551234">+971 4 555 1234</a></span>' +
              '<span><a href="mailto:charter@vipyachts.ae">charter@vipyachts.ae</a></span>' +
              '<span>Daily, 8:00 AM – 10:00 PM</span>' +
            '</address>' +
          '</div>' +
        '</div>' +
        '<hr class="divider">' +
        '<div class="footer-bottom">' +
          '<span>&copy; ' + new Date().getFullYear() + ' VIP Yachts. All rights reserved.</span>' +
          '<div class="footer-bottom-links">' +
            '<a href="' + BASE + 'pages/faq.html">FAQs</a>' +
            '<a href="' + BASE + 'pages/contact.html">Contact</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(footer);
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
