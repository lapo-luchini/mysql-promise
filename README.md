mysql-promise2
==============

Standard wrapper around [MySQL](https://github.com/felixge/node-mysql), function names ending with `*Async` return [Bluebird](https://github.com/petkaantonov/bluebird/) Promises.

I also added a Bluebird [Disposer](https://github.com/petkaantonov/bluebird/blob/master/API.md#disposerfunction-disposer---disposer) `pool.getTransaction()` to ease creating chained Promises in a single transaction which gets automatically committed if everythin's ok or rolled back if there is an error.

    var Promise = require('bluebird'),
        mysql = require('mysql-promise2'),
        pool = mysql.createPool({
            connectionLimit: 5,
            host: '', user: '', password: '', database: '',
            //debug: ['ComQueryPacket', 'RowDataPacket']
        });
    Promise.using(pool.getTransaction(), function (conn) {
        // everything inside is in a transaction
        return pool.queryAsync(
            "SELECT * FROM data WHERE used = 0 ORDER BY last DESC LIMIT 1"
        ).spread(function (rows, cols) {
            var data = rows[0];
            return pool.queryAsync("UPDATE data SET used = 1 WHERE id = ?", [data.id]
                ).then(function () { return data; });
        });
        // end of the transaction
    }).then(function (data) {
        // transaction was a COMMIT
    }).catch(function () {
        // transaction was a ROLLBACK
    });

ISC license
-----------

node MySQL promise Copyright © 2015 Lapo Luchini <lapo@lapo.it>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
