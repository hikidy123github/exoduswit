

// GUN DEFINITIONS
const combineStats = function(arr) {
    try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
        for (let i=0; i<data.length; i++) {
            data[i] = data[i] * component[i];
        }
    });
     
    return {
        reload:     data[0],
        recoil:     data[1],
        shudder:    data[2], 
        size:       data[3],
        health:     data[4],
        damage:     data[5],
        pen:        data[6],
        speed:      data[7],
        maxSpeed:   data[8],
        range:      data[9],
        density:    data[10],
        spray:      data[11],
        resist:     data[12],
    };
    } catch(err) {
        console.log(err);
        console.log(JSON.stringify(arr));
    }
};
const skillSet = (() => {
    let config = require('../config.json');
    let skcnv = {
        rld: 0,
        pen: 1,
        str: 2,
        dam: 3,
        spd: 4,
      
        shi: 5,
        atk: 6,
        hlt: 7,
        rgn: 8,
        mob: 9,
    };
    return args => {
        let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let s in args) {
            if (!args.hasOwnProperty(s)) continue;
            skills[skcnv[s]] = Math.round(config.MAX_SKILL * args[s]);
        }
        return skills;
    };
})();

const g = { // Gun info here 
    trap:               [36,    1,     0.25,   0.6,    1,      0.75,   1,      5,      1,      1,      1,      15,     3], 
        machtrap:       [0.77,  1,     1,      1,      0.88,   0.9,    1.2,    0.8,      1,      1,      1,      1,     1], 
        snipetrap:      [1.2,   1,     1,      1,      1.1,   1.2,    1.2,    0.8,      1,      1,      1,      1,     1], 
        guardtrap:      [1, .5, 1, 1.1, 1.1, 1, 1.1, .85, .75, 1.2, 1.1, 1, 1.1],
        pistontrap:     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    swarm:              [18,    0.25,  0.05,   0.4,    1,      0.75,   1,      4,      1,      1,      1,      5,      1],  
        djynnswarm:     [0.7,   0.25,  0.05,   1,    1,      3,      1,      4,      1,      5,      1,      5,      1],  
        frigate:        [2,   0.2,   0.05,   1,    1,      1,      1,      3.2,    1,      1,      1,      5,      1],  
          uboat:        [3.5,   0.15,   0.05,   1,    1,      1.25,      1,      2.4,    1,      1,      1,      5,      1], 
        pistonfront:    [.8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        pistonback:     [1, 1.4, 1, 1, .9, .9, .9, 1, 1, 1, 1, 1, 1],
    drone:              [50,    0.25,  0.1,    0.6,    1,      1,      1,      2,      1,      1,      1,      0.1,    1], 
    factory:            [60,    1,     0.1,    0.7,    1,      2,   1,      3,      1,      1,      1,      0.1,    1], 
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    bullet:             [16,    1.4,   0.1,    1,      2,      0.2,    1,      4.5,    1,      1,      1,      15,     1],
    attacksalot:        [0.15,  0,     0.1,    1,      1,      0.95,   1,      4.5,    1,      1,      1,      15,     1],  
    attackshalf:        [0.55,  0,     0.1,    1,      1,      0.75,   1,      4.5,    1,      1,      1,      15,     1], 
    buff:               [0.99,  1,     1,      1,      1.5,      1.2,  1.2,    1.1,    1,      1,      1,      1,      1.11],
    nerf:               [0.99,  1,     1,      1,      0.99,   0.88,   0.99,   1,      1,      1,      1,      1,      1,],
    blank:              [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
        spam:           [1.1,   1,     1,      1.05,   1,      1.1,    1,      0.9,    0.7,    1,      1,      1,      1.05],      
        minion:         [1,     1,     2,      1,      0.4,    0.4,    1.2,    1,      1,      0.75,   1,      2,      1],      
        single:         [1.05,  1,     1,      1,      1,      1,      1,      1.05,   1,      1,      1,      1,      1],  
 basic:                 [18,    1.4,   0.1,    1,      1,      2.02,   1,      4.5,    1,      1,      1,      15,     1],    
    sniper:             [1.35,  1,     0.25,   1,      1,      2.1,    1.1,    1.5,    1.5,    1,      1.5,    0.2,    1.15],
        click:          [1.15,  .25,   .5,     1,      .6,     .8,     .7,     .9,     .975,   1,      .9,     .25,    1],
        rifle:          [0.8,   0.8,   1.5,    1,      0.8,    2.55,    0.9,    1,      1,      1,      1,      2,      1],     
        assass:         [1.65,  1,     0.25,   1,      1.15,   3,      1.1,    1.18,   1.18,   1,      3,      1,      1.3],
        hunter:         [1.5,   0.7,   1,      0.95,   1,      0.9,    1,      1.1,    0.8,    1,      1.2,    1,      1.15], 
            hunter2:    [1,     1,     1,      0.9,    2,      0.5,    1.5,    1,      1,      1,      1.2,    1,      1.1], 
            preda:      [1.4,   1,     1,      0.8,    1.5,    0.9,    1.2,    0.9,    0.9,    1,      1,      1,      1],   
            snake:      [0.4,   1,     4,      1,      1.5,    0.9,    1.2,    0.2,    0.35,   1,      3,      6,      0.5],   
            sidewind:   [1.5,   2,     1,      1,      1.5,    0.9,    1,      0.15,   0.5,    1,      1,      1,      1],  
            snakeskin:  [0.6,   1,     2,      1,      0.5,    0.5,    1,      1,      0.2,    0.4,    1,      5,      1],
    mach:               [0.5,   0.8,   1.7,    1,      0.7,    0.7,    1,      1,      0.8,    1,      1,      2.5,    1],
      navyistt: [.5, 3, 2, .9, 1, 0, 1, .9, .85, 0.2, 1, 2.55, 1],
        blast:          [.88,   1.2,   1.25,   1.05,   .9,     1.15,   1.15,   .8,     .465,   .65,    .5,     1.5,    .8],
            furnace:    [1.22,  1.8,   1.25,   1.05,   .9,     1.5,    1.25,   .75,     .465,   .65,    .3,     1.5,    .8],
        blaster:        [1,     1.2,   1.25,   1.1,    1.5,    1,      0.6,    0.8,    0.33,   0.6,    0.5,    1.5,    0.8], 
        inferno:        [1.6,   0.44,  0.5,    1,      0.5,    1,    1,      1,      0.8,    1,      1,      2.5,    1],
            sniferno:   [1.8,   0.22,  0.8,    1,      0.5,    1.3,    1,      1.5,      0.8,    1,      1,      2.5,    1],
        chain:          [1.25,  1.33,  0.8,    1,      0.8,    1,      1.1,    1.25,   1.25,   1.1,    1.25,   0.5,    1.1],
    flank:              [1,     1.2,   1,      1,      1.02,   0.81,   0.9,    1,      0.85,   1,      1.2,    1,      1],
    hurricane:          [1,     1,     1,      1,      1.3,    1.3,    1.1,    1.5,    1.15,   1,      1,      1,      1],
        tri:            [1,     0.9,   1,      1,      0.9,    1,      1,      0.8,    0.8,    0.6,    1,      1,      1],  
            trifront:   [1,     0.2,   1,      1,      1,      1,      1,      1.3,    1.1,    1.5,    1,      1,      1],  
            thruster:   [1,     1.5,   2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
        auto: /*pure*/  [1.8,   0.75,  0.5,    0.8,    0.9,    0.6,    1.2,    1.1,    1,      0.8,    1.3,    1,      1.25],
            five:       [1.15,  1,     1,      1,      1,      1,      1,      1.05,   1.05,   1.1,    2,      1,      1],   
            autosnipe:  [1,     1,     1,      1.4,    2,      1,      1,      1,      1,      1,      1,      1,      1],   
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */ 
    pound:              [2,     1.6,   1,      1,      1,      2,      1,      0.85,   0.8,    1,      1.5,    1,      1.15], 
        blast:          [.88,   1.2,   1.25,   1.05,   .9,     1.15,   1.15,   .8,     .465,   .65,    .5,     1.5,    .8],
        weakpound:      [2,     1.5,   1,      1,      1,      1,    1,      0.85001,0.8,    1,      1.5,    1,      1.15], 
        oblit:          [2.5,   2.4,   .5,     1,      1.6,    1.6,    1.9,    1.17,   .8,     1.1,    1.1,    .25,    2],
        explode:        [2.0005,1.6,   1,      1,      1,      2.5,    1,      1.99,   0.8,    1,      1.5,    1,      1.15], 
        destroy:        [2.2,   1.8,   0.5,    1,      2,      2.6,      1.2,    0.65,   0.5,    1,      2,      1,      3],
            anni:       [0.85,  1.25,  1,      1,      1,      3,      1,      1,      1,      1,      1,      1,      1], 
          redistribute: [4.75,  3, 1, .4, 1.85, 1.85, 1.9, 2, 1.85, 1, 1.25, 1.15, 1.25],
            good:       [0.1,    5,   1,      1,      1,      3,      1,      5,      1,      1,      1,      1,      1],
            hive:       [1.5,   0.8,   1,      0.8,    0.7,    0.3,    1,      1,      0.6,    1,      1,      1,      1],
        launcher:       [1.5,   1.5,   .1,     .72,    1.05,   .925,   1,      .9,     1.2,    1.1,    1,      1,    1.5],
          speedbump:    [1.78,  1.9,   .5,     .9,     1.9,   1.11,   1,      .7,     1.2,    1.1,    1,      1,    1.5],
          missileTrail: [.6, .25, 2, 1, 1, .9, .7, .4, 1, .5, 1, 1, 1],
        destroy:        [2.2,   1.8,   0.5,    1,      2,      2,      1.2,    0.65,   0.5,    1,      2,      1,      3],
        arty:           [1.2,   0.7,   1,      0.9,    1,      1,      1,      1.15,   1.1,    1,      1.5,    1,      1], 
            mortar:     [1.2,   1,     1,      1,      1.1,    1,      1,      0.8,    0.8,    1,      1,      1,      1],   
            spreadmain: [0.78125, 0.25, 0.5,   1,      0.5,    1,      1,   1.5/0.78, 0.9/0.78,1,      1,      1,      1], 
            spread:     [1.5,   1,     0.25,   1,      1,      1,      1,      0.7,    0.7,    1,      1,      0.25,   1],   
            skim:       [1.33,  0.8,   0.8,    0.9,    1.35,   0.8,    2,      0.3,    0.3,    1,      1,      1,      1.1], 
            twist:      [1,     1,     1,      0.75,   1,      1,      1,      1,      1,      1,      1,      1,      1],   
    twin:               [1,     0.5,   0.9,    1,      0.9,    0.7,    1,      1,      1,      1,      1,      1.2,    1],
        bent:           [1.1,   1,     0.8,    1,      0.9,    1,      0.8,    1,      1,      1,      0.8,    0.5,    1],    
        heavytwin:      [1.6,   1,     1,      1,      0.99,   1.2,    1,      0.84,   0.8,    1,      1.9,    1.11,   1.1],
        triple:         [1.2,   0.667, 0.9,    1,      0.85,   0.85,   0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            quint:      [1.5,   0.667, 0.9,    1,      1,      1,      0.9,    1,      1,      1,      1.1,    0.9,    0.95], 
            dual:       [2,     1,     0.8,    1,      1.5,    1,      1,      1.3,    1.1,    1,      1,      1,      1.25], 
        double:         [1,     1,     1,      1,      1,      0.9,    1,      1,      1,      1,      1,      1,      1],
            hewn:       [1.25,  1.5,   1,      1,      0.9,    0.85,   1,      1,      0.9,    1,      1,      1,      1],
        puregunner:     [1,     0.25,  1.5,    1.2,    1.35,   0.25,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
            machgun:    [0.66,  0.8,   2,      1,      1,      0.75,   1,      1.2,    0.8,    1,      1,      2.5,    1], 
    gunner:             [1.25,  0.25,  1.5,    1.1,    1,      0.35,   1.35,   0.9,    0.8,    1,      1.5,    1.5,    1.2],
        power:          [1,     1,     0.6,    1.2,    1,      1,      1.25,   2,      1.7,    1,      2,      0.5,    1.5], 
            nail:       [0.85,  2.5,   1,      0.8,    1,      0.7,    1,      1,      1,      1,      2,      1,      1],       
        fast:           [1,     1,     1,      1,      1,      1,      1,      1.2,    1,      1,      1,      1,      1], 
    pelleter:           [1.35,  0.25,  1.5,    1.2,    1.1,    0.44,   1.25,   0.8,    0.65,   1,      1.5,    1.5,    1.2],
      glass:            [0.5,  0.4,   1.9,    1.2,    1.5,    0.6,    1.55,   1.2,    0.65,   1.2,    1.5,    1.8,    1.5],
      borer:            [1,     0.25,  0.25,   1.2,    1,      1/6,    1.25,   1,    0.65,   1,      1.5,    1.5,    1.2],
    lance:              [0.4,   0,     1,      2,       2,     3,      3,       1,      2,   0.0001,     2,      1,      2],
        akafuji:        [0.4,   0,     1,      1,       2,     1,      1,       1,      2,   0.0001,     2,      1,      2],
        axe:            [0.5,   0,     1,      2,       4,     5,      5,       1,      2,   0.0001,     2,      1,      2],
        lanceweak:      [0.2,   0,     1,      2,       2,     1.5,    3,       1,      2,   0.0001,     2,      1,      2],
        waraxe:         [0.7,   0,     1,      2,       5,     7,      3,       1,      2,   0.0001,     2,      1,      2],
    uzi:                [1.4,   0.6,   1,      1,   0.35,   1,      1.5,    1.45,   1,      1,      1.35,   0.2,    1.2],
        mini:           [1.25,  0.6,   1,      1,    0.55,   0.45,   1.25,   1.33,   1,      1,      1.25,   0.5,    1.1], 
            stream:     [1.1,   0.6,   1,      1,      1,      0.65,   1,      1.24,   1,      1,      1,      1,      1],
              smoth:    [0.8,   0.6,   1,      1,      1.25,    0.65,   0.85,     1.13,   1,      1,      0.85,      1.4,      0.9],         

    surpriser:          [2,     1.4,   1.2,    1.5,    .655,    1.5,   .63,    1.425,  .8,     1,      1.2,    3.6,    1],
        multishot:      [4,     1,     1.1,    1.5,    .875,    1,     .72,    1.675,  .7,     1,      1.2,    2.5,    1], 
            shotgun:    [8,     0.4,   1,      1.5,    1,      0.4,    0.8,    1.8,    0.6,    1,      1.2,    1.2,    1], 
    turret:             [2,     1,     1,      1,      0.8,    0.6,    0.7,    1,      1,      1,      0.1,    1,      1], 
    ceptionTurret:      [1.2,   .8,    1.2,    1,     .825,    .825,   .825,   1,      1,     .9,      1,      1,      1],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    battle:             [1,     1,     1,      1,      1.25,   1.15,   1,      1,      0.85,   1,      1,      1,      1.1],
        bees:           [1.3,   1,     1,      1.4,    1,      1.5,    0.5,    3,      1.5,    1,      0.25,   1,      1],   
        carrier:        [1.5,   1,     1,      1,      1,      0.8,    1,      1.3,    1.2,    1.2,    1,      1,      1],
    hexatrap:           [1.3,   1,     1.25,   1,      1,      1,      1,      0.8,    1,      0.5,    1,      1,      1],     
    block:              [1.1,   2,     0.1,    1.5,    2,      1,      1.25,   1.5,    2.5,    1.25,   1,      1,      1.25],
        construct:      [1.3,   1,     1,      0.9,    1,      1,      1,      1,      1.1,    1,      1,      1,      1], 
        boomerang:      [0.8,   1,     1,      1,      0.5,    0.5,    1,      0.75,   0.75,   1.333,  1,      1,      1], 
    over:               [1.25,  1,     1,      0.85,   0.7,    0.8,    1,      1,      0.9,    1,      2,      1,      1],  
        commander:      [1.3,   1,     1,      1,      1.02,   1,      1,      1,      1,      1,      1,      1,      1], 
        hex:            [1.24,  1,     1,      0.85,   0.7,    0.65,    1.1,      0.99,      0.9,    1,      2,      1,      1], 
        lightning:      [1,     1,     1,      0.75,   0.7,    0.5,    1.5,    1.5,      0.9,    1,      2,      1,      1], 
        learner:        [1.5,   1.35,  1,      0.85,   0.7,    1.6,    1,      0.55,   0.9,    1,      2,      1,      1.015555555555], 
        meta:           [1.333, 1,     1,      1,      1,      0.667,  1,      1,      1,      1,      1,      1,      1],   
        weak:           [2,     1,     1,      1,      0.6,    0.6,    0.8,    0.5,    0.7,    0.25,   0.3,    1,      1],   
        master:         [3,     1,     1,      0.7,    0.4,    0.7,    1,      1,      1,      0.1,    0.5,    1,      1], 
        sunchip:        [5,     1,     1,      1.4,    0.5,    0.4,    0.6,    1,      1,      1,      0.8,    1,      1],     
    babyfactory:        [1.5,   1,     1,      1,      1,      1,      1,      1,      1.35,   1,      1,      1,      1], 
    lowpower:           [1,     1,     2,      1,      0.5,    0.5,    0.7,    1,      1,      1,      1,      0.5,    0.7], 
    halfrecoil:         [1,     0.5,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    norecoil:           [1,     0,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    morerecoil:         [1,     1.15,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    muchmorerecoil:     [1,     1.35,  1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    lotsmorrecoil:      [1,     1.8,   1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    tonsmorrecoil:      [1,     4,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    doublereload:       [0.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],  
    morereload:         [0.75,  1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1],
    size2:              [1,     1,     1,      2,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    halfreload:         [2,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    lessreload:         [1.5,   1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    threequartersrof:   [1.333, 1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      1,      1], 
    morespeed:          [1,     1,     1,      1,      1,      1,      1,      1.3,    1.3,    1,      1,      1,      1], 
    bitlessspeed:       [1,     1,     1,      1,      1,      1,      1,      0.93,   0.93,   1,      1,      1,      1], 
    slow:               [1,     1,     1,      1,      1,      1,      1,      0.7,    0.7,    1,      1,      1,      1], 
    halfspeed:          [1,     1,     1,      1,      1,      1,      1,      0.5,    0.5,    1,      1,      1,      1],
    notdense:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      0.1,    1,      1],
    halfrange:          [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.5,    1,      1,      1], 
    highdamage:         [0.8,    0.5,   1 ,    1,      2,      2,      2,    1.5,     1,      1.5,    2,    0.5,     1.5],
    higherdamage:       [0.8,    0.5,   1 ,    1,      4,      4,      4,    1.5,     1,      1.5,    2,    0.5,     1.5],
    highestdamage:      [0.8,    0.5,   1 ,    1,      6.5,   6.5,   6.5,    1.5,     1,      1.5,    2,    0.5,     1.5],
    fake:               [1,     1,     1,   0.00001, 0.0001,   1,      1,   0.00001,   2,      0,      1,      1,      1],
    spray360:           [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      360,      1],
    shortlive:          [0.7,    1.4,   0.1,    1,      1,      2.02,   1,      4.5,    1,      0.001,      1,      15,     1],  
  //no stuff
    norange:            [1,     1,     1,      1,      1,      1,      1,      1,      1,      0.05,    1,      1,      1],
    nospeed:            [1,     0,     1,      1,      1,      1,      1,      0.0001, 0.7,    1,      1,     0.00001, 1],
    nospray:            [1,     1,     1,      1,      1,      1,      1,      1,      1,      1,      1,      0.0000001, 1],
  //end no stuff
    bigger:             [1,     1,     1,      8,      1,      1,      1,      1,     1,     1,        1,   1,    1],
  //bosses
    djynnhome:          [0.99,  0.2,   0.245,  1,      1.5,    3,      1.5,    1.8,    1.5,    1,      1.5,    0.2,    1.158888888],
    /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE   PEN    SPEED    MAX    RANGE  DENSITY  SPRAY   RESIST  */
    op:                 [0.5,   1.3,   1,      1,      4,      4,      4,      3,      2,      1,      5,      2,      1],       
    protectorswarm:     [5,  0.000001, 1,      1,      100,    1,      1,      1,      1,     0.5,     5,      1,      10],
    shudder10:          [1,      1,    10,      1,      1,      1,     1,      1,     1,      1,      1,      1,     1], 
};

const dfltskl = 9;
let mil = 1000000;
let bil = 1000000000;
let tri = 1000000000000;
let quad = 1000000000000000;
let quin = 1000000000000000000;
let centillion = 1e300;
let millillion = 1e3000;
let multillion = 1e3 ^ 1e42 ^ 30 ^ 30;
let Millmillmillion = 10 ^ 10 ^ 1000000;
let infinity =
  mil *
  bil *
  tri *
  quad *
  quin *
  centillion *
  millillion *
  multillion *
  Millmillmillion;

// NAMES
const statnames = {
    smasher: 1,
    drone: 2,
    necro: 3,
    swarm: 4,
    trap: 5,
    generic: 6,
};
const gunCalcNames = {
    default: 0,
    bullet: 1,
    drone: 2,
    swarm: 3,
    fixedReload: 4,
    thruster: 5,
    sustained: 6,
    necro: 7,
    trap: 8,
};
let missiles = {
  small: [[0.4,-1],[0.8,-0.8],[1,-0.5],[1.11,0],[1,0.5],[0.8,0.8],[0.4,1],[0,1],[-0.3,0.8],[-0.8,1],[-0.4,0],[-0.8,-1],[-0.3,-0.8],[0,-1]],
  large: [[0.8,-2],[1.6,-1.6],[2,-1],[2.22,0],[2,1],[1.6,1.6],[0.8,2],[0,2],[-0.6,1.6],[-1.6,2],[-0.8,0],[-1.6,-2],[-0.6,-1.6],[0,-2]],
  pierce: [[1.25,0],[0.7,0.7],[-1,0],[0.7,-0.7]],
}

// ENTITY DEFINITIONS
exports.genericEntity = {
    NAME: '',
    LABEL: 'Unknown Entity',
    TYPE: 'unknown',
    DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
    DANGER: 0,
    VALUE: 0,
    SHAPE: 0,
    COLOR: 16,    
    INDEPENDENT: false,
    CONTROLLERS: ['doNothing'],    
    HAS_NO_MASTER: false,
    MOTION_TYPE: 'glide', // motor, swarm, chase
    FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
    DRAW_HEALTH: false,
    DRAW_SELF: true,
    DAMAGE_EFFECTS: true,
    RATEFFECTS: true,
    MOTION_EFFECTS: true,
    INTANGIBLE: false,
    ACCEPTS_SCORE: true,
    GIVE_KILL_MESSAGE: false,
    CAN_GO_OUTSIDE_ROOM: false,
    HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
    DIE_AT_LOW_SPEED: false,
    DIE_AT_RANGE: false,
    CLEAR_ON_MASTER_UPGRADE: false,
    PERSISTS_AFTER_DEATH: false,
    VARIES_IN_SIZE: false,
    HEALTH_WITH_LEVEL: true,
    CAN_BE_ON_LEADERBOARD: true,
    HAS_NO_RECOIL: false,
    AUTO_UPGRADE: 'none',
    BUFF_VS_FOOD: false,
    OBSTACLE: false,
    CRAVES_ATTENTION: false,
    NECRO: false,
    SHOOT_ON_DEATH: false,
    UPGRADES_TIER_1: [],
    UPGRADES_TIER_2: [],
    UPGRADES_TIER_3: [],
    UPGRADES_TIER_4: [],
    UPGRADES_TIER_5: [],
    SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    LEVEL: 0,
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    GUNS: [],
    MAX_CHILDREN: 0,
    BODY: {
        ACCELERATION: 1,
        SPEED: 0,
        HEALTH: 1,
        RESIST: 1,
        SHIELD: 0,
        REGEN: 0,
        DAMAGE: 1,
        PENETRATION: 1,
        RANGE: 0,
        FOV: 1,
        DENSITY: 1,
        STEALTH: 1,
        PUSHABILITY: 1,        
        HETERO: 2,
    },    
    FOOD: {
        LEVEL: -1,
    },
};
exports.mazewall = {
    PARENT: [exports.genericEntity],
    CAN_GO_OUTSIDE_ROOM: true,
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Maze Wall',
    INDEPENDENT: true,
    CONTROLLERS: ['dontTurn'],
    SHAPE: 4,
    IS_BOT: true,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 10000,
        DAMAGE: 1,
        RESIST: 10000,
        STEALTH: 1,
        SPEED: 0,
    },
    HITS_OWN_TYPE: false,
    INTANGIBLE: true,
    VALUE: 0,
    COLOR: 16,
    ACCEPTS_SCORE: false,
};

// FOOD
exports.food = {
    TYPE: 'food',
    DAMAGE_CLASS: 1,
    CONTROLLERS: ['moveInCircles'],
    HITS_OWN_TYPE: 'repel',
    MOTION_TYPE: 'drift',
    FACING_TYPE: 'turnWithSpeed',
    VARIES_IN_SIZE: true,
    BODY: {
        STEALTH: 30,
        PUSHABILITY: 1,
    },
    DAMAGE_EFFECTS: false,
    RATEFFECTS: false,
    HEALTH_WITH_LEVEL: false,
};

const basePolygonDamage = 1;
const basePolygonHealth = 2;
exports.hexagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 6,
    },
    LABEL: 'Hexagon',
    VALUE: 15000,
    SHAPE: 6,
    SIZE: 80,
    COLOR: 11,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.hugePentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 5,
    },
    LABEL: 'Alpha Pentagon',
    VALUE: 15000,
    SHAPE: -5,
    SIZE: 58,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 80,
        HEALTH: 300 * basePolygonHealth,
        RESIST: Math.pow(1.25, 3),
        SHIELD: 40 * basePolygonHealth,
        REGEN: 0.6,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.bigPentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 4,
    },
    LABEL: 'Beta Pentagon',
    VALUE: 2500,
    SHAPE: 5,
    SIZE: 30,
    COLOR: 14,
    BODY: {
        DAMAGE: 2 * basePolygonDamage,
        DENSITY: 30,
        HEALTH: 50 * basePolygonHealth,
        RESIST: Math.pow(1.25, 2),
        SHIELD: 20 * basePolygonHealth,
        REGEN: 0.2,
    },
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.pentagon = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 3,
    },
    LABEL: 'Pentagon',
    VALUE: 400,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 14,
    BODY: {
        DAMAGE: 1.5 * basePolygonDamage,
        DENSITY: 8,
        HEALTH: 10 * basePolygonHealth,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.triangle = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 2,
    },
    LABEL: 'Triangle',
    VALUE: 120,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 2,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 6,
        HEALTH: 3 * basePolygonHealth,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.square = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 1,
    },
    LABEL: 'Square',
    VALUE: 30,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 13,
    BODY: {
        DAMAGE: basePolygonDamage,
        DENSITY: 4,
        HEALTH: basePolygonHealth,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.egg = {
    PARENT: [exports.food],
    FOOD: {
        LEVEL: 0,
    },
    LABEL: 'Egg',
    VALUE: 10,
    SHAPE: 0,
    SIZE: 5,
    COLOR: 6,
    INTANGIBLE: true,
    BODY: {
        DAMAGE: 0,
        DENSITY: 2,
        HEALTH: 0.0011,
        PUSHABILITY: 0,
    },
    DRAW_HEALTH: false,
};

exports.greenpentagon = {
    PARENT: [exports.food],
    LABEL: 'Pentagon',
    VALUE: 30000,
    SHAPE: 5,
    SIZE: 16,
    COLOR: 1,
    BODY: {
        DAMAGE: 3,
        DENSITY: 8,
        HEALTH: 200,
        RESIST: 1.25,
        PENETRATION: 1.1,
    },
    DRAW_HEALTH: true,
};
exports.greentriangle = {
    PARENT: [exports.food],
    LABEL: 'Triangle',
    VALUE: 7000,
    SHAPE: 3,
    SIZE: 9,
    COLOR: 1,
    BODY: {
        DAMAGE: 1,
        DENSITY: 6,
        HEALTH: 60,
        RESIST: 1.15,
        PENETRATION: 1.5,
    },
    DRAW_HEALTH: true,
};
exports.greensquare = {
    PARENT: [exports.food],
    LABEL: 'Square',
    VALUE: 2000,
    SHAPE: 4,
    SIZE: 10,
    COLOR: 1,
    BODY: {
        DAMAGE: 0.5,
        DENSITY: 4,
        HEALTH: 20,
        PENETRATION: 2,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};

exports.gem = {
    PARENT: [exports.food],
    LABEL: 'Gem',
    VALUE: 2000,
    SHAPE: 6,
    SIZE: 5,
    COLOR: 0,
    BODY: {
        DAMAGE: basePolygonDamage/4,
        DENSITY: 4,
        HEALTH: 10,
        PENETRATION: 2,
        RESIST: 2,
        PUSHABILITY: 0.25,
    },
    DRAW_HEALTH: true,
    INTANGIBLE: false,
};
exports.obstacle = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    FACING_TYPE: 'turnWithSpeed',
    SHAPE: -9,
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 1,
        RESIST: 100,
        STEALTH: 1,
    },
    VALUE: 0,
    SIZE: 60,
    COLOR: 16,
    VARIES_IN_SIZE: true,
    GIVE_KILL_MESSAGE: true,
    ACCEPTS_SCORE: false,
};
    exports.babyObstacle = {
        PARENT: [exports.obstacle],
        SIZE: 25,
        SHAPE: -7,
        LABEL: "Gravel",
    };

// WEAPONS
function newWeapon(type, l = 18, w = 8, s, x = 0, y = 0, as = 0, an = 0, d = 0, p = {}) {
    // Define the position and properties
    let weapon = {
        //length width aspect x y angle de
        POSITION: [l, w, as, x, y, an, d]
    }, properties;
    // Switch standard for gun type
    switch(type) {
      case 'bullets':
        properties = {
            SHOOT_SETTINGS: combineStats(s),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def
            MAX_CHILDREN: 0, // def
            ALT_FIRE: false, // def
            NEGATIVE_RECOIL: false, // def
        };
        break;
      case 'drones':
        properties = {
            SHOOT_SETTINGS: combineStats(s),
            TYPE: exports.drone,
            AUTOFIRE: false,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        }
        break;
      case 'traps':
        properties = {
          SHOOT_SETTINGS: combineStats(s),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap,
        }
        break;
      case 'none':
      properties ={}  
      break;
        default:
        properties = {
          SHOOT_SETTINGS: combineStats(s),
          TYPE: type
        }
        break;
    };
    // Set any options that where defined
  let parray = objArray(p)
  for(let i=0; i < parray.length; i++){
  eval(`properties.${parray[i][0]} = ${parray[i][1]}`)
  }
    // Return it
    weapon.PROPERTIES = properties
    return weapon
}
function loopweapon(funct=["bullets", 18, 8, [g.basic], 0, 0, 1, 0, 0, {}], loopshit={times:1,width:0,length:0,aspect:0,angle:0,x:0,y:0,delay:0,extras:{}}){
  if(!loopshit.times) loopshit.times = 1
  if(!loopshit.width) loopshit.width = 0
  if(!loopshit.length) loopshit.length = 0
  if(!loopshit.aspect) loopshit.aspect = 0
  if(!loopshit.angle) loopshit.angle = 0
  if(!loopshit.x) loopshit.x = 0
  if(!loopshit.y) loopshit.y = 0
  if(!loopshit.delay) loopshit.delay = 0
  if(!loopshit.extras) loopshit.extras = {}
  let returnarray = []
  while(loopshit.times>0){
    returnarray.push(newWeapon(funct[0], funct[1], funct[2], funct[3], funct[4], funct[5], funct[6], funct[7], funct[8], funct[9]))
    loopshit.times--
    funct[1] += loopshit.length
    funct[2] += loopshit.width
    funct[4] += loopshit.x
    funct[5] += loopshit.y
    funct[6] += loopshit.aspect
    funct[7] += loopshit.angle
    funct[8] += loopshit.delay
  }
  return returnarray
}
function objArray(obj){
if(!obj) throw new Error("NO OBJECT SPECIFIED")
return Object.keys(obj).map((key) => [key, obj[key]]);
}

const wepHealthFactor = 0.5;
const wepDamageFactor = 1.5;
exports.poisonEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 11,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.bullet = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.rainbullet = {
    LABEL: "Bullet",
    TYPE: "bullet",
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
        ACCELERATION: 0.5
    },
    FACING_TYPE: "smoothWithMotion",
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: "never",
    DIE_AT_RANGE: true
};
exports.flame = {
        LABEL: 'Fire',
       // TYPE: 'bullet',
        ACCEPTS_SCORE: false,
        BURN_TO_APPLY: 0,
        BURN: true,
        SHAPE: 800,
        BODY: {
            PENETRATION: 1,
            SPEED: 0,
            RANGE: 15,
            SIZE: 1,
            DENSITY: 1.25,
            HEALTH: 1 * wepHealthFactor,
            DAMAGE: 1 * wepDamageFactor,
            PUSHABILITY: 0,
        },
        MOTION_TYPE: 'flame',
        CAN_GO_OUTSIDE_ROOM: true,
        HITS_OWN_TYPE: 'never',
        // DIE_AT_LOW_SPEED: true,
        DIE_AT_RANGE: true,
    };
    exports.bulletexpand = {
        LABEL: 'Flare',
       // TYPE: 'bullet',
        ACCEPTS_SCORE: false,
        BODY: {
            PENETRATION: 1,
            SPEED: 0,
            RANGE: 90,
            SIZE: 1,
            DENSITY: 1.25,
            HEALTH: 1 * wepHealthFactor,
            DAMAGE: 1 * wepDamageFactor,
            PUSHABILITY: 0,
        },
        MOTION_TYPE: 'flame',
        CAN_GO_OUTSIDE_ROOM: true,
        HITS_OWN_TYPE: 'never',
        PERSISTS_AFTER_DEATH: true,
        // DIE_AT_LOW_SPEED: true,
        DIE_AT_RANGE: true,
    };
    exports.flare = {
        LABEL: 'Flare',
       // TYPE: 'bullet',
        ACCEPTS_SCORE: false,
        BODY: {
            PENETRATION: 1,
            SPEED: 0,
            RANGE: 90,
            SIZE: 1,
            DENSITY: 1.25,
            HEALTH: 1 * wepHealthFactor,
            DAMAGE: 1 * wepDamageFactor,
            PUSHABILITY: 0,
        },
        SHAPE: 4,
        MOTION_TYPE: 'flame',
        CAN_GO_OUTSIDE_ROOM: true,
        HITS_OWN_TYPE: 'never',
        PERSISTS_AFTER_DEATH: true,
        // DIE_AT_LOW_SPEED: true,
        DIE_AT_RANGE: true,
    };
exports.bulletcold = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    FREEZE_TO_APPLY: 0,
    FREEZE: true,
    COLOR: 0,
    SHAPE: 800,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.bulletcold2 = {
    PARENT: [exports.bullet],
    LABEL: 'Fire',
    COLD_TO_APPLY: 0,
    COLD: true,
};
exports.bulletburn = {
    PARENT: [exports.bullet],
    LABEL: 'Fire',
    BURN_TO_APPLY: 0,
    BURN: true,
};
exports.bulletpoisoncold = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    FREEZE_TO_APPLY: 0,
    FREEZE: true,
    POISON_TO_APPLY: 0,
    POISON: true,
    COLOR: 0,
    SHAPE: 800,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.poisonEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 11,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.burnEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 33,
    SIZE: 10,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.freezeEffect = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    COLOR: 0,
    SIZE: 5,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 10,
        DENSITY: 1.25,
        HEALTH: 1,
        DAMAGE: 0,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
     exports.freeze = {
        PARENT: [exports.bullet],
        LABEL: 'Paint Ball',
        BODY: {
            PENETRATION: 1,
            SPEED: 0,
            RANGE: 200,
            SIZE: 1,
            DENSITY: 1.25,
            HEALTH: 1 * wepHealthFactor,
            DAMAGE: 1 * wepDamageFactor,
            PUSHABILITY: 0,
        },
        MOTION_TYPE: 'freeze',
    };
exports.bulletfragment = {
    PARENT: [exports.bullet],
    LABEL: 'Bullet',
    INVISIBLE: [1,1],
    BODY: {
      RANGE: 1
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      36,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      108,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     72,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      144,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     252,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     216,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     324,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     288,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     360,    0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.spray360, g.size2, g.shudder10, g.highestdamage]),
                            TYPE: exports.bullet,
                            AUTOFIRE: true
                        }, },
                ],
};
 exports.expand = {
        PARENT: [exports.bullet],
        LABEL: 'Explosion',
        BODY: {
            PENETRATION: 1,
            SPEED: 0,
            RANGE: 10,
            SIZE: 1,
            DENSITY: 1.25,
            HEALTH: 1 * wepHealthFactor,
            DAMAGE: 1 * wepDamageFactor,
            PUSHABILITY: 0.3,
        },
        MOTION_TYPE: 'expand',
    };
    exports.expand2 = {
        LABEL: 'Explosion',
       // TYPE: 'bullet',
        ACCEPTS_SCORE: false,
        BODY: {
            PENETRATION: 1,
            SPEED: 0,
            RANGE: 25,
            SIZE: 10,
            DENSITY: 1.25,
            HEALTH: 1 * wepHealthFactor,
            DAMAGE: 1 * wepDamageFactor,
            PUSHABILITY: 0,
        },
        MOTION_TYPE: 'expand2',
        CAN_GO_OUTSIDE_ROOM: true,
        HITS_OWN_TYPE: 'never',
        // DIE_AT_LOW_SPEED: true,
        DIE_AT_RANGE: true,
    };
exports.bombdropper = {
    LABEL: 'Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    SHAPE: missiles.small,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
exports.bullethome = {
    LABEL: 'Homing Bullet',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,        
    ACCELERATION: 3,
    BODY: {
        PENETRATION: 1,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        PUSHABILITY: 0.3,
        FOV: 1.5,
    },
    SHAPE: 0,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    INDEPENDENT: true,
    

    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
    COLOR: 12,
};
exports.poisonbullet = {
    LABEL: 'Poisonous Bullet',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    POISON_TO_APPLY: 0,
    POISON: true,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.33 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'smoothWithMotion',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
};
    exports.casing = {
        PARENT: [exports.bullet],
        LABEL: 'Shell',
        TYPE: 'swarm',
    };
exports.flare2 = {
    PARENT: [exports.bullet],
    LABEL: 'Flare',
    SHAPE: 4,
    MOTION_TYPE: 'grow',
};
exports.homingflare2 = {
    PARENT: [exports.bullet],
    LABEL: 'Flare',
    SHAPE: 4,
    MOTION_TYPE: 'grow',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
};
exports.bomb = {
    LABEL: 'Bomb',
    TYPE: 'bullet',
    ACCEPTS_SCORE: false,
    BODY: {
        PENETRATION: 1,
        SPEED: 3.75,
        RANGE: 90,
        DENSITY: 1.25,
        HEALTH: 0.4 * wepHealthFactor,
        DAMAGE: 4 * wepDamageFactor,
        PUSHABILITY: 0.3,
    },
    FACING_TYPE: 'autospin',
    CAN_GO_OUTSIDE_ROOM: true,
    HITS_OWN_TYPE: 'never',
    // DIE_AT_LOW_SPEED: true,
    DIE_AT_RANGE: true,
      GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     0,     0,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.attacksalot]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
                COLOR: 6,
            }, },
    ],
};
exports.swarm = {
    LABEL: 'Swarm Drone',
    TYPE: 'swarm',
    ACCEPTS_SCORE: false,
    SHAPE: 3,
    MOTION_TYPE: 'swarm',
    FACING_TYPE: 'smoothWithMotion',
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    CRAVES_ATTENTION: true,
    BODY: {
        ACCELERATION: 3,
        PENETRATION: 1.5,
        HEALTH: 0.35 * wepHealthFactor,
        DAMAGE: 1.5 * wepDamageFactor,
        SPEED: 4.5,
        RESIST: 1.6,
        RANGE: 225,
        DENSITY: 12,
        PUSHABILITY: 0.5,
        FOV: 1.5,
    },
    DIE_AT_RANGE: true,
    BUFF_VS_FOOD: true,
};
    exports.bee = {
        PARENT: [exports.swarm],
        PERSISTS_AFTER_DEATH: true, 
        SHAPE: 4, 
        LABEL: 'Drone',
        HITS_OWN_TYPE: 'hardWithBuffer',
    };
    exports.autoswarm = {
        PARENT: [exports.swarm],
        AI: { FARMER: true, },
        INDEPENDENT: true,
    };
    exports.homingbullet = {
        PARENT: [exports.autoswarm],
        SHAPE: 0,
        BODY: {
            PENETRATION: 1,
            SPEED: 3.75,
            RANGE: 90,
            DENSITY: 1.25,
            HEALTH: 0.33 * wepHealthFactor,
            DAMAGE: 4 * wepDamageFactor,
            PUSHABILITY: 0.3,
        },
        CAN_GO_OUTSIDE_ROOM: true,
    };
