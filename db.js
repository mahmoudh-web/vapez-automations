import mariadb from 'mariadb'

const pool = mariadb.createPool({
    host: '134.209.187.194',
    port: 32768,
    user: 'root',
    password: '3abc47617',
    database: '_7a8262f24e53b7fe'
})

pool.getConnection()
    .then(conn => {
        console.log('Connected to database')
        const query = "DELETE FROM `tabStock Ledger Entry` WHERE `name` IN ('bcae56718f', '087721c8d2')"
        conn.query(query)
            .then(results => {
                console.log(`${results.affectedRows} records deleted from tabStock Ledger Entry`)
                conn.release()
            })
            .catch(err => {
                console.log('Error executing query', err)
                conn.release()
            })



    })
    .catch(err => {
        console.log('Error connecting to database', err)
    })