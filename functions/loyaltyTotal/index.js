/* 
    points transactions are in customer => custom_pointz_transactions
    points total is stored in customer => custom_points_total
    points tier is stored in customer => custom_points_tier

    tiers:
        bronze: lifetime purchases < £500, 100 points / £1
        silver: lifetime purchases >= £500, 150 points / £1
        gold: lifetime purchases >= £1000, 200 points / £1
        platinum: lifetime purchases >= £2000, 300 points / £1


    process:
        add new transaction balance to existing balance. Positive for accumulated points, negative for spent points

*/

const addPoints = async ({ id, details }) => {
    // get existing balance and customer tier

    // update and store balance


}

export { addPoints }