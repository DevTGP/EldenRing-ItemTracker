// event listener for non-generated elements
function add_event_listener () {
    /*
     KeyEvent 'Escape':

     if User in searchbar and Keypress = searchbar cleared and closed

    else if options overlay opened = close overlay

    else = open overlay
    */
    document.onkeyup = function (e) {
        if(e.key === 'Escape') {
            if (document.querySelector('div.uk-navbar-right a').getAttribute('aria-expanded') === 'false') {
                document.querySelector('a.uk-close').click();
            } else if (document.getElementById('overlay').hidden === false) {
                document.getElementById('close_overlay').click();
            } else {
                document.getElementById('open_overlay').click();
            }
        }
    }

    // open overlay button
    document.getElementById('open_overlay').parentNode.onclick = function () {
        document.getElementById('overlay').hidden = false;
        document.getElementById('close_overlay').focus();
    }

    // close overlay button
    document.getElementById('close_overlay').onclick = function () {
        document.getElementById('overlay').hidden = true;
    }

    // click outside of options container = close overlay
    document.getElementById('overlay').onclick = function (e) {
        e.stopPropagation();
        document.getElementById('close_overlay').click();
    }
    document.getElementById('overlay_content').onclick = function (e) {
        e.stopPropagation();
    }

    // searchbar input event
    $('#searchbar').on('input', function () {
        animate_items('show');
    });

    // navbar list-grid icons
    document.getElementById('get_grid').onclick = get_grid;
    document.getElementById('get_list').onclick = get_list;

    // navbar showing just if scrolled to top
    window.onscroll = function() {
        if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
            setTimeout(() => {
                document.getElementById('sorter').style.top = '-35px';
            }, 300);
        } else {
            document.getElementById('sorter').style.top = '0px';
        }
    }

    // navbar go-back / left arrow
    document.getElementById('go_back').onclick = function () {
        if (current_subcategory !== null) {
            current_subcategory = null;
            document.getElementById('subcategory').innerHTML = '';
            animate_items('show');
        } else if (current_category !== null) {
            current_category = null;
            document.getElementById('category').innerHTML = '';
            for (let item of document.getElementById('items').children) {
                item.hidden = true;
            }
            document.getElementById('stats').hidden = false;
            document.getElementById('sorter').style.top = '-35px';

            document.getElementById('collection_filter').hidden = true;
            document.getElementById('search_icon').hidden = true;

            setTimeout(() => {
                document.getElementById('sorter').hidden = true;
            }, 1000);
        }
    }

    // collection filter
    document.getElementById('filter_all').onclick = function () {
        current_filter = null;
        document.getElementById('filter_all').classList.add('uk-active');
        document.getElementById('filter_collected').classList.remove('uk-active');
        document.getElementById('filter_uncollected').classList.remove('uk-active');
        animate_items('show');
    };
    document.getElementById('filter_collected').onclick = function () {
        current_filter = true;
        document.getElementById('filter_all').classList.remove('uk-active');
        document.getElementById('filter_collected').classList.add('uk-active');
        document.getElementById('filter_uncollected').classList.remove('uk-active');
        animate_items('show');
    };
    document.getElementById('filter_uncollected').onclick = function () {
        current_filter = false;
        document.getElementById('filter_all').classList.remove('uk-active');
        document.getElementById('filter_collected').classList.remove('uk-active');
        document.getElementById('filter_uncollected').classList.add('uk-active');
        animate_items('show');
    };

}
