// interface EventTemplate {
//     event: string;
//     data: any;
// }

// export interface CreateEvent extends EventTemplate {
//     event: "create_game",
//     data: {
//         webSocketID: "string"
//     }
// }

// export interface JoinEvent extends EventTemplate {
//     event: "join_game",
//     data: {
//         gameID: "string"
//     }
// }

// export interface MessageEvent extends EventTemplate {
//     event: "message",
//     data: {
//         gameID: "string"
//     }
// }

// export type WSEvent = CreateEvent | JoinEvent | MessageEvent

// type callbacks = {
//     [key in WSEvent["event"]]: ((params :WSEvent["data"]) => void)[]
// }


// type EventByName<E extends WSEvent['event'], T = WSEvent> = T extends { event: E } ? T : never;
// // type Call

// const callbacks: EventByName= {
//     // So this should be valid:
//     message: [(data: MessageEvent['data']): void => { }, (data: MessageEvent['data']): void => { }],

//     // But this should not be valid, as CreateEvent doesn't have the event 'join_game'
//     join_game: [(data: CreateEvent['data']): void => { }],
// };