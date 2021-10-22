export const genres = [
    'Nature',
    'Family',
    'Children',
    'Food',
    'Sports',
    'Travel',
    'History',
    'Legal',
    'Medical',
    'War',
    'Action',
    'Comedy',
    'Crime',
    'Drama',
    'Espionage',
    'Music',
    'Romance'
];

export enum GENRE {
    NATURE = 'Nature',
    FAMILY = 'Family',
    CHILDREN = 'Children',
    FOOD = 'Food',
    SPORTS = 'Sports',
    TRAVEL = 'Travel',
    HISTORY = 'History',
    LEGAL = 'Legal',
    MEDICAL = 'Medical',
    WAR = 'War',
    ACTION = 'Action',
    COMEDY = 'Comedy',
    CRIME = 'Crime',
    DRAMA = 'Drama',
    ESPIONAGE = 'Espionage',
    MUSIC = 'Music',
    ROMANCE = 'Romance'
}

enum Weekday {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday"
}

type Genre = `${GENRE}`;

type WeekdayType = `${Weekday}`;

export interface ShowModel {
    averageRuntime: number;
    dvdCountry?: string | null;
    ended: string
    externals: {
        imdb: string
        thetvdb: number
        tvrage: number
    };
    genres: Genre[];
    id: number;
    image: {
        medium: string
        original: string
    };
    language: string;
    name: string;
    network: {
        country: {
            code: string;
            name: string;
            timezone: string;
        };
        id: number;
        name: string;
    };
    officialSite: string;
    premiered: string;
    rating: {
        average: number | null;
    };
    runtime: number;
    schedule: {
        days: WeekdayType[]
    };
    time: string;
    status: string;
    summary: string;
    type: string;
    updated: number;
    url: string;
    webChannel: {
        country: {
            code: string;
            name: string;
            timezone: string;
        };
        id: number;
        name: string;
    };
    weight: number;
    _links: {
        previousepisode: {
            href: string;
        };
        self: {
            href: string;
        };
    };
}