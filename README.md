lapo-download
=============

HTTP GET of a file using every header available to avoid re-fetching an up-to-date file. Right now headers are saved in a `.headers` file.

    var Promise = require('bluebird'),
        mysql = require('mysql-promise2');
    Promise.using(pool.getTransaction(), function (conn) {
        // everything inside is a transaction
        // errors produce a rollback
        return pool.queryAsync(
            "SELECT * FROM data WHERE valid = 1 ORDER BY last DESC LIMIT 1"
        ).spread(function (rows, cols) {
            var data = rows[0];
            return pool.queryAsync("UPDATE data SET used = 1 WHERE id = ?", [data.id]
                ).then(function () { return data; });
        });
    }).then(function (data) {
        // everything was committed
    }).catch(function (data) {
        // transaction rollback already done
    });

ISC license
-----------

node MySQL promises Copyright (c) 2015 Lapo Luchini <lapo@lapo.it>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
