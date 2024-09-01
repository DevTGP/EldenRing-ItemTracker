// build dropdown for category in navbar
function create_menu () {
    let dropdown = document.createElement('div');
    dropdown.classList.add('uk-width-large');
    dropdown.setAttribute('uk-dropdown', '');

    let dropdown_grid = document.createElement('div');
    dropdown_grid.classList.add('uk-dropdown-grid', 'uk-child-width-1-2');
    dropdown_grid.setAttribute('uk-grid', '');


    let grid_items = [];
    for (let category of data.structure.categories) {

        let element = document.createElement('li');
        if (category.search('header') !== -1) {
            if (options.option_armor.collection === false && ['set', 'helm', 'chest', 'gauntlets', 'legs', 'header armor'].includes(category)) {
            } else if (options.option_weapon.collection === false && options.option_shield.collection === false && options.option_talisman.collection === false && ['weapon', 'shield', 'talisman', 'header equipment'].includes(category)) {
            } else if (options.option_sorcery.collection === false && options.option_incantation.collection === false && ['sorcery', 'incantation', 'header magic'].includes(category)) {
            } else if (options.option_ashes.collection === false && options.option_spirit.collection === false && ['ashes', 'spirits', 'header skills'].includes(category)) {
            } else if (options.option_cookbook.collection === false && options.option_gesture.collection === false && options.option_crystaltear.collection === false && options.option_remembrance.collection === false && ['cookbook', 'gesture', 'crystaltear', 'remembrance', 'header miscellaneous'].includes(category)) {
            } else {
                let container = document.createElement('div');

                let list = document.createElement('ul');
                list.classList.add('uk-nav', 'uk-navbar-dropdown-nav');

                container.appendChild(list);
                grid_items.push(container);

                element.setAttribute('class', 'uk-nav-header');
                element.innerText = language_pack[language].supercategory[category.split(" ")[1]];
            }
        } else {
            let category_item = document.createElement('a');

            category_item.innerText = data.categories[category][language].plural;
            element.setAttribute('category', category);
            category_item.onclick = select_category;

            element.appendChild(category_item);
        }

        if (options.option_armor.collection === false && ['set', 'helm', 'chest', 'gauntlets', 'legs', 'header armor'].includes(category)) {
        } else if (options.option_weapon.collection === false && options.option_shield.collection === false && options.option_talisman.collection === false && ['weapon', 'shield', 'talisman', 'header equipment'].includes(category)) {
        } else if (options.option_sorcery.collection === false && options.option_incantation.collection === false && ['sorcery', 'incantation', 'header magic'].includes(category)) {
        } else if (options.option_ashes.collection === false && options.option_spirit.collection === false && ['ashes', 'spirits', 'header skills'].includes(category)) {
        } else if (options.option_cookbook.collection === false && options.option_gesture.collection === false && options.option_crystaltear.collection === false && options.option_remembrance.collection === false && ['cookbook', 'gesture', 'crystaltear', 'remembrance', 'header miscellaneous'].includes(category)) {

        } else if (options.option_weapon.collection === false && category === 'weapon') {
        } else if (options.option_shield.collection === false && category === 'shield') {
        } else if (options.option_talisman.collection === false && category === 'talisman') {
        } else if (options.option_sorcery.collection === false && category === 'sorcery') {
        } else if (options.option_incantation.collection === false && category === 'incantation') {
        } else if (options.option_ashes.collection === false && category === 'ashes') {
        } else if (options.option_spirit.collection === false && category === 'spirits') {
        } else if (options.option_cookbook.collection === false && category === 'cookbook') {
        } else if (options.option_gesture.collection === false && category === 'gesture') {
        } else if (options.option_crystaltear.collection === false && category === 'crystaltear') {
        } else if (options.option_remembrance.collection === false && category === 'remembrance') {
        } else {
            let grid = grid_items[grid_items.length - 1];
            grid.children[0].appendChild(element);
        }
    }

    for (let item of grid_items) {
        dropdown_grid.appendChild(item);
    }

    dropdown.appendChild(dropdown_grid);
    document.getElementById('categories').appendChild(dropdown);

    setTimeout(function () {
        document.querySelector('a.uk-close').onclick = () => {
            document.getElementById('searchbar').value = null;
            animate_items('show');
        }
    },1000)
}

// build submenu for subcategories
function create_submenu () {
    let dropdown = document.createElement('div');
    dropdown.classList.add('uk-width-large');
    dropdown.setAttribute('uk-dropdown', '');

    let dropdown_grid = document.createElement('div');
    dropdown_grid.classList.add('uk-dropdown-grid', 'uk-child-width-1-2');
    dropdown_grid.setAttribute('uk-grid', '');


    let grid_items = [];
    for (let subcategory of data.structure.subcategories[current_category]) {

        let element = document.createElement('li');
        if (subcategory.search('header') !== -1) {
            let container = document.createElement('div');

            let list = document.createElement('ul');
            list.classList.add('uk-nav', 'uk-navbar-dropdown-nav');

            container.appendChild(list);
            grid_items.push(container);

            element.setAttribute('class', 'uk-nav-header');
            element.innerText = language_pack[language].subcategory_dropdown_header[subcategory.split(" ")[1]];

        } else {
            if ([
                'incantation_miquellanincantation',
                'incantation_spiralincantation',
                'incantation_messmersfireincantation',
                'sorcery_fingersorceries',
                'sorcery_scadutreesorceries',
                'shield_thrustingshield',
                'weapons_hand-to-handarts',
                'weapons_perfumebottles',
                'weapons_throwingblades',
                'weapons_greatsword',
                'weapons_greatkatana',
                'weapons_backhandblade',
            ].includes(subcategory.toString()) && !dlc) continue;
            let category_item = document.createElement('a');
            category_item.innerText = data.categories[current_category].subcategories[subcategory][language];
            element.setAttribute('subcategory', subcategory);
            category_item.onclick = submenu_onclick;

            element.appendChild(category_item);
        }

        let grid = grid_items[grid_items.length - 1];
        grid.children[0].appendChild(element);
    }

    for (let item of grid_items) {
        dropdown_grid.appendChild(item);
    }

    dropdown.appendChild(dropdown_grid);
    document.getElementById('category').appendChild(dropdown);
}

