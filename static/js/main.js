/*
Process:
1. Loading all scripts / stylesheets before this one
    - all scripts only have functions or variable declarations (except scroll-behavior-js)

2. initialize more important variables in here

3. connect to IndexedDB and synchronize local data with sent data
    - if user uses this website first time a new database will be initialized

4. build
    1. options
    2. language pack
    3. item lists
    4. navbar menu

5. adding event listener for non generated items

*/


// 2
var language = 'en';
var current_category = null;
var current_subcategory = null;
var current_filter = null;
var options = {
    option_upgraded_talisman: {
        collection: false,
        en: 'Upgraded+ Talismans',
        de: 'Aufgewertete+ Talismane'
    },
    option_altered_armor: {
        collection: false,
        en: 'Altered Armor',
        de: 'Veränderte Rüstungen'
    },
    option_armor: {
        collection: true,
        en: 'Armor',
        de: 'Rüstung'
    },
    option_weapon: {
        collection: true,
        en: 'Weapons',
        de: 'Waffen'
    },
    option_shield: {
        collection: true,
        en: 'Shields',
        de: 'Schilder'
    },
    option_talisman: {
        collection: true,
        en: 'Talismans',
        de: 'Talismane'
    },
    option_sorcery: {
        collection: true,
        en: 'Sorceries',
        de: 'Zaubereien'
    },
    option_incantation: {
        collection: true,
        en: 'Incantations',
        de: 'Anrufungen'
    },
    option_ashes: {
        collection: true,
        en: 'Ashes of War',
        de: 'Kriegsaschen'
    },
    option_spirit: {
        collection: true,
        en: 'Spirit Ashes',
        de: 'Geisteraschen'
    },
    option_cookbook: {
        collection: true,
        en: 'Cookbooks',
        de: 'Handbücher'
    },
    option_gesture: {
        collection: true,
        en: 'Gestures',
        de: 'Gesten'
    }
};
var language_pack = {
    en: {
        categories_title: 'Categories',
        supercategory: {
            all: 'Total',
            armor: 'Armor',
            equipment: 'Equipment',
            magic: 'Magic',
            skills: 'Skills',
            miscellaneous: 'Miscellaneous'
        },
        subcategory_dropdown_header: {
            shield: 'Shield',
            incantation: 'Incantation',
            sorcery: 'Sorcery',
            weapon: 'Weapon',
            miscellaneous: 'Miscellaneous',
            sword: 'Swords',
            ranged: 'Ranged Weapons',
            other: 'Other Weapons',
            magic: 'Magic',
            incantation_order: 'Order Incantations',
            incantation_fire: 'Fire Incantations',
            incantation_chaos: 'Chaotic Incantations',
            incantation_dragon: 'Dragon Incantations',
            sorcery_type: 'Sorceries by Type',
            sorcery_faction: 'Sorcery by Faction',
            sorcery_element: 'Elemental Sorceries',
            sorcery_chaos: 'Chaotic Sorceries'
        },
        searchbar: 'search',
        filter_all: 'All Items',
        filter_collected: 'Collected Items',
        filter_uncollected: 'Uncollected Items',
        stats_remaining_label: 'Remaining'
    },
    de: {
        categories_title: 'Kategorien',
        supercategory: {
            all: 'Gesamt',
            armor: 'Rüstung',
            equipment: 'Ausrüstung',
            magic: 'Magie',
            skills: 'Fähigkeiten',
            miscellaneous: 'Miscellaneous'
        },
        subcategory_dropdown_header: {
            shield: 'Schild',
            incantation: 'Anrufung',
            sorcery: 'Schimmerstein-Zauberei',
            weapon: 'Waffen',
            miscellaneous: 'Miscellaneous',
            sword: 'Schwerter',
            ranged: 'Distanzwaffen',
            other: 'Andere Waffen',
            magic: 'Magie',
            incantation_order: 'Anrufungen der Ordnung',
            incantation_fire: 'Anrufungen des Feuers',
            incantation_chaos: 'Anrufungen des Chaos',
            incantation_dragon: 'Anrufungen der Drachen',
            sorcery_type: 'Zaubereien nach Typ',
            sorcery_faction: 'Zaubereien nach Fraktion',
            sorcery_element: 'Elementare Zaubereien',
            sorcery_chaos: 'Chaotische Zaubereien'
        },
        searchbar: 'suchen',
        filter_all: 'Alle Items',
        filter_collected: 'Gesammelte Items',
        filter_uncollected: 'Nicht gesammelte Items',
        stats_remaining_label: 'Verbleibend'
    }
};


// 3, 4.1, 4.2, 4.3, 4.4
persist_storage();
connect_to_database(1);


// 5
add_event_listener();