exports.accelbullet = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'accel',
}
exports.growbullet = {
  PARENT: [exports.bullet],
  MOTION_TYPE: 'grow',
};
exports.trap = {
    LABEL: 'Trap',
    TYPE: 'trap',
    ACCEPTS_SCORE: false,
    SHAPE: -3, 
    MOTION_TYPE: 'glide', // def
    FACING_TYPE: 'turnWithSpeed',
    HITS_OWN_TYPE: 'push',
    DIE_AT_RANGE: true,
    BODY: {
        HEALTH: 1 * wepHealthFactor,
        DAMAGE: 2 * wepDamageFactor,
        RANGE: 450,
        DENSITY: 2.5,
        RESIST: 2.5,
        SPEED: 0,
    },
};
    exports.block = {
        LABEL: 'Block',
        PARENT: [exports.trap],
        SHAPE: -4,
        MOTION_TYPE: 'motor',    
        CONTROLLERS: ['goToMasterTarget'],
        BODY: {
            SPEED: 1,
            DENSITY: 5,
        },
    };
    exports.boomerang = {
        LABEL: 'Boomerang',
        PARENT: [exports.trap],
        CONTROLLERS: ['boomerang'],
        MOTION_TYPE: 'motor',  
        HITS_OWN_TYPE: 'never',
        SHAPE: -5,
        BODY: {
            SPEED: 1.25,
            RANGE: 120,
        },
    };

exports.drone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.rocketdrone = {
    PARENT: [exports.drone],
    LABEL: 'Drone',
    TYPE: 'drone',
    GUNS: [{
        POSITION: [8, 12, 1.8, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.navyistt]),
            TYPE: exports.bullet
        }
    }]
};

exports.navyistdrone = {
    PARENT: [exports.drone],
    LABEL: "Speed Drone",
    GUNS: [{
        POSITION: [8, 12, 1.8, 8, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.navyistt]),
            TYPE: exports.bullet
        }
    }]
};
exports.dwone = {
    LABEL: 'Dwone',
    TYPE: 'minion',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: [[1,-0.11],[-0.4,-0.6],[-0.4,0.6],[1,0.11],[1,0.33],[-0.6,0.8],[-0.6,-0.8],[1,-0.33]],
    GUNS: [{
      POSITION: [5,2,1,0,0,0,0],
      PROPERITES:{

        COLOR: 5,
    },}, {
      POSITION: [4.2,4.2,1,8,0,0,0],
      PROPERITES:{        
        AUTOFIRE: true,
        TYPE: [exports.bullet,{FRAG: 'expand'}]
    }, }],
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
};
exports.whitedecor = {
        PARENT: exports.genericTank,
        LABEL: 'Turret',
        SHAPE: 0,
        COLOR: 6,
};
exports.blackdecor = {
        PARENT: exports.genericTank,
        LABEL: 'Turret',
        SHAPE: 0,
        COLOR: 19,
};
exports.dronew = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    TURRETS: [{
                          /*  SIZE     X       Y     ANGLE    ARC   LAYER*/
                    POSITION: [8,      0,      0,     0,     360,     1, ],
                            TYPE: exports.whitedecor,
                 }, ],
};
exports.droneb = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    TURRETS: [{
                          /*  SIZE     X       Y     ANGLE    ARC   LAYER*/
                    POSITION: [8,      0,      0,     0,     360,     1, ],
                            TYPE: exports.blackdecor,
                 }, ],
};
exports.dronewt = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    TURRETS: [{
                          /*  SIZE     X       Y     ANGLE    ARC   LAYER*/
                    POSITION: [8,      0,      0,     0,     360,     1, ],
                            TYPE: [exports.bullet,{COLOR:10}],
                 }, ],

    GUNS:[{
      POSITION: [0,8,1,0,0,0,0],
      SHOOT_ON_DEATH: true,
      TYPE: exports.trap,   
      PROPERTIES:{
      SHOOT_SETTINGS: combineStats([g.trap]),
      },
    }, ]
};
exports.dronebt = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.25 * wepDamageFactor,
        SPEED: 3.8,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    TURRETS: [{
                          /*  SIZE     X       Y     ANGLE    ARC   LAYER*/
                    POSITION: [8,      0,      0,     0,     360,     1, ],
                            TYPE: [exports.bullet,{COLOR:12}],
                 }, ],
};
    exports.sunchip = {
        PARENT: [exports.drone],
        SHAPE: 4,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.sunchip2 = {
        PARENT: [exports.drone],
        NECRO: true,
        SHAPE: 0,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
    exports.autosunchip = {
        PARENT: [exports.sunchip],
        AI: {
            BLIND: true,
            FARMER: true,
        },
        INDEPENDENT: true,
    };
    exports.invissunchip = {
        PARENT: [exports.sunchip],
        INVISIBLE: [0.08, 0.03],
    };
    exports.gunchip = {
        PARENT: [exports.drone],
        SHAPE: -2,
        NECRO: true,
        HITS_OWN_TYPE: 'hard',
        BODY: {
            FOV: 0.5,
        },
        AI: {
            BLIND: true,
            FARMER: true,
        },
        DRAW_HEALTH: false,
    };
 exports.expand = {
        PARENT: [exports.bullet],
        LABEL: 'Explosion',
        BODY: {
            PENETRATION: 1,
            SPEED: 0,
            RANGE: 10,
            SIZE: 1,
            DENSITY: 1.25,
            HEALTH: 1 * wepHealthFactor,
            DAMAGE: 1 * wepDamageFactor,
            PUSHABILITY: 0.3,
        },
        MOTION_TYPE: 'expand',
    };

exports.missile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     -2,     130,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,      2,     230,     0,  ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,    
            }, }, 
    ],
};
exports.twistmissile = {
    PARENT: [exports.bullet],
    LABEL: 'Missile',
    INDEPENDENT: true,
    FACING_TYPE: 'turnWithSpeed',
    BODY: {
        RANGE: 120,
    },  
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  14,     6,      1,      0,     0,      90,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, }, {
        POSITION: [  14,     6,      1,      0,     0,     270,     0,   ], 
            PROPERTIES: {
                AUTOFIRE: true,
                SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.muchmorerecoil, g.morespeed, g.morespeed]),
                TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                STAT_CALCULATOR: gunCalcNames.thruster,
            }, },
    ],
};
    exports.hypermissile = {
        PARENT: [exports.missile],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     6,      1,      0,     -2,     150,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     210,     0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                    STAT_CALCULATOR: gunCalcNames.thruster,
                }, }, {        
            POSITION: [  14,     6,      1,      0,     -2,      90,    0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  14,     6,      1,      0,      2,     270,    0.5,  ],  
                PROPERTIES: {
                    AUTOFIRE: true,
                    SHOOT_SETTINGS: combineStats([g.basic, g.skim, g.doublereload, g.lowpower, g.morerecoil, g.morespeed]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.snake = {
        PARENT: [exports.bullet],
        LABEL: 'Snake',
        INDEPENDENT: true,
        BODY: {
            RANGE: 120,
        },  
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,    12,     1.4,     8,      0,     180,    0,   ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake, g.snakeskin,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, }, {
            POSITION: [  10,    12,     0.8,     8,      0,     180,   0.5,  ], 
                PROPERTIES: {
                    AUTOFIRE: true,
                    NEGATIVE_RECOIL: true,
                    STAT_CALCULATOR: gunCalcNames.thruster,
                    SHOOT_SETTINGS: combineStats([
                        g.basic, g.sniper, g.hunter, g.hunter2, g.snake,
                    ]),
                    TYPE: [exports.bullet, { PERSISTS_AFTER_DEATH: true, }],
                }, },
        ],
    };
    exports.hive = {
        PARENT: [exports.bullet],
        LABEL: 'Hive',
        BODY: {
            RANGE: 90,
            FOV: 0.5,
        },  
        FACING_TYPE: 'turnWithSpeed',
        INDEPENDENT: true,
        CONTROLLERS: ['alwaysFire', 'nearestDifferentMaster', 'targetSelf',],
        AI: { NO_LEAD: true, },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,    9.5,    0.6,     7,      0,      108,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,    
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      180,    0.2,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      252,    0.4,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      324,    0.6,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm, 
                }, }, {
            POSITION: [   7,    9.5,    0.6,     7,      0,      36,     0.8,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                    TYPE: exports.bee,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, 
        ],
    };

// TANK CLASSES
const base = {
    ACCEL: 1.6,
    SPEED: 5.25,
    HEALTH: 20,
    DAMAGE: 3,
    RESIST: 1,
    PENETRATION: 1.05,
    SHIELD: 8,
    REGEN: 0.025,
    FOV: 1,
    DENSITY: 0.5,
};
exports.genericTank = {
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 12,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,
        SPEED: base.SPEED,
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION, 
        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
exports.genericTankSmall = {
    PARENT: [exports.genericTank],
    LABEL: 'Unknown Class',
    TYPE: 'tank',
    DAMAGE_CLASS: 2,
    DANGER: 5,
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'toTarget',
    SIZE: 7.2,
    MAX_CHILDREN: 0,   
    DAMAGE_EFFECTS: false,
    BODY: { // def
        ACCELERATION: base.ACCEL,        
        SPEED: base.SPEED * 5, 
        HEALTH: base.HEALTH, 
        DAMAGE: base.DAMAGE, 
        PENETRATION: base.PENETRATION,

        SHIELD: base.SHIELD,
        REGEN: base.REGEN,
        FOV: base.FOV * 0.66,
        DENSITY: base.DENSITY,
        PUSHABILITY: 0.9,
        HETERO: 3,
    },
    GUNS: [],
    TURRETS: [],
    GIVE_KILL_MESSAGE: true,
    DRAW_HEALTH: true,
};
let gun = { };

exports.autoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.fakeAutoTurret = {
	PARENT: [exports.genericTank],
	LABEL: 'Turret',
	BODY: {
    	FOV: 0.8
	},
	COLOR: 16,
	//CONTROLLERS: ['nearestDifferentMaster'],
	GUNS: [ { /*** LENGTH  WIDTH   ASPECT	X   	Y 	ANGLE   DELAY */
    	POSITION: [  22,	10,  	1,  	0,  	0,  	0,  	0,   ],  },
	],
};

exports.decorautoTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    CONTROLLERS: ['nearestDifferentMaster'], 
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], },
    ],
};
exports.autoTurrethoming = {
    PARENT: [exports.genericTank],
    LABEL: 'Homing Turret',
    BODY: {
        FOV: 0.8
    },
    COLOR: 16,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,    8,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret]),
                TYPE: exports.bullethome,
                COLOR: 12,
            }, },
    ],
};
    exports.machineAutoTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,    11,     1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.mach, g.slow]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.autoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     6,      1,      0,      5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {
            POSITION: [  20,     6,      1,      0,     -5,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.morerecoil, g.turret, g.fast, g.mach, g.pound, g.morereload, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };
    exports.oldAutoSmasherTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        COLOR: 16,
        //CONTROLLERS: ['nearestDifferentMaster'],
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     7,      1,      0,    -5.75,    0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, }, {            
            POSITION: [  20,     7,      1,      0,     5.75,    0,     0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.lotsmorrecoil, g.morereload]),
                    TYPE: exports.bullet,
                    STAT_CALCULATOR: gunCalcNames.fixedReload,
                }, },
        ],
    };

exports.auto3gun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    BODY: {
        FOV: 3,
    },
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto]),
                TYPE: exports.bullet,
            }, }
    ],
};
    exports.auto5gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    11,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.five]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.heavy3gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
            SPEED: 0.9,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  22,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.auto]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.architectgun = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,    16,      1,      0,      0,      0,      0,   ], 
        }, {
        POSITION: [   2,    16,     1.1,     20,     0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.block, g.auto]),
                TYPE: exports.block,
            }, },
    ],
};
    exports.masterGun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 3,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 16,
        MAX_CHILDREN: 6,
        AI: {
            NO_LEAD: true,
            SKYNET: true,
            FULL_VIEW: true,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   8,     14,    1.3,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.master]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.bansheegun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  26,    10,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.auto, g.lessreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.auto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -3.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     3.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bent2gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  16,     4,      1,      0,    -2,     -20,      0.5,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     4,      1,      0,     2,     20,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  18,     5,      1,      0,     0,     0,     0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.power, g.slow]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
    exports.bigauto4gun = {
        PARENT: [exports.genericTank],
        LABEL: '',
        CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  14,     5,      1,      0,    -4.5,     0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  14,     5,      1,      0,     4.5,     0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }, {
            POSITION: [  16,     5,      1,      0,      0,      0,     0.5,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.auto, g.gunner, g.twin, g.twin, g.power, g.halfreload]),
                    TYPE: exports.bullet,
                }, }
        ],
    };
exports.smasherBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: 6,
    INDEPENDENT: true,
};
let star = 5;
exports.parasiteBody = {
    LABEL: '',
    CONTROLLERS: ['fastestspin'], 
    COLOR: 23,
    SHAPE: star,
    INDEPENDENT: true,
};
exports.parasiteBody2 = {
    LABEL: '',
    CONTROLLERS: ['fastestspin'], 
    COLOR: 23,
    SHAPE: star,
    INDEPENDENT: true,
};
exports.smasherBody5 = {
    LABEL: '',
    CONTROLLERS: ['fasterspin'], 
    COLOR: 9,
    SHAPE: 5,
    INDEPENDENT: true,
};
exports.spikeBody = {
    LABEL: '',
    CONTROLLERS: ['spin'],
    COLOR: 9,
    SHAPE: -4,
    INDEPENDENT: true,
};
    exports.spikeBody1 = {
        LABEL: '',
        CONTROLLERS: ['fastspin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
    exports.spikeBody2 = {
        LABEL: '',
        CONTROLLERS: ['reversespin'], 
        COLOR: 9,
        SHAPE: 3,
        INDEPENDENT: true,
    };
exports.megasmashBody = {
    LABEL: '',
    CONTROLLERS: ['spin'], 
    COLOR: 9,
    SHAPE: -6,
    INDEPENDENT: true,
};
exports.dominationBody = {
    LABEL: '',
    CONTROLLERS: ['dontTurn'], 
    COLOR: 9,
    SHAPE: 8,
    INDEPENDENT: true,
};
    exports.baseSwarmTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        COLOR: 16,
        BODY: {
            FOV: 2,
        },
        CONTROLLERS: ['nearestDifferentMaster'], 
        AI: {
            NO_LEAD: true,
            LIKES_SHAPES: true,
        },
        INDEPENDENT: true,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   5,    4.5,    0.6,     7,      2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,          
                }, }, {
            POSITION: [   5,    4.5,    0.6,     7,     -2,      0,     0.15, ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: exports.swarm,
                    STAT_CALCULATOR: gunCalcNames.swarm,  
                }, }, {
            POSITION: [   5,    4.5,    0.6,    7.5,     0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.swarm, g.protectorswarm]),
                    TYPE: [exports.swarm, { INDEPENDENT: true, AI: { LIKES_SHAPES: true, }, }, ],
                    STAT_CALCULATOR: gunCalcNames.swarm,  
            }, }
        ],
    };
    exports.baseGunTurret = {
        PARENT: [exports.genericTank],
        LABEL: 'Protector',
        BODY: {
            FOV: 5,
        },
        ACCEPTS_SCORE: false,
        CONTROLLERS: ['nearestDifferentMaster'], 
        INDEPENDENT: true,
        COLOR: 16,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  12,    12,     1,       6,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [  11,    13,     1,       6,      0,      0,     0.1,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.destroy]),
                    TYPE: exports.bullet,          
                }, }, {
            POSITION: [   7,    13,    -1.3,     6,      0,      0,      0,   ],
                }
        ],
    };
        exports.baseProtector = {
            PARENT: [exports.genericTank],
            LABEL: 'Base',
            SIZE: 64,
            DAMAGE_CLASS: 0,
            ACCEPTS_SCORE: false,
            SKILL: skillSet({ 
                rld: 1,
                dam: 1,
                pen: 1,
                spd: 1,
                str: 1,
            }),
            BODY: { // def
                SPEED: 0,
                HEALTH: 10000, 
                DAMAGE: 10, 
                PENETRATION: 0.25, 
                SHIELD: 1000,
                REGEN: 100,
                FOV: 1,
                PUSHABILITY: 0,
                HETERO: 0,
            },
            //CONTROLLERS: ['nearestDifferentMaster'],
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  25,     0,      0,      0,     360,  0], 
                    TYPE: exports.dominationBody,
                        }, {
                POSITION: [  12,     7,      0,      45,     100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     135,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     225,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        }, {
                POSITION: [  12,     7,      0,     315,    100,  0], 
                    TYPE: exports.baseSwarmTurret,
                        },
            ],
            GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,  11.5,   -1.3,     6,      0,     315,     0,   ], }, {
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,      45,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     135,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     225,     0,   ], }, {   
                POSITION: [  4.5,   8.5,   -1.5,     7,      0,     315,     0,   ], }, 
            ],
        };

exports.minion = {
    PARENT: [exports.genericTank],
    LABEL: 'Minion', 
    TYPE: 'minion',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 0.5,
        SPEED: 3,
        ACCELERATION: 0.4,
        HEALTH: 5,
        SHIELD: 0,
        DAMAGE: 1.2,
        RESIST: 1,
        PENETRATION: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'canRepel', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.minion]),
            WAIT_TO_CYCLE: true,
            TYPE: exports.bullet,
        }, }, 
    ],
};
exports.pillboxTurret = {
    PARENT: [exports.genericTank],
    LABEL: '',
    COLOR: 16,
    BODY: {
        FOV: 2,
    },
    HAS_NO_RECOIL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  22,    11,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.minion, g.turret, g.power, g.auto, g.notdense]),
                TYPE: exports.bullet,
            }, },
    ],
};
exports.pillbox = {
    LABEL: 'Pillbox',
    PARENT: [exports.trap],
    SHAPE: -4,
    MOTION_TYPE: 'motor',    
    CONTROLLERS: ['goToMasterTarget', 'nearestDifferentMaster'],
    INDEPENDENT: true,
    BODY: {
        SPEED: 1,
        DENSITY: 5,
    },
    DIE_AT_RANGE: true, 
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     360,  1], 
            TYPE: exports.pillboxTurret,
        }
    ]
};
exports.skimturret = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 2,
    },
    COLOR: 2,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    LABEL: '',
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                TYPE: exports.hypermissile,
            }, }, {
        POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
            },
    ],
};
    exports.skimboss = {
        PARENT: [exports.genericTank],
        BODY: {
            HEALTH: 300,
            DAMAGE: 2,
            SHIELD: 200,
        },
        SHAPE: 3, 
        COLOR: 2,
        FACING_TYPE: 'autospin',
        TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
            POSITION: [  15,     5,      0,     60,     170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     180,    170, 0], 
                TYPE: exports.skimturret,
                    }, {
            POSITION: [  15,     5,      0,     300,    170, 0], 
                TYPE: exports.skimturret,
                    },
        ],
    };
function shootSettingsToGStat(settings) {
    const {
        reload,
        recoil,
        shudder,
        size,
        health,
        damage,
        pen,
        speed,
        maxSpeed,
        range,
        density,
        spray,
        resist
    } = settings;
    return [reload, recoil, shudder, size, health, damage, pen, speed, maxSpeed, range, density, spray, resist];
}
function createMinion(type, stats = []) {
    const output = JSON.parse(JSON.stringify(type));
    output.PARENT = [exports.minion];
    if (type.TURRETS != null) {
        output.TURRETS = type.TURRETS;
    }
    if (type.GUNS != null) {
        for (let i = 0; i < type.GUNS.length; i++) {
            const gun = JSON.parse(JSON.stringify(type.GUNS[i]));
            if (gun.PROPERTIES && gun.PROPERTIES) {
                gun.PROPERTIES.SHOOT_SETTINGS = combineStats([shootSettingsToGStat(gun.PROPERTIES.SHOOT_SETTINGS), g.minion, ...stats]);
                gun.PROPERTIES.TYPE = type.GUNS[i].PROPERTIES.TYPE;
            }
            output.GUNS[i] = gun;
        }
    } else output.GUNS = [];
    if (type.PARENT != null) {
        type.PARENT.forEach(parent => {
            if (parent.SHAPE != null) {
                output.SHAPE = parent.SHAPE;
            }
            if (parent.FACING_TYPE != null) {
                output.FACING_TYPE = parent.FACING_TYPE;
            }
        });
    }
    return output;
}
let counters = {
    flank: 0,
    autoNClone: 0,
    autoNTurret: 0
};

