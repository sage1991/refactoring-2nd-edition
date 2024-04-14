import type plays from "../plays.json"

export type Plays = typeof plays
export type Play = Plays[keyof Plays]
