import { Distributor, Product01, User } from "@types";

export interface Membership {
    succeeded: boolean,
    message: string,
    errors: null,
    data: {
        id: string,
        retailerId: string,
        distributorId: string,
        distributor?: User['data'],
        membershipRankId: string,
        point: number,
        discountRate?: number,
        membershipRank: MembershipRank['data'],
        product?: Product01,
        num?: number
    }
}

export interface MembershipRank {
    succeeded: boolean,
    message: string,
    errors: null,
    data: {
        id: string,
        rankName: string
    }
}

export interface CustomerRank {
    succeeded: boolean,
    message: string,
    errors: null,
    data: {
        id: string,
        distributorId: string,
        // distributor?: User['data'],
        membershipRankId: string,
        // point: number,
        threshold: number,
        discountRate: number,
        // membershipRank: MembershipRank['data'],
        // product?: Product01,
        // num?: number
    }[]
}