function makeAutoN(type, sides = 3, name = -1, options = {}) {
    if (options.swivel == null) options.swivel = false;
    if (options.color == null) options.color = 16;
    if (options.size == null) options.size = options.swivel ? 8 * (Math.pow(Math.sqrt(.625, 4), sides - (sides === 2 ? 2 : 3))) + 1 : 10;
    if (options.stats == null || options.stats === []) options.stats = [g.blank];
    if (options.x == null) options.x = options.swivel ? 7 : 9;
    if (options.template == null) options.template = exports.genericTank;
    let output = JSON.parse(JSON.stringify(options.template));
    exports['autoNClone' + counters.autoNClone] = JSON.parse(JSON.stringify(type));
    let tank = exports['autoNClone' + counters.autoNClone];
    exports['autoNClone' + counters.autoNClone].TURRETS = type.TURRETS || [];
    if (type.GUNS)
        for (let i = 0; i < type.GUNS.length; i++) {
            let a = exports['autoNClone' + counters.autoNClone].GUNS[i];
            if (!options.swivel) {
                if (type === exports.basic) {
                    a.POSITION[0] += 2 + sides / 2;
                    a.POSITION[1] += 0.8 + sides / 2;
                } else {
                    a.POSITION[0] += !a.POSITION[4] == 0 || !(type === exports.pelleter && i === exports.pelleter.GUNS.length) ? 0 : 2 + sides / 10;
                    a.POSITION[1] += a.POSITION[4] == 0 ? 1.7 : 0;
                }
            }
            try {
                if (!exports['autoNClone' + counters.autoNClone].GUNS[i].PROPERTIES.SHOOT_SETTING && !exports['autoNClone' + counters.autoNClone].GUNS[i].PROPERTIES.TYPE) continue;
                if (type.GUNS[i].PROPERTIES.SKIN == 3) {
                    exports['autoNClone' + counters.autoNClone].GUNS[i].POSITION[3] += 2 + sides / 10
                }
                let gun = exports['autoNClone' + counters.autoNClone].GUNS[i].PROPERTIES.SHOOT_SETTINGS,
                    stats = [
                        [gun.reload, gun.recoil, gun.shudder, gun.size, gun.health, gun.damage, gun.pen, gun.speed, gun.maxSpeed, gun.range, gun.density, gun.spray, gun.resist],
                        g.auto2, options.swivel ? g.swivel : [1, .1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                    ];
                if (type === exports.autoTurret) stats = [
                    [gun.reload, gun.recoil, gun.shudder, gun.size, gun.health, gun.damage, gun.pen, gun.speed, gun.maxSpeed, gun.range, gun.density, gun.spray, gun.resist]
                ];
                for (let component of options.stats) stats.push(component);
                for (let i = 0; i < sides; i++) stats.push(g.moreAuto);
                //exports['autoNClone' + counters.autoNClone];GUNS[i].PROPERTIES = type.GUNS[i].PROPERTIES;
                exports['autoNClone' + counters.autoNClone].GUNS[i].PROPERTIES.TYPE = type.GUNS[i].PROPERTIES.TYPE;
                exports['autoNClone' + counters.autoNClone].GUNS[i].PROPERTIES.SHOOT_SETTINGS = combineStats(stats);
                counters.autoNTurret++;
            } catch (e) {
                //console.log(e);
            };
        }
    let a = 0;
    output.TURRETS = [];
    for (let i = 0; i < sides; i++) {
        output.TURRETS.push({
            POSITION: [options.size, options.swivel ? 7 : 8, 0, 360 / sides * i, options.swivel ? 360 : (360 / sides) + 100, options.swivel ? 1 : 0],
            TYPE: [exports['autoNClone' + counters.autoNClone], {
                LABEL: '',
                BODY: {
                    FOV: 2.5
                },
                CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'],
                COLOR: options.color,
                INDEPENDENT: false,
            }]
        })
    }
    if (type.DANGER != null) output.DANGER = (type.DANGER >= 7 || type.DANGER + sides - 1 >= 7) ? 7 : type.DANGER + sides - 1;
    output.LABEL = name === -1 ? output.LABEL + '-' + sides : name;
    output.FACING_TYPE = 'autospin';
    output.GUNS = [];
    output.BODY = {
        SPEED: base.SPEED * (1 - sides * 0.01)
    };
    counters.autoNClone++;
    return output;
}

function makeAuto(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeCeption(type, gun = type, name = -1, options = {}) {
    let turret = { type: [gun], size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = type.LABEL + 'ception'  ; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeRevo(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurret, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size * 5,     0,      0,     180,    360,  1,], 
        TYPE: [exports.revoturret, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Auto-' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
function makeHybrid(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Hybrid ' + type.LABEL; } else { output.LABEL = name; }
    return output;
}
function makeSpawner(type, name = -1, minion) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   4.5,     10,    1,     10.5,      0,     180,     0,   ], 
        }
    let spawner2 = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [1, 12, 1, 15, 0, 180, 0],
        PROPERTIES: {
            MAX_CHILDREN: 5,
            SHOOT_SETTINGS: combineStats([g.spawner]),
            TYPE: [minion],
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            MAX_CHILDREN: 1,
        }, }
    let spawner3 = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   3.5,     12,    1,     8,      0,     180,     0,   ], 
        }
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner, spawner2, spawner3]; }
    else { output.GUNS = [...type.GUNS, spawner, spawner2, spawner3]; }
    if (name == -1) { output.LABEL = type.LABEL + 'kick'; } else { output.LABEL = name; }
    return output;
}

        /*POSITION: [4.5, 10, 1, 10.5, 0, 0, 0]
    }, {
        POSITION: [1, 12, 1, 15, 0, 0, 0],
        PROPERTIES: {
            MAX_CHILDREN: 5,
            SHOOT_SETTINGS: combineStats([g.spawner]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true
        }
    }, {
        POSITION: [3.5, 12, 1, 8, 0, 0, 0]*/
function makeLearner(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   8,     13,    1.2,     8,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.learner]),
            TYPE: [exports.drone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 3,
        }, };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner]; }
    else { output.GUNS = [...type.GUNS, spawner]; }
    if (name == -1) { output.LABEL = 'Learner-' + type.LABEL; } else { output.LABEL = name; }
    return output;
}
function makeComputer(type, name = -1) {
    let output = JSON.parse(JSON.stringify(type));
    let spawner = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   17,     18,    1.35,     0,      0,     180,     0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
            TYPE: [exports.computerdrone, { INDEPENDENT: true, }],
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: false,    
            MAX_CHILDREN: 1,
        }, }
    let spawner2 = { 
        /********* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [   13,     15,    1,     0,      0,     180,     0,   ], 
        };
    if (type.TURRETS != null) { output.TURRETS = type.TURRETS; }
    if (type.GUNS == null) { output.GUNS = [spawner, spawner2]; }
    else { output.GUNS = [...type.GUNS, spawner, spawner2]; }
    if (name == -1) { output.LABEL = type.LABEL + 'puter'  ; } else { output.LABEL = name; }
    return output;
}
function makeHome(type, name = -1, options = {}) {
    let turret = { type: exports.autoTurrethoming, size: 10, independent: true, };
    if (options.type != null) { turret.type = options.type; }
    if (options.size != null) { turret.size = options.size; }
    if (options.independent != null) { turret.independent = options.independent; }
    
    let output = JSON.parse(JSON.stringify(type));
    let autogun = {
        /*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  turret.size,     0,      0,     180,    360,  1,], 
        TYPE: [turret.type, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: turret.independent, }],
    };
    if (type.GUNS != null) { output.GUNS = type.GUNS; }
    if (type.TURRETS == null) { output.TURRETS = [autogun]; }
    else { output.TURRETS = [...type.TURRETS, autogun]; }
    if (name == -1) { output.LABEL = 'Homing ' + type.LABEL; } else { output.LABEL = name; }
    output.DANGER = type.DANGER + 1;
    return output;
}
/*function shootSettingsToGStat(settings) {
    const {
        reload,
        recoil,
        shudder,
        size,
        health,
        damage,
        pen,
        speed,
        maxSpeed,
        range,
        density,
        spray,
        resist
    } = settings;
    return [reload, recoil, shudder, size, health, damage, pen, speed, maxSpeed, range, density, spray, resist];
}
const makeCeption = (function() {
    let index = 0;

    function createTurret(type, options) {
        exports[`ceptionTurret${index}`] = {
            PARENT: [...(Array.isArray(type.PARENT) ? type.PARENT : [type.PARENT]), exports.turretParent],
            LABEL: type.LABEL + " Turret",
            INDEPENDENT: options.independent,
            GUNS: [],
            TURRETS: (type.TURRETS || []).map(turret => turret)
        };
        for (const key of [
                "TURRETS",
                "SHAPE",
                "COLOR",
                "MAX_CHILDREN"
            ]) {
            if (type[key] != null) {
                exports[`ceptionTurret${index}`][key] = type[key];
            }
        }
        if (type.GUNS) {
            for (let i = 0; i < type.GUNS.length; i++) {
                const gun = JSON.parse(JSON.stringify(type.GUNS[i]));
                if (type.GUNS[i].PROPERTIES && type.GUNS[i].PROPERTIES.SHOOT_SETTINGS) {
                    gun.PROPERTIES.SHOOT_SETTINGS = combineStats([shootSettingsToGStat(type.GUNS[i].PROPERTIES.SHOOT_SETTINGS), g.turret, g.ceptionTurret, ...options.stats.turret]);
                    gun.PROPERTIES.TYPE = type.GUNS[i].PROPERTIES.TYPE;
                }
                exports[`ceptionTurret${index}`].GUNS.push(gun);
            }
        }
        return `ceptionTurret${index}`;
    }
    return function(type, name = -1, options = {}) {
        if (options.stats == null) {
            options.stats = {
                tank: [],
                turret: []
            };
        }
        if (options.size == null) {
            options.size = 11;
        }
        if (options.danger == null) {
            options.danger = Math.floor((type.DANGER || 7) * 1.5);
        }
        if (options.independent == null) {
            options.independent = true;
        }
        const output = JSON.parse(JSON.stringify(type));
        const turretExport = createTurret(type, options);
        if (type.GUNS != null) {
            output.GUNS = type.GUNS;
        }
        if (type.TURRETS == null) {
            output.TURRETS = [{
                POSITION: [options.size, 0, 0, 180, 360, 1],
                TYPE: exports[turretExport]
            }];
        } else {
            output.TURRETS = [...type.TURRETS, {
                POSITION: [options.size, 0, 0, 180, 360, 1],
                TYPE: exports[turretExport]
            }];
        }
        if (type.PARENT instanceof Array) {
            type.PARENT.forEach(parent => {
                if (parent.TURRETS instanceof Array) {
                    output.TURRETS.unshift(...parent.TURRETS.map(turret => turret));
                }
            });
        }
        if (name == -1) {
            output.LABEL = type.LABEL + " Ception";
        } else {
            output.LABEL = name;
        }
        output.DANGER = options.danger;
        index++;
        return output;
    }
})();*/


exports.basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
        }, }, 
    ],
};
exports.basic222 = {
    PARENT: [exports.genericTank],
    LABEL: 'Bent Shot',
    SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
    //CONTROLLERS: ['nearestDifferentMaster'],
};
exports.revoturret = {
    PARENT: [exports.genericTank],
    LABEL: 'Revolutionist Turret',
    SIZE: 140,
    COLOR: 38,
    FACING_TYPE: 'autospin',
    CONTROLLERS: ["spin"],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  3,     0,      -10,     0,    160, 1],
                        TYPE: exports.autoTurret,
                            }, {
                    POSITION: [  3,     0,      10,      0,    160, 1],
                        TYPE: exports.autoTurret,
                            },
    ],
};
exports.solarsystem = {
    PARENT: [exports.genericTank],
    LABEL: 'Solar System',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.trifront]),
            TYPE: exports.bullet,
            LABEL: '',
        }, },
    ],
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  70,     0,      0,     180,    360, 1],
        TYPE: exports.revoturret,
        }, { 
        POSITION: [  50,     0,      0,     0,      360, 1],
        TYPE: exports.revoturret,
        },
    ],
};
exports.revolutionist = makeRevo(exports.basic, "Revolutionist");

exports.computerdrone = {
    LABEL: 'Drone',
    TYPE: 'drone',
    ACCEPTS_SCORE: false,
    DANGER: 2,
    CONTROL_RANGE: 0,
    SHAPE: 3,
    MOTION_TYPE: 'chase',
    FACING_TYPE: 'smoothToTarget',
    CONTROLLERS: [
        'nearestDifferentMaster',
        'canRepel',
        'mapTargetToGoal',
        'hangOutNearMaster'
    ],
    AI: { BLIND: true, },
    BODY: {
        PENETRATION: 1.2,
        PUSHABILITY: 0.6,
        ACCELERATION: 0.05,
        HEALTH: 0.6 * wepHealthFactor,
        DAMAGE: 1.8 * wepDamageFactor,
        SPEED: 1.9,
        RANGE: 200,
        DENSITY: 0.03,
        RESIST: 1.5,
        FOV: 0.8,
    },
    HITS_OWN_TYPE: 'hard',
    DRAW_HEALTH: false,
    CLEAR_ON_MASTER_UPGRADE: true,
    BUFF_VS_FOOD: true,
    TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
        POSITION: [  11,     0,      0,      0,     190, 1], 
        TYPE: exports.bullet,
    }],
};
exports.computer = makeComputer(exports.basic, "Computer");
exports.basebrid = makeHybrid(exports.basic, "Basebrid");
exports.basekick = makeSpawner(exports.basic, "Basekick", exports.minion);
let third = 1/3;
exports.surpriser = {
    PARENT: [exports.genericTank],
    LABEL: 'Surpriser',
    BODY: {
       ACCELERATION: base.ACCEL * 0.8,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  11,     3,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullet,
            LABEL: 'SUPRIZE MOTHERFUCKER', //joke
        }, }, {
        POSITION: [  14,     4,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  18,     3.5,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  18.5,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser, g.fake]),
            TYPE: exports.bullet,
        }, },  {
        POSITION: [  5,    8,    -1.7,    6.5,     0,      0,      0,   ],                         
        }
    ],
};
exports.flanksurpriser = {
    PARENT: [exports.genericTank],
    LABEL: 'Flank Surpriser',
    BODY: {
       ACCELERATION: base.ACCEL * 0.8,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  11,     3,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullet,
            LABEL: 'SUPRIZE MOTHERFUCKER', //joke
        }, }, {
        POSITION: [  14,     4,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  18,     3.5,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  18.5,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser, g.fake]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  9,     3,      1,      0,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullet,
            LABEL: 'SUPRIZE MOTHERFUCKER', //joke
        }, }, {
        POSITION: [  12,     4,      1,      0,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  16,     3.5,      1,      0,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [  16.5,     9,      1,      0,      0,      180,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser, g.fake]),
            TYPE: exports.bullet,
        }, },  {
        POSITION: [  5,    8,    -1.7,    6.5,     0,      0,      0,   ],                         
        },  {
        POSITION: [  5,    8,    -1.7,    6.5,     0,      180,      0,   ],                         
        }
    ],
};
exports.homingsurpriser = {
    PARENT: [exports.genericTank],
    LABEL: 'Homing Surpriser',
    BODY: {
       ACCELERATION: base.ACCEL * 0.8,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  11,     3,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullethome,
            LABEL: 'SUPRIZE MOTHERFUCKER', //joke
        }, }, {
        POSITION: [  14,     4,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullethome,
        }, }, {
        POSITION: [  18,     3.5,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser]),
            TYPE: exports.bullethome,
        }, }, {
        POSITION: [  18.5,     9,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.surpriser, g.fake]),
            TYPE: exports.bullet,
            COLOR: 12,
        }, },  {
        POSITION: [  5,    8,    -1.7,    6.5,     0,      0,      0,   ],  
        PROPERTIES: {
            COLOR: 12,
        }, },
    ],
};
exports.homing = {
    PARENT: [exports.genericTank],
    LABEL: 'Homing Tank',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullethome,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
            COLOR: 12
        }, }, 
    ],
};
exports.droning = {
    PARENT: [exports.genericTank],
    LABEL: 'Droning Tank',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.anni]),
            TYPE: exports.bullethome,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
            COLOR: 38
        }, }, 
    ],
};
exports.auto2 = makeAutoN(exports.basic, 2, "Auto-2");
          exports.twin2 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Twin-2',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,     0,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     180,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
          exports.bent2 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Bent-2',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,     0,    160, 0],
                        TYPE: exports.bent2gun,
                            }, {
                    POSITION: [  13,     6,      0,     180,    160, 0],
                        TYPE: exports.bent2gun,
                            },
                ],
            };
exports.subduer = {
    PARENT: [exports.genericTank],
    LABEL: 'Subduer',
    BODY: {
      FOV: 1.15,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     6,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 1',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      0,      0.5,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 2',                  // def
        }, },
    ],
};
exports.uzi = {
    PARENT: [exports.genericTank],
    LABEL: 'Uzi',
    BODY: {
      FOV: 1.15,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 1',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      0,      0.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 2',                  // def
        }, },
    ],
};
exports.hominguzi = {
    PARENT: [exports.genericTank],
    LABEL: 'Homing Uzi',
    BODY: {
      FOV: 1.15,
    },
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullethome,
            LABEL: 'Uzi 1',                  // def
            COLOR: 12,
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      0,      0.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullethome,
            LABEL: 'Uzi 2',                  // def
            COLOR: 12,
        }, },
    ],
};
exports.twozi = {
    PARENT: [exports.genericTank],
    LABEL: 'Twozi',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  20,     8,      1,      0,      -5.5,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi,  g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 1',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      -5.5,      0,      0.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi,  g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 2',                  // def
        }, }, {
        POSITION: [  20,     8,      1,      0,      5.5,      0,      0.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi,  g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 3',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      5.5,      0,      1,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 4',                  // def
        }, },
    ],
};
exports.thrzi = {
    PARENT: [exports.genericTank],
    LABEL: 'Thrzi',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  19,     8,      1,      0,      2,      20,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 1',                  // def
        }, }, {
        POSITION: [  17,     8,      1,      0,      2,      20,      0.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 2',                  // def
        }, }, {
        POSITION: [  19,     8,      1,      0,      -2,      -20,      0.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 3',                  // def
        }, }, {
        POSITION: [  17,     8,      1,      0,      -2,      -20,      1,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 4',                  // def
        }, }, {
        POSITION: [  22,     8,      1,      0,      0,      0,      1.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 5',                  // def
        }, }, {
        POSITION: [  20,     8,      1,      0,      0,      0,      1.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 6',                  // def
        }, },
    ],
};
exports.pentzi = {
    PARENT: [exports.genericTank],
    LABEL: 'Pentzi',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,     8,      1,      0,      3,      30,      0.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 1',                  // def
        }, }, {
        POSITION: [  14,     8,      1,      0,      3,      30,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 2',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      -3,      -30,      0.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 3',                  // def
        }, }, {
        POSITION: [  14,     8,      1,      0,      -3,      -30,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 4',                  // def
        }, }, {
        POSITION: [  19,     8,      1,      0,      2,      15,      1,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 1',                  // def
        }, }, {
        POSITION: [  17,     8,      1,      0,      2,      15,      0.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 2',                  // def
        }, }, {
        POSITION: [  19,     8,      1,      0,      -2,      -15,      1,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 3',                  // def
        }, }, {
        POSITION: [  17,     8,      1,      0,      -2,      -15,      0.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 4',                  // def
        }, }, {
        POSITION: [  22,     8,      1,      0,      0,      0,      1.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 5',                  // def
        }, }, {
        POSITION: [  20,     8,      1,      0,      0,      0,      1.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.uzi, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 6',                  // def
        }, },
    ],
};
                /*GUNS: [ { 
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };*/
exports.hexzi = {
    PARENT: [exports.genericTank],
    LABEL: 'Hexzi',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 1',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      0,      0.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 2',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      60,      0.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 3',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      60,      1,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 4',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      120,      1.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 5',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      120,      1.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 6',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      180,      2,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 7',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      180,      2.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 8',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      240,      2.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 9',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      240,      3,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 10',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      300,      3.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 11',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      300,      3.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 12',                  // def
        }, },
    ],
};
exports.quadzi = {
    PARENT: [exports.genericTank],
    LABEL: 'Quazi',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 1',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      0,      0.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 2',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      90,      0.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 3',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      90,      1,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 4',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      180,      1.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 5',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      180,      1.667,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 6',                  // def
        }, }, {
        POSITION: [  18,     8,      1,      0,      0,      270,      2,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 7',                  // def
        }, }, {
        POSITION: [  16,     8,      1,      0,      0,      270,      2.333,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
            TYPE: exports.bullet,
            LABEL: 'Uzi 8',                  // def
        }, },
    ],
};
exports.you = {
    PARENT: [exports.genericTank],
    LABEL: 'tube',
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def
            COLOR: 36,                  // def
        }, }, 
    ],
};
let rainbow = 36
        exports.dev = {
            PARENT: [exports.genericTank],
            LABEL: 'Developer',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            BODY: { // def
                FOV: 2,
            },
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            TURRETS: [],
            DRAW_HEALTH: false,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                }, }, 
            ],
        };
        exports.testbed2 = {
            PARENT: [exports.genericTank],
            LABEL: 'TESTBED',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            BODY: { // def
                FOV: 2,
            },
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
              SPEED: 15,
            },
            DRAW_HEALTH: false,
            TURRETS: [],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                    COLOR: rainbow,
                }, }, 
            ],
        };
function makeGuns(n, l, w, a, x, y, d, p = {}) {
    let e = [], i = 0;
    for (i; i<n; i++) {
        e.push({POSITION: [l, w, a, x, y, n/360 * i, d], PROPERTIES: p,})
    }; return e;
}
exports.susus = {
    LABEL: 'bruh', 
    BODY: {//too lazy to fill it out
    },
    GUNS: makeGuns(3, 18, 8, 1, 0, 0, 0, {SHOOT_SETTINGS: combineStats([g.basic, g.flank]),TYPE: exports.bullet})
};
        exports.ot = {
            PARENT: [exports.genericTank],
            LABEL: 'Obsolete Tanks',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            BODY: { // def
                FOV: 2,
            },
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            TURRETS: [],
            DRAW_HEALTH: false,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                    COLOR: rainbow,
                }, }, 
            ],
        };
        exports.tank = {
            PARENT: [exports.genericTank],
            LABEL: 'Upcoming Tanks/Redesigns',
            RESET_UPGRADES: true,
            SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
            BODY: { // def
                FOV: 2,
            },
            BODY: { // def
                SHIELD: 1000,
                REGEN: 10,
                HEALTH: 100,
                DAMAGE: 10,
                DENSITY: 20,
                FOV: 2,
            },
            TURRETS: [],
            DRAW_HEALTH: false,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,    -1.4,     0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.op]),
                    TYPE: exports.bullet,
                    COLOR: 40,
                }, }, 
            ],
        };
            exports.single = {
                PARENT: [exports.genericTank],
                LABEL: 'Single',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  
            exports.bombdum = {
                PARENT: [exports.genericTank],
                LABEL: 'Bombdum',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: exports.bullet,
                            COLOR: 46,
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };  
            exports.frag = {
                PARENT: [exports.genericTank],
                LABEL: 'Frag',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.single]),
                            TYPE: [exports.bullet, {FRAG: 'expand'}],
                        }, },  {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],  
                    PROPERTIES: 
                          {
                            COLOR: 45,
                          },
                    }
                ],
            };  
             exports.lancer = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Lancer',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  26,     0.01,      -1650,      0,      0,      0,      0,   ], 
                         }, 
                  ], 
             };
            exports.akafuji = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      2.7,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      270,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      90,      0,   ], 
                         }, 
                  ], 
             };

              exports.akafuji1 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      2.7,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      270,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      90,      0,   ], 
                         }, 
                  ], 
             };
             exports.akafuji2 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji .',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      5,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -5,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      265,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      95,      0,   ], 
                         }, 
                  ], 
             };
              exports.akafuji3 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji ..',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      10,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -10,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      260,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      100,      0,   ], 
                         }, 
                  ], 
             };
              exports.akafuji4 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji ...',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      15,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -15,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      255,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      105,      0,   ], 
                         }, 
                  ], 
             };
              exports.akafuji5 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji ....',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      20,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -20,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      250,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      110,      0,   ], 
                         }, 
                  ], 
             };
             exports.akafuji6 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji .....',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      25,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -25,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      245,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      115,      0,   ], 
                         }, 
                  ], 
             };
              exports.akafuji7 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji ......',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      30,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -30,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      240,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      120,      0,   ], 
                         }, 
                  ], 
             };
             exports.akafuji8 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji .......',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      35,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -35,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      235,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      125,      0,   ], 
                         }, 
                  ], 
             };
              exports.akafuji9 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji ........',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      40,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -40,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      230,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      130,      0,   ], 
                         }, 
                  ], 
             };
              exports.akafuji10 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji .........',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      45,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -45,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      225,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      135,      0,   ], 
                         }, 
                  ], 
             };
              exports.akafuji11 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji ..........',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      50,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -50,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      220,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      140,      0,   ], 
                         }, 
                  ], 
             };
              exports.akafuji12 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji ...........',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      55,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -55,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      215,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      145,      0,   ], 
                         }, 
                  ], 
             };
            exports.akafuji13 = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Akafuji ',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [{POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], PROPERTIES: {SHOOT_SETTINGS: combineStats([g.basic]),
                              TYPE: exports.bullet,}
                         }, {
                    POSITION: [  22,     4,      1,      0,      2.7,      60,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,     4,      1,      0,      -2.7,      -60,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.akafuji, g.bigger]),
                              TYPE: exports.bullet,
                              }, 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      15,      210,      0,   ], 
                         }, {
                          POSITION: [  5,     20,      -2.2,      0.6,      -15,      150,      0,   ], 
                         }, 
                  ], 
             };
             exports.teamtrees = {
                PARENT: [exports.genericTank],
                
                LABEL: '#TeamTrees',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  35,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic]),
                              TYPE: exports.bullet,
                              COLOR: 2,
                              },
                         }, {
                          POSITION: [  20,     50,      -1.4,      20,      0,      0,      0,   ], 
                           PROPERTIES:
                           {COLOR: 1,}
                         }, {
                          POSITION: [  20,     50,      -1.4,      40,      0,      0,      0,   ], 
                           PROPERTIES:
                           {COLOR: 1,}
                         }, {
                          POSITION: [  20,     50,      -1.4,      60,      0,      0,      0,   ], 
                           PROPERTIES:
                           {COLOR: 1,}
                         },   
                  ], 
             };
function makeFlail(name, length, damage = 1, size = 40, shell = exports.smasherBody, sides = 1, guns = []) {
    exports[`${name}FlailBall`] = {
        PARENT: [exports.genericTank],
        TYPE: "tank",
        LABEL: "Collision",
        DANGER: 0,
        BODY: {
            PUSHABILITY: 2.5,
            HEALTH: 1e10,
            REGEN: 1e10,
            DAMAGE: ((wepDamageFactor * wepHealthFactor) * 3) * damage,
            RESIST: base.RESIST,
            DENSITY: base.DENSITY
        },
        HITS_OWN_TYPE: 'everything',
        GIVE_KILL_MESSAGE: false,
        ACCEPTS_SCORE: false,
        LEVEL: 0,
        SCORE: 0,
        DAMAGE_TURRET: true,
        GUNS: [{
          POSITION: [0,20,1,0,0,0,0],
          PROPERTIES: {
            AUTOFIRE: true,     /***************** RELOAD RECOIL SHUDDER  SIZE   HEALTH  DAMAGE                                                     PEN               SPEED    MAX      RANGE     DENSITY  SPRAY   RESIST  */ 
            SHOOT_SETTINGS: combineStats([[g.basic,[0.4,     0,     1,      2,      2,      ((wepDamageFactor * wepHealthFactor) * 3) * damage,      1.2 * damage,      1,      1,      0.0001,      1,      1,      1],]])
          }, },
        ],
        TURRETS: [{
            POSITION: [20.5, 0, 0, 0, 360, 0],
            TYPE: shell
        }]
    };
    for (let i = 0; i < length; i++) {
        exports[`${name}ChainPart${i}`] = {
            PARENT: [exports.genericTank],
            LABEL: "",
            COLOR: 16,
            TYPE: "Flail Chain",
            GUNS: [{
                POSITION: [40, 4, 1, 0, 0, 0, 0]
            }],
            TURRETS: []
        };
        exports[`${name}ChainPart${i}`].TURRETS.push({
            POSITION: [i === 0 ? size : 20, 40, 0, 0, 1, 1],
            TYPE: (i === 0 ? exports[`${name}FlailBall`] : exports[`${name}ChainPart${i - 1}`])
        });
    };
    let tt = [];
    for (let i = 0; i < sides; i++) tt.push({
        POSITION: [5, 10, 0, (360 / sides) * i, 1, 0],
        TYPE: exports[`${name}ChainPart${length - 1}`]
    });
    return {
        PARENT: [exports.genericTank],
        LABEL: name,
        BODY: {
            SPEED: base.SPEED * .9,
        },
        TURRETS: tt,
        GUNS: guns,
        IS_SMASHER: true,
        STAT_NAMES: 8,
        IS_FLAIL: true
    };
}
             exports.chasseur = {
                PARENT: [exports.genericTank],
                LABEL: 'Chasseur',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.axe]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  29,     0.01,      -1650,      0,      0,      0,      0,   ], 
                         }, 
                  ], 
             };

exports.whacker = makeFlail("Whacker", 2);
exports.flail = makeFlail("Flail", 3);
exports.wreckingball = makeFlail("Wrecking Ball", 3, 1.4, 50);
             exports.flance = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Flance',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  26,     0.01,      -1650,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  12,     7,      1,      0,      0,      180,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.lanceweak]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  22,     0.01,      -1650,      0,      0,      180,      0,   ], 
                         },
                  ], 
             };
             exports.megalancer = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Waraxe',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.waraxe]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  26,     0.011,      -1650,      0,      0,      0,      0,   ], 
                         }, 
                  ], 
             };
    
        let smshskl = 12; //13;
        exports.smash = {
            PARENT: [exports.genericTank],
            LABEL: 'Smasher',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
        exports.parasite = {
            PARENT: [exports.genericTank],
            LABEL: 'Parasite',
            DANGER: 6,
            SUCK_TO_APPLY: 0,
            SUCK: true,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.parasiteBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
        exports.bonker = {
            PARENT: [exports.genericTankSmall],
            LABEL: 'Bonker',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
        exports.kami = {
            PARENT: [exports.genericTank],
            LABEL: 'Kamikaze',
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
                DENSITY: base.DENSITY * 2,
                SPEED: base.SPEED * 5,
            },
            GUNS: [{ /*** length width aspect x y angle delay */
            POSITION: [     0.01, 20,    1,   0,0, 0,    0     ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.shortlive]),
                TYPE: [exports.bullet, {FRAG: 'expand', COLOR: 12}],  
                ALT_FIRE: true,
            }, }, ],
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody5,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
exports.landmine = {
    PARENT: [exports.genericTank],
    LABEL: 'Landmine',
    INVISIBLE: [0.06, 0.01],
    DANGER: 7,
    BODY: {
        SPEED: base.SPEED * 1.1,
        FOV: base.FOV * 1.05,
        DENSITY: base.DENSITY * 2,
    },
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [21.5, 0, 0, 0, 360, 0, ],
        TYPE: exports.smasherBody,
    }, {
        POSITION: [21.5, 0, 0, 90, 360, 0, ],
        TYPE: exports.smasherBody,
    }],
    IS_SMASHER: true,
    SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl, ],
    STAT_NAMES: statnames.smasher,
};
            exports.megasmash = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Smasher',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed * 1.05,
                    FOV: base.FOV * 1.1,
                    DENSITY: base.DENSITY * 4,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  24,     0,      0,      0,     360,  0,], 
                    TYPE: exports.megasmashBody,
                }],
            };
            exports.spike = {
                PARENT: [exports.genericTank],
                LABEL: 'Spike',
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     120,    360,  0,], 
                    TYPE: exports.spikeBody,
                    }, {
                    POSITION: [ 20.5,    0,      0,     240,    360,  0,], 
                    TYPE: exports.spikeBody,
                }],
            };     
            exports.weirdspike = {
                PARENT: [exports.genericTank],
                LABEL: 'Booby Trap',
                INVISIBLE: [0.06, 0.01],
                DANGER: 7,
                BODY: {
                    SPEED: base.speed*0.9,
                    DAMAGE: base.DAMAGE * 1.1,
                    FOV: base.FOV * 1.05,
                    DENSITY: base.DENSITY * 2,
                },
                IS_SMASHER: true,
                SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
                STAT_NAMES: statnames.smasher,
                TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                    POSITION: [ 20.5,    0,      0,      0,     360,  0,], 
                    TYPE: exports.spikeBody1,
                    }, { 
                    POSITION: [ 20.5,    0,      0,     180,    360,  0,], 
                    TYPE: exports.spikeBody2,
                }],
            };       
            exports.autosmash = makeAuto(exports.smash, 'Auto-Smasher', { type: exports.autoSmasherTurret, size: 11, });
            exports.autosmash.SKILL_CAP = [smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl, smshskl,];

    exports.twin = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    }; 
