class Enums {
    static get DrawMode() {
        return {
            Unknown: 0,
            Restart: 1,
            LeaveEmpty: 2,
            NextTurnWins: 3
           }
       }

    static get GameMode() {
        return {
            Unknown: 0,
            NewLevelRestart: 1,
            NewLevelGetsPrevLevel: 2
            }
       }
}

export default Enums;