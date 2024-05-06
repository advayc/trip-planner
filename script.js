function getItinerary(event) {
    event.preventDefault();
    const location = event.target.location.value;
    const startdate = event.target.startdate.value;
    const enddate = event.target.enddate.value;
    const activitytype = event.target.activitytype.value;
    const budget = event.target.budget.value;
    
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer OPENAI_KEY'
      },
  
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [{
            'role': 'user',
            'content': `plan a trip itinerary for someone going on a trip to ${location} from ${startdate} to ${enddate}. 
            have about 4-5 activities to do with the type of activity being related to ${activitytype}. make sure this trip itinerary sticks to the
            budget of ${budget}$ no matter what! the total cost of the trip must not be over ${budget}. respond ONLY with an array that
            has JSON objects with the parameters \`date\` \`eventTitle\` \`startTime\` \`endTime\`
            \`total cost\``
        }]
    })
  }).then(result => result.json()).then(eventsResponse => {
      console.log(eventsResponse)
      const events = JSON.parse(eventsResponse.choices[0].message.content)
  
  
  
      let htmlGenerated = ""
  
      for (const event of events) {
        //add it on
        htmlGenerated += `<div>
  
        <h3>${event.eventTitle}</h3>
        <p>${new Date(event.date).toLocaleDateString(undefined, { dateStyle: "medium" })}</p>
  
        <p>${event.startTime} - ${event.endTime}</p>
  
        </div>`
      }
  
      document.getElementById("eventlist").innerHTML = htmlGenerated
    });
  }