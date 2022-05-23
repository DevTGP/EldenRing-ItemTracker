var chart_all = null;
var chart_armor = null;
var chart_equipment = null;
var chart_magic = null;
var chart_skills = null;
var chart_miscellaneous = null;


// updates stats for chart
function update_stats () {
    for (let [key, value] of Object.entries(data.categories)) {
        data.categories[key].stats.collected = 0;
        for (let item of data.categories[key].items) {
            if (item.collected === true) {
                if (options.option_altered_armor.collection === false && ['helm', 'chest'].includes(item.category.id) && item.altered === true) {
                } else if (options.option_upgraded_talisman.collection === false && item.category.id === 'talisman' && item.upgraded === true) {
                } else {
                    data.categories[key].stats.collected += 1;
                }
            }
        }
        data.categories[key].stats.percentage = Math.floor(data.categories[key].stats.collected / data.categories[key].stats.total * 100);
    }

    // total stats
    let total = 0;

    let armor = 0;
    let equipment = 0;
    let magic = 0;
    let skills = 0;
    let miscellaneous = 0;

    if (options.option_armor.collection === true) {
        if (options.option_altered_armor.collection === true) {
            total += data.categories.helm.stats.total;
            total += data.categories.chest.stats.total;
        } else {
            total += data.categories.helm.stats.total_alternative;
            total += data.categories.chest.stats.total_alternative;
        }
        total += data.categories.gauntlets.stats.total;
        total += data.categories.legs.stats.total;
        armor += data.categories.helm.stats.collected;
        armor += data.categories.chest.stats.collected;
        armor += data.categories.gauntlets.stats.collected;
        armor += data.categories.legs.stats.collected;
    }
    if (options.option_weapon.collection === true) {
        total += data.categories.weapon.stats.total;
        equipment += data.categories.weapon.stats.collected;
    }
    if (options.option_shield.collection === true) {
        total += data.categories.shield.stats.total;
        equipment += data.categories.shield.stats.collected;
    }
    if (options.option_talisman.collection === true) {
        if (options.option_upgraded_talisman.collection === true) {
            total += data.categories.talisman.stats.total;
        } else {
            total += data.categories.talisman.stats.total_alternative;
        }
        equipment += data.categories.talisman.stats.collected;
    }
    if (options.option_sorcery.collection === true) {
        total += data.categories.sorcery.stats.total;
        magic += data.categories.sorcery.stats.collected;
    }
    if (options.option_incantation.collection === true) {
        total += data.categories.incantation.stats.total;
        magic += data.categories.incantation.stats.collected;
    }
    if (options.option_ashes.collection === true) {
        total += data.categories.ashes.stats.total;
        skills += data.categories.ashes.stats.collected;
    }
    if (options.option_spirit.collection === true) {
        total += data.categories.spirits.stats.total;
        skills += data.categories.spirits.stats.collected;
    }
    if (options.option_cookbook.collection === true) {
        total += data.categories.cookbook.stats.total;
        miscellaneous += data.categories.cookbook.stats.collected;
    }
    if (options.option_gesture.collection === true) {
        total += data.categories.gesture.stats.total;
        miscellaneous += data.categories.gesture.stats.collected;
    }

    armor = Math.floor(armor/total * 100);
    equipment = Math.floor(equipment/total * 100);
    magic = Math.floor(magic/total * 100);
    skills = Math.floor(skills/total * 100);
    miscellaneous = Math.floor(miscellaneous/total * 100);
    let remaining = 100;

    let label_all = [];
    let data_all = [];
    let background_color_all = [];
    let border_color_all = [];


    if (options.option_armor.collection === true) {
        label_all.push(language_pack[language].supercategory.armor);
        data_all.push(armor);
        background_color_all.push('rgba(46,65,114,0.2)');
        border_color_all.push('rgba(46,65,114,1)');
        remaining-=armor;
    }
    if (options.option_weapon.collection === true || options.option_shield.collection === true || options.option_talisman.collection === true) {
        label_all.push(language_pack[language].supercategory.equipment);
        data_all.push(equipment);
        background_color_all.push('rgba(170,108,57,0.2)');
        border_color_all.push('rgba(170,108,57,1)');
        remaining-=equipment;
    }
    if (options.option_sorcery.collection === true || options.option_incantation.collection === true) {
        label_all.push(language_pack[language].supercategory.magic);
        data_all.push(magic);
        background_color_all.push('rgba(111,37,111,0.2)');
        border_color_all.push('rgba(111,37,111,1)');
        remaining-=magic;
    }
    if (options.option_ashes.collection === true || options.option_spirit.collection === true) {
        label_all.push(language_pack[language].supercategory.skills);
        data_all.push(skills);
        background_color_all.push('rgba(170,160,57,0.2)');
        border_color_all.push('rgba(170,160,57,1)');
        remaining-=skills;
    }
    if (options.option_cookbook.collection === true || options.option_gesture.collection === true) {
        label_all.push(language_pack[language].supercategory.miscellaneous);
        data_all.push(miscellaneous);
        background_color_all.push('rgba(96,151,50,0.2)');
        border_color_all.push('rgba(96,151,50,1)');
        remaining-=miscellaneous;
    }
    label_all.push(language_pack[language].stats_remaining_label);
    data_all.push(remaining);
    background_color_all.push('rgba(255,255,255,0.1)');
    border_color_all.push('rgba(255,255,255,1)');



    chart_all.options.plugins.title.text = language_pack[language].supercategory.all;
    chart_all.data.labels = label_all;
    chart_all.data.datasets[0].data = data_all;
    chart_all.data.datasets[0].backgroundColor = background_color_all;
    chart_all.data.datasets[0].borderColor = border_color_all;
    chart_all.update();


    // armor
    let helm;
    let chest;
    let gauntlets = Math.floor(data.categories.gauntlets.stats.collected / data.categories.gauntlets.stats.total * 100);
    let legs = Math.floor(data.categories.legs.stats.collected / data.categories.legs.stats.total * 100);

    if (options.option_altered_armor.collection === true) {
        helm = Math.floor(data.categories.helm.stats.collected / data.categories.helm.stats.total * 100);
        chest = Math.floor(data.categories.chest.stats.collected / data.categories.chest.stats.total * 100);
    } else {
        helm = Math.floor(data.categories.helm.stats.collected / data.categories.helm.stats.total_alternative * 100);
        chest = Math.floor(data.categories.chest.stats.collected / data.categories.chest.stats.total_alternative * 100);
    }

    let label_armor = [];
    let data_armor = [];
    let background_color_armor = [];
    let border_color_armor = [];

    if (options.option_armor.collection === true) {
        label_armor.push(data.categories.helm[language].plural);
        data_armor.push(helm);
        background_color_armor.push('rgba(52,52,119,0.2)');
        border_color_armor.push('rgba(52,52,119,1)');
        label_armor.push(data.categories.chest[language].plural);
        data_armor.push(chest);
        background_color_armor.push('rgba(46,65,114,0.2)');
        border_color_armor.push('rgba(46,65,114,1)');
        label_armor.push(data.categories.gauntlets[language].plural);
        data_armor.push(gauntlets);
        background_color_armor.push('rgba(41,79,109,0.2)');
        border_color_armor.push('rgba(41,79,109,1)');
        label_armor.push(data.categories.legs[language].plural);
        data_armor.push(legs);
        background_color_armor.push('rgba(34,102,102,0.2)');
        border_color_armor.push('rgba(34,102,102,1)');
    }

    chart_armor.options.plugins.title.text = language_pack[language].supercategory.armor;
    chart_armor.data.labels = label_armor;
    chart_armor.data.datasets[0].data = data_armor;
    chart_armor.data.datasets[0].backgroundColor = background_color_armor;
    chart_armor.data.datasets[0].borderColor = border_color_armor;
    chart_armor.update();


    // equipment
    let weapon = Math.floor(data.categories.weapon.stats.collected / data.categories.weapon.stats.total * 100);
    let shield = Math.floor(data.categories.shield.stats.collected / data.categories.shield.stats.total * 100);
    let talisman;

    if (options.option_upgraded_talisman.collection === true) {
        talisman = Math.floor(data.categories.talisman.stats.collected / data.categories.talisman.stats.total * 100);
    } else {
        talisman = Math.floor(data.categories.talisman.stats.collected / data.categories.talisman.stats.total_alternative * 100);
    }

    let label_equipment = [];
    let data_equipment = [];
    let background_color_equipment = [];
    let border_color_equipment = [];

    if (options.option_weapon.collection === true) {
        label_equipment.push(data.categories.weapon[language].plural);
        data_equipment.push(weapon);
        background_color_equipment.push('rgba(170,57,57,0.2)');
        border_color_equipment.push('rgba(170,57,57,1)');
    }
    if (options.option_shield.collection === true) {
        label_equipment.push(data.categories.shield[language].plural);
        data_equipment.push(shield);
        background_color_equipment.push('rgba(170,108,57,0.2)');
        border_color_equipment.push('rgba(170,108,57,1)');
    }
    if (options.option_talisman.collection === true) {
        label_equipment.push(data.categories.talisman[language].plural);
        data_equipment.push(talisman);
        background_color_equipment.push('rgba(170,132,57,0.2)');
        border_color_equipment.push('rgba(170,132,57,1)');
    }

    chart_equipment.options.plugins.title.text = language_pack[language].supercategory.equipment;
    chart_equipment.data.labels = label_equipment;
    chart_equipment.data.datasets[0].data = data_equipment;
    chart_equipment.data.datasets[0].backgroundColor = background_color_equipment;
    chart_equipment.data.datasets[0].borderColor = border_color_equipment;
    chart_equipment.update();


    // magic
    let sorcery = Math.floor(data.categories.sorcery.stats.collected / data.categories.sorcery.stats.total * 100);
    let incantation = Math.floor(data.categories.incantation.stats.collected / data.categories.incantation.stats.total * 100);

    let label_magic = [];
    let data_magic = [];
    let background_color_magic = [];
    let border_color_magic = [];


    if (options.option_sorcery.collection === true) {
        label_magic.push(data.categories.sorcery[language].plural);
        data_magic.push(sorcery);
        background_color_magic.push('rgba(88,42,114,0.2)');
        border_color_magic.push('rgba(88,42,114,1)');
    }
    if (options.option_incantation.collection === true) {
        label_magic.push(data.categories.incantation[language].plural);
        data_magic.push(incantation);
        background_color_magic.push('rgba(136,45,96,0.2)');
        border_color_magic.push('rgba(136,45,96,1)');
    }

    chart_magic.options.plugins.title.text = language_pack[language].supercategory.magic;
    chart_magic.data.labels = label_magic;
    chart_magic.data.datasets[0].data = data_magic;
    chart_magic.data.datasets[0].backgroundColor = background_color_magic;
    chart_magic.data.datasets[0].borderColor = border_color_magic;
    chart_magic.update();


    // skills
    let ashes = Math.floor(data.categories.ashes.stats.collected / data.categories.ashes.stats.total * 100);
    let spirits = Math.floor(data.categories.spirits.stats.collected / data.categories.spirits.stats.total * 100);

    let label_skills = [];
    let data_skills = [];
    let background_color_skills = [];
    let border_color_skills = [];

    if (options.option_ashes.collection === true) {
        label_skills.push(data.categories.ashes[language].plural);
        data_skills.push(ashes);
        background_color_skills.push('rgba(170,151,57,0.2)');
        border_color_skills.push('rgba(170,151,57,1)');
    }
    if (options.option_spirit.collection === true) {
        label_skills.push(data.categories.spirits[language].plural);
        data_skills.push(spirits);
        background_color_skills.push('rgba(170,170,57,0.2)');
        border_color_skills.push('rgba(170,170,57,1)');
    }

    chart_skills.options.plugins.title.text = language_pack[language].supercategory.skills;
    chart_skills.data.labels = label_skills;
    chart_skills.data.datasets[0].data = data_skills;
    chart_skills.data.datasets[0].backgroundColor = background_color_skills;
    chart_skills.data.datasets[0].borderColor = border_color_skills;
    chart_skills.update();


    // miscellaneous
    let cookbook = Math.floor(data.categories.cookbook.stats.collected / data.categories.cookbook.stats.total * 100);
    let gesture = Math.floor(data.categories.gesture.stats.collected / data.categories.gesture.stats.total * 100);

    let label_miscellaneous = [];
    let data_miscellaneous = [];
    let background_color_miscellaneous = [];
    let border_color_miscellaneous = [];

    if (options.option_cookbook.collection === true) {
        label_miscellaneous.push(data.categories.cookbook[language].plural);
        data_miscellaneous.push(cookbook);
        background_color_miscellaneous.push('rgba(122,159,53,0.2)');
        border_color_miscellaneous.push('rgba(122,159,53,1)');
    }
    if (options.option_gesture.collection === true) {
        label_miscellaneous.push(data.categories.gesture[language].plural);
        data_miscellaneous.push(gesture);
        background_color_miscellaneous.push('rgba(45,136,45,0.2)');
        border_color_miscellaneous.push('rgba(45,136,45,1)');
    }

    chart_miscellaneous.options.plugins.title.text = language_pack[language].supercategory.miscellaneous;
    chart_miscellaneous.data.labels = label_miscellaneous;
    chart_miscellaneous.data.datasets[0].data = data_miscellaneous;
    chart_miscellaneous.data.datasets[0].backgroundColor = background_color_miscellaneous;
    chart_miscellaneous.data.datasets[0].borderColor = border_color_miscellaneous;
    chart_miscellaneous.update();

    document.getElementById('stats_armor').hidden = options.option_armor.collection === false;
    document.getElementById('stats_equipment').hidden = options.option_weapon.collection === false && options.option_shield.collection === false && options.option_talisman.collection === false;
    document.getElementById('stats_magic').hidden = options.option_sorcery.collection === false && options.option_incantation.collection === false;
    document.getElementById('stats_skills').hidden = options.option_ashes.collection === false && options.option_spirit.collection === false;
    document.getElementById('stats_miscellaneous').hidden = options.option_cookbook.collection === false && options.option_gesture.collection === false;
}

