// create the option list
function build_options () {
    let options_list = document.getElementById('options');
    let grid = document.createElement('div');

    grid.setAttribute('uk-grid', '');
    grid.classList.add('uk-child-width-1-2@s');

    for (let [key, option] of Object.entries(options)) {
        let item = document.createElement('div');
        let button = document.createElement('button');
        let name = document.createElement('a');

        item.classList.add('uk-margin-small');
        item.style.marginTop = '10px';

        button.classList.add('uk-button', 'uk-button-default');
        button.id = key;
        button.onclick = toggle_option;

        if (option.collection !== false) {
            button.classList.add('button-checked');
        }

        name.innerText = option[language];

        button.appendChild(name);
        item.appendChild(button);

        grid.appendChild(item);
    }
    options_list.appendChild(grid);
}

// build all words on current language
function build_language () {
    document.getElementById('categories').innerHTML = "<a>" + language_pack[language].categories_title + "</a>";
    document.getElementById('searchbar').setAttribute('placeholder', language_pack[language].searchbar);
    document.getElementById('filter_all').innerHTML = "<a>" + language_pack[language].filter_all + "</a>";
    document.getElementById('filter_collected').innerHTML = "<a>" + language_pack[language].filter_collected + "</a>";
    document.getElementById('filter_uncollected').innerHTML = "<a>" + language_pack[language].filter_uncollected + "</a>";

}

// change all words to current language and rebuild some parts bc it's easier than change :)
function change_language () {
    build_language()
    if (current_category !== null) {
        document.getElementById('category').innerHTML = "<a>" + '<span uk-icon="icon: chevron-double-right" style="position: relative;left: -12px"></span>' + data.categories[current_category][language].plural + "</a>";
        if (data.structure.subcategories[current_category] !== null) {
            create_submenu();
        }
    }
    if (current_subcategory !== null) {
        document.getElementById('subcategory').innerHTML = "<a>" + '<span uk-icon="icon: chevron-double-right" style="position: relative;left: -12px"></span>' + data.categories[current_category].subcategories[current_subcategory][language] + "</a>";
    }
    create_menu();

    for (let list of document.getElementById('items').children) {
        for (let item of list.children) {
            item.setAttribute('name', item.getAttribute(language));
            item.children[0].children[1].children[0].innerHTML = item.getAttribute(language);
        }
    }

    for (let element of document.getElementById('uk_filter').children) {
        if (element.classList.contains('uk-active')) {
            element.classList.remove('uk-active');
            element.click();
        }
    }

    document.getElementById('searchbar').setAttribute('placeholder', language_pack[language].searchbar);

    document.getElementById('options').innerHTML = '';
    build_options();
    db('settings', 'put', {id: 'language', data: language});

    update_stats();
}

// build language "accordion"
function build_language_accordion () {
    for (let lang of document.getElementById('languages').children) {
        lang.onclick = function () {
            language = lang.getAttribute('language');
            console.log('switched language to "' + language + '"');
            if (lang.classList.contains('country-active') === false) {
                change_language();
            }
            for (let lng of document.getElementById('languages').children) {
                lng.classList.remove('country-active');
            }
            lang.classList.add('country-active');
        }
        if (lang.getAttribute('language') === language) {
            lang.classList.add('country-active');
        }
    }
}

// build an item list for category given
function create_list (category) {
    let unordered_list = document.createElement('ul');
    unordered_list.id = category.id;
    unordered_list.classList.add('uk-list', 'uk-height-1-1', 'uk-margin-remove', 'uk-sorter');
    unordered_list.hidden = true;
    unordered_list.style.position = 'relative';
    unordered_list.style.top = '40px';

    function create_item (item) {
        let element = document.createElement('li');
        let container = document.createElement('div');
        let link = document.createElement('a');
        let name = document.createElement('span');
        let button = document.createElement('button');

        element.setAttribute('id', item.id);
        element.setAttribute('name', item.name[language]);
        element.setAttribute('en', item.name.en);
        element.setAttribute('de', item.name.de);
        element.setAttribute('category', item.category.id);
        element.setAttribute('subcategory', item.subcategory.id);
        element.setAttribute('position', item.position);
        element.setAttribute('wiki', item.wiki);
        element.setAttribute('icon', item.icon);
        element.setAttribute('collected', item.collected);
        if ('upgraded' in item) {
            element.setAttribute('upgraded', item.upgraded);
        }
        if ('altered' in item) {
            element.setAttribute('altered', item.altered);
        }

        container.style.backgroundColor = 'rgba(0,0,0,0.85)';
        container.style.borderRadius = '10px';
        container.style.margin = '10px';
        container.style.height = '94%';

        let icon;
        if (item.icon !== null) {
            icon = document.createElement('img');
            icon.setAttribute('loading', 'lazy');
            icon.src = item.icon;
            icon.width = 40;
            icon.height = 40;
        } else {
            icon = document.createElement('span');
            icon.setAttribute('uk-icon', 'icon: camera; ratio: 2; stroke-width: 2');
        }
        if (item.wiki !== null) {
            link.href = item.wiki;
            link.target = '_blank';
        }
        name.classList.add('uk-margin', 'uk-margin-left');
        name.innerText = item.name[language];
        name.style.color = '#f5deb3';
        button.classList.add('uk-button', 'uk-button-default', 'uk-align-right', 'uk-margin-remove');
        if (item.collected) {
            button.innerHTML = '<span uk-icon="icon: check; ratio: 1"></span>';
            button.style.backgroundColor = 'green';
        } else {
            button.innerHTML = '<span uk-icon="icon: close; ratio: 1"></span>';
            button.style.backgroundColor = 'darkred';
        }
        button.style.borderRadius = '10px';
        button.style.color = 'white';
        button.onclick = toggle_collected;

        button.style.borderColor = 'black';

        link.appendChild(name);
        container.appendChild(icon);
        container.appendChild(link);
        container.appendChild(button);

        element.appendChild(container);

        return element;
    }


    for (let item of category.items) {
        let list_item = create_item(item);
        unordered_list.appendChild(list_item);
    }

    document.getElementById('items').appendChild(unordered_list);
}
