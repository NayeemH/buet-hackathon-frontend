import { Subscription } from "rxjs";

export interface PendingCours {
    sub: Subscription,
    error: string,
    loading: boolean,
    data: []
    // data: [{
    //     _id: String,
    //     course_id: {
    //         _id: String,
    //         name: String
    //     },
    //     student_id: {
    //         _id: String,
    //         name: String,
    //         year: Number
    //     }
    // }]
}