let ninth = 1/9;
    exports.heavytwin = {
        PARENT: [exports.genericTank],
        LABEL: 'Heavy Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  6,      18, 1+(ninth*2), 0,      0,      0,      0,   ],
            }, {
            POSITION: [  13,     10,      1,      7,     5.7,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.heavytwin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  13,     10,      1,      7,    -5.7,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.heavytwin]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
    exports.freaker = {
        PARENT: [exports.genericTank],
        LABEL: 'Freaker',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */

            POSITION: [  13,     10,      1,      0,     5.6,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.heavytwin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  13,     10,      1,      0,    -5.6,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.heavytwin]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [  7,      12, 1+(ninth*2), 0,      0,      0,      0,   ],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
                TYPE: [exports.drone, { INDEPENDENT: true, }],
                AUTOFIRE: true,
                SYNCS_SKILLS: true,
                STAT_CALCULATOR: gunCalcNames.drone,
                WAIT_TO_CYCLE: false,    
                MAX_CHILDREN: 3,
            }, }, 
        ],
    };
exports.heavytwinbrid = makeHybrid(exports.heavytwin, "Heavy Twinbrid");
    exports.cherrytree = {
        PARENT: [exports.genericTank],
        LABEL: 'Cherry Tree',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  6,      18, 1+(ninth*2), 0,      0,      0,      0,   ],
            PROPERTIES: {
              COLOR: 42,
            }, }, {
            POSITION: [  13,     10,      1,      7,     5.7,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.heavytwin]),
                TYPE: [exports.bullet, {FRAG: 'flame'}],
                COLOR: 42,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  13,     10,      1,      7,    -5.7,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pound, g.heavytwin]),
                TYPE: [exports.bullet, {FRAG: 'flame'}],
                COLOR: 42,
            }, }, 
        ],
    };
            exports.dropship = {
                PARENT: [exports.genericTank],
                LABEL: 'Dropship',
                GUNS: [ { /** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  1,     1,      1.001,      6.5,      9,      0,      0,   ], 
                    PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.nospray, g.bigger, g.norecoil]),
                    TYPE: exports.bullet,
                          
                        }, }, { /** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  1,     1,      1.001,      6.5,      -9,      0,      0,   ], 
                    PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.nospray, g.bigger, g.norecoil]),
                    TYPE: exports.bullet,
                          
                        }, }, { /** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     6,      1,      0,      5,      30,      0,   ], 
                    PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.nospray, g.norecoil, g.fake]),
                    TYPE: exports.bullet,
                          
                        }, }, { /** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     6,      1,      0,      -5,      -30,      0,   ], 
                    PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.nospray, g.norecoil, g.fake]),
                    TYPE: exports.bullet,
                          
                        }, },
                ],
            };
    exports.homingtwin = {
        PARENT: [exports.genericTank],
        LABEL: 'Homing Twin',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullethome,
                COLOR: 12,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullethome,
                COLOR: 12,
            }, }, 
        ],
    };
    exports.twinmach = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Machine',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     6,      1.5,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mach]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     6,      1.5,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mach]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
exports.clicker = {
    PARENT: [exports.genericTank],
    LABEL: "Clicker",
    DANGER: 6,
    BODY: {
        ACCELERATION: .85 * base.ACCEL,
        FOV: 1.2 * base.FOV
    },
    GUNS: [{
        POSITION: [24, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [24, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [24, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [24, 5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.click]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [5, 8.5, -1.6, 7.8, 0, 0, 0, ],
    }]
};
exports.obliterator = {
    PARENT: [exports.genericTank],
    LABEL: "Obliterator",
    DANGER: 6,
    BODY: {
        ACCELERATION: .8 * base.ACCEL,
        FOV: 1.25 * base.FOV
    },
    GUNS: [{
        POSITION: [6, 10, 1.2, 8, 0, 0, 0]
    }, {
        POSITION: [12, 12, 1, 15, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.oblit]),
            TYPE: exports.bullet
        }
    }]
};
exports.plow = {
    PARENT: [exports.genericTank],
    LABEL: "Plow",
    DANGER: 6,
    BODY: {
        ACCELERATION: .8 * base.ACCEL,
        FOV: 1.25 * base.FOV
    },
    GUNS: [{
        POSITION: [6, 10, 1.2, 8, 0, 0, 0]
    }, {
        POSITION: [18, 12, 1.8, 15, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.mach, g.oblit]),
            TYPE: exports.bullet
        }
    }]
};
    exports.twinsniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Sniper',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,     8.5,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,     8.5,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, 
        ],
    };
    exports.swarmtwins = {
        PARENT: [exports.genericTank],
        LABEL: 'Swarming Twin Sniper',
        STAT_NAMES: statnames.generic,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,     6,      1,      0,     6,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,     6,      1,      0,    -6,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.sniper]),
                TYPE: exports.bullet,
            }, }, {           
            POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,               
            }, },
        ],
    };
exports.swarmbents = {
        PARENT: [exports.genericTank],
        LABEL: 'Swarming Bent Sniper',
        STAT_NAMES: statnames.generic,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,     6,      1,      0,     4,     20,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.sniper]),
                TYPE: exports.bullet,
            }, }, { 
            POSITION: [  24,     6,      1,      0,    -4,     -20,     0,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.sniper]),
                TYPE: exports.bullet,
            }, }, {         
            POSITION: [  24,     6,      1,      0,    0,     0,     0.3,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.sniper]),
                TYPE: exports.bullet,
            }, }, {   
            POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.swarm]),
                TYPE: exports.swarm,
                STAT_CALCULATOR: gunCalcNames.swarm,               
            }, },
        ],
    };
            exports.pelleter = {
                PARENT: [exports.genericTank],
                LABEL: 'Pelleter',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,    2,     1,      0,     3,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  17,    2,     1,      0,    -3,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };
            exports.puntgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Punt Gun',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
               POSITION: [  17,    2,     1,      0,     3,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter]),
                        TYPE: exports.bullet,
                    }, }, { 
               POSITION: [  17,    2,     1,      0,    -3,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter]),
                        TYPE: exports.bullet,
                    }, }, {
               POSITION: [  14,    2,     1,      0,     3,    0,      0.1,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter]),
                        TYPE: exports.bullet,
                    }, }, { 
               POSITION: [  14,    2,     1,      0,    -3,    0,     0.35, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };
            exports.micrometer = {
                PARENT: [exports.genericTank],
                LABEL: 'Micrometer',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,    4.3,     1,      0,     3,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  17,    4.3,     1,      0,    -3,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  6,    16,    0.7,    6,     0,      0,      0,   ],                         
                    }
                ],
            };
exports.microbrid = makeHybrid(exports.micrometer, "Microbrid");
//exports.milibrid = makeHybrid(exports.milimeter, "Milibrid");
exports.microlearner = makeLearner(exports.micrometer, "Microlearner");
            exports.milimeter = {
                PARENT: [exports.genericTank],
                LABEL: 'Milimeter',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    4.35,     1,      0,     3.4,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    4.35,     1,      0,    -3.4,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  7,    16,    0.8,    6,     0,      0,      0,   ],                         
                    }
                ],
            };
            exports.macrometer = {
                PARENT: [exports.genericTank],
                LABEL: 'Macrometer',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,    4.5,     1,      0,     3.8,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  19,    4.5,     1,      0,    -3.8,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  8,    17,    0.877,    6,     0,      0,      0,   ],                         
                    }
                ],
            };
            exports.glasspelleter = {
                PARENT: [exports.genericTank],
                LABEL: 'Glass Pelleter',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,    2,     1,      0,     3,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter, g.glass]),
                        TYPE: exports.bullet,
                        COLOR: 38,
                    }, }, { 
                POSITION: [  17,    2,     1,      0,    -3,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter, g.glass]),
                        TYPE: exports.bullet,
                        COLOR: 38,
                    }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],      
                                          PROPERTIES: {
                        COLOR: 38,
                    }, }
                ],
            };
            exports.glassborer = {
                PARENT: [exports.genericTank],
                LABEL: 'Glass Borer',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,    2,     1,      0,     3,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter, g.glass, g.borer]),
                        TYPE: exports.bullet,
                        COLOR: 38,
                    }, }, { 
                POSITION: [  22,    2,     1,      0,    -3,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter, g.glass, g.borer]),
                        TYPE: exports.bullet,
                        COLOR: 38,
                    }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],      
                                          PROPERTIES: {
                        COLOR: 38,
                    }, }
                ],
            };
                    /*POSITION: [  12,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  26,     0.01,      -1650,      0,      0,      0,      0,   ], 
                         }, */
             exports.backlance = {
                PARENT: [exports.genericTank],
                
                LABEL: 'Back Lance',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                              SHOOT_SETTINGS: combineStats([g.basic]),
                              TYPE: exports.bullet,
                              },
                         }, {
                    POSITION: [  12,     7,      1,      0,      0,      180,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  26,     0.01,      -1650,      0,      0,      180,      0,   ], 
                         }, 
                  ], 
             };
            exports.lanciter = {
                PARENT: [exports.genericTank],
                LABEL: 'Lanciter',
                //CONTROLLERS: ['nearestDifferentMaster'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,    2,     1,      0,     3,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  17,    2,     1,      0,    -3,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.pelleter]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }, {
                POSITION: [  12,     7,      1,      0,      0,      180,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  26,     0.01,      -1650,      0,      0,      180,      0,   ], 
                         }, 
                ],
            };
            exports.borer = {
                PARENT: [exports.genericTank],
                LABEL: 'Borer',
                //CONTROLLERS: ['nearestDifferentMaster'],
                BODY: {
                    ACCELERATION: base.ACCEL * 1/9 * 8.5, 
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,    2,     1,      0,     3,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.borer]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  22,    2,     1,      0,    -3,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.borer]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };
            exports.scorpion = {
                PARENT: [exports.genericTank],
                LABEL: 'Scorpion',
                //CONTROLLERS: ['nearestDifferentMaster'],
                BODY: {
                    ACCELERATION: base.ACCEL * 1/9 * 8.5, 
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,    3.5,     1,      0,     2.6,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.borer, g.pound]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  22,    3.5,     1,      0,    -2.6,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.borer, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };
            exports.borergun = {
                PARENT: [exports.genericTank],
                LABEL: 'Borer Gunner',
                //CONTROLLERS: ['nearestDifferentMaster'],
                BODY: {
                    ACCELERATION: base.ACCEL * 1/9 * 8.5, 
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  22,    3.5,     1,      0,     2.8,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.borer]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  22,    3.5,     1,      0,    -2.8,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.borer]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };
            exports.homer/*simpson*/ = {
                PARENT: [exports.genericTank],
                LABEL: 'Homer',
                //CONTROLLERS: ['nearestDifferentMaster'],
                BODY: {
                    ACCELERATION: base.ACCEL * 1/9 * 8.5, 
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  22,    2,     1,      0,     3,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.borer]),
                        TYPE: exports.bullethome,
                        COLOR: 12,
                    }, }, { 
                POSITION: [  22,    2,     1,      0,    -3,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.borer]),
                        TYPE: exports.bullethome,
                        COLOR: 12,
                    }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],                         
                    }
                ],
            };
let switchshape = [[-0.7071067811999999,-0.7071067811999999],[-0.6946583705,-0.7193398003],[-0.6819983601,-0.7313537016000001],[-0.6691306064,-0.7431448255],[-0.656059029,-0.7547095802],[-0.6427876097,-0.7660444430999999],[-0.629320391,-0.7771459615],[-0.6156614753,-0.7880107536],[-0.6018150232,-0.79863551],[-0.5877852523,-0.8090169944],[-0.5735764364,-0.8191520443],[-0.5591929035,-0.8290375726000001],[-0.544639035,-0.8386705679],[-0.5299192642,-0.8480480962],[-0.5150380749,-0.8571673007],[-0.5,-0.8660254038],[-0.4848096202,-0.8746197071],[-0.4694715628,-0.8829475929],[-0.4539904997,-0.8910065242],[-0.4383711468,-0.8987940463000001],[-0.4226182617,-0.906307787],[-0.4067366431,-0.9135454576],[-0.3907311285,-0.9205048535],[-0.3746065934,-0.9271838546],[-0.3583679495,-0.9335804265000001],[-0.3420201433,-0.9396926208],[-0.32556815450000004,-0.9455185756],[-0.3090169944,-0.9510565163],[-0.2923717047,-0.956304756],[-0.2756373558,-0.9612616959],[-0.2588190451,-0.9659258262999999],[-0.2419218956,-0.9702957263],[-0.22495105430000004,-0.9743700648],[-0.2079116908,-0.9781476007],[-0.19080899539999996,-0.9816271834],[-0.1736481777,-0.984807753],[-0.156434465,-0.9876883406],[-0.139173101,-0.9902680687000001],[-0.12186934340000001,-0.9925461516],[-0.1045284633,-0.9945218954],[-0.0871557427,-0.9961946980999999],[-0.0697564737,-0.9975640503],[-0.0523359562,-0.9986295348],[-0.0348994967,-0.999390827],[-0.0174524064,-0.9998476952],[0,-1],[0.0174524064,-0.9998476952],[0.0348994967,-0.999390827],[0.0523359562,-0.9986295348],[0.0697564737,-0.9975640503],[0.0871557427,-0.9961946980999999],[0.1045284633,-0.9945218954],[0.12186934340000001,-0.9925461516],[0.139173101,-0.9902680687000001],[0.156434465,-0.9876883406],[0.1736481777,-0.984807753],[0.19080899539999996,-0.9816271834],[0.2079116908,-0.9781476007],[0.22495105430000004,-0.9743700648],[0.2419218956,-0.9702957263],[0.2588190451,-0.9659258262999999],[0.2756373558,-0.9612616959],[0.2923717047,-0.956304756],[0.3090169944,-0.9510565163],[0.32556815450000004,-0.9455185756],[0.3420201433,-0.9396926208],[0.3583679495,-0.9335804265000001],[0.3746065934,-0.9271838546],[0.3907311285,-0.9205048535],[0.4067366431,-0.9135454576],[0.4226182617,-0.906307787],[0.4383711468,-0.8987940463000001],[0.4539904997,-0.8910065242],[0.4694715628,-0.8829475929],[0.4848096202,-0.8746197071],[0.5,-0.8660254038],[0.5150380749,-0.8571673007],[0.5299192642,-0.8480480962],[0.544639035,-0.8386705679],[0.5591929035,-0.8290375726000001],[0.5735764364,-0.8191520443],[0.5877852523,-0.8090169944],[0.6018150232,-0.79863551],[0.6156614753,-0.7880107536],[0.629320391,-0.7771459615],[0.6427876097,-0.7660444430999999],[0.656059029,-0.7547095802],[0.6691306064,-0.7431448255],[0.6819983601,-0.7313537016000001],[0.6946583705,-0.7193398003],[0.7071067811999999,-0.7071067811999999],[0.7193398003,-0.6946583705],[0.7313537016000001,-0.6819983601],[0.7431448255,-0.6691306064],[0.7547095802,-0.656059029],[0.7660444430999999,-0.6427876097],[0.7771459615,-0.629320391],[0.7880107536,-0.6156614753],[0.79863551,-0.6018150232],[0.8090169944,-0.5877852523],[0.8191520443,-0.5735764364],[0.8290375726000001,-0.5591929035],[0.8386705679,-0.544639035],[0.8480480962,-0.5299192642],[0.8571673007,-0.5150380749],[0.8660254038,-0.5],[0.8746197071,-0.4848096202],[0.8829475929,-0.4694715628],[0.8910065242,-0.4539904997],[0.8987940463000001,-0.4383711468],[0.906307787,-0.4226182617],[0.9135454576,-0.4067366431],[0.9205048535,-0.3907311285],[0.9271838546,-0.3746065934],[0.9335804265000001,-0.3583679495],[0.9396926208,-0.3420201433],[0.9455185756,-0.32556815450000004],[0.9510565163,-0.3090169944],[0.956304756,-0.2923717047],[0.9612616959,-0.2756373558],[0.9659258262999999,-0.2588190451],[0.9702957263,-0.2419218956],[0.9743700648,-0.22495105430000004],[0.9781476007,-0.2079116908],[0.9816271834,-0.19080899539999996],[0.984807753,-0.1736481777],[0.9876883406,-0.156434465],[0.9902680687000001,-0.139173101],[0.9925461516,-0.12186934340000001],[0.9945218954,-0.1045284633],[0.9961946980999999,-0.0871557427],[0.9975640503,-0.0697564737],[0.9986295348,-0.0523359562],[0.999390827,-0.0348994967],[0.9998476952,-0.0174524064],[1,0],[0.9998476952,0.0174524064],[0.999390827,0.0348994967],[0.9986295348,0.0523359562],[0.9975640503,0.0697564737],[0.9961946980999999,0.0871557427],[0.9945218954,0.1045284633],[0.9925461516,0.12186934340000001],[0.9902680687000001,0.139173101],[0.9876883406,0.156434465],[0.984807753,0.1736481777],[0.9816271834,0.19080899539999996],[0.9781476007,0.2079116908],[0.9743700648,0.22495105430000004],[0.9702957263,0.2419218956],[0.9659258262999999,0.2588190451],[0.9612616959,0.2756373558],[0.956304756,0.2923717047],[0.9510565163,0.3090169944],[0.9455185756,0.32556815450000004],[0.9396926208,0.3420201433],[0.9335804265000001,0.3583679495],[0.9271838546,0.3746065934],[0.9205048535,0.3907311285],[0.9135454576,0.4067366431],[0.906307787,0.4226182617],[0.8987940463000001,0.4383711468],[0.8910065242,0.4539904997],[0.8829475929,0.4694715628],[0.8746197071,0.4848096202],[0.8660254038,0.5],[0.8571673007,0.5150380749],[0.8480480962,0.5299192642],[0.8386705679,0.544639035],[0.8290375726000001,0.5591929035],[0.8191520443,0.5735764364],[0.8090169944,0.5877852523],[0.79863551,0.6018150232],[0.7880107536,0.6156614753],[0.7771459615,0.629320391],[0.7660444430999999,0.6427876097],[0.7547095802,0.656059029],[0.7431448255,0.6691306064],[0.7313537016000001,0.6819983601],[0.7193398003,0.6946583705],[0.7071067811999999,0.7071067811999999],[0.6946583705,0.7193398003],[0.6819983601,0.7313537016000001],[0.6691306064,0.7431448255],[0.656059029,0.7547095802],[0.6427876097,0.7660444430999999],[0.629320391,0.7771459615],[0.6156614753,0.7880107536],[0.6018150232,0.79863551],[0.5877852523,0.8090169944],[0.5735764364,0.8191520443],[0.5591929035,0.8290375726000001],[0.544639035,0.8386705679],[0.5299192642,0.8480480962],[0.5150380749,0.8571673007],[0.5,0.8660254038],[0.4848096202,0.8746197071],[0.4694715628,0.8829475929],[0.4539904997,0.8910065242],[0.4383711468,0.8987940463000001],[0.4226182617,0.906307787],[0.4067366431,0.9135454576],[0.3907311285,0.9205048535],[0.3746065934,0.9271838546],[0.3583679495,0.9335804265000001],[0.3420201433,0.9396926208],[0.32556815450000004,0.9455185756],[0.3090169944,0.9510565163],[0.2923717047,0.956304756],[0.2756373558,0.9612616959],[0.2588190451,0.9659258262999999],[0.2419218956,0.9702957263],[0.22495105430000004,0.9743700648],[0.2079116908,0.9781476007],[0.19080899539999996,0.9816271834],[0.1736481777,0.984807753],[0.156434465,0.9876883406],[0.139173101,0.9902680687000001],[0.12186934340000001,0.9925461516],[0.1045284633,0.9945218954],[0.0871557427,0.9961946980999999],[0.0697564737,0.9975640503],[0.0523359562,0.9986295348],[0.0348994967,0.999390827],[0.0174524064,0.9998476952],[0,1],[-0.0174524064,0.9998476952],[-0.0348994967,0.999390827],[-0.0523359562,0.9986295348],[-0.0697564737,0.9975640503],[-0.0871557427,0.9961946980999999],[-0.1045284633,0.9945218954],[-0.12186934340000001,0.9925461516],[-0.139173101,0.9902680687000001],[-0.156434465,0.9876883406],[-0.1736481777,0.984807753],[-0.19080899539999996,0.9816271834],[-0.2079116908,0.9781476007],[-0.22495105430000004,0.9743700648],[-0.2419218956,0.9702957263],[-0.2588190451,0.9659258262999999],[-0.2756373558,0.9612616959],[-0.2923717047,0.956304756],[-0.3090169944,0.9510565163],[-0.32556815450000004,0.9455185756],[-0.3420201433,0.9396926208],[-0.3583679495,0.9335804265000001],[-0.3746065934,0.9271838546],[-0.3907311285,0.9205048535],[-0.4067366431,0.9135454576],[-0.4226182617,0.906307787],[-0.4383711468,0.8987940463000001],[-0.4539904997,0.8910065242],[-0.4694715628,0.8829475929],[-0.4848096202,0.8746197071],[-0.5,0.8660254038],[-0.5150380749,0.8571673007],[-0.5299192642,0.8480480962],[-0.544639035,0.8386705679],[-0.5591929035,0.8290375726000001],[-0.5735764364,0.8191520443],[-0.5877852523,0.8090169944],[-0.6018150232,0.79863551],[-0.6156614753,0.7880107536],[-0.629320391,0.7771459615],[-0.6427876097,0.7660444430999999],[-0.656059029,0.7547095802],[-0.6691306064,0.7431448255],[-0.6819983601,0.7313537016000001],[-0.6946583705,0.7193398003],[-0.7071067811999999,0.7071067811999999],[-1.4137,0]]; //CONTROLLERS: ['nearestDifferentMaster'],
        exports.gunner = {
            PARENT: [exports.genericTank],
            LABEL: 'Gunner',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
exports.heavyGunner = {
    PARENT: [exports.genericTank],
    LABEL: "Rimfire",
    DANGER: 7,
    GUNS: [{
        POSITION: [12, 5, 1, 0, 7.25, 10, .5],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [12, 5, 1, 0, -7.25, -10, .75],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [16, 5, 1, 0, 3.75, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [16, 5, 1, 0, -3.75, 0, .25],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.pelleter, g.puregunner, g.pound]),
            TYPE: exports.bullet
        }
    }]
};
            exports.machinegunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Gunner',
                DANGER: 6,
                BODY: {
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     3,     4.0,    -3,      5,      0,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,    -3,     -5,      0,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,     2.5,     0,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  14,     3,     4.0,     0,    -2.5,     0,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  14,     3,     4.0,     3,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.machgun]),
                            TYPE: exports.bullet,
                        }, }, 
                ]
            };
            exports.autogunner = makeAuto(exports.gunner);   
            exports.homegunner = makeHome(exports.gunner);            
            exports.nailgun = {
                PARENT: [exports.genericTank],
                LABEL: 'Nailgun',
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                    SPEED: base.SPEED * 0.9,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.75, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     2,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.nail]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  5.5,    8,    -1.8,    6.5,     0,      0,      0,   ],
                        },
                ],
            };

        exports.double = {
            PARENT: [exports.genericTank],
            LABEL: 'Twin Flank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
        exports.hidetri = {
            PARENT: [exports.genericTank],
            LABEL: 'Hidden Angle',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.tripletwin = {
                PARENT: [exports.genericTank],
                LABEL: 'Triple Twin',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    120,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    240,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.spam, g.double]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.autodouble = makeAuto(exports.double, 'Auto-Double');
            exports.split = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     5.5,     25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,    -5.5,    -25,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.splitrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Hewn Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic, 
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      25,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.7,    13,      0,     25,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,      -25,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.7,    13,      0,     -25,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,    -5.5,    180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.double, g.hewn]),
                            TYPE: exports.bullet,
                        
                    }, },
                ],
            };
        exports.oldbent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.bent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Shot',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.cutter = {
            PARENT: [exports.genericTank],
            LABEL: 'Cutter',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -4,    -20,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      4,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,      5.5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  20,     8,      1,      0,      -5.5,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.poundbent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Pounder',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19.56,     9,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19.56,     9,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  21.56,     9,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.blastbent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Blaster',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  9,     12,      1.4,      5,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mach, g.blast]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  9,     12,      1.4,      5,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mach, g.blast]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  9,     12,      1.4,      8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mach, g.blast]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.destroybent = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Destroyer',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19.56,     10.5,      1,      0,     -1.99,    -22,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19.56,     10.5,      1,      0,      1.99,     22,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  21.56,     10.5,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
exports.heavyhybrid = makeHybrid(exports.poundbent, "Heavy Hybrid");
        exports.cherryforest = {
            PARENT: [exports.genericTank],
            LABEL: 'Cherry Forest',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19.56,     9,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound]),
                        TYPE: [exports.bullet, {FRAG: 'flame'}],
                        COLOR: 42,
                    }, }, {
                POSITION: [  19.56,     9,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound]),
                        TYPE: [exports.bullet, {FRAG: 'flame'}],
                        COLOR: 42,
                    }, }, {
                POSITION: [  21.56,     9,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound]),
                        TYPE: [exports.bullet, {FRAG: 'flame'}],
                        COLOR: 42,
                    }, },
            ],
        };
        exports.sunburst = {
            PARENT: [exports.genericTank],
            LABEL: 'Sunburst',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     3,      1,      0,      2.2,      20,      0.4,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.puregunner]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     3,      1,      0,      -2.2,      -20,      0.6,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.puregunner]),
                        TYPE: exports.bullet,
                    }, }, {                  
                POSITION: [  19,     3,      1,      0,      -2.2,     20,     0.6,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.puregunner]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     3,      1,      0,      2.2,     -20,     0.4,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.puregunner]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     3,      1,      0,     2.2,    0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.puregunner]),
                        TYPE: exports.bullet,
                    }, }, {                
                POSITION: [  22,     3,      1,      0,     -2.2,    0,     0.2,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.puregunner]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.sunbeam = {
            PARENT: [exports.genericTank],
            LABEL: 'Sunbeam',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     6,      1,      0,      5,      25,      0.4,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.weakpound]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     6,      1,      0,      -5,      -25,      0.6,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.weakpound]),
                        TYPE: exports.bullet,
                    }, }, {                  
                POSITION: [  19,     6,      1,      0,      -1,     25,     0.6,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.weakpound]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     6,      1,      0,      1,     -25,     0.4,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.weakpound]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     6,      1,      0,     3.8,    0,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.weakpound]),
                        TYPE: exports.bullet,
                    }, }, {                
                POSITION: [  22,     6,      1,      0,     -3.8,    0,     0.2,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.weakpound]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.bentsniper = {
            PARENT: [exports.genericTank],
            LABEL: 'Triple Sniper',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.9,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  23,     8.5,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  23,     8.5,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  26,     8.5,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.sniper]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.benthomer = {
            PARENT: [exports.genericTank],
            LABEL: 'Bent Homer',
            DANGER: 6,
            BODY: {
                SPEED: base.SPEED * 0.95,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  19,     8,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullethome,
                        COLOR: 12,
                    }, }, {
                POSITION: [  19,     8,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullethome,
                        COLOR: 12,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullethome,
                        COLOR: 12,
                    }, },
            ],
        };
            exports.oldbentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -1,     -25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,      25,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -1,     155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      1,    -155,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.bentdouble = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Double',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     8,      1,      0,     -2,     -20,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,      20,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,     160,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,    -160,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.sniperII = {
    PARENT: [exports.genericTank],
    LABEL: "Sniper II",
  BODY: {
        ACCELERATION: .5 * base.ACCEL,
        SPEED: .8 * base.SPEED,
        FOV: 1.8 * base.FOV
    },
    GUNS: [{
        POSITION: [24, 8.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports.bullet,
        }
    }, {
        POSITION: [11, 20, 0.5, 0, 0, 0, 0]
    },
          {
        POSITION: [5, 10, 0.85, 11, 0, 0, 0]
    }]
};
            exports.mixup = {
                PARENT: [exports.genericTank],
                LABEL: 'Mix-up',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,    3.5,     1,      0,     7.25,    0,     0.5,  ], 
                        PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                    POSITION: [  12,    3.5,     1,      0,    -7.25,    0,     0.75, ], 
                        PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                    POSITION: [  16,    3.5,     1,      0,     3.75,    0,      0,   ], 
                        PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                    }, }, { 
                    POSITION: [  16,    3.5,     1,      0,    -3.75,    0,     0.25, ], 
                        PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.fast]),
                        TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     90,     0,   ], 
                        PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      270,    0.5,  ], 
                        PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.emp = {
                PARENT: [exports.genericTank],
                LABEL: 'EMP',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     9,      1,      0,     -2,     -20,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     9,      1,      0,      2,      20,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: [exports.bullet, {FRAG: 'empfreeze'}],
                            ALT_FIRE: true,
                            COLOR: 14,
                        }, }, {
                    POSITION: [  19,     9,      1,      0,     -2,     160,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                            COLOR: 15,
                        }, }, {
                    POSITION: [  19,     9,      1,      0,      2,    -160,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                            COLOR: 15,
                        }, }, {
                    POSITION: [  22,     7,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.double]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.penta = {
                PARENT: [exports.genericTank],
                LABEL: 'Penta Shot',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,     -3,    -30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      3,     30,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,     -2,    -15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     8,      1,      0,      2,     15,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.netfisher = {
                PARENT: [exports.genericTank],
                LABEL: 'Netfisher',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     9.75,      1,      0,     -3,    -36,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  16,     9.75,      1,      0,      3,     36,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     9.75,      1,      0,     -2,    -18,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     9.75,      1,      0,      2,     18,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  22,     9.75,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.inter = {
                PARENT: [exports.genericTank],
                LABEL: 'Intertwiner',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.85,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,     5.5,    45,    0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,      -5.5,     45,    0.5, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,     5.5,    -45,    0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  20,     8,      1,      0,      -5.5,     -45,    0.5, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.benthybrid = makeHybrid(exports.bent, 'Bent Hybrid');

        exports.triple = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triplet',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    8,      1,      0,      5.5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    8,      1,      0,     -5.5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
        exports.tripleheavy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                FOV: base.FOV * 1.05,
            },
            LABEL: 'Triple Heavy',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    10,      1,      0,      5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,    10,      1,      0,     -5,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    10,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple]),
                        TYPE: exports.bullet,
                    }, }, 
            ],
        };
            exports.quint = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Quintuplet',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,    10,      1,      0,     -5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,    10,      1,      0,      5,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,    10,      1,      0,     -3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  19,    10,      1,      0,      3,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  22,    10,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.triple, g.quint]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };        
            exports.dual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                LABEL: 'Dual',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     7,      1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    8.5,     1,      0,     5.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    8.5,     1,      0,    -5.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
            exports.swarmdual = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                BODY: {
                    ACCEL: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.1,
                },
                STAT_NAMES: statnames.generic,
                LABEL: 'Swarming Dual',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     5.5,      1,      0,     6,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  18,     5.5,      1,      0,    -6,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual, g.lowpower]),
                            TYPE: exports.bullet,
                            LABEL: 'Small',
                        }, }, { 
                    POSITION: [  16,    7,     1,      0,     6,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  16,    7,     1,      0,    -6,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.dual]),
                            TYPE: exports.bullet,
                        }, }, {           
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.halfreload]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,               
                       }, }, 
                ],
            };

    exports.s = {
        PARENT: [exports.genericTank],
        LABEL: 'S',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    28.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };

    exports.sniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.chiller = {
        PARENT: [exports.genericTank],
        LABEL: 'Chiller',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bulletcold,
            }, }, {
            POSITION: [  15,    7.25,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                COLOR: 48,
            },
            }
        ],
    };
    exports.frostbite = {
        PARENT: [exports.genericTank],
        LABEL: 'Frostbite',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bulletcold2,
            }, }, {
            POSITION: [  17,    7.25,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                COLOR: 48,
            },
            }
        ],
    };
    exports.fireplayer = {
        PARENT: [exports.genericTank],
        LABEL: 'Fire Player',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bulletburn,
            }, }, {
            POSITION: [  15,    7.25,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                COLOR: 33,
            },
            }
        ],
    };
    exports.stinger = {
        PARENT: [exports.genericTank],
        LABEL: 'Stinger',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.bulletpoisoncold,
            }, }, {
            POSITION: [  15,    7.25,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                COLOR: 12,
            },
            }
        ],
    };
    exports.poisonsniper = {
        PARENT: [exports.genericTank],
        LABEL: 'Poison Sniper',
        BODY: {
            ACCELERATION: base.ACCEL * 0.7, 
            FOV: base.FOV * 1.2,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                TYPE: exports.poisonbullet,
            }, }, {
            POSITION: [  15,    7.25,     1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                COLOR: 1,
            },
            }
        ],
    };
            exports.rifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  20,    10.5,    1,      0,      0,      0,      0,   ], 
                        }, {
                    POSITION: [  24,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };

            exports.megarifle = {
                PARENT: [exports.genericTank],
                LABEL: 'Mega-Rifle',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [20,14,1,0,0,0,0], 
                        }, {
                    POSITION: [23,10,0.99,0,0,0,0] , 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.pound, g.oblit, g.rifle]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.musket = {
                PARENT: [exports.genericTank],
                LABEL: 'Musket',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.225,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                       
                    POSITION: [  14,    20,      1,      0,     0,      0,      0,   ], 
                        }, {
                    POSITION: [  18,    6.5,    1,      0,      4,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,    6.5,    1,      0,      -4,      0,      0.5,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.rifle, g.twin]),
                            TYPE: exports.bullet,
                        }, }, 
                ],
            };
        exports.assassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                },
            ],
        };
        exports.twinassassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Twin Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                
 
                POSITION: [  27,    8.5,     1,      0,      4.5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {

                POSITION: [  27,    8.5,     1,      0,      -4.5,      0,      0.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {           
                   POSITION: [   9,    20,    0.88,    0,      0,      0,      0,   ], 
                },
            ],
        };
        exports.combined = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Combined',
            STAT_NAMES: statnames.generic,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                
 
                POSITION: [  27,    8.5,     1,      0,      4.5,      9,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {

                POSITION: [  27,    8.5,     1,      0,      -4.5,      -9,      0.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {           
                POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, },
            ],
        };
        exports.twinranger = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Twin Ranger',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.5,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */                
 
                POSITION: [  32,    8.5,     1,      0,      4.5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {

                POSITION: [  32,    8.5,     1,      0,      -4.5,      0,      0.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {           
                   POSITION: [   9,    20,    0.88,    0,      0,      0,      0,   ], 
                },
            ],
        };
        exports.joketwinassassin = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Twin Assassin',
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  27,    8.5,     1,      0,      5.5,      5,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      5.5,      5,      0,   ], 
                }, {
                POSITION: [  27,    8.5,     1,      0,      -5.5,      -5,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   5,    8.5,    -1.6,    8,      -5.5,      -5,      0,   ], 
                }, 
            ],
        };
            exports.ranger = {
                PARENT: [exports.genericTank],
                LABEL: 'Ranger',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.5,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  32,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [   5,    8.5,    -1.6,    8,      0,      0,      0,   ], 
                    },
                ],
            };
            exports.autoass = makeAuto(exports.assassin);

        exports.hunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,    12,      1,      0,      0,      0,     0.25, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.megahunter = {
            PARENT: [exports.genericTank],
            LABEL: 'Mega-Hunter',
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.25,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [23,10,0.99,0,0,0,0], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.oblit, g.hunter, g.hunter2]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [20,14,1,0,0,0,0], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.oblit, g.hunter]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.preda = {
                PARENT: [exports.genericTank],
                LABEL: 'Predator',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.85,
                    FOV: base.FOV * 1.3,
                },
                CONTROLLERS: ['canZoom'],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,    12,      1,      0,      0,      0,     0.15, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.hunter2, g.preda]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,    16,      1,      0,      0,      0,     0.3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.preda]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.poach = makeHybrid(exports.hunter, 'Poacher');
            exports.sidewind = {
                PARENT: [exports.genericTank],
                LABEL: 'Sidewinder',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    11,    -0.5,    14,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  21,    12,    -1.1,     0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.hunter, g.sidewind]),
                            TYPE: exports.snake,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };

    exports.director = {
        PARENT: [exports.genericTank],
        LABEL: 'Director',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.navyist = {
        PARENT: [exports.genericTank],
        LABEL: 'Navyist',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.navyistdrone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, }, {
            POSITION: [   15.2,     17,    0.72,     0,      0,      0,      0,   ], 
                },
        ],
    };