// create the chart
function create_chart () {
    const ctx = (id) => {
        return document.getElementById(id);
    }

    let dataset = {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    }

    let options = {
        responsive: true,
        scales: {
            y: {
                min: 0,
                max: 100,
                beginAtZero: true,
                ticks: {
                    stepSize: 20
                }
            }
        },
        plugins: {
            legend: {
                position: null,
            },
            title: {
                display: true,
                text: ''
            }
        },
        tooltips: {
            mode: 'index',
            callbacks: {
                afterLabel: (tooltipItem, data) => {
                    return data.datasets[tooltipItem.datasetIndex] + '%';
                }
            }
        }
    };
    Chart.defaults.color = '#f5deb3';
    chart_all = new Chart(ctx('chart_all'), {
        type: 'doughnut',
        data: JSON.parse(JSON.stringify(dataset)),
        scaleFontColor: '#fff',
        options: {
            responsive: true,
            legend: {
                labels: {
                    fontColor: 'white'
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: ''
                }
            }
        }
    });
    chart_armor = new Chart(ctx('chart_armor'), {
        type: 'bar',
        data: JSON.parse(JSON.stringify(dataset)),
        options: JSON.parse(JSON.stringify(options))
    });
    chart_equipment = new Chart(ctx('chart_equipment'), {
        type: 'bar',
        data: JSON.parse(JSON.stringify(dataset)),
        options: JSON.parse(JSON.stringify(options))
    });
    chart_magic = new Chart(ctx('chart_magic'), {
        type: 'bar',
        data: JSON.parse(JSON.stringify(dataset)),
        options: JSON.parse(JSON.stringify(options))
    });
    chart_skills = new Chart(ctx('chart_skills'), {
        type: 'bar',
        data: JSON.parse(JSON.stringify(dataset)),
        options: JSON.parse(JSON.stringify(options))
    });
    chart_miscellaneous = new Chart(ctx('chart_miscellaneous'), {
        type: 'bar',
        data: JSON.parse(JSON.stringify(dataset)),
        options: JSON.parse(JSON.stringify(options))
    });

    update_stats();
}