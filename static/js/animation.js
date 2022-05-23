// filter for animate_items e.g. option: upgraded talisman
function filter_items (items, reverse=false) {
    let item_list = items.slice();

    // filter for upgraded talismans
    item_list = item_list.filter(function (item) {
        if (item.hasAttribute('upgraded')) {
            if (options.option_upgraded_talisman.collection === true) {
                return item;
            } else if (options.option_upgraded_talisman.collection === false) {
                if (item.getAttribute('upgraded') === 'false') {
                    return item;
                }
            }
        } else {
            return item;
        }
    });
    // filter for altered armor
    item_list = item_list.filter(function (item) {
        if (item.hasAttribute('altered')) {
            if (options.option_altered_armor.collection === true) {
                return item;
            } else if (options.option_altered_armor.collection === false) {
                if (item.getAttribute('altered') === 'false') {
                    return item;
                }
            }
        } else {
            return item;
        }
    });
    // filter for subcategory
    if (current_subcategory !== null) {
        item_list = item_list.filter(function (item) {
            if (item.getAttribute('subcategory') === current_subcategory) {
                return item;
            }
        });
    }
    // filter for collection filter
    if (current_filter === false) {
        item_list = item_list.filter(function (item) {
            if (item.getAttribute('collected') === 'false') {
                return item;
            }
        });
    }
    if (current_filter === true) {
        item_list = item_list.filter(function (item) {
            if (item.getAttribute('collected') === 'true') {
                return item;
            }
        });
    }
    // filter for searchbar
    let input = $('#searchbar').val();
    if (input !== null) {
        item_list = item_list.filter(function (item) {
            if (item.getAttribute('name').toLowerCase().search(input.toLowerCase()) !== -1) {
                return item;
            }
        });
    }

    if (reverse) {
        let reversed_list = items;
        for (let item of items) {
        }
        return reversed_list
    }

    return item_list
}

// function is used to show / hide / animate items
function animate_items (animation, items = $("#" + current_category + " li").toArray()) {
    switch (animation) {
        case 'show':
            for (let item of items) {
                item.hidden = true;
                item.display = 'none';
                item.visibility = 'hidden';
            }
            items = filter_items(items);
            for (let item of items) {
                item.hidden = false;
                item.display = 'block';
                item.visibility = 'visible';
            }
            break;
        case 'hide':
            for (let item of items) {
                item.hidden = true;
                item.display = 'none';
                item.visibility = 'hidden';
            }
            break;
    }

}