exports.overrideturret = {
  PARENT: [exports.genericTank],
  LABEL: 'Override',  
  COLOR: 13,
  SHAPE: 4,
  GUNS: [{
    POSITION: [25,4.2,1,0,0,0,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,5.5,0,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,-5.5,0,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,0,90,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,5.5,90,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,-5.5,90,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,0,180,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,5.5,180,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,-5.5,180,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,0,270,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,5.5,270,0],
    PROPERTIES: {
      COLOR:13,
    }, }, {
    POSITION: [25,4.2,1,0,-5.5,270,0],
    PROPERTIES: {
      COLOR:13,
    }, },
  ]
};
 /*  SIZE     X       Y     ANGLE    ARC 
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {*/
    exports.override = {
        PARENT: [exports.genericTank],
        LABEL: 'Override',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    COLOR: 13,
                }, },
        ],
        TURRETS: [{
          POSITION: [8, 0, 0, 0, 360, 1,],
          TYPE: exports.overrideturret
        }, ]
    };
    exports.minilightning = {
        PARENT: [exports.genericTank],
        LABEL: 'Mini Lightning',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.2,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     11,    1.2,     14,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.lightning]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, }, {
            POSITION: [   6,     11,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.lightning]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,      
                }, },
        ],
    };
    exports.lightning = {
        PARENT: [exports.genericTank],
        LABEL: 'Lightning',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.2,
        },
        MAX_CHILDREN: 10,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     11,    1.2,     8,      0,      45,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.lightning]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, }, {
            POSITION: [   6,     11,    1.2,     8,      0,      -45,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.lightning]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,      
                }, },
        ],
    };
    exports.radio = {
        PARENT: [exports.genericTank],
        LABEL: 'Radio',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: exports.dwone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    
                }, },
        ],
    };
            /*GUNS: [ { LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: [exports.dronew, { CONTROLLERS: ['hangOutNearMaster'] }],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                        COLOR: 6,
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: [exports.droneb, { CONTROLLERS: ['canRepel'] }],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,   
                        COLOR: 19,
                    }, },*/
    exports.yinyang = {
        PARENT: [exports.genericTank],
        LABEL: 'Yin-Yang',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: [exports.droneb, {  CONTROLLERS: ['canRepel']}],
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, }, {
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {                    
                    SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                    TYPE: [exports.dronew, {  CONTROLLERS: ['hangOutNearMaster']}],
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    COLOR: 6,
                }, }, {
                POSITION: [   6,     4,    1.6,     8,      4,      0,      0,   ], 
                PROPERTIES: {
                  COLOR: 19, 
                }
                },
        ],
    };
exports.student/*why does every pounder director have a name of a learner*/ = {
        PARENT: [exports.genericTank],
        LABEL: 'Student',  
        STAT_NAMES: statnames.drone,
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.75,
            FOV: base.FOV * 1.1,
        },
        MAX_CHILDREN: 5,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   7,     13,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.over, g.learner]),
                    TYPE: exports.drone,
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
            exports.master = {
                PARENT: [exports.genericTank],
                LABEL: '',  
                STAT_NAMES: statnames.drone,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.15,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  16,     1,      0,      0,      0, 0], 
                        TYPE: exports.masterGun,
                            }, {
                    POSITION: [  16,     1,      0,     120,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            }, {
                    POSITION: [  16,     1,      0,     240,     0, 0], 
                        TYPE: [exports.masterGun, { INDEPENDENT: true, }],
                            },
                ],
            };

        exports.overseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Overseer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
        exports.commander = {
            PARENT: [exports.genericTank],
            LABEL: 'Commander',  
            DANGER: 6,
            STAT_NAMES: statnames.generic,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.15,
            },
            FACING_TYPE: 'autospin',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                        MAX_CHILDREN: 2,
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    120,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    240,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      60,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      300,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
exports.toxin = {
            PARENT: [exports.genericTank],
            LABEL: 'Toxin',  
            DANGER: 6,
            STAT_NAMES: statnames.generic,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.15,
            },
            FACING_TYPE: 'autospin',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: [exports.drone, {POISON_TO_APPLY: 0, POISON: true}],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                        MAX_CHILDREN: 2,
                        COLOR: 49,
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    120,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: [exports.drone, {POISON_TO_APPLY: 0, POISON: true}],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                        COLOR: 49,
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    240,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: [exports.drone, {POISON_TO_APPLY: 0, POISON: true}],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                        COLOR: 49,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      60,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      300,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };

        exports.hierarchy = {
            PARENT: [exports.genericTank],
            LABEL: 'Hierarchy',  
            DANGER: 6,
            STAT_NAMES: statnames.generic,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.15,
            },
            FACING_TYPE: 'autospin',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,     13,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander, g.learner]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                        MAX_CHILDREN: 2,
                    }, }, {
                POSITION: [   7,     13,    1.2,     8,      0,    120,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander, g.learner]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                    }, }, {
                POSITION: [   7,     13,    1.2,     8,      0,    240,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander, g.learner]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                    }, }, {
                POSITION: [   10,    11,    0.65,     7,      0,      60,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.frigate, g.nerf]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   10,    11,    0.65,     7,      0,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.frigate, g.nerf]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   10,    11,    0.65,     7,      0,      300,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.frigate, g.nerf]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
        exports.general = {
            PARENT: [exports.genericTank],
            LABEL: 'General',  
            DANGER: 6,
            STAT_NAMES: statnames.generic,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.15,
            },
            FACING_TYPE: 'autospin',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     9,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                        MAX_CHILDREN: 2,
                    }, }, {
                POSITION: [   6,     9,    1.2,     8,      0,    72,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                    }, }, {
                POSITION: [   6,     9,    1.2,     8,      0,    144,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                    }, }, {
                POSITION: [   6,     9,    1.2,     8,      0,    216,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                    }, }, {
                POSITION: [   6,     9,    1.2,     8,      0,    288,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.commander]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,    
                        MAX_CHILDREN: 2,     
                    }, },  {
                POSITION: [   7,    7.5,    0.6,     7,      0,      36,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      108,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      252,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      324,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
        exports.scholar = {
            PARENT: [exports.genericTank],
            LABEL: 'Scholar',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * ((1/9) * 10 ),
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,     13,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.learner]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   7,     13,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.learner]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, },
            ],
        };
exports.professor = {
            PARENT: [exports.genericTank],
            LABEL: 'Professor',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * ((1/9) * 11 ),
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,     13,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.learner]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   7,     13,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.learner]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   7,     13,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.learner]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, {
                POSITION: [   7,     13,    1.2,     8,      0,    180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over, g.learner]),
                        TYPE: exports.drone,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                    }, }, 
            ],
        };
        exports.fractionalizer = {
            PARENT: [exports.genericTank],
            LABEL: 'Fractionalizer',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: [exports.dronew, { CONTROLLERS: ['hangOutNearMaster'] }],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                        COLOR: 6,
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: [exports.droneb, { CONTROLLERS: ['canRepel'] }],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,   
                        COLOR: 19,
                    }, },
            ],
        };
        exports.mixnumber = {
            PARENT: [exports.genericTank],
            LABEL: 'Mixed Number',  
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            MAX_CHILDREN: 8,
            TURRETS: [{
                      /*  SIZE     X       Y     ANGLE    ARC   LAYER*/
                POSITION: [8,      0,      0,     0,     360,     1, ],
                        TYPE: [exports.bullet, {COLOR:10}],
              }, ],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: [exports.dronebt, { CONTROLLERS: ['hangOutNearMaster'] }],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,     
                        COLOR: 12,
                    }, }, {
                POSITION: [   6,     12,    1.2,     8,      0,    270,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                        TYPE: [exports.dronewt, { CONTROLLERS: ['canRepel'] }],
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.drone,
                        WAIT_TO_CYCLE: true,   
                        COLOR: 10,
                    }, },
            ],
        };
exports.turreteddrone = makeAuto(exports.drone);
exports.drivesymbol = {
    PARENT: [exports.genericTank],
    LABEL: '',
    SHAPE: 4
};
exports.motor = {
    PARENT: [exports.genericTank],
    LABEL: 'Motor',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: exports.drivesymbol,
    }],
    MAX_CHILDREN: 5,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.turreteddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },

    }, ],
};
exports.drive = {
    PARENT: [exports.genericTank],
    LABEL: 'Overdrive',
    DANGER: 6,
    STAT_NAMES: statnames.drone,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        SPEED: base.SPEED * 0.9,
        FOV: base.FOV * 1.1,
    },
    TURRETS: [{
        /** SIZE     X       Y     ANGLE    ARC */
        POSITION: [10, 0, 0, 0, 360, 1, ],
        TYPE: exports.drivesymbol,
    }],
    MAX_CHILDREN: 8,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 90, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.turreteddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },
    }, {
        POSITION: [6, 12, 1.2, 8, 0, 270, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.turreteddrone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            WAIT_TO_CYCLE: true,
        },

    }, ],
};
            exports.overlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Overlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.hexlord = {
                PARENT: [exports.genericTank],
                LABEL: 'Hexlord',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.hex]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.hex]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.hex]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     11,    1.2,     8,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.hex]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.hex]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, }, { 
                    POSITION: [   6,     11,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.hex]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                        }, },
                ],
            };
            exports.divisor = {
                PARENT: [exports.genericTank],
                LABEL: 'Divisor',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                MAX_CHILDREN: 8,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: [exports.dronew, { CONTROLLERS: ['hangOutNearMaster'] }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,   
                            COLOR: 6,
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: [exports.droneb, { CONTROLLERS: ['canRepel'] }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,
                            COLOR: 19,
                        }, }, {
                    POSITION: [   6,     12,    1.2,     8,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: [exports.dronew, { CONTROLLERS: ['hangOutNearMaster'] }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                            COLOR: 6,
                        }, }, { 
                    POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
                            TYPE: [exports.droneb, { CONTROLLERS: ['canRepel'] }],
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true, 
                            COLOR: 19,
                        }, },
                ],
            };
            exports.overtrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Overtrapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.banshee = {
                PARENT: [exports.genericTank],
                LABEL: 'Banshee',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.1,
                },
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  10,     8,      0,      0,      80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     120,     80, 0], 
                        TYPE: exports.bansheegun,
                            }, {
                    POSITION: [  10,     8,      0,     240,     80, 0], 
                        TYPE: exports.bansheegun,
                            },
                ],
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,      60,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 2,   
                        }, }, 
                    ]
            };
            exports.autoover = makeAuto(exports.overseer, "Auto-seer");
            exports.overgunner = {
                PARENT: [exports.genericTank],
                LABEL: 'Overgunner',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.SPEED * 0.9,
                    FOV: base.FOV * 1.1,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   6,     11,    1.2,     8,      0,     125,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,  
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [   6,     11,    1.2,     8,      0,     235,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.over, g.meta]),
                            TYPE: exports.drone,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.drone,
                            WAIT_TO_CYCLE: true,     
                            MAX_CHILDREN: 3,   
                        }, }, {
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.slow, g.flank, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        },
                ],
            };
        
        function makeSwarmSpawner(guntype) {
            return {
                PARENT: [exports.genericTank],
                LABEL: '',
                BODY: {
                    FOV: 2,
                },
                CONTROLLERS: ['nearestDifferentMaster'], 
                COLOR: 16,
                AI: {
                    NO_LEAD: true,
                    SKYNET: true,
                    FULL_VIEW: true,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     15,    0.6,    14,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: guntype,
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }
                ],
            };
        }
        exports.cruiserGun = makeSwarmSpawner(combineStats([g.swarm]));
        exports.boat = {
            PARENT: [exports.genericTank],
            LABEL: 'Boat',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.6,    0.605,     7,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, },
            ],
        }; 
        exports.cruiser = {
            PARENT: [exports.genericTank],
            LABEL: 'Cruiser',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      0,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        }; 
        exports.beehive = {
            PARENT: [exports.genericTank],
            LABEL: 'Beehive',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.8,     7,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      90,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      180,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      270,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        }; 
        exports.beezi = {
            PARENT: [exports.genericTank],
            LABEL: 'Beezi',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   9,    8.38,    0.6,     7,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   9,    8.38,    0.6,     7,      0,      90,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   9,    8.38,    0.6,     7,      0,      180,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   9,    8.38,    0.6,     7,      0,      270,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      90,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      180,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      270,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        }; 
        exports.praesepe = {
            PARENT: [exports.genericTank],
            LABEL: 'Praesepe',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   10,    11,    0.85,     7,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   10,    11,    0.85,     7,      0,      90,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   10,    11,    0.85,     7,      0,      180,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   10,    11,    0.85,     7,      0,      270,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.buff]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        }; 
        exports.colony = {
            PARENT: [exports.genericTank],
            LABEL: 'Colony',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.8,     7,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.nerf]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      60,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.nerf]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      120,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.nerf]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      180,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.nerf]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      240,     0,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.nerf]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, }, {
                POSITION: [   7,    7.5,    0.8,     7,      0,      300,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.bees, g.buff, g.nerf]),
                        TYPE: exports.bee,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        }; 
        exports.submarine = {
            PARENT: [exports.genericTank],
            LABEL: 'Submarine',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            INVISIBLE: [0.08, 0.03],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   7,    7.5,    0.6,     7,      4,      25,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,     -4,      -25,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
        exports.frigate = {
            PARENT: [exports.genericTank],
            LABEL: 'Frigate',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   10,    11,    0.65,     4,      4,      20,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.frigate]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   10,    11,    0.65,     4,     -4,      -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.frigate]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
        exports.warfare = {
            PARENT: [exports.genericTankSmall],
            LABEL: 'Warfare',
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   10,    11,    0.65,     4,      4,      20,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.frigate]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   10,    11,    0.65,     4,     -4,      -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.frigate]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
        exports.uboat = {
            PARENT: [exports.genericTank],
            LABEL: 'U-boat',
            DANGER: 6,
            FACING_TYPE: 'locksFacing',
            STAT_NAMES: statnames.swarm,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
                FOV: base.FOV * 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   10,    13,    0.7,     4,      4,      22,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.frigate, g.uboat]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,               
                    }, }, {
                POSITION: [   10,    13,    0.7,     4,     -4,      -22,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.frigate, g.uboat]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,         
                    }, },
            ],
        };
exports.piston = {
    PARENT: [exports.genericTank],
    LABEL: "Piston",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: .8 * base.ACCEL,
        FOV: 1.3 * base.FOV
    },
    GUNS: [{
        POSITION: [7, 7, .6, 6, 5, 205, .33],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.pistonback]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [6.5, 7, .6, 6, -5, 155, .33],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.pistonback]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [8, 7, .6, 6, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.pistonfront]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [13, 8, 1, 0, 0, 180, 0]
    }, {
        POSITION: [4.5, 8, 1.7, 13, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.guardtrap, g.pistontrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
};
exports.puttputt = {
    PARENT: [exports.genericTank],
    LABEL: "Putt-Putt",
    DANGER: 7,
    FACING_TYPE: "locksFacing",
    STAT_NAMES: statnames.swarm,
    BODY: {
        ACCELERATION: .8 * base.ACCEL,
        FOV: 1.3 * base.FOV
    },
    GUNS: [{
        POSITION: [7, 7, .6, 6, 5, 205, .33],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.pistonback]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [6.5, 7, .6, 6, -5, 155, .33],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.pistonback]),
            TYPE: exports.autoswarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [8, 7, .6, 6, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.pistonfront]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm
        }
    }, {
        POSITION: [13, 8, 1, 0, 0, 180, 0]
    }, {
        POSITION: [4.5, 8, 1.7, 13, 0, 180, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trap, g.guardtrap, g.pistontrap]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.trap
        }
    }]
};
            exports.battleship = {
                PARENT: [exports.genericTank],
                LABEL: 'Battleship',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      4,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',        
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      4,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Autonomous',         
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -4,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,        
                            LABEL: 'Guided'                
                        }, },
                ],
            };
            exports.carrier = {
                PARENT: [exports.genericTank],
                LABEL: 'Carrier',
                DANGER: 7,
                STAT_NAMES: statnames.swarm,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    FOV: base.FOV * 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      2,      40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,     -2,     -40,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                            TYPE: exports.swarm,
                            STAT_CALCULATOR: gunCalcNames.swarm,    
                        }, }
                ],
            };
            exports.autocruiser = makeAuto(exports.cruiser, "");
            exports.fortress = {
                PARENT: [exports.genericTank],
                LABEL: 'Fortress', //'Palisade',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     120,    1/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [   7,    7.5,    0.6,     7,      0,     240,    2/3,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.swarm, { CONTROLLERS: ['canRepel'] }],
                            STAT_CALCULATOR: gunCalcNames.swarm,   
                        }, }, {
                    POSITION: [  14,     9,      1,      0,      0,     60,      0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     60,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                            
                    POSITION: [  14,     9,      1,      0,      0,     300,     0,   ],
                        }, {
                    POSITION: [   4,     9,     1.5,    14,      0,     300,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.halfrange, g.slow]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };

        exports.underseer = {
            PARENT: [exports.genericTank],
            LABEL: 'Underseer',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, }, {
                POSITION: [   5,     12,    1.2,     8,      0,     270,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.sunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
        exports.maleficitor = {
            PARENT: [exports.genericTank],
            LABEL: 'Maleficitor',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            BODY: {
                ACCELERATION: base.ACCEL * 0.7,
                SPEED: base.SPEED * 0.9,
                FOV: base.FOV * 1.1,
            },
            SHAPE: 4,
            MAX_CHILDREN: 14,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   5,     12,    1.2,     8,      0,     0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                        TYPE: exports.invissunchip,
                        AUTOFIRE: true,
                        SYNCS_SKILLS: true,
                        STAT_CALCULATOR: gunCalcNames.necro,
                    }, },
                ],
        };
            exports.necromancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Necromancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 4,
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };
            exports.eggmancer = {
                PARENT: [exports.genericTank],
                LABEL: 'Eggmancer',
                DANGER: 7,
                STAT_NAMES: statnames.necro,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                SHAPE: 0,
                FACING_TYPE: 'autospin',
                MAX_CHILDREN: 14,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,    1.2,     8,      0,     90,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip2,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip]),
                            TYPE: exports.sunchip2,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            STAT_CALCULATOR: gunCalcNames.necro,
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,      0,     0.25, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard',
                        }, }, {
                    POSITION: [   5,     12,    1.2,     8,      0,     180,    0.75  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.drone, g.sunchip, g.weak, g.doublereload]),
                            TYPE: exports.autosunchip,
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,
                            MAX_CHILDREN: 4,
                            STAT_CALCULATOR: gunCalcNames.necro,
                            LABEL: 'Guard', 
                        }, },
                    ],
            };
        exports.lilfact = {
            PARENT: [exports.genericTank],
            LABEL: 'Spawner',
            DANGER: 6,
            STAT_NAMES: statnames.drone,
            SHAPE: 4,
            BODY: {
                SPEED: base.SPEED * 0.8,
                ACCELERATION: base.ACCEL * 0.5,
                FOV: 1.1,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,     11.22,      1.25,     8,     0,      0,      0,   ], 
                PROPERTIES: {          
                    MAX_CHILDREN: 4,
                    SHOOT_SETTINGS: combineStats([g.factory, g.babyfactory]),
                    TYPE: exports.minion,
                    STAT_CALCULATOR: gunCalcNames.drone,                        
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,  
                }, },
            ],
        };
            exports.autolilfact = makeAuto(exports.lilfact);
exports.autoautolilfact = makeAuto(exports.autolilfact);
exports.autoautoautolilfact = makeAuto(exports.autoautolilfact);
            exports.factory = {
                PARENT: [exports.genericTank],
                LABEL: 'Factory',
                DANGER: 7,
                STAT_NAMES: statnames.drone,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: 1.1,
                },
                SHAPE: 4,
                MAX_CHILDREN: 6,
                GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,     12,      1.3,    8,   0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.factory]),
                            TYPE: exports.minion,
                            STAT_CALCULATOR: gunCalcNames.drone,                        
                            AUTOFIRE: true,
                            SYNCS_SKILLS: true,   
                        }, },
                ],
            };

    exports.machine = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.machinehome = {
        PARENT: [exports.genericTank],
        LABEL: 'Machine Homer',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    12,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                TYPE: exports.bullethome,
                COLOR: 12,
            }, },
        ],
    };
    exports.gatling = {
        PARENT: [exports.genericTank],
        LABEL: 'Gatling Gun',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    16,     10,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sniper]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.inferno = {
        PARENT: [exports.genericTank],
        LABEL: 'Inferno',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    14,     8,     1.12,     0,      0,      13,      0,   ], 
            }, {
            POSITION: [    28,     6,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.inferno]),
                TYPE: exports.flare2,
            }, },
        ],
    };
    exports.combuster = {
        PARENT: [exports.genericTank],
        LABEL: 'Combuster',
        SHAPE: 4,
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    14,     8,     1.12,     0,      0,      13,      0,   ], 
            }, {
            POSITION: [    28,     6,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.inferno]),
                TYPE: [exports.flare2, {NECRO: true}],
            }, },
        ],
    };
    exports.sniferno = {
        PARENT: [exports.genericTank],
        LABEL: 'Sninferno',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    14,     8,     1.12,     0,      0,      13,      0,   ], 
            }, {
            POSITION: [    34,     6.5,     1,     0,      -2,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.sniper, g.inferno, g.sniferno]),
                TYPE: exports.flare2,
            }, },
        ],
    };
    exports.wildfire = {
        PARENT: [exports.genericTank],
        LABEL: 'Wildfire',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    14,     8,     1.12,     0,      5,      13,      0,   ], 
            }, {
            POSITION: [    25,     8,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.inferno]),
                TYPE: exports.flare2,
            }, },
        ],
    };
    exports.hyperfire = {
        PARENT: [exports.genericTank],
        LABEL: 'Hyperfire',
      //why does it always say youre on random.js
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    14,     8,     1.15,     0,      6,      13,      0,   ], 
            }, {
            POSITION: [    26,     10,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.destroy, g.inferno]),
                TYPE: exports.flare2,
            }, },
        ],
    };
    exports.hominginferno = {
        PARENT: [exports.genericTank],
        LABEL: 'Homing Inferno',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    14,     8,     1.12,     0,      0,      13,      0,   ], 
            PROPERTIES: {
                COLOR: 12,
            }, }, {
            POSITION: [    28,     6,     1,     0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.inferno]),
                TYPE: exports.homingflare2,
                COLOR: 12,
            }, },
        ],
    };
    exports.blaster = {
        PARENT: [exports.genericTank],
        LABEL: 'Blaster',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    8,     12,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.blast]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.napalm = {
        PARENT: [exports.genericTank],
        LABEL: 'Napalm',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    10,     6,     1.6,     4,      5.5,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.blast]),
                TYPE: exports.bullet,
            }, }, {
            POSITION: [    10,     6,     1.6,     4,      -5.5,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.blast]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.furnace = {
        PARENT: [exports.genericTank],
        LABEL: 'Furnace',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    8.5,     12.5,     1.4,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.pound, g.destroy, g.blast]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.ak42 = {
        PARENT: [exports.genericTank],
        LABEL: 'Ak-420',
        GUNS: [ {    /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [    19,     6.9 /* funny number divided by 10 lolololol */,     1.2,     8,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.gunner]),
                TYPE: exports.bullet,
            }, },
        ],
    };
            exports.spray = {
                PARENT: [exports.genericTank],
                LABEL: 'Sprayer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.lowpower, g.mach, g.morerecoil]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  12,    10,     1.4,     8,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mach]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
   
        exports.mini = {
            PARENT: [exports.genericTank],
            LABEL: 'Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.twini = {
            PARENT: [exports.genericTank],
            LABEL: 'Twinigun',
            DANGER: 6,
            BODY: {
                FOV: 1.18,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      5.5,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      5.5,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      5.5,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     8,      1,      0,      -5.5,      0,      1, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      -5.5,      0,    1.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      -5.5,      0,    1.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
/*[ { 
                POSITION: [  19,     9,      1,      0,     -2,    -20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  19,     9,      1,      0,      2,     20,     0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     7,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent]),
                        TYPE: exports.bullet,
                    }, },
            ],*/
exports.bentmini = {
            PARENT: [exports.genericTank],
            LABEL: 'Bent Minigun',
            DANGER: 6,
            BODY: {
                FOV: 1.175,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     9,      1,      0,      2,      20,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     9,      1,      0,      2,      20,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     9,      1,      0,      2,      20,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  22,     9,      1,      0,      -2,      -20,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     9,      1,      0,      -2,      -20,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  18,     9,      1,      0,      -2,      -20,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mini]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  25,     7,      1,      0,      0,      0,      1, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  23,     7,      1,      0,      0,      0,    1.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mini]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  21,     7,      1,      0,      0,      0,    1.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.bent, g.mini]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.snipegun = {
            PARENT: [exports.genericTank],
            LABEL: 'Snipegun',
            DANGER: 6,
            BODY: {
                FOV: 1.2,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  22,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.sniper]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
        exports.minibomb = {
            PARENT: [exports.genericTank],
            LABEL: 'Bombergun',
            DANGER: 6,
            BODY: {
                FOV: 1.21,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  22,     8,      1,      0,      0,      0,      0, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.explode]),
                        TYPE: [exports.bomb, {FRAG: 'expand'}],
                        COLOR: 9,
                    }, }, { 
                POSITION: [  20,     8,      1,      0,      0,      0,    0.333, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.explode]),
                        TYPE: [exports.bomb, {FRAG: 'expand'}],
                    }, }, { 
                POSITION: [  18,     8,      1,      0,      0,      0,    0.667, ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.explode]),
                        TYPE: [exports.bomb, {FRAG: 'expand'}],
                        COLOR: 8,
                    }, },
            ],
        };
            exports.stream = {
                PARENT: [exports.genericTank],
                LABEL: 'Steamliner',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  25,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  23,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  21,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  19,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },  { 
                    POSITION: [  17,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.smotherer = {
                PARENT: [exports.genericTank],
                LABEL: 'Smotherer',
                DANGER: 7,
                BODY: {
                    FOV: 1.3,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  28,     8,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.smoth]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  26,     8,      1,      0,      0,      0,     0.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.smoth]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  24,     8,      1,      0,      0,      0,     0.4, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.smoth]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  22,     8,      1,      0,      0,      0,     0.6, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.smoth]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  20,     8,      1,      0,      0,      0,     0.8, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.smoth]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  18,     8,      1,      0,      0,      0,     1, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.smoth]),
                            TYPE: exports.bullet,
                        }, }, { 
                    POSITION: [  16,     8,      1,      0,      0,      0,     1.2, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.mini, g.stream, g.smoth]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
            exports.hybridmini = makeHybrid(exports.mini, "Crop Duster");
            exports.minitrap = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                LABEL: 'Barricade',
                STAT_NAMES: statnames.trap,
                BODY: {
                    FOV: 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ 
                    POSITION: [  24,     8,      1,      0,      0,      0,      0, ], 
                            }, {
                    POSITION: [   4,     8,     1.3,     22,     0,      0,      0, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     18,     0,      0,    0.333, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, { 
                    POSITION: [   4,     8,     1.3,     14,     0,      0,    0.667, ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.mini, g.halfrange]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
    
    exports.pound = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Pounder',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
            }, },
        ],
    };
    exports.bomberm = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Bomberman',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  21,    11.6,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.explode]),
                TYPE: [exports.bomb, {FRAG: 'expand'}],
            }, }, {
            POSITION: [  5,    15,      0.95,   10,      0,      0,      0,   ],
            PROPERTIES: {
              COLOR: 38
            }  ,
            }
        ],
    };
    exports.demom = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Demoman',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  21,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.explode]),
                TYPE: [exports.bomb, {FRAG: 'expand2'}],
            }, }, {
            POSITION: [  5,    15.4,      0.95,   10,      0,      0,      0,   ],
            PROPERTIES: {
              COLOR: 36
            }  ,
            }
        ],
    };
    exports.eits = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Eye-In-The-Sky',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  21,    11.6,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.explode, g.norecoil]),
                TYPE: [exports.bomb, {FRAG: 'expand'}],
            }, }, {
            POSITION: [  5,    15,      0.95,   10,      0,      0,      0,   ],
            PROPERTIES: {
              COLOR: 38
            }  ,
            }, { 
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
        ],
    };
    exports.implosion = {
        PARENT: [exports.genericTank],
        DANGER: 5,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Implosion',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  21,    11.6,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.explode]),
                TYPE: [exports.bomb, {FRAG: 'implosion'}],
            }, }, {
            POSITION: [  5,    15,      0.95,   10,      0,      0,      0,   ],
            PROPERTIES: {
              COLOR: 38
            }  ,
            }
        ],
    };
    exports.explosive = {
        PARENT: [exports.genericTank],
        DANGER: 6,
        BODY: {
            ACCELERATION: base.ACCEL * 0.8,
        },
        LABEL: 'Explosive',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  21,    13.6,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.explode, g.destroy]),
                TYPE: [exports.bomb, {FRAG: 'expand'}],
            }, }, {
            POSITION: [  5,    17,      0.95,   10,      0,      0,      0,   ],
            PROPERTIES: {
              COLOR: 38
            }  ,
            }
        ],
    };
        exports.destroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, },
            ],
        };
        exports.reddestroy = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Red Destroyer',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  21,    13,      1,      0,      0,      0,      0,  ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.good]),
                    TYPE: exports.bullet,
                    COLOR: 12,
                }, },
            ],
        };
            exports.anni = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Annihilator',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20,     20,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.anni]),
                        TYPE: exports.bullet,
                    }, },
                ],
            };
