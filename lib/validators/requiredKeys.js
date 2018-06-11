module.exports = {
    BASE: [],
    AIRPORT: [
        'icao',
        'iata',
        'magnetic_north',
        'ctr_radius',
        'ctr_ceiling',
        'initial_alt',
        'position',
        'rr_radius_nm',
        'rr_center',
        'has_terrain',
        'wind',
        'arrivalRunway',
        'departureRunway',
        'airspace',
        'fixes',
        'restricted',
        'runways',
        'airways',
        'sids',
        'stars',
        'spawnPatterns',
        'maps',
    ],
    AIRSPACE: [
        'ceiling',
        'floor',
        'airspace_class',
        'poly'
    ],
    FIXES: [],
    RADIO: [
        'twr',
        'app',
        'dep'
    ],
    RESTRICTED: [
        'name',
        'height',
        'coordinates'
    ],
    RUNWAYS: [
        'name',
        'end',
        'ils',
        'glideslope'
    ],
    SPAWN_PATTERNS: [
        'origin',
        'destination',
        'category',
        'route',
        'altitude',
        'speed',
        'method',
        'rate',
        'airlines'
    ],
    WIND: [
        'angle',
        'speed'
    ]
}