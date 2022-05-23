// update collected status of an item and save it to db
function toggle_collected (e) {
    let button = e.target;
    if (button.nodeName.toLowerCase() !== 'button') {
        button = button.parentNode;
        if (button.nodeName.toLowerCase() !== 'button') {
            button = button.parentNode;
            if (button.nodeName.toLowerCase() !== 'button') {
                button = button.parentNode;
            }
        }
    }

    let parent = button.parentNode.parentNode;

    if (parent.getAttribute('collected') === 'true') {
        parent.setAttribute('collected', false);
        button.innerHTML = '<span uk-icon="icon: close; ratio: 1"></span>';
        button.style.backgroundColor = 'darkred';
    } else {
        parent.setAttribute('collected', true);
        button.innerHTML = '<span uk-icon="icon: check; ratio: 1"></span>';
        button.style.backgroundColor = 'green';
    }
    for (let item of data.categories[parent.getAttribute('category')].items) {
        if (item.id === parent.getAttribute('id')) {
            item.collected = (parent.getAttribute('collected') === 'true');
        }
    }
    db('items', 'put', {id: 'data', data: data});
    console.log('updated data');
    update_stats();
}

// change option and save it to db
function toggle_option (e) {
    let button = e.target;
    if (e.target.tagName === 'A') {
        button = e.target.parentNode;
    }
    if (button.classList.contains('button-checked')) {
        button.classList.remove('button-checked');
        options[button.id].collection = false;
    } else {
        button.classList.add('button-checked');
        options[button.id].collection = true;
    }
    db('settings', 'put', {id: 'options', data: options});
    console.log('updated options');

    animate_items('show');

    document.getElementById('categories').innerHTML = "<a>" + language_pack[language].categories_title + "</a>";
    create_menu();

    update_stats();
}