exports.redistributorBullet = {
  PARENT: [exports.bullet],
  LABEL: 'Stabilizer Bullet',
  SHAPE: -6,
  CONTROLLERS: ['spin'],
  TURRETS: [{
    POSITION: [20.5, 0, 0, 0, 360, 0],
    TYPE: exports.spikeBody
  }, {
    POSITION: [20.5, 0, 0, 120, 360, 0],
    TYPE: exports.spikeBody
  }, {
    POSITION: [20.5, 0, 0, 240, 360, 0],
    TYPE: exports.spikeBody
  }] /*TURRETS: [{       POSITION: [21.5, 0, 0, 0, 360, 0],       TYPE: exports.smasherBody   }]*/
};
exports.redistributor = {
  PARENT: [exports.genericTank],
  LABEL: 'Redistributor',
  DANGER: 7,
  BODY: {
    ACCELERATION: base.ACCEL * .4,
    SPEED: base.SPEED * .705,
    FOV: 1.2
  },
  GUNS: [{
    POSITION: [7.25, 12.25, 1.25, 10, 0, 0, 0]
  }, {
    POSITION: [18.5, 12, 1, 0, 0, 0, .125],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.redistribute]),
      TYPE: exports.redistributorBullet, //WAIT_TO_CYCLE: true
    }
  }, {
    POSITION: [9, 12, -1.45, 4, 0, 0, 0]
  }]
};
            exports.mili = {
                PARENT: [exports.genericTank],
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                },
                LABEL: 'Military',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 20,     10,     1.4,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.attackshalf]),
                        TYPE: [exports.bombdropper, {FRAG: 'expand'}],
                    }, },
                ],
            };
            exports.hiveshooter = {
                PARENT: [exports.genericTank],
                DANGER: 6,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.75,
                    SPEED: base.speed * 0.8,
                },
                LABEL: 'Swarmer',
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,    14,     -1.2,    5,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy, g.hive]),
                            TYPE: exports.hive,
                        }, }, {
                    POSITION: [  15,    12,      1,      5,      0,      0,      0,   ], 
                    }
                ],
            };
            exports.hybrid = makeHybrid(exports.destroy, 'Hybrid');
        exports.twinybrid = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    14,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [   7,     12,    1.2,     8,      0,     180,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
                    TYPE: [exports.drone, { INDEPENDENT: true, }],
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    WAIT_TO_CYCLE: false,    
                    MAX_CHILDREN: 3,
            }, }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 12,
            }, },
            ],
        };
        exports.twinybrid1 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    12,      1,      0,      -5,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     160,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 12,
            }, },
            ],
        };
        exports.twinybrid2 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid .',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    10,      1,      0,      -8,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     140,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 14,
            }, },
            ],
        };
        exports.twinybrid3 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid ..',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    10,      1,      0,      -11,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     140,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 14,
            }, },
            ],
        };
        exports.twinybrid4 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid ...',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    10,      1,      0,      -12,      0,      0,   ], 
                }, {
                POSITION: [  20,    10,      1,      0,      -12,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     100,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 14,
            }, },
            ],
        };
        exports.twinybrid5 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid ....',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    10,      1,      0,      -10,      0,      0,   ], 
                }, {
                POSITION: [  20,    10,      1,      0,      -10,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     80,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 14,
            }, },
            ],
        };
        exports.twinybrid6 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid .....',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    8,      1,      0,      -8,      0,      0,   ], 
                }, {
                POSITION: [  20,    8,      1,      0,      -8,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     60,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 14,
            }, },
            ],
        };
        exports.twinybrid7 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid ......',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    8,      1,      0,      -8,      0,      0,   ], 
                }, {
                POSITION: [  20,    8,      1,      0,      -8,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     40,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 14,
            }, },
            ],
        };
        exports.twinybrid8 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid .......',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    8,      1,      0,      -6,      0,      0,   ], 
                }, {
                POSITION: [  20,    8,      1,      0,      -6,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     20,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 26,
            }, },
            ],
        };
        exports.twinybrid9 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid ........',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    8,      1,      0,      -5.5,      0,      0,   ], 
                }, {
                POSITION: [  20,    8,      1,      0,      -5.5,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     0,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 26,
            }, },
            ],
        };
        exports.twinybrid10 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid .........',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    7,      1,      0,      -5.5,      0,      0,   ], 
                }, {
                POSITION: [  20,    7,      1,      0,      -3,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     0,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 26,
            }, },
            ],
        };
        exports.twinybrid11 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid ..........',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    7,      1,      0,      -5.5,      0,      0,   ], 
                }, {
                POSITION: [  20,    7,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   7,     12,    1.2,     8,      0,     0,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 26,
            }, },
            ],
        };
        exports.twinybrid12 = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            BODY: {
                ACCELERATION: base.ACCEL * 0.75,
            },
            LABEL: 'Twinybrid ',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,    7,      1,      0,      -5.5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.destroy]),
                    TYPE: exports.bullet,
                }, }, {
                POSITION: [  20,    7,      1,      0,      5.5,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak]),
                    TYPE: [exports.drone, { INDEPENDENT: true, }],
                    AUTOFIRE: true,
                    SYNCS_SKILLS: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                    WAIT_TO_CYCLE: false,    
                    MAX_CHILDREN: 3,
                }, }, {
                POSITION: [   7,     12,    1.2,     8,      0,     0,     0,   ], 
            }, {
            POSITION: [15,7.25,1,0,0,0],
            PROPERTIES: {
              COLOR: 26,
            }, },
            ],
        };
            exports.learnbrid = makeLearner(exports.destroy, 'Learnbrid');
            exports.multishot = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Multishot',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
    GUNS: [{
        POSITION: [18, 4, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [18, 4.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [18, 2.5, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [18, 3, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [18, 2, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [19, 12, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.fake, g.norecoil]),
            TYPE: exports.bullet
        }
    }, {
        POSITION: [5, 12, -1.2, 7.5, 0, 0, 0, ],
    }]
            };
            exports.shotgun2 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
    GUNS: [{
        POSITION: [4, 3, 1, 11, -3, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [4, 3, 1, 11, 3, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [4, 4, 1, 13, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 4, 1, 12, -1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 4, 1, 11, 1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 3, 1, 13, -1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 3, 1, 13, 1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 2, 1, 13, 2, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 2, 1, 13, -2, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [15, 14, 1, 6, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun, g.fake, g.norecoil]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 0, 0],
    },],
            };
            exports.shotgun3 = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Shotgun without the fake gun',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7,
                },
    GUNS: [{
        POSITION: [4, 3, 1, 11, -3, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [4, 3, 1, 11, 3, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [4, 4, 1, 13, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 4, 1, 12, -1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 4, 1, 11, 1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 3, 1, 13, -1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 3, 1, 13, 1, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 2, 1, 13, 2, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [1, 2, 1, 13, -2, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.multishot, g.shotgun]),
            TYPE: exports.bullet
        },
    }, {
        POSITION: [8, 14, -1.3, 4, 0, 0, 0],
    },],
            };

        exports.builder = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Builder',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,    12,      1,      0,      0,      0,      0,   ], 
                }, {
                POSITION: [   2,    12,     1.1,     18,     0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                        TYPE: exports.block,
                    }, },
            ],
        };
            exports.architect = {
                PARENT: [exports.genericTank],
                LABEL: 'Architect',
                BODY: {
                    SPEED: base.SPEED * 1.1,
                },
                DANGER: 6,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     8,      0,      0,     190, 0], 
                        TYPE: exports.architectgun,
                            }, {
                    POSITION: [  12,     8,      0,     120,    190, 0], 
                        TYPE: exports.architectgun,
                            }, {
                    POSITION: [  12,     8,      0,     240,    190, 0], 
                        TYPE: exports.architectgun,
                            },
                ],
            };
            exports.engineer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Engineer',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.75,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   18,    12,      1,     0,     0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    12,     1.1,     18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            MAX_CHILDREN: 6,
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.pillbox,        
                            SYNCS_SKILLS: true,   
                        }, },
                ],
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  12,     18,      0,      0,     190, 0], 
                        TYPE: exports.decorautoTurret,
                            }, 
                ]
            };
            exports.construct = {
                PARENT: [exports.genericTank],
                LABEL: 'Constructor',
                STAT_NAMES: statnames.trap,
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.5,
                    SPEED: base.SPEED * 0.7,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    18,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    18,     1.2,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.construct]),
                            TYPE: exports.block,
                        }, }, 
                ],
            };
            exports.autobuilder = makeAuto(exports.builder);
exports.buildception = makeAuto(exports.builder, "Buildception", {
    type: exports.builder
});
            exports.conq = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Conqueror',
                STAT_NAMES: statnames.trap,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  21,    14,      1,      0,      0,     180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                        TYPE: exports.bullet,
                    }, }, {
                    POSITION: [  18,    14,      1,      0,      0,      0,      0,   ], 
                    }, {
                    POSITION: [   2,    14,     1.1,     18,     0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block]),
                            TYPE: exports.block,
                        }, },
                ],
            };
            exports.boomer = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: 'Boomer',
                STAT_NAMES: statnames.trap,
                FACING_TYPE: 'locksFacing',
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [   5,    10,      1,      14,     0,      0,      0,   ],
                        }, {
                    POSITION: [   6,    10,    -1.5,      7,     0,      0,      0,   ],
                        }, {
                    //POSITION: [  12,    15,      1,      0,      0,      0,      0,   ],
                    //    }, {
                    POSITION: [   2,    10,     1.3,     18,     0,      0,      0,   ],
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.boomerang]),
                            TYPE: exports.boomerang,
                        }, },
                ],
            };
            exports.quadtrapper = {
                PARENT: [exports.genericTank],
                DANGER: 7,
                LABEL: '',
                STAT_NAMES: statnames.trap, 
                BODY: {
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  14,     6,      1,      0,      0,     45,      0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     45,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     135,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     135,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     225,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     225,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, }, {
                    POSITION: [  14,     6,      1,      0,      0,     315,     0,   ], 
                        }, {
                    POSITION: [   2,     6,     1.1,     14,     0,     315,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.block, g.weak]),
                            TYPE: exports.block,
                        }, },
                ],
            };

        exports.artillery = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Artillery',
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  17,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  17,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Secondary',
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.beekeeper = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Beekeeper',
            STAT_NAMES: statnames.generic,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  15,     3,      1,      0,     -6,     -7,     0.25,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary Bee', 
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [  15,     3,      1,      0,      6,      7,     0.75,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary Bee', 
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
        exports.beetar = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Beetar',
            STAT_NAMES: statnames.generic,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  11,     3,      1,      0,     -8,     -7,     0.6,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary Bee', 
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [  11,     3,      1,      0,      8,      7,     0.8,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary Bee', 
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [  15,     3,      1,      0,     -6,     -7,     0.2,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary Bee', 
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [  15,     3,      1,      0,      6,      7,     0.4,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.hive, g.bees]),
                        TYPE: exports.bee,
                        LABEL: 'Secondary Bee', 
                        STAT_CALCULATOR: gunCalcNames.swarm,
                    }, }, {
                POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                        TYPE: exports.bullet,
                        LABEL: 'Heavy',
                    }, },
            ],
        };
            exports.mortar = {
                PARENT: [exports.genericTank],
                LABEL: 'Mortar',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     3,      1,      0,     -8,     -7,     0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  13,     3,      1,      0,      8,      7,     0.8,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,     -6,     -7,     0.2,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  17,     3,      1,      0,      6,      7,     0.4,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin]),
                            TYPE: exports.bullet,
                            LABEL: 'Secondary',
                        }, }, {
                    POSITION: [  19,     12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty]),
                            TYPE: exports.bullet,
                            LABEL: 'Heavy',
                        }, },
                ],
            };
exports.launcherMissile = {
    PARENT: [exports.bullet],
    LABEL: "Missile",
    INDEPENDENT: true,
    BODY: {
        RANGE: 120
    },
    GUNS: [{
        POSITION: [14, 6, 1, 0, 0, 180, 0],
        PROPERTIES: {
            AUTOFIRE: true,
            SHOOT_SETTINGS: combineStats([g.bullet, g.missileTrail]),
            TYPE: [exports.bullet, {
                PERSISTS_AFTER_DEATH: true
            }],
            STAT_CALCULATOR: gunCalcNames.thruster
        }
    }]
};
exports.launcher = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: 1.075 * base.FOV
    },
    LABEL: "Launcher",
    DANGER: 6,
    GUNS: [{
        POSITION: [9, 12, -.5, 9, 0, 0, 0]
    }, {
        POSITION: [16, 13, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.pound, g.launcher]),
            TYPE: exports.launcherMissile,
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }]
};
exports.shard = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: 1.075 * base.FOV
    },
    LABEL: "Shard",
    DANGER: 6,
    GUNS: [{
        POSITION: [9, 12, -.5, 9, 0, 0, 0]
    }, {
        POSITION: [16, 13, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.pound, g.launcher]),
            TYPE: exports.trap,
            STAT_CALCULATOR: gunCalcNames.sustained
        }
    }]
};

exports.bar = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: 1.075 * base.FOV
    },
    LABEL: "Bar",
    DANGER: 6,
    GUNS: [{
        POSITION: [13, 10, 1, 0, 0, 0, 0],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.bullet, g.pound, g.launcher]),
            TYPE: exports.launcherMissile,
            STAT_CALCULATOR: gunCalcNames.sustained,
            COLOR: 43,
        }, }, {
        POSITION: [2, 12, -.5, 3, -10, 90, 0]
        }, {
        POSITION: [2, 12, -.5, 3,  10, -90,0]
        },
    ]
};
            exports.skimmer = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Skimmer',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    14,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,      1,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.arty, g.arty, g.skim]),
                            TYPE: exports.missile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.twister = {
                PARENT: [exports.genericTank],
                BODY: {
                    FOV: base.FOV * 1.15,
                },
                LABEL: 'Twister',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  10,    10.5,    -0.5,     9,      0,      0,      0,  ], 
                        }, {
                    POSITION: [  17,    15,     0.75,      0,      0,      0,      0,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.twist]),
                            TYPE: exports.twistmissile,
                            STAT_CALCULATOR: gunCalcNames.sustained,
                        }, },
                ],
            };
            exports.spreadling = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadling',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     4,      1,      0,    -0.7,    -48,    3/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -0.9,    -32,    2/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19.2,     4,      1,      0,    -1.5,    -16,    1/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                 
                    POSITION: [  16,     4,      1,      0,     0.7,     48,    3/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     0.9,     32,    2/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19.2,     4,      1,      0,     1.5,     16,    1/4,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };
            exports.spreadshot = {
                PARENT: [exports.genericTank],
                LABEL: 'Spreadshot',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     4,      1,      0,    -0.8,    -75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,    -1.0,    -60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,    -1.6,    -45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,    -2.4,    -30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,    -3.0,    -15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     4,      1,      0,     0.8,     75,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    4,      1,      0,     1.0,     60,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     4,      1,      0,     1.6,     45,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    4,      1,      0,     2.4,     30,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     4,      1,      0,     3.0,     15,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    10,     1,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };
            exports.rod = {
                PARENT: [exports.genericTank],
                LABEL: 'Rod',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  13,     6,      1,      0,    -0.8,    -90,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    6,      1,      0,    -1.0,    -72,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     6,      1,      0,    -1.6,    -54,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    6,      1,      0,    -2.4,    -36,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     6,      1,      0,    -3.0,    -18,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {                    
                    POSITION: [  13,     6,      1,      0,     0.8,     90,    5/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 14.5,    6,      1,      0,     1.0,     72,    4/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  16,     6,      1,      0,     1.6,     54,    3/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [ 17.5,    6,      1,      0,     2.4,     36,    2/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  19,     6,      1,      0,     3.0,     18,    1/6,    ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.arty, g.twin, g.spread, g.pound, g.nerf]),
                            TYPE: exports.bullet,
                            LABEL: 'Spread',
                        }, }, {
                    POSITION: [  13,    12,     1,     8,      0,      0,      0,     ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.spreadmain, g.spread, g.pound]),
                            TYPE: exports.bullet,
                            LABEL: 'Pounder',
                        }, },
                ],
            };

    exports.flank = {
        PARENT: [exports.genericTank],
        LABEL: 'Flank Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  15.02,     8,      1,      0,      0,     180,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
exports.obstacle2 = {
    TYPE: 'wall',
    DAMAGE_CLASS: 1,
    LABEL: 'Rock',
    BODY: {
        PUSHABILITY: 0,
        HEALTH: 10000,
        SHIELD: 10000,
        REGEN: 1000,
        DAMAGE: 0,
        RESIST: 1000000000000000000000000,
        STEALTH: 1,
        RANGE: 5,
    },
    VALUE: 0,
    COLOR: 16,
    VARIES_IN_SIZE: false,
    GIVE_KILL_MESSAGE: false,
    ACCEPTS_SCORE: false,
    DIE_AT_RANGE: true,
};
exports.mazeWall= {
  PARENT: [exports.obstacle],
  LABEL: "Wall",
  FACING_TYPE: 'locksFacing',
  HITS_OWN_TYPE: 'never',
  SHAPE: 4
};

exports.decororangeshield = {
        PARENT: [exports.genericTank],
        LABEL: 'Turret',
        BODY: {
            FOV: 0.8
        },
        SHAPE: [[-0.8,-1.4],[0,-1.2],[0.8,-0.8],[1.6,0],[0.8,0.8],[0,1.2],[-0.8,1.4],[-0.4,0]],
        GUNS:[{
                POSITION: [ 1,  2.5,     1.01,      8,      0,      0,      0,   ],
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.single, g.norange, g.nospeed, g.norecoil, g.doublereload, g.doublereload, g.bigger
                                                         ]),
                            //COLOR: [12],
                            TYPE: exports.obstacle2,
                            AUTOFIRE: true,
                    }, },       ],
        COLOR: 40,
    };
    exports.shield = {
        PARENT: [exports.genericTank],
        LABEL: 'Shield Guard',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        TURRETS: [{
            /*  SIZE     X       Y     ANGLE    ARC    LAYER  */
      POSITION: [10,     20,      0,     180,     0,     1, ],
                TYPE: exports.decororangeshield
        },], 
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.windshield = {
        PARENT: [exports.genericTank],
        LABEL: 'Windshield',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        TURRETS: [{
            /*  SIZE     X       Y     ANGLE    ARC    LAYER  */
      POSITION: [10,     20,      0,     180,     0,     1, ],
                TYPE: exports.decororangeshield
        },], 
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.twinshield = {
        PARENT: [exports.genericTank],
        LABEL: 'Twin Shield',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        TURRETS: [{
            /*  SIZE     X       Y     ANGLE    ARC    LAYER  */
      POSITION: [10,     20,      8,     180,     0,     1, ],
                TYPE: exports.decororangeshield
        }, {
      POSITION: [10,     20,      -8,     180,     0,     1, ],
                TYPE: exports.decororangeshield
        },], 
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.bentshield = {
        PARENT: [exports.genericTank],
        LABEL: 'Bent Shield',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        TURRETS: [{
            /*  SIZE     X       Y     ANGLE    ARC    LAYER  */
      POSITION: [9,     20,      2,     125,     0,     1, ],
                TYPE: exports.decororangeshield
        }, {
      POSITION: [9,     20,      2,     225,     0,     1, ],
                TYPE: exports.decororangeshield
        }, {
      POSITION: [11,     20,      0,     180,     0,     1, ],
                TYPE: exports.decororangeshield
        }, ], 
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
    exports.drivethru = {
        PARENT: [exports.genericTank],
        LABEL: 'Drive-Thru',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  15.02,     8,      1,      0,      0,     180,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullethome,
                    COLOR: 12,
                }, },
        ],
    };
let l = 1;
let w = l;
let a = w;
let x = a;
let y = x;
let ang = y;
let d = ang;
   exports.tritank = {
        PARENT: [exports.genericTank],
        LABEL: 'Tritank',
        BODY: {
            SPEED: base.SPEED * 1.1,
        },
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     120,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, }, {   
            POSITION: [  18,     8,      1,      0,      0,     240,     0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.basic, g.flank]),
                    TYPE: exports.bullet,
                }, },
        ],
    };
        exports.hexa = {
            PARENT: [exports.genericTank],
            LABEL: 'Quad Tank',
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     90,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,      270,    0.5,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, },
            ],
        };
            exports.octo = {
                PARENT: [exports.genericTank],
                LABEL: 'Octo Tank',
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     270,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,      45,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     135,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     225,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     315,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank, g.spam]),
                            TYPE: exports.bullet,
                        }, },
                ],
            };
exports.lillilhurri = {
  PARENT: [exports.genericTank],
  LABEL: 'Wind',
  DANGER: 7,
  GUNS: [{
    POSITION:[15,3.5,1,0,0,0,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[15,3.5,1,0,0,90,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[15,3.5,1,0,0,180,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[15,3.5,1,0,0,270,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
  }
  }]
};
exports.twind = {
  PARENT: [exports.genericTank],
  LABEL: 'Twind',
  DANGER: 7,
  GUNS: [{
    POSITION:[15,3.5,1,0,3,0,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[15,3.5,1,0,3,90,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[15,3.5,1,0,3,180,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[15,3.5,1,0,3,270,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
  },
  }, {
       POSITION:[15,3.5,1,0,-3,0,0.1],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[15,3.5,1,0,-3,90,0.1],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[15,3.5,1,0,-3,180,0.1],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[15,3.5,1,0,-3,270,0.1],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullet,
  },
  },]
};
exports.fragwind = {
  PARENT: [exports.genericTank],
  LABEL: 'Frag Wind',
  DANGER: 7,
  GUNS: [{
    POSITION:[15,3.5,1,0,0,0,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: [exports.bullet, {FRAG: 'expand'}],
      COLOR: 29,
    },
  },{
        POSITION:[15,3.5,1,0,0,90,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: [exports.bullet, {FRAG: 'expand'}],
      COLOR: 29,
    },
  },{
        POSITION:[15,3.5,1,0,0,180,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: [exports.bullet, {FRAG: 'expand'}],
      COLOR: 29,
    },
  },{
        POSITION:[15,3.5,1,0,0,270,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: [exports.bullet, {FRAG: 'expand'}],
      COLOR: 29,
  }
  }]
};
exports.lillilhome = {
  PARENT: [exports.genericTank],
  LABEL: 'Spreadlong',
  DANGER: 7,
  GUNS: [{
    POSITION:[15,3.5,1,0,0,0,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullethome,
      COLOR: 12,
    },
  },{
        POSITION:[15,3.5,1,0,0,90,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullethome,
      COLOR: 12,
    },
  },{
        POSITION:[15,3.5,1,0,0,180,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullethome,
      COLOR: 12,
    },
  },{
        POSITION:[15,3.5,1,0,0,270,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner]),
      TYPE: exports.bullethome,
      COLOR: 12,
  }
  }]
};
exports.blow = {
  PARENT: [exports.genericTank],
  LABEL: 'Blow',
  DANGER: 7,
  GUNS: [{
    POSITION:[19,3.5,1,0,0,0,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner,g.sniper]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[19,3.5,1,0,0,90,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner,g.sniper]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[19,3.5,1,0,0,180,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner,g.sniper]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[19,3.5,1,0,0,270,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner,g.sniper]),
      TYPE: exports.bullet,
  }
  }]
};
exports.assasswind = {
  PARENT: [exports.genericTank],
  LABEL: 'Squall',
  DANGER: 7,
  GUNS: [{
    POSITION:[21.3,3.5,1,0,0,0,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner,g.sniper,g.assass]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[21.3,3.5,1,0,0,90,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner,g.sniper,g.assass]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[21.3,3.5,1,0,0,180,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner,g.sniper,g.assass]),
      TYPE: exports.bullet,
    },
  },{
        POSITION:[21.3,3.5,1,0,0,270,0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner,g.sniper,g.assass]),
      TYPE: exports.bullet,
  }, },  {
                POSITION: [   4.55,    6,    0.6,    8,      0,      0,      0,   ], 
                },  {
                POSITION: [   4.55,    6,    0.6,    8,      0,      90,      0,   ], 
                },  {
                POSITION: [   4.55,    6,    0.6,    8,      0,      180,      0,   ], 
                },  {
                POSITION: [   4.55,    6,    0.6,    8,      0,      270,      0,   ], 
                },
  ]
};
exports.lilhurri = { //based off spawners code name lilfact
    PARENT: [exports.genericTank],
    LABEL: 'Storm',
    DANGER: 7,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//10
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 36, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//9
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 72, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//8
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 108, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//7
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 144, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//6
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//5
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 216, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//4
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 252, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//3
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 288, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//2
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 324, 0  ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//1
        },
    }, ],
};
exports.autstorm = makeAuto(exports.lilhurri, "Autstorm");
exports.tempest = { //based off spawners code name lilfact
    PARENT: [exports.genericTank],
    LABEL: 'Tempest',
    DANGER: 7,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [19, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//10
        },
    }, {
        POSITION: [19, 3.5, 1, 0, 0, 36, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//9
        },
    }, {
        POSITION: [19, 3.5, 1, 0, 0, 72, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//8
        },
    }, {
        POSITION: [19, 3.5, 1, 0, 0, 108, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//7
        },
    }, {
        POSITION: [19, 3.5, 1, 0, 0, 144, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//6
        },
    }, {
        POSITION: [19, 3.5, 1, 0, 0, 180, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//5
        },
    }, {
        POSITION: [19, 3.5, 1, 0, 0, 216, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//4
        },
    }, {
        POSITION: [19, 3.5, 1, 0, 0, 252, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//3
        },
    }, {
        POSITION: [19, 3.5, 1, 0, 0, 288, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//2
        },
    }, {
        POSITION: [19, 3.5, 1, 0, 0, 324.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane, g.sniper]),
            TYPE: exports.bullet,//1
        },
    }, ],
};
exports.forces = {
    PARENT: [exports.genericTank],
    LABEL: 'Forces',
    DANGER: 7,
    GUNS: [{
        POSITION: [15, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 1, (1 / 14) * 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 2, (1 / 14) * 2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 3, (1 / 14) * 3, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 4, (1 / 14) * 4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 5, (1 / 14) * 5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 6, (1 / 14) * 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 7, (1 / 14) * 7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 8, (1 / 14) * 1, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 9, (1 / 14) * 2, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 9, (1 / 14) * 3, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 10, (1 / 14) * 4, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 11, (1 / 14) * 5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 12, (1 / 14) * 6, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, (360 / 14) * 13, (1 / 14) * 7, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    },  ],
};
exports.hurricane = {
    PARENT: [exports.genericTank],
    LABEL: 'Cyclone',
    DANGER: 7,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 30, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 60, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 90, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 180, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 210, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 300, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 330, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.vigintitres = {
    PARENT: [exports.genericTank],
    LABEL: 'Viginti Tres',
    DANGER: 7,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ //start extra cannons
        POSITION: [17, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 30, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 60, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 90, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 180, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 210, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 300, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [17, 3.5, 1, 0, 0, 330, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, { //end extra cannons
        POSITION: [15, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 30, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 60, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 90, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 120, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 150, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 180, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 210, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 240, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 270, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 300, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 330, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,
        },
    }, ],
};
exports.snowstorm = {
    PARENT: [exports.genericTank],
    LABEL: 'Snowstorm',
    DANGER: 7,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [15, 3.5, 1, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//wtf why is there extra cannon
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 18, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//16
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 36, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//15
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 54, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//14
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 72, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//13
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 90, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//12
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 108, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//11
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 126, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//10
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 144, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//9
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 162, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//8
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 180, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//7
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 198, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//6
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 216, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//5
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 234, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//4
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 252, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//3
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 270, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//2
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 288, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//1 wait im stupid af lol i forgot snowstorm has 16 bullets
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 306, 0.5, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//4
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 324, 0.25, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//3
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 342, 0.75, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//2
        },
    }, {
        POSITION: [15, 3.5, 1, 0, 0, 360, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.twin, g.puregunner, g.hurricane]),
            TYPE: exports.bullet,//1 wait im stupid af lol i forgot snowstorm has 16 bullets
        },
        }, ],
};
            exports.septatrap = (() => {
                let a = 360/7, d = 1/7;
                return {
                    PARENT: [exports.genericTank],
                    LABEL: 'Septa-Trapper',
                    DANGER: 7,
                    BODY: {
                        SPEED: base.SPEED * 0.8,
                    },
                    STAT_NAMES: statnames.trap,
                    HAS_NO_RECOIL: true,
                    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                        POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,      a,     4*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,      a,     4*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     2*a,    1*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     2*a,    1*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     3*a,    5*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     3*a,    5*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     4*a,    2*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     4*a,    2*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     5*a,    6*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     5*a,    6*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, }, {
                        POSITION: [  15,     7,      1,      0,      0,     6*a,    3*d,  ],
                            }, {
                        POSITION: [   3,     7,     1.7,    15,      0,     6*a,    3*d,  ], 
                            PROPERTIES: {
                                SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                            }, },
                    ],
                };
            })();
            exports.hexatrap = makeAuto({
                PARENT: [exports.genericTank],
                LABEL: 'Quad-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     90,     0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     90,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     270,    0.5,  ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     270,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            }, 'Quad-Trapper');

            exports.tritrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Tri-Trapper',
                DANGER: 7,
                BODY: {
                    SPEED: base.SPEED * 0.8,
                },
                STAT_NAMES: statnames.trap,
                HAS_NO_RECOIL: true,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     120,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     120,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap,
                        }, }, {
                    POSITION: [  15,     7,      1,      0,      0,     240,     0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,     240,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap,
                        }, },
                ],
            };
            exports.machinetrapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Machine Trapper',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     12,      -0.4,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     12,     1.75,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.machine]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                  ],
            };
            exports.snapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Snapper',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    18,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.snipetrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                  ],
            };
            exports.trapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Trapper',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  15,     7,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    15,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                  ],
            };
         exports.twintrapper = {
            PARENT: [exports.genericTank],
            DANGER: 6,
            LABEL: 'Twin Trapper',
            STAT_NAMES: statnames.trap,
            BODY: {
                SPEED: base.SPEED * 0.8,
                FOV: base.FOV * 1.15,
            },
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  15,    6.8,      1,      0,       6.8,      0,      0,   ], 
                }, {
                POSITION: [   3.5,    6.8,     1.8,     13,     6.8,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.guardtrap]),
                        TYPE: exports.trap,
                    }, }, {
                POSITION: [  15,    6.8,      1,      0,      -6.8,      0,      0,   ], 
                }, {
                POSITION: [   3.5,    6.8,     1.8,     13,     -6.8,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.guardtrap]),
                        TYPE: exports.trap,
                    }, },
            ],
        };
