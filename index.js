/*!
 * node MySQL promises
 * Copyright (c) 2015 Lapo Luchini <lapo@lapo.it>
 * 
 * Permission to use, copy, modify, and/or distribute this software for any purpose with
 * or without fee is hereby granted, provided that the above copyright notice and this
 * permission notice appear in all copies.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD
 * TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS.
 * IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR
 * CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR
 * PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
 * ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */
/*jshint node: true, strict: true, globalstrict: true, indent: 4, immed: true, undef: true, sub: true */
'use strict';

var Promise = require('bluebird'),
    mysql = require('mysql'),
    Connection = require('mysql/lib/Connection'),
    Pool = require('mysql/lib/Pool');

Promise.promisifyAll(Connection.prototype);
Promise.promisifyAll(Pool.prototype);

Pool.prototype.getTransaction = function () {
    return this.getConnectionAsync(
        ).then(function (conn) {
            return conn.beginTransactionAsync(
                ).then(function () { return conn; });
        }).disposer(function(conn, promise) {
            var p = promise.isFulfilled()
                 ? conn.commitAsync()
                 : conn.rollbackAsync();
            return p.finally(function () { conn.release(); });
        });
};

module.exports = mysql;
