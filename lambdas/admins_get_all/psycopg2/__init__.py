"""A Python driver for PostgreSQL

psycopg is a PostgreSQL_ database adapter for the Python_ programming
language. This is version 2, a complete rewrite of the original code to
provide new-style classes for connection and cursor objects and other sweet
candies. Like the original, psycopg 2 was written with the aim of being very
small and fast, and stable as a rock.

Homepage: https://psycopg.org/

.. _PostgreSQL: https://www.postgresql.org/
.. _Python: https://www.python.org/

:Groups:
  * `Connections creation`: connect
  * `Value objects constructors`: Binary, Date, DateFromTicks, Time,
    TimeFromTicks, Timestamp, TimestampFromTicks
"""
# psycopg/__init__.py - initialization of the psycopg module
#
# Copyright (C) 2003-2019 Federico Di Gregorio  <fog@debian.org>
# Copyright (C) 2020-2021 The Psycopg Team
#
# psycopg2 is free software: you can redistribute it and/or modify it
# under the terms of the GNU Lesser General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# In addition, as a special exception, the copyright holders give
# permission to link this program with the OpenSSL library (or with
# modified versions of OpenSSL that use the same license as OpenSSL),
# and distribute linked combinations including the two.
#
# You must obey the GNU Lesser General Public License in all respects for
# all of the code used other than OpenSSL.
#
# psycopg2 is distributed in the hope that it will be useful, but WITHOUT
# ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
# FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public
# License for more details.

# Import modules needed by _psycopg to allow tools like py2exe to do
# their work without bothering about the module dependencies.

# Note: the first internal import should be _psycopg, otherwise the real cause
# of a failed loading of the C module may get hidden, see
# https://archives.postgresql.org/psycopg/2011-02/msg00044.php

# Import the DBAPI-2.0 stuff into top-level module.

from psycopg2._psycopg import (                     # noqa
    BINARY, NUMBER, STRING, DATETIME, ROWID,

    Binary, Date, Time, Timestamp,
    DateFromTicks, TimeFromTicks, TimestampFromTicks,

    Error, Warning, DataError, DatabaseError, ProgrammingError, IntegrityError,
    InterfaceError, InternalError, NotSupportedError, OperationalError,

    _connect, apilevel, threadsafety, paramstyle,
    __version__, __libpq_version__,
)


# Register default adapters.

from psycopg2 import extensions as _ext
_ext.register_adapter(tuple, _ext.SQL_IN)
_ext.register_adapter(type(None), _ext.NoneAdapter)

# Register the Decimal adapter here instead of in the C layer.
# This way a new class is registered for each sub-interpreter.
# See ticket #52
from decimal import Decimal                         # noqa
from psycopg2._psycopg import Decimal as Adapter    # noqa
_ext.register_adapter(Decimal, Adapter)
del Decimal, Adapter


AUTOSAVEPOINT_KEY = 'autosavepoint'
AUTOCOMMIT_KEY = 'autocommit'