exports.megatrapper = {
  PARENT: [exports.genericTank],
  LABEL: "Mega Trapper",
  GUNS: [{
    /*** LENGTH WIDTH ASPECT X Y ANGLE DELAY */
    POSITION: [15, 10, 1, 0, 0, 0, 0],
  }, {
    POSITION: [3, 10, 1.7, 15, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, [1.75, 2, 1, 1, 1.5, 1.5, 1.5, 1, 1, 1, 10, 1, 1]]),
      TYPE: exports.trap,
      STAT_CALCULATOR: gunCalcNames.trap,
    },
  }]
};

exports.armament = {
  PARENT: [exports.genericTank],
  LABEL: "Armament",
  GUNS: [{
    /*** LENGTH WIDTH ASPECT X Y ANGLE DELAY */
    POSITION: [15, 10, 1, 0, 0, 180, 0],
  }, {
    POSITION: [3, 10, 1.7, 15, 0, 180, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, g.guardtrap, [1.75, 2, 1, 1, 1.5, 1.5, 1.5, 1, 1, 1, 10, 1, 1]]),
      TYPE: exports.trap,
      STAT_CALCULATOR: gunCalcNames.trap,
    }, },{
        
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound, g.norecoil]),
                TYPE: exports.bullet,
            }, },]
};
exports.hazard = {
  PARENT: [exports.genericTank],
  LABEL: "Hazard",
  GUNS: [{
    /*** LENGTH WIDTH ASPECT X Y ANGLE DELAY */
    POSITION: [15, 13, 1, 0, 0, 180, 0],
  }, {
    POSITION: [3, 13, 1.7, 15, 0, 180, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, [2.5, 3, 1, 1, 2, 2, 2, 1, 1, 1, 10, 1, 1]]),
      TYPE: exports.trap,
      STAT_CALCULATOR: gunCalcNames.trap,
    }, },{
        
            POSITION: [  20,    14,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.pound, g.destroy, g.norecoil]),
                TYPE: exports.bullet,
            }, },]
};
exports.gigatrapper = {
  PARENT: [exports.genericTank],
  LABEL: "Giga Trapper",
  GUNS: [{
    /*** LENGTH WIDTH ASPECT X Y ANGLE DELAY */
    POSITION: [15, 13, 1, 0, 0, 0, 0],
  }, {
    POSITION: [3, 13, 1.7, 15, 0, 0, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, [2.5, 3, 1, 1, 2, 2, 2, 1, 1, 1, 10, 1, 1]]),
      TYPE: exports.trap,
      STAT_CALCULATOR: gunCalcNames.trap,
    },
  }]
};
            exports.benttrapper = {
                PARENT: [exports.genericTank],
                LABEL: 'Bent Trapper',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                    SPEED: base.SPEED * 0.8,
                    FOV: base.FOV * 1.15,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  16,     8,      1,      0,      2,      25,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.788,    16,      2,      25,      0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {
                    POSITION: [  16,     8,      1,      0,      -2,      -25,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.788,    16,      -2,      -25,      0.25,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }, {                
                    POSITION: [  17,     8,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [   4,     8,     1.9,    17,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.hexatrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, }
                  ],
            };
exports.musketeer = {
    PARENT: [exports.genericTank],
    BODY: {
        FOV: base.FOV * 1.2,
    },
    LABEL: 'Musketeer',
    DANGER: 7,
    CONTROLLERS: ['canRepel', 'onlyAcceptInArc', 'mapAltToFire', 'nearestDifferentMaster'], 
    GUNS: [ /***** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */ {
        POSITION: [4, 1.5, 1, 11, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [4, 1.5, 1, 11, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        },  }, {
        POSITION: [4, 2, 1, 13, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 12, -1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [1, 2, 1, 11, 1, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun,]),
            TYPE: exports.trap,
        }, }, {
        POSITION: [15, 4, 1, 6, 3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 4, 1, 6, -3, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
        }, }, {
        POSITION: [15, 7, -1.3, 0, 0, 180, 0, ],
    }, {
        POSITION: [4, 12, 1.7, 17, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.mach, g.shotgun, g.fake,]),
            TYPE: exports.bullet,
        }, },
           ],
};
        exports.tri = {
            PARENT: [exports.genericTank],
            LABEL: 'Tri-Angle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 

        exports.shouter = {
            PARENT: [exports.genericTank],
            LABEL: 'Shouter',
            BODY: {
                HEALTH: base.HEALTH * 0.9,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      5.5,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.twin, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  20,     8,      1,      0,      -5.5,      0,      0.5,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.twin, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, { 
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullet,
                        LABEL: gunCalcNames.thruster,
                    }, },
            ],
        }; 

        exports.bicycle = {
            PARENT: [exports.genericTank],
            LABEL: 'Bicycle',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                        TYPE: exports.bullet,
                        LABEL: 'Front',
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullethome,
                        LABEL: gunCalcNames.thruster,
                        COLOR: 12,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullethome,
                        LABEL: gunCalcNames.thruster,
                        COLOR: 12,
                    }, },
            ],
        }; 
        exports.pedals = {
            PARENT: [exports.genericTank],
            LABEL: 'Pedals',
            BODY: {
                HEALTH: base.HEALTH * 0.8,
                SHIELD: base.SHIELD * 0.8,
                DENSITY: base.DENSITY * 0.6,
            },
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,    12,      1,      0,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.pound]),
                TYPE: exports.bullet,
                LABEL: 'Pounder',
                ALT_FIRE: true,
            }, },{    
                POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullethome,
                        LABEL: gunCalcNames.thruster,
                        COLOR: 12,
                    }, }, {   
                POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullethome,
                        LABEL: gunCalcNames.thruster,
                        COLOR: 12,
                    }, }, {   
                POSITION: [  18,     8,      1,      0,      0,     180,    0.1,  ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                        TYPE: exports.bullethome,
                        LABEL: gunCalcNames.thruster,
                        COLOR: 12,
                    }, },
            ],
        }; 
            exports.booster = {
                PARENT: [exports.genericTank],
                LABEL: 'Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.4,
                    SHIELD: base.SHIELD * 0.4,
                    DENSITY: base.DENSITY * 0.3,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     140,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     220,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.drifter = {
                PARENT: [exports.genericTank], //yes lol
                LABEL: 'Drifter',
                BODY: {
                    HEALTH: base.HEALTH * 0.4,
                    SHIELD: base.SHIELD * 0.4,
                    DENSITY: base.DENSITY * 0.3,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {  
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {  
                    POSITION: [  13,     8,      1,      0,     -1,     140,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     220,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.motorcycle = {
                PARENT: [exports.genericTank],
                LABEL: 'Motorcycle',
                BODY: {
                    HEALTH: base.HEALTH * 0.4,
                    SHIELD: base.SHIELD * 0.4,
                    DENSITY: base.DENSITY * 0.3,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     140,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     220,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullethome,
                            LABEL: gunCalcNames.thruster,
                            COLOR: 12,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullethome,
                            LABEL: gunCalcNames.thruster,
                            COLOR: 12,
                        }, },
                ],
            };
            exports.fighter = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.fighters = {
                PARENT: [exports.genericTank],
                LABEL: 'Fighter Sniper',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  22,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.sniper]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  22,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.sniper]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.scooter = {
                PARENT: [exports.genericTank],
                LABEL: 'Scooter',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      1,     -90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Side',
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullethome,
                            LABEL: gunCalcNames.thruster,
                            COLOR: 12,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullethome,
                            LABEL: gunCalcNames.thruster,
                            COLOR: 12,
                        }, },
                ],
            };
            exports.brutalizer = {
                PARENT: [exports.genericTank],
                LABEL: 'Surfer',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,     -1,      90,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,         
                        }, }, {   
                    POSITION: [   7,    7.5,    0.6,     7,      1,     -90,     9,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.swarm]),
                            TYPE: [exports.autoswarm],
                            STAT_CALCULATOR: gunCalcNames.swarm,     
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.bomber = {
                PARENT: [exports.genericTank],
                LABEL: 'Bomber',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront]),
                            TYPE: exports.bullet,
                            ALT_FIRE: true,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
                    POSITION: [  14,     8,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,     8,     1.5,    14,      0,     180,    0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.morerecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };    
            exports.autotri = makeAuto(exports.tri);   
            exports.autotri.BODY = {
                SPEED: base.SPEED,
            };   //140, 220 booster extra barrels
            exports.falcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Falcon',
                DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.fastfalcon = {
                PARENT: [exports.genericTank],
                LABEL: 'Fast Falcon',
                DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.4,
            },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  27,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1.6,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 14,  3,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                      COLOR: 37
                    }, },
                ],
            };
            exports.fastfalcon2 = {
                PARENT: [exports.genericTank],
                LABEL: 'Fast Falcon .',
                DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.3,
            },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  23,    8.35,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -1,     8,      0,      0,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     170,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 14,  3,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                      COLOR: 14
                    }, },
                ],
            };
            exports.fastfalcon3 = {
                PARENT: [exports.genericTank],
                LABEL: 'Fast Falcon ..',
                DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.2,
            },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,    8.1,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -0.5,     8,      0,      25,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     160,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 14,  3,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                      COLOR: 14
                    }, },
                ],
            };
            exports.fastfalcon4 = {
                PARENT: [exports.genericTank],
                LABEL: 'Fast Falcon ...',
                DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
                FOV: base.FOV * 1.1,
            },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,    8.1,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -0.5,     8,      0,      50,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     150,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 14,  3,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                      COLOR: 14
                    }, },
                ],
            };
            exports.fastfalcon5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Fast Falcon ....',
                DANGER: 7,
            BODY: {
                ACCELERATION: base.ACCEL * 0.6,
                SPEED: base.SPEED * 0.85,
            },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  17,    8.1,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass, g.lessreload]),
                            LABEL: 'Trifront',
                            ALT_FIRE: true,
                        }, }, {
                    POSITION: [   5,    8.5,   -0.5,     8,      0,      210,      0,   ], 
                        }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     140,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            LABEL: gunCalcNames.thruster,
                        }, }, { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [ 14,  3,     1,      0,      0,      0,      0,   ],
                    PROPERTIES: {
                      COLOR: 14
                    }, },
                ],
            };
            exports.fastfalcon6 = {
                PARENT: [exports.genericTank],
                LABEL: 'Fast Falcon ',
                BODY: {
                    HEALTH: base.HEALTH * 0.4,
                    SHIELD: base.SHIELD * 0.4,
                    DENSITY: base.DENSITY * 0.3,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     140,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     220,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
            exports.eagle = {
                PARENT: [exports.genericTank],
                LABEL: 'Eagle',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                    FOV: base.FOV * 1.2,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,    12,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.lessreload]),
                            TYPE: exports.bullet,
                            LABEL: 'Assassin',
                            ALT_FIRE: true,
                        }, }, { 
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };     

            exports.terrorist = {
                PARENT: [exports.genericTank],
                LABEL: 'Terrorist',
                BODY: {
                    DENSITY: base.DENSITY * 0.6,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  20,     12,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.pound]),
                            TYPE: exports.bullet,
                            ALT_FIRE: true,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     130,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     230,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, {
    POSITION: [15, 10, 1, 0, 0, 180, 0],
  }, {
    POSITION: [3, 10, 1.7, 15, 0, 180, 0],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.trap, [1.75, 2, 1, 1, 1.5, 1.5, 1.5, 1, 1, 1, 10, 1, 1], g.morerecoil]),
      TYPE: exports.trap,
      STAT_CALCULATOR: gunCalcNames.trap,
    }, }, {
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri]),
                            TYPE: exports.bullet,
                            LABEL: 'Wing',
                        }, }, 
                ],
            };    
exports.narwhale = {
                PARENT: [exports.genericTank],
                LABEL: 'Toucan',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  26,     0.01,      -1650,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
exports.car = {
                PARENT: [exports.genericTank],
                LABEL: 'Car',
                DANGER: 7,
                BODY: {
                    ACCELERATION: base.ACCEL * 0.8,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  12,     7,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                              AUTOFIRE: true,
                              SHOOT_SETTINGS: combineStats([g.basic, g.lance]),
                              TYPE: exports.bullet,
                              },
                         }, {
                          POSITION: [  26,     0.01,      -1650,      0,      0,      0,      0,   ], 
                         }, {
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullethome,
                            LABEL: gunCalcNames.thruster,
                            COLOR: 12,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullethome,
                            LABEL: gunCalcNames.thruster,
                            COLOR: 12,
                        }, }, {   
                    POSITION: [  18,     8,      1,      0,      0,     180,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster, g.halfrecoil]),
                            TYPE: exports.bullethome,
                            LABEL: gunCalcNames.thruster,
                            COLOR: 12,
                        }, },
                ],
            };
        exports.auto3 = { 
            PARENT: [exports.genericTank],
            LABEL: 'Auto-3',
            DANGER: 6,
            FACING_TYPE: 'autospin',
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     8,      0,      0,     190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     120,    190, 0], 
                    TYPE: exports.auto3gun,
                        }, {
                POSITION: [  11,     8,      0,     240,    190, 0], 
                    TYPE: exports.auto3gun,
                        },
            ],
        };
            exports.auto5 = {
                PARENT: [exports.genericTank],
                LABEL: 'Auto-5',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  11,     8,      0,      0,     190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,      72,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     144,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     216,    190, 0], 
                        TYPE: exports.auto5gun,
                            }, {
                    POSITION: [  11,     8,      0,     288,    190, 0], 
                        TYPE: exports.auto5gun,
                            },
                ],
            };
            exports.heavy3 = {
                BODY: {
                    SPEED: base.SPEED * 0.95,
                },
                PARENT: [exports.genericTank],
                LABEL: 'Mega-3',
                DANGER: 7,
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  14,     8,      0,      0,     190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     120,    190, 0], 
                        TYPE: exports.heavy3gun,
                            }, {
                    POSITION: [  14,     8,      0,     240,    190, 0], 
                        TYPE: exports.heavy3gun,
                            },
                ],
            };
            exports.auto4 = { 
                PARENT: [exports.genericTank],
                DANGER: 5,
                LABEL: 'Auto-4',
                FACING_TYPE: 'autospin',
                TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                    POSITION: [  13,     6,      0,      45,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     135,    160, 0], 
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     225,    160, 0],
                        TYPE: exports.auto4gun,
                            }, {
                    POSITION: [  13,     6,      0,     315,    160, 0],
                        TYPE: exports.auto4gun,
                            },
                ],
            };
            
        exports.flanktrap = {
            PARENT: [exports.genericTank],
            LABEL: 'Trap Guard',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
        exports.peashooter = {
            PARENT: [exports.genericTank],
            LABEL: 'Peashooter',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  20,     8,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.flank]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                POSITION: [  13,     8,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    13,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };

        exports.whackshooter = {
            PARENT: [exports.genericTank],
            LABEL: 'Whackshooter',
            STAT_NAMES: statnames.generic,
            DANGER: 6,
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  24,     8.5,      1,      0,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.sniper]),
                        TYPE: exports.bullet,
                    }, }, {
                POSITION: [   7,    7.5,    0.6,     7,      0,      0,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.battle, g.carrier]),
                        TYPE: exports.swarm,
                        STAT_CALCULATOR: gunCalcNames.swarm,          
                        }, }, {
                POSITION: [  18,     7,      1,      0,      0,    180,      0,   ],
                    }, {
                POSITION: [   3,     7,     1.7,    18,      0,    180,      0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.snipetrap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
            ],
        };
    exports.bulwark = {
        PARENT: [exports.genericTank],
        LABEL: 'Bulwark',
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,     5.5,     0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, { /* LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [  20,     8,      1,      0,    -5.5,     0,     0.5,  ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.basic, g.twin]),
                TYPE: exports.bullet,
            }, }, {
                POSITION: [  10,     8,      1,      0,      5.5,     190,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    10,      5.5,     190,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, }, {
                POSITION: [  10,     8,      1,      0,      -5.5,     170,     0,   ],
                    }, {
                POSITION: [   4,     8,     1.7,    10,      -5.5,     170,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap]),
                        TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                    }, },
        ],
    };
            exports.guntrap = {
                PARENT: [exports.genericTank],
                LABEL: 'Gunner Trapper',
                DANGER: 7,
                STAT_NAMES: statnames.generic,
                BODY: {
                    FOV: base.FOV * 1.25,
                },
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  19,     2,      1,      0,    -2.5,     0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  19,     2,      1,      0,     2.5,     0,     0.5,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.gunner, g.power, g.twin, g.tonsmorrecoil, g.lotsmorrecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  12,    11,      1,      0,      0,      0,      0,   ],
                        }, {
                    POSITION: [  13,    11,      1,      0,      0,     180,     0,   ],
                        }, {
                    POSITION: [   4,    11,     1.7,    13,      0,     180,     0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.fast, g.halfrecoil]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
            exports.bushwhack = {
                PARENT: [exports.genericTank],
                LABEL: 'Bushwhacker',
                BODY: {
                    ACCELERATION: base.ACCEL * 0.7, 
                    FOV: base.FOV * 1.2,
                },
                DANGER: 7,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  24,    8.5,     1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.morerecoil]),
                            TYPE: exports.bullet,
                        }, }, {
                    POSITION: [  18,     7,      1,      0,      0,    180,      0,   ],
                        }, {
                    POSITION: [   3,     7,     1.7,    18,      0,    180,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap, g.snipetrap]),
                            TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
                        }, },
                ],
            };
exports.stalker = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Stalker',
    INVISIBLE: [0.08, 0.03],
    BODY: {
        ACCELERATION: base.ACCEL * 0.55,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.35,
    },
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, -2, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports.bullet,
        },
    }],
};
exports.invisible = {
    PARENT: [exports.genericTank],
    DANGER: 7,
    LABEL: 'Invisible',
    INVISIBLE: [0.01, 0.03],
    BODY: {
        ACCELERATION: base.ACCEL * 0.55,
        SPEED: base.SPEED * 0.85,
        FOV: base.FOV * 1.35,
    },
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [27, 8.5, -2, 0, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic, g.sniper, g.assass]),
            TYPE: exports.bullet,
            COLOR: 13,
        },
    }],
};
exports.manager = {
    PARENT: [exports.genericTank],
    LABEL: 'Manager',
    STAT_NAMES: statnames.drone,
    DANGER: 5,
    BODY: {
        ACCELERATION: base.ACCEL * 0.75,
        FOV: base.FOV * 1.2,
    },
    INVISIBLE: [0.06, 0.01],
    MAX_CHILDREN: 5,
    GUNS: [{
        /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [6, 12, 1.2, 8, 0, 0, 0, ],
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.drone, g.over]),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
            COLOR: 9,
        },
    }, ],
};
// NPCS:
exports.crasher = {
    TYPE: 'crasher',
    LABEL: 'Precious Jewel',
    COLOR: 36,
    SHAPE: [[-0.4,-0.6],[0.5,-1],[1,-0.5],[1,0.5],[0.5,1],[-0.4,0.6]],
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.crasher2 = {
    TYPE: 'crasher',
    LABEL: 'Dangerous Jewel',
    COLOR: 12,
    SHAPE: 3,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 15,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 25,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.crasher3 = {
    TYPE: 'crasher',
    LABEL: 'Hyper-Dangerous Jewel',
    COLOR: 19,
    SHAPE: 7,
    SIZE: 5,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 25,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 50,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.no = {
    TYPE: 'crasher',
    LABEL: '1-shot Jewel',
    COLOR: 19,
    SHAPE: 4,
    SIZE: 4,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 8,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 500000000000000000000000000000000000000000,
        PENETRATION: 2000000000000000000000000,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.jewel = {
    TYPE: 'crasher',
    LABEL: 'Diamond Jewel',
    COLOR: 16,
    SHAPE: [[-0.6,0],[0.5,-1],[1,-0.5],[1,0.5],[0.5,1]],
    SIZE: 5.2,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 6,
        ACCEL: 0.01,
        HEALTH: 0.5,
        DAMAGE: 25,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
};
exports.minic = {
    TYPE: 'crasher',
    LABEL: 'Mini Yukon',
    COLOR: 6,
    SHAPE: [[-0.4,-0.6],[0.5,-1],[1,-0.5],[1,0.5],[0.5,1],[-0.4,0.6]],
    SIZE: 19,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        SPEED: 5,
        ACCEL: 0.01,
        HEALTH: 10,
        DAMAGE: 5,
        PENETRATION: 2,
        PUSHABILITY: 0.5,
        DENSITY: 10,
        RESIST: 2,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothWithMotion',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    TURRETS: [{
                      /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.trapTurret]
      }, {
                POSITION: [  11,     15.0,      0,     180,    360,   0, ], 
                    TYPE: [exports.trapTurret]
      }, {
                POSITION: [  11,     -15.0,      0,     180,    360,   0, ], 
                    TYPE: [exports.trapTurret]
      },
    ],
};
exports.genericPet = {
    PARENT: [exports.genericTank],
    LABEL: 'Pet', 
    TYPE: 'pet',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 1,
        SPEED: 8,
        ACCELERATION: 2,
        HEALTH: 1e23,
        SHIELD: 0,
        DAMAGE: 0,
        RESIST: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
         'nearestDifferentPet', 'pet', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  17,     9,      1,      0,      0,      0,      0,   ], }, 
    ],
};
exports.basicpet = {
    PARENT: [exports.genericTank],
    LABEL: 'Pet', 
    TYPE: 'pet',
    DAMAGE_CLASS: 0,
    HITS_OWN_TYPE: 'hardWithBuffer',
    FACING_TYPE: 'smoothToTarget',
    BODY: {
        FOV: 1,
        SPEED: 8,
        ACCELERATION: 2,
        HEALTH: 1e23,
        SHIELD: 0,
        DAMAGE: 0,
        RESIST: 1,
        DENSITY: 0.4,
    },
    AI: {
        BLIND: true,
    },
    DRAW_HEALTH: false,
    GIVE_KILL_MESSAGE: false,
    CONTROLLERS: [
         'nearestDifferentPet', 'pet', 'hangOutNearMaster'],
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1.1,      0,      0,      0,      0,   ], }, 
    ],
};
    exports.decoryellow = {
        PARENT: exports.genericTank,
        LABEL: 'Turret',
        BODY: {
            FOV: 0.8,
        },
        COLOR: 13,
    };
        exports.dragon = {
            PARENT: [exports.genericPet],
            LABEL: 'Dragon', 
            TURRETS: [{
                    /*  SIZE     X       Y     ANGLE    ARC */
              POSITION: [20,      0,      0,     0,     360,     1, ],
                      TYPE: exports.decoryellow,
           }, ],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                            POSITION: [  14,     14,     1.4,    8,      0,      0,      0,   ], }, { 
                            POSITION: [  11,     8,     1.4,    8,      0,      0,      0,   ], }, {
                            POSITION: [  16,     5,      1.2,      0,     0,     270,    0.6,  ], }, {   
                            POSITION: [  16,     5,      1.2,      0,     0,     90,    0.6,  ], }, {   
                            POSITION: [  16,     8,      1,      0,      0,     145,    0.1,  ], }, {   
                            POSITION: [  16,     8,      1,      0,      0,     215,    0.1,  ], },
                        ],
        };
exports.sentry = {
    PARENT: [exports.genericTank],
    TYPE: 'crasher',
    LABEL: 'Sentry',
    DANGER: 3,
    COLOR: 36,
    SHAPE: [[-0.4,-0.6],[0.5,-1],[1,-0.5],[1,0.5],[0.5,1],[-0.4,0.6]],
    SIZE: 10,
    SKILL: skillSet({
        rld: 0.5,
        dam: 0.8, 
        pen: 0.8,
        str: 0.1,
        spd: 1,
        atk: 0.5,
        hlt: 0,
        shi: 0,
        rgn: 0.7,
        mob: 0,        
    }),
    VALUE: 1500,
    VARIES_IN_SIZE: true,
    CONTROLLERS: ['nearestDifferentMaster', 'mapTargetToGoal'],
    AI: { NO_LEAD: true, },
    BODY: {
        FOV: 0.5,
        ACCEL: 0.006,
        DAMAGE: base.DAMAGE * 2,
        SPEED: base.SPEED * 0.5,
    },
    MOTION_TYPE: 'motor',
    FACING_TYPE: 'smoothToTarget',
    HITS_OWN_TYPE: 'hard',
    HAS_NO_MASTER: true,
    DRAW_HEALTH: true,
    GIVE_KILL_MESSAGE: true,
};
exports.trapTurret = {
    PARENT: [exports.genericTank],
    LABEL: 'Turret',
    BODY: {
        FOV: 0.5,
    },
    INDEPENDENT: true,
    CONTROLLERS: ['nearestDifferentMaster'], 
    COLOR: 16,
    AI: {
        SKYNET: true,
        FULL_VIEW: true,
    },
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  16,    14,      1,      0,      0,      0,      0,   ],
            }, {
        POSITION: [   4,    14,     1.8,    16,      0,      0,      0,   ], 
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([g.trap, g.lowpower, g.fast, g.halfreload]),
                TYPE: exports.trap, STAT_CALCULATOR: gunCalcNames.trap,
            }, },
    ],
};
exports.sentrySwarm = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    5,    15,    0.6,     7,     0,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.swarm, g.morerecoil]),
            TYPE: exports.swarm,
            STAT_CALCULATOR: gunCalcNames.swarm,     
        }, },
    ],
};
exports.sentryTwin = {
    PARENT: [exports.sentry],
    DANGER: 3,
    GUNS: [{
        POSITION: [    5,    15,    0.6,     7,     5.5,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trifront]),
            TYPE: exports.bullet,    
        }, }, {
               POSITION: [    5,    15,    0.6,     7,     -5.5,    180,     0,  ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.trifront]),
            TYPE: exports.bullet,    
        }, },   
    ],
};
exports.sentryGun = makeAuto(exports.sentry, 'Sentry', { type: exports.heavy3gun, size: 12, });
exports.sentryTrap = makeAuto(exports.sentry, 'Sentry', { type: exports.trapTurret, size: 12, });

exports.miniboss = {
    PARENT: [exports.genericTank],
    TYPE: 'miniboss',
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    FACING_TYPE: 'autospin',
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
};
exports.boss = {
    PARENT: [exports.genericTank],
    DANGER: 6,
    SKILL: skillSet({
        rld: 0.7,
        dam: 0.5, 
        pen: 0.8,
        str: 0.8,
        spd: 0.2,
        atk: 0.3,
        hlt: 1,
        shi: 0.7,
        rgn: 0.7,
        mob: 0,        
    }),
    LEVEL: 45,
    CONTROLLERS: ['nearestDifferentMaster', 'minion', 'canRepel'],
    AI: { NO_LEAD: true, },
    HITS_OWN_TYPE: 'hard',
    BROADCAST_MESSAGE: 'A visitor has left!',
    SIZE: 21,
};
            exports.fallenbooster = {
                PARENT: [exports.boss],
                LABEL: 'Fallen Booster',
                BODY: {
                    HEALTH: base.HEALTH * 0.4,
                    SHIELD: base.SHIELD * 0.4,
                    DENSITY: base.DENSITY * 0.3,
                },
                DANGER: 10,
                COLOR: 17,
                GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                    POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.trifront, g.tonsmorrecoil, g.anni]),
                            TYPE: exports.bullet,
                            LABEL: 'Front',
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,     -1,     140,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  13,     8,      1,      0,      1,     220,    0.6,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     150,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, }, {   
                    POSITION: [  16,     8,      1,      0,      0,     210,    0.1,  ], 
                        PROPERTIES: {
                            SHOOT_SETTINGS: combineStats([g.basic, g.flank, g.tri, g.thruster]),
                            TYPE: exports.bullet,
                            LABEL: gunCalcNames.thruster,
                        }, },
                ],
            };
    exports.crasherSpawner = {
        PARENT: [exports.genericTank],
        LABEL: 'Spawned',  
        STAT_NAMES: statnames.drone,
        CONTROLLERS: ['nearestDifferentMaster'], 
        COLOR: 5, 
        INDEPENDENT: true, 
        AI: { chase: true, },
        MAX_CHILDREN: 4,
        GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
            POSITION: [   6,     12,    1.2,     8,      0,      0,      0,   ], 
                PROPERTIES: {
                    SHOOT_SETTINGS: combineStats([g.drone, g.weak, g.weak]),
                    TYPE: [exports.drone, { LABEL: 'Crasher', VARIES_IN_SIZE: true, DRAW_HEALTH: true }],
                    SYNCS_SKILLS: true,
                    AUTOFIRE: true,
                    STAT_CALCULATOR: gunCalcNames.drone,
                }, },
        ],
    };
    exports.djynnParent = {
        PARENT: [exports.miniboss],
        LABEL: 'Djynn',
        COLOR: 40,
        SHAPE: 0,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.9,
            SPEED: base.SPEED * 0.5,
            HEALTH: base.HEALTH * 1.8,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
exports.homingdjynn = {
        PARENT: [exports.djynnParent],
        LABEL: 'Homing Djynn',
        GUNS: [{ /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     0.8,      0,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.swarm, g.djynnswarm]),
                        TYPE: exports.swarm,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    24,    12,     0.8,      0,      0,      0,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.djynnhome]),
                        TYPE: exports.bullethome,
                        COLOR: 12,
                        LABEL: 'Homer',
                    }, }, {
                    }
        ],
        TURRETS: [{/*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  13,     0,      0,     45,    360,  1,], 
        TYPE: [exports.autoTurrethoming, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
        }, {/*********  SIZE               X       Y     ANGLE    ARC */
        POSITION: [  13,     0,      0,     -45,    360,  1,], 
        TYPE: [exports.autoTurrethoming, { CONTROLLERS: ['nearestDifferentMaster'], INDEPENDENT: true, }],
        }, ],
};
    exports.elite = {
        PARENT: [exports.miniboss],
        LABEL: 'Elite Crasher',
        COLOR: 5,
        SHAPE: 3,
        SIZE: 20,
        VARIES_IN_SIZE: true,
        VALUE: 150000,
        BODY: {
            FOV: 1.3,
            SPEED: base.SPEED * 0.25,
            HEALTH: base.HEALTH * 1.5,
            SHIELD: base.SHIELD * 1.25,
            REGEN: base.REGEN,
            DAMAGE: base.DAMAGE * 2.5,
        },
    };
