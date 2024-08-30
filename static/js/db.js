var db;


// Establish DB connection
function connect_to_database (dbVersion) {
    let openRequest = indexedDB.open('EldenRingItemTracker', dbVersion);

    // on db upgrade
    openRequest.onupgradeneeded = function () {
        if (!(openRequest.result.objectStoreNames.contains('items'))) {
            openRequest.result.createObjectStore('items', {keyPath: 'id'});
        }
        if (!(openRequest.result.objectStoreNames.contains('settings'))) {
            openRequest.result.createObjectStore('settings', {keyPath: 'id'});
        }
    }

    // on db error
    openRequest.onerror = function (e) {
        console.log(e);
    }


    // on db success
    openRequest.onsuccess = () => {load_data(openRequest)};
}

// make IndexedDB persistent
function persist_storage () {
    if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().then(persistent => {
            if (persistent) {
                console.log("Storage will not be cleared except by explicit user action");
            } else {
                console.warn("Storage may be cleared by the UA under storage pressure.");
            }
        });
    }
}

// load local_data
function load_data (openRequest) {
    db = (db, method, query) => {
        if (method === 'put') {
            return openRequest.result.transaction(db, 'readwrite').objectStore(db).put(query);
        }
        if (method === 'get') {
            return openRequest.result.transaction(db, 'readwrite').objectStore(db).get(query);
        }
    }

    // load and update options
    let local_settings = db('settings', 'get', 'options');
    local_settings.onsuccess = () => {
        if (local_settings.result === undefined) {
            db('settings', 'put', {id: 'options', data: options});
        } else {
            local_settings = local_settings.result.data;
            console.log('localSettings:');
            console.log(local_settings);
            for (let [key, value] of Object.entries(local_settings)) {
                options[key].collection = local_settings[key].collection === true;
            }
            db('settings', 'put', {id: 'options', data: options});
        }
        build_options();
    }

    // load and update language
    let local_language = db('settings', 'get', 'language');
    local_language.onsuccess = () => {
        if (local_language.result === undefined) {
            db('settings', 'put', {id: 'language', data: language});
        } else {
            local_language = local_language.result.data;
            console.log('localLanguage:');
            console.log(local_language);
            language = local_language;
            db('settings', 'put', {id: 'language', data: language});
        }
        change_language();
        build_language_accordion();
    }
    // load and update dlc toggle
    let dlc_toggle = db('settings', 'get', 'dlc');
    dlc_toggle.onsuccess = () => {
        if (dlc_toggle.result === undefined) {
            db('settings', 'put', {id: 'dlc', data: dlc});
        } else {
            dlc_toggle = dlc_toggle.result.data;
            console.log('dlc:');
            console.log(dlc_toggle);
            dlc = dlc_toggle;
            db('settings', 'put', {id: 'dlc', data: dlc});
            if (dlc) {
                document.getElementById('dlc_toggle').classList.add('dlc-option-active');
                document.getElementById("dlc_icon").classList.add('image-active');
            }
        }
    }

    // load and update items
    setTimeout( () => {
        let local_data = db('items', 'get', 'data');
        local_data.onsuccess = () => {
            if (local_data.result === undefined) {
                db('items', 'put', {id: 'data', data: data});
            } else {
                local_data = local_data.result.data;
                console.log('localData:');
                console.log(local_data);
                // updates item id for upgrade list
                for (let item of data.upgrades) {
                    for (let d of local_data.categories[item.category].items) {
                        if (d.id === item.old) {
                            d.id = item['new'];
                        }
                    }
                }
                // update collected status
                for (let [key, value] of Object.entries(local_data.categories)) {
                    for (let item of local_data.categories[key].items) {
                        for (let d of data.categories[key].items) {
                            if (item.id === d.id) {
                                d.collected = item.collected;
                            }
                        }
                    }
                }
                db('items', 'put', {id: 'data', data: data});
            }
            // create_list(data.categories.set);
            /*
            create_list(data.categories.helm);
            create_list(data.categories.chest);
            create_list(data.categories.gauntlets);
            create_list(data.categories.legs);
            create_list(data.categories.weapon);
            create_list(data.categories.shield);
            create_list(data.categories.talisman);
            create_list(data.categories.sorcery);
            create_list(data.categories.incantation);
            create_list(data.categories.ashes);
            create_list(data.categories.spirits);
            create_list(data.categories.cookbook);
            create_list(data.categories.gesture);
            create_list(data.categories.crystaltear);
            create_list(data.categories.remembrance);
            */
            create_chart();
        }
    }, 100);
}
