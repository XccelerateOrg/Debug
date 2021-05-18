/**********************************************
 * Knex Queries
 * ==================================
 *
 ***********************************************/

const TABLE_NAME = "debug";
const knexConfig = require("../knexfile")["development"];
const knex = require("knex")(knexConfig);

class DebugService {
  constructor(knex) {
    this.knex = knex;
  }
  // getting all bugs
  getAll() {
    return this.knex(TABLE_NAME)
      .select()
      .then((eachRow) => {
        console.log(eachRow);
      });
  }
  // getting all of the user's bugs
  getUsersBugs(id) {}
  // getting specific bug
  get(id) {}
  // adding bug
  add(bug) {}
  // deleting bug
  delete(id) {}
  // editing bug
  edit(id, newBug) {}
}

module.exports = DebugService;