exports.eliteOverGunner = {
    PARENT: [exports.elite],
    GUNS: [{
            POSITION: [18, 19.2, 1, 0, 0, 0, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1, 1, 0.75, 1, 5.85, 1, 3, 1, 0.00001, 1]
                ]),
                TYPE: exports.bullet,
                COLOR: 16
            },
        },
        {
            POSITION: [18, 16, 1, 0, 0, 270, 0],
        },
        {
            POSITION: [3, 16, 1.3, 18, 0, 270, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 0.45, 0.6, 0.39, 1.25, 5.85, 0.8, 3, 1.25, 0.00001, 1]
                ]),
                TYPE: exports.trap,
                COLOR: 16
            },
        },
        {
            POSITION: [18, 16, 1, 0, 0, 90, 0],
        },
        {
            POSITION: [3, 16, 1.3, 18, 0, 90, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 0.45, 0.6, 0.39, 1.25, 5.85, 0.8, 3, 1.25, 0.00001, 1]
                ]),
                TYPE: exports.trap,
                COLOR: 16
            },
        },
        {
            POSITION: [14.769, 7, 2.7, 8, 0, 180, 0],
            PROPERTIES: {
                SHOOT_SETTINGS: combineStats([
                    [40, 0, 0.001, 1.54, 1.02, 1.26, 1, 10.8, 0.9, 3, 2, 0.00001, 1]
                ]),
                TYPE: exports.drone,
                COLOR: 16
            },
        },
    ],
};
        exports.elite_destroyer = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [    5,    16,     1,      6,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,      60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, }, {
                POSITION: [    5,    16,     1,      6,      0,     -60,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.basic, g.pound, g.pound, g.destroy]),
                        TYPE: exports.bullet,
                        LABEL: 'Devastator',
                    }, },
            ],
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  11,     0,      0,     180,    360,   0, ], 
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,      60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,     -60,    360,   0, ],  
                    TYPE: [exports.crasherSpawner]
                    }, {
                POSITION: [  11,     0,      0,       0,    360,   1, ],  
                    TYPE: [exports.bigauto4gun, { INDEPENDENT: true, COLOR: 5, }]
                    },
            ],
        };
exports.celestial = {
    PARENT: [exports.miniboss],
    LABEL: 'Celestial',
    DANGER: 10,
    SHAPE: 9,
    SIZE: 60,
    VALUE: 150000,
    BODY: {
         FOV: 1.3,
         SPEED: base.SPEED * 0.25,
         HEALTH: base.HEALTH * 2.5,
         SHIELD: base.SHIELD * 1.25,
         REGEN: base.REGEN,
         DAMAGE: base.DAMAGE * 2.5,
    },
    TURRETS: [{
      /*********  SIZE     X       Y     ANGLE    ARC    LAYER*/
      POSITION: [  12,     0,      0,      0,      0,      0,   ],
      TYPE: [exports.trapTurret], 
      }, {
      POSITION: [  12,     0,      0,      40,      0,      0,   ],
      TYPE: [exports.trapTurret], 
      }, {
      POSITION: [  12,     0,      0,      80,      0,      0,   ],
      TYPE: [exports.trapTurret], 
      }, {
      POSITION: [  12,     0,      0,      120,      0,      0,   ],
      TYPE: [exports.trapTurret], 
      }, {
      POSITION: [  12,     0,      0,      160,      0,      0,   ],
      TYPE: [exports.trapTurret], 
      }, {
      POSITION: [  12,     0,      0,      200,      0,      0,   ],
      TYPE: [exports.trapTurret], 
      }, {
      POSITION: [  12,     0,      0,      240,      0,      0,   ],
      TYPE: [exports.trapTurret], 
      }, {
      POSITION: [  12,     0,      0,      280,      0,      0,   ],
      TYPE: [exports.trapTurret], 
      }, {
      POSITION: [  12,     0,      0,      320,      0,      0,   ],
      TYPE: [exports.trapTurret], 
      }]
};
//note: you cant have the inner turrets in a specific celestial you have to manually add them in
//note2: all celestial bodys have 9 sides with 9 traps
//note3: 360 divided by 9 is 40, so 40 added to each part/component
        exports.elite_gunner = {
            PARENT: [exports.elite],
            GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [  14,    16,      1,      0,      0,     180,     0,   ],
                    }, {
                POSITION: [   4,    16,     1.5,    14,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.trap, g.hexatrap]),
                        TYPE: [exports.pillbox, { INDEPENDENT: true, }],
                    }, }, {                
                POSITION: [   6,    14,     -2,      2,      0,      60,     0,   ],
                    }, {                
                POSITION: [   6,    14,     -2,      2,      0,     300,     0,   ],
                    }
            ],
            AI: { NO_LEAD: false, },
            TURRETS: [{
                /*********  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     8,      0,     60,     180,   0, ], 
                    TYPE: [exports.auto4gun],
                    }, {
                POSITION: [  14,     8,      0,     300,    180,   0, ],
                    TYPE: [exports.auto4gun],
            }],
        };
        exports.elite_sprayer = { 
            PARENT: [exports.elite],
            AI: { NO_LEAD: false, },
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [  14,     6,      0,     180,     190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,      60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        }, {
                POSITION: [  14,     6,      0,     -60,    190, 0], 
                    TYPE: [exports.spray, { COLOR: 5, }],
                        },
            ],
        };

    exports.palisade = (() => {
        let props = {
            SHOOT_SETTINGS: combineStats([g.factory, g.pound, g.halfreload, g.halfreload]),
            TYPE: exports.minion,
            STAT_CALCULATOR: gunCalcNames.drone,                        
            AUTOFIRE: true,
            MAX_CHILDREN: 1,
            SYNCS_SKILLS: true,   
            WAIT_TO_CYCLE: true,
        };
        return {
            PARENT: [exports.miniboss],
            LABEL: 'Rogue Palisade',
            COLOR: 17,
            SHAPE: 6,
            SIZE: 28,
            VALUE: 500000,
            BODY: {
                FOV: 1.3,
                SPEED: base.SPEED * 0.1,
                HEALTH: base.HEALTH * 2,
                SHIELD: base.SHIELD * 2,
                REGEN: base.REGEN,
                DAMAGE: base.DAMAGE * 3,
            },
            GUNS: [ { /**** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
                POSITION: [   4,      6,    -1.6,     8,      0,      0,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     60,      0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     120,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     180,     0,   ], 
                    PROPERTIES: {
                        SHOOT_SETTINGS: combineStats([g.factory, g.pound]),
                        TYPE: exports.minion,
                        STAT_CALCULATOR: gunCalcNames.drone,                        
                        AUTOFIRE: true,
                        MAX_CHILDREN: 1,
                        SYNCS_SKILLS: true, 
                        WAIT_TO_CYCLE: true,  
                    }, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     240,     0,   ], 
                    PROPERTIES: props, }, {
                POSITION: [   4,      6,    -1.6,     8,      0,     300,     0,   ], 
                    PROPERTIES: props, },
            ],
            TURRETS: [{ /*  SIZE     X       Y     ANGLE    ARC */
                POSITION: [   5,    10,      0,      30,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,      90,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     150,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     210,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     270,    110, 0], 
                    TYPE: exports.trapTurret,
                        }, {
                POSITION: [   5,    10,      0,     330,    110, 0], 
                    TYPE: exports.trapTurret,
                        },
            ],
        };
    })();

exports.bot = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    BODY: {
        SIZE: 12,
        HEALTH: base.HEALTH * 0.75,
        DAMAGE: base.DAMAGE * 0.75,
    },
    //COLOR: 17,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'
    ],
    AI: { STRAFE: true, },
    SKILL: skillSet({
        rld: 0.875,
        spd: 0.875,
        dam: 0.875, 
        pen: 0.875,
        str: 0.875,
        atk: 0.875,
    }),
};
exports.botRammer = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
  SKILL: skillSet({
        rld: 0.2,
        dam: 0, 
        pen: 0,
        str: 0,
        spd: 0.8,
        atk: 0,
        hlt: 1,
        shi: 1,
        rgn: 1,
        mob: 0,        
    }),
    BODY: {
        SIZE: 10,
    },
    //COLOR: 17,
    CONTROLLERS: [
'nearestDifferentMaster', 'mapTargetToGoal', 'Wanderlust'
    ],
    AI: { NO_LEAD: true, },
};
exports.botHeavyRammer = {
    PARENT: [exports.botRammer],
  SKILL: skillSet({
        rld: 0.2,
        dam: 0, 
        pen: 0,
        str: 0,
        spd: 0.3,
        atk: 1,
        hlt: 2,
        shi: 2,
        rgn: 2,
        mob: 1,        
    }),
};
 
exports.botGun = {
    AUTO_UPGRADE: 'random',
    FACING_TYPE: 'looseToTarget',
    SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 0.5,
        atk: 0,
        hlt: 0,
        shi: 0,
        rgn: 0,
        mob: 0,        
    }),
    BODY: {
        SIZE: 10,
    },
    //COLOR: 17,
    CONTROLLERS: [
        'nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth','Wanderlust'
    ],
    AI: { STRAFFE: true, },
};
exports.botGlassBarrel = {
    PARENT: [exports.botGun],
  SKILL: skillSet({
        rld: 0,
        dam: 1, 
        pen: 0.5,
        str: 1,
        spd: 0,
        atk: 0,
        hlt: 1,
        shi: 0,
        rgn: 1,
        mob: 0,        
    }),
};
exports.botBigGun = {
    PARENT: [exports.botGun],
SKILL: skillSet({
        rld: 1,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 0,
        atk: 0,
        hlt: 0,
        shi: 0,
        rgn: 0,
        mob: 0,        
    }),
};
exports.botGun2 = {
    PARENT: [exports.botGun],
SKILL: skillSet({
        rld: 0.5,
        dam: 1, 
        pen: 1,
        str: 1,
        spd: 1,
        atk: 0,
        hlt: 0,
        shi: 0,
        rgn: 0,
        mob: 0,        
    }),
};
        exports.spectator = {
            PARENT: [exports.genericTank],
            LABEL: 'Spectator',
            DANGER: 6,
            BODY: {
        SPEED: 50,
        ACCEL: 0.01,
        HEALTH: base.HEALTH * 100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 * 100,
        DAMAGE: 0,
        PENETRATION: 2,
        PUSHABILITY: 0,
        DENSITY: 10,
        RESIST: 2,
            },
            TURRETS: [{ /** SIZE     X       Y     ANGLE    ARC */
                POSITION: [  21.5,   0,      0,      0,     360,  0,], 
                TYPE: exports.smasherBody,
            }],
            IS_SMASHER: true,
            SKILL_CAP: [smshskl, 0, 0, 0, 0, smshskl, smshskl, smshskl, smshskl, smshskl,],
            STAT_NAMES: statnames.smasher,
        };
exports.basicception = makeAuto(exports.basic, "Basicception", {
    type: exports.basic
});

exports.bot_basic = {
    PARENT: [exports.genericTank],
    LABEL: 'Basic',
    TYPE: 'tank',
    LEVEL: 45,
    PARAHEAL_TO_APPLY: 0,
    PARAHEAL: true,
    //CONTROLLERS: ['nearestDifferentMaster'],
    GUNS: [ { /*** LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY */
        POSITION: [  18,     8,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.basic]),
            TYPE: exports.bullet,
            LABEL: '',                  // def
            STAT_CALCULATOR: 0,         // def
            WAIT_TO_CYCLE: false,       // def
            AUTOFIRE: false,            // def
            SYNCS_SKILLS: false,        // def         
            MAX_CHILDREN: 0,            // def  
            ALT_FIRE: false,            // def 
            NEGATIVE_RECOIL: false,     // def 
        }, }, 
    ],
};

const setBuild = build => {
  let skills = build.split(build.includes('/') ? '/' : '').map(r => +r);
  if (skills.length !== 10) throw new RangeError('Build must be made up of 10 numbers');
  return [6, 4, 3, 5, 2, 9, 0, 1, 8, 7].map(r => skills[r]);
};
exports.observer = {
  PARENT: [exports.genericTank],
  LABEL: 'Observer',
  BODY: {
    REGEN: 100000,
    HEALTH: 100000,
    DAMAGE: base.DAMAGE * 0.001,
    DENSITY: base.DENSITY * 0.001,
    SPEED: base.SPEED * 2,
    FOV: base.FOV * 4
  },
  ALPHA: 0.2,
  SKILL: setBuild("9999999999")
};
/*exports.template = {
    PARENT: [exports.genericTank],
    LABEL: 'Template',
    GUNS: [ {  LENGTH  WIDTH   ASPECT    X       Y     ANGLE   DELAY 
        POSITION: [  0,     0,      1,      0,      0,      0,      0,   ], 
        PROPERTIES: {
            SHOOT_SETTINGS: combineStats([g.template  change g.template ]),
            TYPE: exports.bullet,
            LABEL: 'Gun Label',         // Name of the turret
            AUTOFIRE: false,            // If the gun will always fire even if you dont want to lol
            SYNCS_SKILLS: false,        // explanatory         
            MAX_CHILDREN: 0,            // How much drones/traps/blocks you can only have at once  
            ALT_FIRE: false,            // True = makes it so you need to click shift or right click to fire the barrel 
        }, }, 
    ],
};*/

// UPGRADE PATHS

// PUT ANIMATION TANKS HERE SO THAT THERE ARE NO REFERENCE ERRORS
exports.dev.UPGRADES_TIER_1 = [exports.basic, exports.testbed2];
exports.testbed2.UPGRADES_TIER_1 = [exports.basic, exports.ot, exports.tank];
exports.ot.UPGRADES_TIER_1 = [exports.reddestroy, exports.oldbent, exports.tritank, exports.freaker, exports.emp];
exports.tank.UPGRADES_TIER_1 = [exports.susus, exports.basic222, exports.shotgun3];

exports.bot_basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.trapper, exports.lillilhurri, exports.lancer, exports.pelleter, exports.auto2, exports.uzi, exports.homing];

exports.basic.UPGRADES_TIER_1 = [exports.twin, exports.sniper, exports.machine, exports.flank, exports.director, exports.pound, exports.trapper, exports.lillilhurri, exports.lancer, exports.pelleter, exports.auto2, exports.uzi, exports.homing, exports.surpriser, exports.basebrid];

    exports.twin.UPGRADES_TIER_2 = [exports.double, exports.bent, exports.gunner, exports.hexa, exports.twozi, exports.twinmach, exports.twinsniper, exports.homingtwin, exports.cruiser, exports.heavytwin];
        exports.twinsniper.UPGRADES_TIER_3 = [exports.dual, exports.musket, exports.twinassassin, exports.swarmtwins, exports.twini, exports.bentsniper];
          exports.swarmtwins.UPGRADES_TIER_4 = [exports.combined, exports.swarmdual, exports.swarmbents];
          exports.bentsniper.UPGRADES_TIER_4 = [exports.bentmini, exports.swarmbents];
          exports.dual.UPGRADES_TIER_4 = [exports.swarmdual];
        exports.twin.UPGRADES_TIER_3 = [exports.bulwark];
        exports.heavytwin.UPGRADES_TIER_3 = [exports.heavyGunner, exports.cherrytree, exports.heavytwinbrid, exports.poundbent, exports.napalm];
          exports.split.UPGRADES_TIER_4 = [exports.splitrap];
          exports.heavytwinbrid.UPGRADES_TIER_4 = [exports.heavyhybrid];
          exports.bentdouble.UPGRADES_TIER_4 = [exports.mixup];
        exports.bent.UPGRADES_TIER_3 = [exports.penta, exports.spreadshot, exports.benthybrid, exports.bentdouble, exports.triple, exports.thrzi, exports.benthomer, exports.bentsniper, exports.sunburst, exports.carrier, exports.poundbent, exports.cutter, exports.benttrapper];
          exports.penta.UPGRADES_TIER_4 = [exports.pentzi, exports.inter, exports.netfisher];
          exports.spreadshot.UPGRADES_TIER_4 = [exports.rod];
          exports.poundbent.UPGRADES_TIER_4 = [exports.sunbeam, exports.cherryforest, exports.rod, exports.netfisher, exports.destroybent, exports.blastbent, exports.tripleheavy];
          exports.sunburst.UPGRADES_TIER_4 = [exports.sunbeam];
        exports.gunner.UPGRADES_TIER_3 = [exports.autogunner, exports.nailgun, exports.auto4, exports.machinegunner, exports.guntrap, exports.hurricane, exports.overgunner, exports.borergun, exports.heavyGunner];
          exports.autogunner.UPGRADES_TIER_4 = [exports.homegunner];

    exports.pelleter.UPGRADES_TIER_2 = [exports.gunner, exports.lilhurri, exports.cruiser, exports.borer, exports.micrometer, exports.puntgun];
      exports.pelleter.UPGRADES_TIER_3 = [exports.glasspelleter];
        exports.glasspelleter.UPGRADES_TIER_4 = [exports.glassborer];
      exports.borer.UPGRADES_TIER_3 = [exports.homer, exports.borergun, exports.scorpion];
      exports.micrometer.UPGRADES_TIER_3 = [exports.milimeter, exports.frigate, exports.heavyGunner, exports.scorpion, exports.microbrid];
        exports.microbrid.UPGRADES_TIER_4 = [exports.microlearner];
        exports.milimeter.UPGRADES_TIER_4 = [exports.macrometer, exports.uboat];

    exports.sniper.UPGRADES_TIER_2 = [exports.assassin, exports.hunter, exports.mini, exports.rifle, exports.chasseur, exports.poisonsniper, exports.borer, exports.obliterator, exports.chiller, exports.clicker, exports.minilightning, exports.twinsniper, exports.gatling, exports.single, exports.snapper];
        exports.sniper.UPGRADES_TIER_3 = [exports.bushwhack];
        exports.obliterator.UPGRADES_TIER_3 = [exports.plow, exports.megarifle, exports.megahunter];
        exports.assassin.UPGRADES_TIER_3 = [exports.falcon, exports.ranger, exports.stalker, exports.autoass, exports.twinassassin, exports.assasswind];
          exports.twinassassin.UPGRADES_TIER_4 = [exports.twinranger, exports.combined];
          exports.stalker.UPGRADES_TIER_4 = [exports.invisible];
        exports.hunter.UPGRADES_TIER_3 = [exports.preda, exports.poach, exports.sidewind, exports.dual, exports.megahunter];
        exports.mini.UPGRADES_TIER_3 = [exports.stream, exports.nailgun, exports.hybridmini, exports.minitrap, exports.minibomb, exports.snipegun, exports.twini];
          exports.stream.UPGRADES_TIER_4 = [exports.smotherer];
        exports.rifle.UPGRADES_TIER_3 = [exports.musket, exports.megarifle];
        exports.chiller.UPGRADES_TIER_3 = [exports.stinger, exports.fireplayer, exports.frostbite];
        exports.poisonsniper.UPGRADES_TIER_3 = [exports.stinger];

    exports.machine.UPGRADES_TIER_2 = [exports.artillery, exports.mini, exports.gunner, exports.ak42, exports.blaster, exports.twinmach, exports.inferno, exports.gatling, exports.machinehome];
        exports.twinmach.UPGRADES_TIER_3 = [exports.napalm];
        exports.inferno.UPGRADES_TIER_3 = [exports.wildfire, exports.sniferno, exports.hominginferno, exports.combuster];
          exports.wildfire.UPGRADES_TIER_4 = [exports.hyperfire];
        exports.blaster.UPGRADES_TIER_3 = [exports.furnace, exports.napalm, exports.wildfire];
          exports.furnace.UPGRADES_TIER_4 = [exports.hyperfire];
        exports.gatling.UPGRADES_TIER_3 = [exports.sniferno];
        exports.machine.UPGRADES_TIER_3 = [exports.spray];

    exports.flank.UPGRADES_TIER_2 = [exports.hexa, exports.tri, exports.auto3, exports.flanktrap, exports.tritrap, exports.lilhurri, exports.flance, exports.drivethru, exports.shield, exports.flanksurpriser]
        exports.auto3.UPGRADES_TIER_3 = [exports.auto5, exports.heavy3, exports.auto4, exports.banshee];
        exports.shield.UPGRADES_TIER_3 = [exports.twinshield];
          exports.twinshield.UPGRADES_TIER_4 = [exports.bentshield];
        exports.lilhurri.UPGRADES_TIER_3 = [exports.hurricane, exports.tempest, exports.autstorm, exports.forces]
        exports.hexa.UPGRADES_TIER_3 = [exports.octo, exports.hurricane, exports.hexatrap, exports.quadzi, exports.beehive];
          exports.hurricane.UPGRADES_TIER_4 = [exports.snowstorm, exports.vigintitres];   
          exports.quadzi.UPGRADES_TIER_4 = [exports.beezi];  
        exports.tri.UPGRADES_TIER_3 = [exports.fighter, exports.booster, exports.falcon, exports.bomber, exports.autotri, exports.brutalizer, exports.eagle, exports.hidetri, exports.bicycle, exports.narwhale, exports.shouter];
          exports.booster.UPGRADES_TIER_4 = [exports.motorcycle, exports.drifter];
          exports.bicycle.UPGRADES_TIER_4 = [exports.motorcycle, exports.scooter, exports.pedals, exports.car];
          exports.fighter.UPGRADES_TIER_4 = [exports.scooter, exports.fighters];
          exports.eagle.UPGRADES_TIER_4 =  [exports.pedals];
          exports.bomber.UPGRADES_TIER_4 =  [exports.terrorist];
          exports.narwhale.UPGRADES_TIER_4 = [exports.car];
          exports.brutalizer.UPGRADES_TIER_4 =  [exports.drifter];
          /*exports.falcon.UPGRADES_TIER_3 = [exports.fastfalcon];*/

    exports.director.UPGRADES_TIER_2 = [exports.overseer, exports.cruiser, exports.underseer, exports.lilfact, exports.student, exports.yinyang, exports.radio, exports.minilightning, exports.override, exports.navyist];
        exports.director.UPGRADES_TIER_3 = [exports.manager];
        exports.student.UPGRADES_TIER_3 = [exports.scholar, exports.frigate, exports.factory];
        exports.minilightning.UPGRADES_TIER_3 = [exports.lightning];
        exports.cruiser.UPGRADES_TIER_3 = [exports.carrier, exports.battleship, exports.fortress, exports.piston, exports.frigate, exports.submarine, exports.commander, exports.beehive];
          exports.frigate.UPGRADES_TIER_4 = [exports.uboat, exports.warfare, exports.hierarchy];    
          exports.beehive.UPGRADES_TIER_4 = [exports.colony, exports.praesepe, exports.beezi];     
        exports.lilfact.UPGRADES_TIER_3 = [exports.factory, exports.autolilfact];
          exports.autolilfact.UPGRADES_TIER_4 = [exports.autoautolilfact];
        exports.overseer.UPGRADES_TIER_3 = [exports.overlord, exports.overtrap, exports.overgunner, exports.banshee, exports.autoover, exports.drive, exports.fractionalizer, exports.scholar, exports.commander];  
          exports.overlord.UPGRADES_TIER_4 = [exports.divisor, exports.professor];
          exports.scholar.UPGRADES_TIER_4 = [exports.professor, exports.hierarchy];
          exports.fractionalizer.UPGRADES_TIER_4 = [exports.divisor, exports.mixnumber];
          exports.commander.UPGRADES_TIER_4 = [exports.general, exports.hierarchy, exports.toxin];
        exports.underseer.UPGRADES_TIER_3 = [exports.necromancer, exports.maleficitor, exports.eggmancer, exports.combuster];
        exports.yinyang.UPGRADES_TIER_3 = [exports.fractionalizer];

    exports.pound.UPGRADES_TIER_2 = [exports.destroy, exports.builder, exports.artillery, exports.bomberm, exports.blaster, exports.student, exports.obliterator, exports.multishot, exports.micrometer, exports.launcher, exports.heavytwin, exports.spreadling];
        exports.multishot.UPGRADES_TIER_3 = [exports.shotgun2];
        exports.pound.UPGRADES_TIER_3 = [exports.eagle];
        exports.spreadling.UPGRADES_TIER_3 = [exports.spreadshot];
        exports.launcher.UPGRADES_TIER_3 = [exports.skimmer, exports.twister, exports.sidewind, exports.bar];
        exports.artillery.UPGRADES_TIER_3 = [exports.mortar, exports.spreadshot, exports.skimmer, exports.twister, exports.beekeeper];
          exports.mortar.UPGRADES_TIER_4 = [exports.beetar];
          exports.beekeeper.UPGRADES_TIER_4 = [exports.beetar];
        exports.destroy.UPGRADES_TIER_3 = [exports.conq, exports.anni, exports.hybrid, exports.construct, exports.hiveshooter,exports.explosive, exports.furnace, exports.milimeter];
          exports.anni.UPGRADES_TIER_4 = [exports.mili, exports.macrometer];
          exports.hybrid.UPGRADES_TIER_4 = [exports.learnbrid];
        exports.bomberm.UPGRADES_TIER_3 = [exports.explosive, exports.minibomb, exports.eits, exports.demom];

    exports.trapper.UPGRADES_TIER_2 = [exports.builder, exports.tritrap, exports.flanktrap, exports.megatrapper, exports.machinetrapper, exports.snapper];
        exports.machinetrapper.UPGRADES_TIER_3 = [exports.minitrap];
        exports.trapper.UPGRADES_TIER_3 = [exports.overtrap];
        exports.snapper.UPGRADES_TIER_3 = [exports.minitrap, exports.bushwhack];
        exports.builder.UPGRADES_TIER_3 = [exports.construct, exports.autobuilder, exports.engineer, exports.boomer, exports.architect, exports.conq];
          exports.autobuilder.UPGRADES_TIER_4 = [exports.buildception];
        exports.flanktrap.UPGRADES_TIER_3 = [exports.bomber, exports.bulwark, exports.bushwhack, exports.fortress, exports.guntrap, exports.peashooter, exports.armament, exports.conq];
          exports.bulwark.UPGRADES_TIER_4 = [exports.splitrap];
          exports.peashooter.UPGRADES_TIER_4 = [exports.whackshooter];
          exports.bushwhack.UPGRADES_TIER_4 = [exports.whackshooter];
          exports.armament.UPGRADES_TIER_4 = [exports.hazard, exports.terrorist];
        exports.tritrap.UPGRADES_TIER_3 = [exports.fortress, exports.hexatrap, exports.septatrap, exports.architect];
        exports.megatrapper.UPGRADES_TIER_3 = [exports.gigatrapper, exports.construct];

    exports.lillilhurri.UPGRADES_TIER_2 = [exports.lilhurri, exports.hexa, exports.blow, exports.gunner, exports.lillilhome, exports.fragwind, exports.twind];
        exports.blow.UPGRADES_TIER_3 = [exports.tempest, exports.assasswind];

    exports.lancer.UPGRADES_TIER_3 = [exports.smash, exports.chasseur, exports.flance/*, exports.ballhit*/, exports.megalancer, exports.teamtrees, exports.backlance, exports.akafuji, exports.whacker]
        exports.smash.UPGRADES_TIER_3 = [exports.megasmash, exports.spike, exports.autosmash, exports.landmine, exports.kami, exports.bonker, exports.parasite];
          exports.spike.UPGRADES_TIER_4 = [exports.weirdspike];
        exports.whacker.UPGRADES_TIER_3 = [exports.flail];
          exports.flail.UPGRADES_TIER_4 = [exports.wreckingball];
        exports.chasseur.UPGRADES_TIER_3 = [exports.flail];

    exports.uzi.UPGRADES_TIER_2 = [exports.mini, exports.hunter, exports.twozi, exports.hominguzi];
        exports.twozi.UPGRADES_TIER_3 = [exports.quadzi, exports.thrzi, exports.twini];
          exports.thrzi.UPGRADES_TIER_4 = [exports.pentzi, exports.bentmini];
          exports.twini.UPGRADES_TIER_4 = [exports.bentmini];
        exports.backlance.UPGRADES_TIER_3 = [exports.lanciter];

    exports.homing.UPGRADES_TIER_2 = [exports.lillilhome, exports.drivethru, exports.droning, exports.cruiser, exports.homingtwin, exports.hominguzi, exports.homingsurpriser];
        exports.drivethru.UPGRADES_TIER_2 = [exports.bicycle];

    exports.surpriser.UPGRADES_TIER_2 = [exports.multishot, exports.homingsurpriser, exports.flanksurpriser, exports.clicker];
        exports.drivethru.UPGRADES_TIER_2 = [exports.bicycle];

    exports.auto2.UPGRADES_TIER_2 = [exports.twin2, exports.auto3, exports.revolutionist, exports.basicception];
        exports.twin2.UPGRADES_TIER_3 = [exports.auto4, exports.bent2];
        exports.revolutionist.UPGRADES_TIER_3 = [exports.solarsystem];

    exports.basebrid.UPGRADES_TIER_2 = [/*exports.computer, */exports.basekick];
       // exports.drivethru.UPGRADES_TIER_2 = [exports.bicycle];

      //  exports.basic.UPGRADES_TIER_3 = [];
          exports.single.UPGRADES_TIER_4 = [exports.frag, exports.bombdum];
// Scramble upgrades: Code by Jekyll lol
/*for (const key in exports) {
  let shuffledTanks = Object.keys(exports).sort(function() {return 0.5 - Math.random()}).slice((-25 - 25 * Math.random()));
  let upgrades = shuffledTanks.map(e => {
    return exports[e];
  });
  exports[key].UPGRADES_TIER_1 = [];
  exports[key].UPGRADES_TIER_2 = [];
  exports[key].UPGRADES_TIER_3 = [];
  
  exports[key].UPGRADES_TIER_1 = upgrades;
};*/