def connect(dsn=None, connection_factory=None, cursor_factory=None, **kwargs):
    """
    Create a new database connection.

    The connection parameters can be specified as a string:

        conn = psycopg2.connect("dbname=test user=postgres password=secret")

    or using a set of keyword arguments:

        conn = psycopg2.connect(database="test", user="postgres", password="secret")

    Or as a mix of both. The basic connection parameters are:

    - *dbname*: the database name
    - *database*: the database name (only as keyword argument)
    - *user*: user name used to authenticate
    - *password*: password used to authenticate
    - *host*: database host address (defaults to UNIX socket if not provided)
    - *port*: connection port number (defaults to 5432 if not provided)

    Using the *connection_factory* parameter a different class or connections
    factory can be specified. It should be a callable object taking a dsn
    argument.

    Using the *cursor_factory* parameter, a new default cursor factory will be
    used by cursor().

    Using *async*=True an asynchronous connection will be created. *async_* is
    a valid alias (for Python versions where ``async`` is a keyword).

    Any other keyword parameter will be passed to the underlying client
    library: the list of supported parameters depends on the library version.

    """
    kwasync = {}
    if 'async' in kwargs:
        kwasync['async'] = kwargs.pop('async')
    if 'async_' in kwargs:
        kwasync['async_'] = kwargs.pop('async_')

    autosavepoint_value = False
    autocommit_value = False
    dsn, custom_opts = _pre_parse_dsn(dsn)
    if custom_opts:
        autosavepoint_value = custom_opts.get(AUTOSAVEPOINT_KEY, autosavepoint_value)
        autocommit_value = custom_opts.get(AUTOCOMMIT_KEY, autocommit_value)
    # Args in kwargs have high priority
    if AUTOSAVEPOINT_KEY in kwargs:
        autosavepoint_value = _parse_bool_value((kwargs.pop(AUTOSAVEPOINT_KEY, autosavepoint_value)))
    if AUTOCOMMIT_KEY in kwargs:
        autocommit_value = _parse_bool_value((kwargs.pop(AUTOCOMMIT_KEY, autocommit_value)))


    dsn = _ext.make_dsn(dsn, **kwargs)
    conn = _connect(dsn, connection_factory=connection_factory, **kwasync)
    if cursor_factory is not None:
        conn.cursor_factory = cursor_factory

    if conn:
        conn.autosavepoint = autosavepoint_value
        conn.autocommit = autocommit_value

    return conn


def _parse_bool_value(v) -> bool:
    if isinstance(v, bool):
        return v
    return str(v).strip().lower() not in ('', '0', 'off', 'false', 'n', 'no')


def _pre_parse_uri_dsn(dsn: str):
    from urllib import parse
    o = parse.urlparse(dsn)
    queries = parse.parse_qs(o.query)
    custom_opts = {}
    if queries:
        if AUTOSAVEPOINT_KEY in queries:
            custom_opts[AUTOSAVEPOINT_KEY] = _parse_bool_value(queries.pop(AUTOSAVEPOINT_KEY)[0])
        if AUTOCOMMIT_KEY in queries:
            custom_opts[AUTOCOMMIT_KEY] = _parse_bool_value(queries.pop(AUTOCOMMIT_KEY)[0])
    if queries:
        o = o._replace(query=parse.urlencode(queries, doseq=True))
    else:
        o = o._replace(query='')
    return parse.urlunparse(o), custom_opts


def _pre_parse_kv_dsn(dsn: str):
    custom_opts = {}
    kv_map = {}
    parts = dsn.split(' ')
    for part in parts:
        kv = part.split('=')
        if len(kv) != 2:
            raise ValueError(f"missing \"=\" after \"{kv[0]}\" in connection info string")
        kv_map[kv[0].strip()] = kv[1].strip()
    if AUTOSAVEPOINT_KEY in kv_map:
        custom_opts[AUTOSAVEPOINT_KEY] = _parse_bool_value(kv_map.pop(AUTOSAVEPOINT_KEY))
    if AUTOCOMMIT_KEY in kv_map:
        custom_opts[AUTOCOMMIT_KEY] = _parse_bool_value(kv_map.pop(AUTOCOMMIT_KEY))
    return ' '.join([f'{k}={v}' for k, v in kv_map.items()]), custom_opts

def _pre_parse_dsn(dsn: str):
    if not dsn:
        return dsn, {}
    if dsn.startswith('postgresql://') \
        or dsn.startswith('postgres://'):
        return _pre_parse_uri_dsn(dsn)
    if dsn.startswith('opengauss://'):
        dsn = dsn.replace('opengauss://', 'postgres://')
        return _pre_parse_uri_dsn(dsn)
    if dsn.startswith('mogdb://'):
        dsn = dsn.replace('mogdb://', 'postgres://')
        return _pre_parse_uri_dsn(dsn)
    return _pre_parse_kv_dsn(dsn)