// event listener onclick on category in menu dropdown
function select_category (e) {
    window.scrollTo(0, 0);
    document.getElementById('sorter').hidden = true;
    document.getElementById('sorter').style.top = '0px';

    document.getElementById('collection_filter').hidden = false;
    document.getElementById('search_icon').hidden = false;

    let category = e.target.parentNode.getAttribute('category');
    let title = document.createElement('a');



    current_category = category;
    current_subcategory = null;

    reset_submenu();
    reset_menu();

    if (document.getElementById('get_list').classList.contains('uk-active')) {
        document.getElementById('get_list').click();
    } else {
        document.getElementById('get_grid').click();
    }
    document.getElementById('sorter').hidden = false;
    document.getElementById('uk-sorter').setAttribute('uk-filter', "target: #" + current_category.toString());


    title.innerHTML = '<span uk-icon="icon: chevron-double-right" style="position: relative;left: -12px"></span>' + data.categories[category][language].plural;
    document.getElementById('category').appendChild(title);
    document.getElementById(category).hidden = false;
    animate_items('show');
    document.getElementById('category').setAttribute('category', category);

    if (data.structure.subcategories[category] !== null) {
        create_submenu();
    }
}

// event listener onclick submenu
function submenu_onclick (e) {
    let subcategory = e.target.parentNode.getAttribute('subcategory');
    let title = document.createElement('a');
    title.onclick = submenu_onclick;

    reset_submenu(current_category);

    current_subcategory = subcategory;
    animate_items('hide');
    animate_items('show');
    document.getElementById('subcategory').setAttribute('subcategory', subcategory);
    title.innerHTML = '<span uk-icon="icon: chevron-double-right" style="position: relative;left: -12px"></span>' + data.categories[current_category].subcategories[subcategory][language];
    document.getElementById('subcategory').appendChild(title);
}

// event listener onclick grid
function get_grid() {
    let list = document.getElementById('get_list');
    let grid = document.getElementById('get_grid');

    list.classList.remove('uk-active');
    grid.classList.add('uk-active');

    for (let item of document.getElementById(current_category).children) {
        item = item.children[0];
        item.classList.add('uk-card', 'uk-card-body', 'uk-card-default');

        let icon = item.children[0];
        let link = item.children[1];
        let name = link.children[0];
        let button = item.children[2];

        icon.width = 200;
        icon.height = 200;
        icon.classList.add('uk-card-title', 'uk-align-center');

        link.classList.add('uk-align-center', 'uk-text-center');
        name.classList.remove('uk-margin-left');

        button.classList.add('uk-position-bottom-center');
        button.style.bottom = '5px';
        button.classList.remove('uk-align-right', 'uk-margin-remove');

    }

    let target = document.getElementById(current_category);

    target.setAttribute('uk-grid', true);
    target.classList.add('uk-grid-collapse', 'uk-child-width-1-3@s', 'uk-child-width-1-4@m', 'uk-child-width-1-5@l', 'uk-child-width-1-6@xl');
}

// event listener onclick list
function get_list() {
    let list = document.getElementById('get_list');
    let grid = document.getElementById('get_grid');

    list.classList.add('uk-active');
    grid.classList.remove('uk-active');

    for (let item of document.getElementById(current_category).children) {
        item = item.children[0];
        item.classList.remove('uk-card', 'uk-card-body', 'uk-card-default');

        let icon = item.children[0];
        let link = item.children[1];
        let name = link.children[0];
        let button = item.children[2];

        icon.width = 40;
        icon.height = 40;
        icon.classList.remove('uk-card-title', 'uk-align-center');

        link.classList.remove('uk-align-center', 'uk-text-center');
        name.classList.add('uk-margin-left');

        button.classList.remove('uk-position-bottom-center');
        button.style.bottom = null;
        button.classList.add('uk-align-right', 'uk-margin-remove');

    }
    let target = document.getElementById(current_category);

    target.removeAttribute('uk-grid');
    target.classList.remove('uk-grid');
    target.classList.remove('uk-grid-collapse', 'uk-child-width-1-3@s', 'uk-child-width-1-4@m', 'uk-child-width-1-5@l', 'uk-child-width-1-6@xl');
}

// reset menu and dropdown
function reset_menu () {
    document.getElementById('stats').hidden = true;
    document.getElementById('category').innerHTML = '';
    document.getElementById('items').innerHTML = '';
    create_list(data.categories[current_category]);
}

// reset submenu and subcategory dropdown
function reset_submenu () {
    document.getElementById('subcategory').innerHTML = '';
    document.getElementById('subcategory').setAttribute('subcategory', null);
    document.getElementById('searchbar').value = '';
    if (current_category !== null) {
        animate_items('hide')
    }
}
