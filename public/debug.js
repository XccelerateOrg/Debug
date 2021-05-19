// const { default: axios } = require("axios");

// const { default: axios } = require("axios");

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
  // this works
  const loadBugs = (data) => {
    console.log("received data", data);
    let template = bugTemplate({ bug: data });
    console.log("Template generated: ", template);
    $("#tableBody").html(bugTemplate({ bug: data }));
  };

  // get route
  // GET: /api/users/:userId/bugs
  function getNotes() {
    axios
      .get(`api/bugs`)
      .then((object) => {
        // console.log(object.data);
        loadBugs(object.data);
        //   loadBugs(object);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  getNotes();

  // post route
  // /api/bugs
  $("#debuggingForm").submit((event) => {
    event.preventDefault();
    console.log("Someone submitting something");
    // console.log($("input[name=problem]").val());
    let problem = $("input[name=problem]").val();
    // console.log("Problem", problem);
    let whatshouldbe = $("input[name=whatshouldbe]").val();
    let whatactuallyis = $(
      "input[name=whatactuallyis]"
    ).val();
    let hypothesis = $("input[name=hypothesis]").val();
    let plan = $("input[name=plan]").val();
    let debuggingObject = {
      problem: problem,
      whatshouldbe: whatshouldbe,
      whatactuallyis: whatactuallyis,
      hypothesis: hypothesis,
      plan: plan,
      // user_id here
    };
    console.log("New Debugging Object", debuggingObject);
    axios
      .post(`/api/bugs`, {
        bug: debuggingObject,
      })
      .then(() => {
        console.log("posted");
        axios.get(`api/bugs`).then((object) => {
          console.log(object.data);
          loadBugs(object.data);
          //   loadBugs(object);
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  });

  // axios.put("/api/bugs")

  // edit route
  // /api/bugs/:id

  // delete route
  // /api/bugs/:id
});
