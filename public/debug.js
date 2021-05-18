console.log("This should load when you hit the debug page");

$(() => {
  let bugTemplate = Handlebars.compile(`{{#each bug}}
 <tr class="eachRow" id="{{id}}">
            <td>{{problem}}
            </td>
            <td>{{whatshouldbe}}
            </td>
            <td>
              {{whatactuallyis}}
            </td>
            <td>{{hypothesis}}
            </td>
            <td>{{plan}}</td>
            
              <td>
              <button type="submit" data-id="{{id}}" class="delete"> Delete </button>
            </td>
            <td>User id: {{user_id}} id: {{id}}</td>
          </tr>
{{/each}}`);
  const loadBugs = (data) => {
    console.log("received data", data);
    let template = bugTemplate({ bug: data });
    console.log("Template generated: ", template);
    $("#tableBody").html(bugTemplate({ bug: data }));
  };

  const bugs = [
    {
      id: 1,
      problem: "not being able to render a page",
      whatshouldbe: "render a page",
      whatactuallyis:
        "page doesn't show up when loading to the route",
      hypothesis:
        "maybe I have the method wrong, something wrong handlebars",
      plan: "check the method in documentation",
      user_id: 1,
    },
    {
      id: 2,
      problem: "not being able to run migrations and seeds",
      whatshouldbe:
        "should be able upload data after typing in knex seed:run --fileName.js",
      whatactuallyis: "data doesn't upload error shows up ",
      hypothesis: "knex migration is corrupt",
      plan: "delete the two knex database tables",
      user_id: 2,
    },
    {
      id: 3,
      problem:
        "not being able to get access to .env variables",
      whatshouldbe:
        "be able to get access / connect to certain databases after importing it",
      whatactuallyis:
        "you're not able to actually import it",
      hypothesis:
        "you don't have the library connected in the right place",
      plan: "double check where you have to dotenv imports",
      user_id: 2,
    },
  ];
  loadBugs(bugs);
});

// =
// associate specific elements with axios actions
// handlebars template
// adding event handlers to buttons

// post event handler

// edit event handler

// delete event handler
