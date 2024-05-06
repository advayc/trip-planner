function getItinerary(event) {
    event.preventDefault()
    console.log('location: ' + event.target.location.value)
    const location = event.target.location.value
    console.log('start date: ' + event.target.startdate.value)
    const startdate = event.target.startdate.value
    console.log('end date: ' + event.target.enddate.value)
    const enddate = event.target.enddate.value
    console.log('activity: ' + event.target.activitytype.value)
    const activitytype = event.target.activitytype.value
    console.log('budget: ' + event.target.budget.value + '$')
    const budget = event.target.budget.value
    console.log("hello there!")
  
  
fetch ('https://api.openai.com/v1/chat/completions', {

  method:'POST',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer OPEN_AI_KEY'
  },

  body: JSON.stringify({

    'model': 'gpt-3.5-turbo',
    'messages': [
      {
        'role': 'user',
        'content': `plan a trip itinerary for someone going on a trip to ${location} from ${startdate} to ${enddate}. 
        have about 4-5 activites to do with the type of actvity being related to ${activitytype}. make sure this trip itinerary sticks to the
        budget of ${budget}$ no matter what! the total cost of the trip must not be over ${budget}. respond ONLY with an array that
        has JSON objects with the parameters \`date\` \`eventTitle\` \`startTime\` \`endTime\`
        \`total cost\` `
      }]
  })
}).then(result => result.json()).then(eventsResponse => {
  const events = JSON.parse(eventsResponse.choices[0].message.content)

  console.log(events)
  let htmlGenerated=""
  for(const event of events){
    let htmlGenerated = `<div>

      <h3>${event.eventTitle}</h3>
      <p>${new Date(event.date).toLocaleDateString(undefined, {dateStyle: "medium" })}</p>

      <p>${event.startTime} - ${event.endTime}</p>

      </div>`
  }
 });
}