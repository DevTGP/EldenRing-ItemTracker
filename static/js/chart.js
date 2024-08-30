var chart_all = null;
var chart_armor = null;
var chart_equipment = null;
var chart_magic = null;
var chart_skills = null;
var chart_miscellaneous = null;


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
                label: (tooltipItem, data) => {
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
            },
            tooltips: {
                mode: 'index',
                callbacks: {
                    label: (tooltipItem, data) => {
                        return data.datasets[tooltipItem.datasetIndex] + '%';
                    }
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

// updates stats for chart
function update_stats () {
    for (let [key, value] of Object.entries(data.categories)) {
        data.categories[key].stats.collected = 0;
        for (let item of data.categories[key].items) {
            if (item.collected === true) {
                if (options.option_altered_armor.collection === false && ['helm', 'chest'].includes(item.category.id) && item.altered === true) {
                } else if (options.option_upgraded_talisman.collection === false && item.category.id === 'talisman' && item.upgraded === true) {
                } else {
                    if (!dlc && item.dlc) continue;
                    data.categories[key].stats.collected += 1;
                }
            }
        }
        if (dlc) {
            data.categories[key].stats.percentage = Math.floor(data.categories[key].stats.collected / data.categories[key].stats.total_dlc * 100);
        } else {
            data.categories[key].stats.percentage = Math.floor(data.categories[key].stats.collected / data.categories[key].stats.total * 100);
        }
    }

    // total stats
    let total = 0;

    let armor = 0;
    let equipment = 0;
    let magic = 0;
    let skills = 0;
    let miscellaneous = 0;

    if (dlc) {
        if (options.option_armor.collection === true) {
            if (options.option_altered_armor.collection === false) {
                total += data.categories.helm.stats.total_dlc;
                total += data.categories.chest.stats.total_dlc;
            } else {
                total += data.categories.helm.stats.total_alternative_dlc;
                total += data.categories.chest.stats.total_alternative_dlc;
            }
            total += data.categories.gauntlets.stats.total_dlc;
            total += data.categories.legs.stats.total_dlc;
            armor += data.categories.helm.stats.collected;
            armor += data.categories.chest.stats.collected;
            armor += data.categories.gauntlets.stats.collected;
            armor += data.categories.legs.stats.collected;
        }
        if (options.option_weapon.collection === true) {
            total += data.categories.weapon.stats.total_dlc;
            equipment += data.categories.weapon.stats.collected;
        }
        if (options.option_shield.collection === true) {
            total += data.categories.shield.stats.total_dlc;
            equipment += data.categories.shield.stats.collected;
        }
        if (options.option_talisman.collection === true) {
            if (options.option_upgraded_talisman.collection === false) {
                total += data.categories.talisman.stats.total_dlc;
            } else {
                total += data.categories.talisman.stats.total_alternative_dlc;
            }
            equipment += data.categories.talisman.stats.collected;
        }
        if (options.option_sorcery.collection === true) {
            total += data.categories.sorcery.stats.total_dlc;
            magic += data.categories.sorcery.stats.collected;
        }
        if (options.option_incantation.collection === true) {
            total += data.categories.incantation.stats.total_dlc;
            magic += data.categories.incantation.stats.collected;
        }
        if (options.option_ashes.collection === true) {
            total += data.categories.ashes.stats.total_dlc;
            skills += data.categories.ashes.stats.collected;
        }
        if (options.option_spirit.collection === true) {
            total += data.categories.spirits.stats.total_dlc;
            skills += data.categories.spirits.stats.collected;
        }
        if (options.option_cookbook.collection === true) {
            total += data.categories.cookbook.stats.total_dlc;
            miscellaneous += data.categories.cookbook.stats.collected;
        }
        if (options.option_gesture.collection === true) {
            total += data.categories.gesture.stats.total_dlc;
            miscellaneous += data.categories.gesture.stats.collected;
        }
        if (options.option_crystaltear.collection === true) {
            total += data.categories.crystaltear.stats.total_dlc;
            miscellaneous += data.categories.crystaltear.stats.collected;
        }
        if (options.option_remembrance.collection === true) {
            total += data.categories.remembrance.stats.total_dlc;
            miscellaneous += data.categories.remembrance.stats.collected;
        }
    } else {
        if (options.option_armor.collection === true) {
            if (options.option_altered_armor.collection === false) {
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
            if (options.option_upgraded_talisman.collection === false) {
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
        if (options.option_crystaltear.collection === true) {
            total += data.categories.crystaltear.stats.total;
            miscellaneous += data.categories.crystaltear.stats.collected;
        }
        if (options.option_remembrance.collection === true) {
            total += data.categories.remembrance.stats.total;
            miscellaneous += data.categories.remembrance.stats.collected;
        }
    }

    let remaining = 100;
    let remaining_items = total - armor - equipment - magic - skills - miscellaneous;

    let label_all = [];
    let data_all = [];
    let background_color_all = [];
    let border_color_all = [];


    if (options.option_armor.collection === true) {
        label_all.push(language_pack[language].supercategory.armor + ' (' + armor + ' Items)');
        armor = Math.floor(armor/total * 100);
        data_all.push(armor);
        background_color_all.push('rgba(46,65,114,0.2)');
        border_color_all.push('rgba(46,65,114,1)');
        remaining-=armor;
    }
    if (options.option_weapon.collection === true || options.option_shield.collection === true || options.option_talisman.collection === true) {
        label_all.push(language_pack[language].supercategory.equipment + ' (' + equipment + ' Items)');
        equipment = Math.floor(equipment/total * 100);
        data_all.push(equipment);
        background_color_all.push('rgba(170,108,57,0.2)');
        border_color_all.push('rgba(170,108,57,1)');
        remaining-=equipment;
    }
    if (options.option_sorcery.collection === true || options.option_incantation.collection === true) {
        label_all.push(language_pack[language].supercategory.magic + ' (' + magic + ' Items)');
        magic = Math.floor(magic/total * 100);
        data_all.push(magic);
        background_color_all.push('rgba(111,37,111,0.2)');
        border_color_all.push('rgba(111,37,111,1)');
        remaining-=magic;
    }
    if (options.option_ashes.collection === true || options.option_spirit.collection === true) {
        label_all.push(language_pack[language].supercategory.skills + ' (' + skills + ' Items)');
        skills = Math.floor(skills/total * 100);
        data_all.push(skills);
        background_color_all.push('rgba(170,160,57,0.2)');
        border_color_all.push('rgba(170,160,57,1)');
        remaining-=skills;
    }
    if (options.option_cookbook.collection === true || options.option_gesture.collection === true || options.option_crystaltear.collection === true || options.option_remembrance.collection === true) {
        label_all.push(language_pack[language].supercategory.miscellaneous + ' (' + miscellaneous + ' Items)');
        miscellaneous = Math.floor(miscellaneous/total * 100);
        data_all.push(miscellaneous);
        background_color_all.push('rgba(96,151,50,0.2)');
        border_color_all.push('rgba(96,151,50,1)');
        remaining-=miscellaneous;
    }
    label_all.push(language_pack[language].stats_remaining_label + ' (' + remaining_items + ' Items)');
    data_all.push(remaining);
    background_color_all.push('rgba(255,255,255,0.1)');
    border_color_all.push('rgba(255,255,255,1)');

    try {
        chart_all.options.plugins.title.text = language_pack[language].supercategory.all + ' (' + (total-remaining_items) + '/' + total + ')';
        chart_all.data.labels = label_all;
        chart_all.data.datasets[0].data = data_all;
        chart_all.data.datasets[0].backgroundColor = background_color_all;
        chart_all.data.datasets[0].borderColor = border_color_all;
        chart_all.update();
    } catch (e) {}


    // armor
    let total_armor ;
    let total_armor_collected = data.categories.gauntlets.stats.collected + data.categories.legs.stats.collected + data.categories.helm.stats.collected + data.categories.chest.stats.collected;
    let helm;
    let chest;
    let gauntlets = Math.floor(data.categories.gauntlets.stats.collected / data.categories.gauntlets.stats.total * 100);
    let legs = Math.floor(data.categories.legs.stats.collected / data.categories.legs.stats.total * 100);
    total_armor = data.categories.gauntlets.stats.total;
    total_armor += data.categories.legs.stats.total;

    if (options.option_altered_armor.collection === true) {
        helm = Math.floor(data.categories.helm.stats.collected / data.categories.helm.stats.total * 100);
        chest = Math.floor(data.categories.chest.stats.collected / data.categories.chest.stats.total * 100);
        total_armor += data.categories.helm.stats.total;
        total_armor += data.categories.chest.stats.total;
        if (options.option_armor.collection === true && !dlc) total_armor = data.categories.helm.stats.total + data.categories.chest.stats.total + data.categories.gauntlets.stats.total + data.categories.legs.stats.total;
    } else {
        helm = Math.floor(data.categories.helm.stats.collected / data.categories.helm.stats.total_alternative * 100);
        chest = Math.floor(data.categories.chest.stats.collected / data.categories.chest.stats.total_alternative * 100);
        total_armor += data.categories.helm.stats.total_alternative;
        total_armor += data.categories.chest.stats.total_alternative;
        if (options.option_armor.collection === true && !dlc) total_armor = data.categories.helm.stats.total_alternative + data.categories.chest.stats.total_alternative + data.categories.gauntlets.stats.total + data.categories.legs.stats.total;
    }

    let label_armor = [];
    let data_armor = [];
    let background_color_armor = [];
    let border_color_armor = [];

    if (options.option_armor.collection === true) {
        label_armor.push(data.categories.helm[language].plural + ' (' + data.categories.helm.stats.collected + ' Items)');
        data_armor.push(helm);
        background_color_armor.push('rgba(52,52,119,0.2)');
        border_color_armor.push('rgba(52,52,119,1)');
        label_armor.push(data.categories.chest[language].plural + ' (' + data.categories.chest.stats.collected + ' Items)');
        data_armor.push(chest);
        background_color_armor.push('rgba(46,65,114,0.2)');
        border_color_armor.push('rgba(46,65,114,1)');
        label_armor.push(data.categories.gauntlets[language].plural + ' (' + data.categories.gauntlets.stats.collected + ' Items)');
        data_armor.push(gauntlets);
        background_color_armor.push('rgba(41,79,109,0.2)');
        border_color_armor.push('rgba(41,79,109,1)');
        label_armor.push(data.categories.legs[language].plural + ' (' + data.categories.legs.stats.collected + ' Items)');
        data_armor.push(legs);
        background_color_armor.push('rgba(34,102,102,0.2)');
        border_color_armor.push('rgba(34,102,102,1)');
    }


    try {
        chart_armor.options.plugins.title.text = language_pack[language].supercategory.armor + ' (' + total_armor_collected + '/' + total_armor + ')';
        chart_armor.data.labels = label_armor;
        chart_armor.data.datasets[0].data = data_armor;
        chart_armor.data.datasets[0].backgroundColor = background_color_armor;
        chart_armor.data.datasets[0].borderColor = border_color_armor;
        chart_armor.update();
    } catch (e) {}




    // equipment
    let total_equipment = 0;
    let total_equipment_collected = 0;
    if (options.option_weapon.collection === true) total_equipment_collected += data.categories.weapon.stats.collected;
    if (options.option_shield.collection === true) total_equipment_collected += data.categories.shield.stats.collected;
    if (options.option_talisman.collection === true) total_equipment_collected += data.categories.talisman.stats.collected;

    let weapon = Math.floor(data.categories.weapon.stats.collected / data.categories.weapon.stats.total * 100);
    let shield = Math.floor(data.categories.shield.stats.collected / data.categories.shield.stats.total * 100);
    let talisman;

    if (options.option_weapon.collection === true && !dlc) total_equipment += data.categories.weapon.stats.total;
    if (options.option_shield.collection === true && !dlc) total_equipment += data.categories.shield.stats.total;

    if (options.option_upgraded_talisman.collection === false) {
        talisman = Math.floor(data.categories.talisman.stats.collected / data.categories.talisman.stats.total * 100);
        if (options.option_talisman.collection === true && !dlc) total_equipment += data.categories.talisman.stats.total;
    } else {
        talisman = Math.floor(data.categories.talisman.stats.collected / data.categories.talisman.stats.total_alternative * 100);
        if (options.option_talisman.collection === true && !dlc) total_equipment += data.categories.talisman.stats.total_alternative;
    }
    if (dlc) {
        weapon = Math.floor(data.categories.weapon.stats.collected / data.categories.weapon.stats.total_dlc * 100);
        shield = Math.floor(data.categories.shield.stats.collected / data.categories.shield.stats.total_dlc * 100);
        if (options.option_weapon.collection === true) total_equipment += data.categories.weapon.stats.total_dlc;
        if (options.option_shield.collection === true) total_equipment += data.categories.shield.stats.total_dlc;
        if (options.option_upgraded_talisman.collection === false) {
            talisman = Math.floor(data.categories.talisman.stats.collected / data.categories.talisman.stats.total_dlc * 100);
            if (options.option_talisman.collection === true) total_equipment += data.categories.talisman.stats.total_dlc;
        } else {
            talisman = Math.floor(data.categories.talisman.stats.collected / data.categories.talisman.stats.total_alternative_dlc * 100);
            if (options.option_talisman.collection === true) total_equipment += data.categories.talisman.stats.total_alternative_dlc;
        }
    }

    let label_equipment = [];
    let data_equipment = [];
    let background_color_equipment = [];
    let border_color_equipment = [];

    if (options.option_weapon.collection === true) {
        label_equipment.push(data.categories.weapon[language].plural + ' (' + data.categories.weapon.stats.collected + ' Items)');
        data_equipment.push(weapon);
        background_color_equipment.push('rgba(170,57,57,0.2)');
        border_color_equipment.push('rgba(170,57,57,1)');
    }
    if (options.option_shield.collection === true) {
        label_equipment.push(data.categories.shield[language].plural + ' (' + data.categories.shield.stats.collected + ' Items)');
        data_equipment.push(shield);
        background_color_equipment.push('rgba(170,108,57,0.2)');
        border_color_equipment.push('rgba(170,108,57,1)');
    }
    if (options.option_talisman.collection === true) {
        label_equipment.push(data.categories.talisman[language].plural + ' (' + data.categories.talisman.stats.collected + ' Items)');
        data_equipment.push(talisman);
        background_color_equipment.push('rgba(170,132,57,0.2)');
        border_color_equipment.push('rgba(170,132,57,1)');
    }


    try {
        chart_equipment.options.plugins.title.text = language_pack[language].supercategory.equipment + ' (' + total_equipment_collected + '/' + total_equipment + ')';
        chart_equipment.data.labels = label_equipment;
        chart_equipment.data.datasets[0].data = data_equipment;
        chart_equipment.data.datasets[0].backgroundColor = background_color_equipment;
        chart_equipment.data.datasets[0].borderColor = border_color_equipment;
        chart_equipment.update();
    } catch (e) {}




    // magic
    let total_magic = 0;
    let total_magic_collected = 0;
    if (options.option_sorcery.collection === true) total_magic_collected += data.categories.sorcery.stats.collected;
    if (options.option_incantation.collection === true) total_magic_collected += data.categories.incantation.stats.collected;


    let sorcery = Math.floor(data.categories.sorcery.stats.collected / data.categories.sorcery.stats.total * 100);
    let incantation = Math.floor(data.categories.incantation.stats.collected / data.categories.incantation.stats.total * 100);
    if (options.option_sorcery.collection === true && !dlc) total_magic += data.categories.sorcery.stats.total;
    if (options.option_incantation.collection === true && !dlc) total_magic += data.categories.incantation.stats.total;

    if (dlc) {
        sorcery = Math.floor(data.categories.sorcery.stats.collected / data.categories.sorcery.stats.total_dlc * 100);
        incantation = Math.floor(data.categories.incantation.stats.collected / data.categories.incantation.stats.total_dlc * 100);
        if (options.option_sorcery.collection === true) total_magic += data.categories.sorcery.stats.total_dlc;
        if (options.option_incantation.collection === true) total_magic += data.categories.incantation.stats.total_dlc;
    }

    let label_magic = [];
    let data_magic = [];
    let background_color_magic = [];
    let border_color_magic = [];


    if (options.option_sorcery.collection === true) {
        label_magic.push(data.categories.sorcery[language].plural + ' (' + data.categories.sorcery.stats.collected + ' Items)');
        data_magic.push(sorcery);
        background_color_magic.push('rgba(88,42,114,0.2)');
        border_color_magic.push('rgba(88,42,114,1)');
    }
    if (options.option_incantation.collection === true) {
        label_magic.push(data.categories.incantation[language].plural + ' (' + data.categories.incantation.stats.collected + ' Items)');
        data_magic.push(incantation);
        background_color_magic.push('rgba(136,45,96,0.2)');
        border_color_magic.push('rgba(136,45,96,1)');
    }


    try {
        chart_magic.options.plugins.title.text = language_pack[language].supercategory.magic + ' (' + total_magic_collected + '/' + total_magic + ')';
        chart_magic.data.labels = label_magic;
        chart_magic.data.datasets[0].data = data_magic;
        chart_magic.data.datasets[0].backgroundColor = background_color_magic;
        chart_magic.data.datasets[0].borderColor = border_color_magic;
        chart_magic.update();
    } catch (e) {}




    // skills
    let total_skills = 0;
    let total_skills_collected = 0;
    if (options.option_ashes.collection === true) total_skills_collected += data.categories.ashes.stats.collected;
    if (options.option_spirit.collection === true) total_skills_collected += data.categories.spirits.stats.collected;

    let ashes = Math.floor(data.categories.ashes.stats.collected / data.categories.ashes.stats.total * 100);
    let spirits = Math.floor(data.categories.spirits.stats.collected / data.categories.spirits.stats.total * 100);
    if (options.option_ashes.collection === true && !dlc) total_skills += data.categories.ashes.stats.total;
    if (options.option_spirit.collection === true && !dlc) total_skills += data.categories.spirits.stats.total;
    if (dlc) {
        ashes = Math.floor(data.categories.ashes.stats.collected / data.categories.ashes.stats.total_dlc * 100);
        spirits = Math.floor(data.categories.spirits.stats.collected / data.categories.spirits.stats.total_dlc * 100);
        if (options.option_ashes.collection === true) total_skills += data.categories.ashes.stats.total_dlc;
        if (options.option_spirit.collection === true) total_skills += data.categories.spirits.stats.total_dlc;
    }

    let label_skills = [];
    let data_skills = [];
    let background_color_skills = [];
    let border_color_skills = [];

    if (options.option_ashes.collection === true) {
        label_skills.push(data.categories.ashes[language].plural + ' (' + data.categories.ashes.stats.collected + ' Items)');
        data_skills.push(ashes);
        background_color_skills.push('rgba(170,151,57,0.2)');
        border_color_skills.push('rgba(170,151,57,1)');
    }
    if (options.option_spirit.collection === true) {
        label_skills.push(data.categories.spirits[language].plural + ' (' + data.categories.spirits.stats.collected + ' Items)');
        data_skills.push(spirits);
        background_color_skills.push('rgba(170,170,57,0.2)');
        border_color_skills.push('rgba(170,170,57,1)');
    }


    try {
        chart_skills.options.plugins.title.text = language_pack[language].supercategory.skills + ' (' + total_skills_collected + '/' + total_skills + ')';
        chart_skills.data.labels = label_skills;
        chart_skills.data.datasets[0].data = data_skills;
        chart_skills.data.datasets[0].backgroundColor = background_color_skills;
        chart_skills.data.datasets[0].borderColor = border_color_skills;
        chart_skills.update();
    } catch (e) {}




    // miscellaneous
    let total_miscellaneous = 0;
    let total_miscellaneous_collected = 0;
    if (options.option_cookbook.collection === true) total_miscellaneous_collected += data.categories.cookbook.stats.collected;
    if (options.option_gesture.collection === true) total_miscellaneous_collected += data.categories.gesture.stats.collected;
    if (options.option_crystaltear.collection === true) total_miscellaneous_collected += data.categories.crystaltear.stats.collected;
    if (options.option_remembrance.collection === true) total_miscellaneous_collected += data.categories.remembrance.stats.collected;


    let cookbook = Math.floor(data.categories.cookbook.stats.collected / data.categories.cookbook.stats.total * 100);
    let gesture = Math.floor(data.categories.gesture.stats.collected / data.categories.gesture.stats.total * 100);
    let crystaltear = Math.floor(data.categories.crystaltear.stats.collected / data.categories.crystaltear.stats.total * 100);
    let remembrance = Math.floor(data.categories.remembrance.stats.collected / data.categories.remembrance.stats.total * 100);
    if (options.option_cookbook.collection === true && !dlc) total_miscellaneous += data.categories.cookbook.stats.total;
    if (options.option_gesture.collection === true && !dlc) total_miscellaneous += data.categories.gesture.stats.total;
    if (options.option_crystaltear.collection === true && !dlc) total_miscellaneous += data.categories.crystaltear.stats.total;
    if (options.option_remembrance.collection === true && !dlc) total_miscellaneous += data.categories.remembrance.stats.total;
    if (dlc) {
        cookbook = Math.floor(data.categories.cookbook.stats.collected / data.categories.cookbook.stats.total_dlc * 100);
        gesture = Math.floor(data.categories.gesture.stats.collected / data.categories.gesture.stats.total_dlc * 100);
        crystaltear = Math.floor(data.categories.crystaltear.stats.collected / data.categories.crystaltear.stats.total_dlc * 100);
        remembrance = Math.floor(data.categories.remembrance.stats.collected / data.categories.remembrance.stats.total_dlc * 100);
        if (options.option_cookbook.collection === true) total_miscellaneous += data.categories.cookbook.stats.total_dlc;
        if (options.option_gesture.collection === true) total_miscellaneous += data.categories.gesture.stats.total_dlc;
        if (options.option_crystaltear.collection === true) total_miscellaneous += data.categories.crystaltear.stats.total_dlc;
        if (options.option_remembrance.collection === true) total_miscellaneous += data.categories.remembrance.stats.total_dlc;
    }

    let label_miscellaneous = [];
    let data_miscellaneous = [];
    let background_color_miscellaneous = [];
    let border_color_miscellaneous = [];

    if (options.option_cookbook.collection === true) {
        label_miscellaneous.push(data.categories.cookbook[language].plural + ' (' + data.categories.cookbook.stats.collected + ' Items)');
        data_miscellaneous.push(cookbook);
        background_color_miscellaneous.push('rgba(122,159,53,0.2)');
        border_color_miscellaneous.push('rgba(122,159,53,1)');
    }
    if (options.option_gesture.collection === true) {
        label_miscellaneous.push(data.categories.gesture[language].plural + ' (' + data.categories.gesture.stats.collected + ' Items)');
        data_miscellaneous.push(gesture);
        background_color_miscellaneous.push('rgba(45,136,45,0.2)');
        border_color_miscellaneous.push('rgba(45,136,45,1)');
    }
    if (options.option_crystaltear.collection === true) {
        label_miscellaneous.push(data.categories.crystaltear[language].plural + ' (' + data.categories.crystaltear.stats.collected + ' Items)');
        data_miscellaneous.push(crystaltear);
        background_color_miscellaneous.push('rgba(45,136,45,0.2)');
        border_color_miscellaneous.push('rgba(45,136,45,1)');
    }
    if (options.option_remembrance.collection === true) {
        label_miscellaneous.push(data.categories.remembrance[language].plural + ' (' + data.categories.remembrance.stats.collected + ' Items)');
        data_miscellaneous.push(remembrance);
        background_color_miscellaneous.push('rgba(45,136,45,0.2)');
        border_color_miscellaneous.push('rgba(45,136,45,1)');
    }


    try {
        chart_miscellaneous.options.plugins.title.text = language_pack[language].supercategory.miscellaneous + ' (' + total_miscellaneous_collected + '/' + total_miscellaneous + ')';
        chart_miscellaneous.data.labels = label_miscellaneous;
        chart_miscellaneous.data.datasets[0].data = data_miscellaneous;
        chart_miscellaneous.data.datasets[0].backgroundColor = background_color_miscellaneous;
        chart_miscellaneous.data.datasets[0].borderColor = border_color_miscellaneous;
        chart_miscellaneous.update();
    } catch (e) {}



    document.getElementById('stats_armor').hidden = options.option_armor.collection === false;
    document.getElementById('stats_equipment').hidden = options.option_weapon.collection === false && options.option_shield.collection === false && options.option_talisman.collection === false;
    document.getElementById('stats_magic').hidden = options.option_sorcery.collection === false && options.option_incantation.collection === false;
    document.getElementById('stats_skills').hidden = options.option_ashes.collection === false && options.option_spirit.collection === false;
    document.getElementById('stats_miscellaneous').hidden = options.option_cookbook.collection === false && options.option_gesture.collection === false && options.option_crystaltear.collection === false && options.option_remembrance.collection === false;
}
