export enum EventPhase {
    REGISTRATION = 1,
    PRIVATE_SELECTION = 2,
    SHOWCASE_AUDITION_1 = 3,
    QUALIFIED_VOTING = 4,
    AUDITION_ROUND_2 = 5,
    FINALE_REVEAL = 6,
    GRAND_FINALE = 7,
    POST_EVENT = 8
}

export interface IContestant {
    id: number;
    fullName: string;
    stageName: string;
    email: string;
    phone?: string;
    talentCategory: string;
    bio?: string;
    photoUrl?: string;
    videoUrl?: string;
    socialMedia: {
        instagram?: string;
        twitter?: string;
        facebook?: string;
    };
    status: 'Pending' | 'Screened' | 'Qualified' | 'Finalist' | 'Eliminated' | 'Winner' | 'Runner-up';
    contestantNumber?: number;
    referralCode?: string;
    totalVotes: number;
    ticketsSold: number;
    judgesScore: number;
    referralCount: number;
    submittedAt: string;
}

export interface IEventSettings {
    phase: EventPhase;
    votingActive: boolean;
}
