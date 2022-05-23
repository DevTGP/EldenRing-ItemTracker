from openpyxl import load_workbook
import json


class DataManager:
    def __init__(self):
        self.workbook = load_workbook('data.xlsx', data_only=True)
        self.data = {
            'categories': {

            },
            'structure': {
                'categories': [
                    'header armor',
                    'helm',
                    'chest',
                    'gauntlets',
                    'legs',

                    'header equipment',
                    'weapon',
                    'shield',
                    'talisman',

                    'header magic',
                    'sorcery',
                    'incantation',

                    'header skills',
                    'ashes',
                    'spirits',

                    'header miscellaneous',
                    'cookbook',
                    'gesture'
                ],
                'subcategories': {
                    'helm': None,
                    'chest': None,
                    'gauntlets': None,
                    'legs': None,
                    'set': None,
                    'weapon': [
                        'header sword',
                        'weapons_dagger',
                        'weapons_straightsword',
                        'weapons_greatsword',
                        'weapons_colossalsword',
                        'weapons_curvedsword',
                        'weapons_curvedgreatsword',
                        'weapons_katana',
                        'weapons_thrustingsword',
                        'weapons_heavythrustingsword',

                        'header sword',
                        'weapons_axe',
                        'weapons_greataxe',
                        'weapons_hammer',
                        'weapons_warhammer',
                        'weapons_spear',
                        'weapons_greatspear',
                        'weapons_halberd',

                        'header ranged',
                        'weapons_lightbow',
                        'weapons_bow',
                        'weapons_greatbow',
                        'weapons_crossbow',
                        'weapons_ballista',

                        'header other',
                        'weapons_colossalweapon',
                        'weapons_twinblade',
                        'weapons_reaper',
                        'weapons_whip',
                        'weapons_flail',
                        'weapons_claw',
                        'weapons_fist',
                        'weapons_torch',

                        'header magic',
                        'weapons_glintstonestaff',
                        'weapons_sacredseal'
                    ],
                    'shield': [
                        'header shield',
                        'shield_smallshield',
                        'shield_mediumshield',
                        'shield_greatshield'
                    ],
                    'talisman': None,
                    'incantation': [
                        'header incantation_order',
                        'incantation_erdtreeincantation',
                        'incantation_goldenorderincantation',
                        'incantation_twofingerincantation',

                        'header incantation_fire',
                        'incantation_firegiantincantation',
                        'incantation_firemonkincantation',
                        'incantation_godskinapostleincantation',

                        'header incantation_chaos',
                        'incantation_bestialincantation',
                        'incantation_bloodincantation',
                        'incantation_frenziedflameincantation',
                        'incantation_servantsofrotincantation',

                        'header incantation_dragon',
                        'incantation_dragoncommunionincantation',
                        'incantation_dragoncultincantation'
                    ],
                    'sorcery': [
                        'header sorcery_type',
                        'sorcery_glintstonesorceries',
                        'sorcery_gravitysorceries',
                        'sorcery_nightsorceries',
                        'sorcery_primevalsorceries',

                        'header sorcery_faction',
                        'sorcery_cariansorceries',
                        'sorcery_claymensorceries',
                        'sorcery_crystalliansorceries',
                        'sorcery_fullmoonsorceries',
                        'sorcery_lorettassorceries',

                        'header sorcery_element',
                        'sorcery_magmasorceries',
                        'sorcery_snowwitchsorceries',

                        'header sorcery_chaos',
                        'sorcery_aberrantsorceries',
                        'sorcery_deathsorceries'
                    ],
                    'ashes': None,
                    'spirits': None,
                    'cookbook': None,
                    'gesture': None
                }
            },
            'upgrades': []
        }

    def read_sheet(self, sheet_name):
        def generate_template():
            return {
                'id': None,
                'icon': None,
                'wiki': None,
                'position': 0,
                'collected': False,
                'name': {},
                'category': {},
                'subcategory': {}
            }

        def cell_value(cell):
            value = cell.value
            if value == 'none':
                return None
            if value == 'false':
                return False
            if value == 'true':
                return True
            return value

        sheet = self.workbook[sheet_name]
        category = {
            'id': sheet[3][6].value,
            'en': {
                'singular': sheet[3][7].value.split(';')[0],
                'plural': sheet[3][7].value.split(';')[1],
            },
            'de': {
                'singular': sheet[3][8].value.split(';')[0],
                'plural': sheet[3][8].value.split(';')[1],
            },
            'stats': {
                'total': 1,
                'total_alternative': 1,
                'collected': 0,
                'percentage': 0
            },
            'subcategories': {},
            'items': []
            }

        for i, row in enumerate(sheet.iter_rows(min_row=4)):
            if cell_value(row[0]) is not None:
                template = generate_template()
                template['id'] = cell_value(row[0])
                if cell_value(row[1]) is None:
                    try:
                        if sheet_name == 'sets':
                            template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '.png'
                        if sheet_name in ['helms', 'chests', 'gauntlets', 'legs']:
                            template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_elden_ring_wiki_guide_200px.png'
                        if sheet_name == 'weapons':
                            template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_ballista':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_ballista_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_axe':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_bow':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_claw':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_claw_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_colossalsword':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_colossal_swords_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_colossalweapon':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_colossal_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_greataxe':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_greataxe_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_crossbow':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_curvedsword':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_curved_sword_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_curvedgreatsword':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_curved_greatsword_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_dagger':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_dagger_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_fist':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_fist_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_flail':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_glintstonestaff':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_glintstonestaff_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_greatspear':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_greatspear_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_greataxe':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_greataxe_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_halberd':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_halberd_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_hammer':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_hammer_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_katana':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_katana_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_sacredseal':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_sacred_seal_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_spear':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_spear_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_straightsword':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_straight_sword_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_thrustingsword':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_thrusting_sword_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_warhammer':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_warhammer_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_whip':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_torch':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_reaper':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_reaper_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_heavythrustingsword':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_heavy_thrusting_sword_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_greatsword':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_greatbow':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_weapon_elden_ring_wiki_guide_200px.png'
                            if cell_value(row[9]) == 'weapons_twinblade':
                                template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_twinblade_weapon_elden_ring_wiki_guide_200px.png'

                        if sheet_name == 'ashes':
                            template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/ash_of_war_' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_elden_ring_wiki_guide_200px.png'
                        if sheet_name in ['spirits', 'shields']:
                            template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_elden_ring_wiki_guide_200px.png'
                        if sheet_name in ['incantation', 'sorceries', 'talismans', 'cookbooks']:
                            template['icon'] = 'https://eldenring.wiki.fextralife.com/file/Elden-Ring/' + cell_value(row[4]).lower().replace(' ', '_').replace("'", "") + '_' + category['en']['singular'].lower() + '_elden_ring_wiki_guide_200px.png'
                    except Exception as e:
                        print(e)
                else:
                    template['icon'] = cell_value(row[1])

                if cell_value(row[2]) is None:
                    try:
                        if sheet_name in ['sets', 'helms', 'chests', 'gauntlets', 'legs']:
                            template['wiki'] = 'https://eldenring.wiki.fextralife.com/' + cell_value(row[4]).replace(' ', '+')
                        if sheet_name == 'ashes':
                            template['wiki'] = 'https://eldenring.wiki.fextralife.com/' + 'Ash+of+War:+' + cell_value(row[4]).replace(' ', '+')
                        if sheet_name in ['incantation', 'sorceries', 'talismans', 'cookbooks', 'spirits', 'shields', 'weapons']:
                            template['wiki'] = 'https://eldenring.wiki.fextralife.com/' + cell_value(row[4]).replace(' ', '+')
                    except Exception as e:
                        print(e)
                else:
                    template['wiki'] = cell_value(row[2])

                template['position'] = cell_value(row[3])
                template['name'] = {
                    'en': cell_value(row[4]),
                    'de': cell_value(row[5])
                }
                template['category'] = {
                    'id': category['id'],
                    'en': cell_value(row[7]),
                    'de': cell_value(row[8])
                }
                template['subcategory'] = {
                    'id': cell_value(row[9]),
                    'en': cell_value(row[10]),
                    'de': cell_value(row[11])
                }
                if sheet_name == 'talismans':
                    template['upgraded'] = False
                    if cell_value(row[12]) is not None:
                        template['upgraded'] = True
                if sheet_name in ['helms', 'chests', 'gauntlets', 'legs']:
                    template['set'] = cell_value(row[12])
                    template['altered'] = False
                    if cell_value(row[13]) is not None:
                        template['altered'] = True

                if category['subcategories'].get(template['subcategory']['id']) is None and template['subcategory']['id'] is not None:
                    category['subcategories'][template['subcategory']['id']] = template['subcategory']
                category['items'].append(template)

        self.data['categories'][category['id']] = category

        category['stats']['total'] = len(self.data['categories'][category['id']]['items'])
        if sheet_name == 'talismans':
            category['stats']['total_alternative'] = len([[].append(item) for item in category['items'] if not item['upgraded']])
        if sheet_name in ['helms', 'chests']:
            category['stats']['total_alternative'] = len([[].append(item) for item in category['items'] if not item['altered']])

        for sc in self.data['categories'][category['id']]['subcategories']:
            print(sc)
        print()

    def get_upgrades(self):
        sheet = self.workbook['upgrades']
        upgrades = []

        for i, row in enumerate(sheet.iter_rows(min_row=2)):
            if row[0].value is not None:
                upgrades.append({
                    'new': row[0].value,
                    'old': row[1].value,
                    'category': row[2].value,
                    'version': row[3].value
                })
        self.data['upgrades'] = upgrades

    def run(self):
        self.get_upgrades()
        self.read_sheet('sets')
        self.read_sheet('helms')
        self.read_sheet('chests')
        self.read_sheet('gauntlets')
        self.read_sheet('legs')
        self.read_sheet('weapons')
        self.read_sheet('shields')
        self.read_sheet('talismans')
        self.read_sheet('sorceries')
        self.read_sheet('incantations')
        self.read_sheet('ashes')
        self.read_sheet('spirits')
        self.read_sheet('cookbooks')
        self.read_sheet('gestures')

        with open('C:\\Users\\manue\\PycharmProjects\\EldenRingItemTracker\\static\\data.json', 'w') as file:
            file.write(json.dumps(self.data))
            file.close()

        exit()


DM = DataManager()
DM.run()
