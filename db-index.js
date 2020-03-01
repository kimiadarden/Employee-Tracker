const mysql = require("mysql");


class DB {
  constructor( conf ) {
      this.connection = mysql.createConnection( conf );
  }
  query( sql, args ) {
      return new Promise( ( res, rej ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err ) {
                  return rej( err );
              }
              res( rows );
          } );
      } );
  }

}

module.exports = DB;
