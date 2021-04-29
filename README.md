
Business Requirements

We need a dashboard that displays job listings on our phones a tablet or a desktop.
We need the company logo and name clearly visible.
The job title should be a clearly visible.
We would like to see the age of the listing on the card
The status whether full or part time must be included
Where the applicant needs to be located should also be visible.
We would like to see all the key skills needed for the role close together on the card.
For quick access to different groups of cards we would like to click a skill and have only cards with that skill display. If we click additional skills we would like to see only cards with all the skills selected displayed


Code Block Thinking: 

I needed some useState variables for the data I wanted to manage.
I needed some state to save the jobs pulled in from the data file and secondly to store the skills when selected in an array that can be used in a filter function.

The Job data needed to be loaded with a fetch request
Wrapping the fetch request in a async promise function and then wrapping the function in a useEffect hook with an empty dependency array comma separated at the end, ensured the fetch only ran once. If and when the site is extended to include an API for data, the dependency array would include a variable from state to trigger a new fetch when required.

A setter function was needed for the skills to be added to the skills state using the setSkills state variable

The skills when selected will need to be added to an array so that they can be used in the filter function to identify which jobs should be displayed when the languages, roles and level buttons are selected.

A clear skills function is needed. To overwrite the skills array with an empty array so that the filtering is cancelled, a function was needed that wraps the setSkills and passes []

A remove skill function was needed

A remove individual skills function was need that can remove individual skills from the filter component when the X button that is provided with it is clicked

A filter function was needed that triggers every time there is a change to the skills array.
This is not as straight forward as I first thought for a number of reasons.  Firstly I needed to compare an array of skills with the properties of each object and if I got a match then I are adding the object to a new array of objects and rendering those cards instead of the total number of job cards.

To start, I needed to itterate the array of objects so that we can compare job by job.

First issue: All the properties that we need are not in the languages array on the object we also need the properties from the tools array and the individual strings from the role and the level properties.
I achieved this by creating a new variable and using the spread operator to combine them.

I then needed to iterate over the combined array and find any of matches with any of the skills in the skills array.

If we find a match we needed to create a new array of objects.

Second Issue: The languages, tools, role and level are not unique which means multiple matches can occur and in every case it will add a duplicate object if we don't do something about it. I did not think of a way to avoid it but i did think if We pushed the job ID into another array every time a match occurred. we could then dedupe the array of job id's and then use that to iterate the actual job objects back into a new jobs Array.

We then iterated over the new deduped array of matched job id's pushing the job objects that match into a new array. This array I then passed through a card list component to again unwrap the jobs into individual job objects which were then passed through props a second time into the card component for destructuring and rendering.

This filter function I then triggered every time there were changes to the skills array, caused by either selecting, removing or clearing the skills 

Finally I faced the issue, that if there were no filters selected then nothing displayed at all because the filter function only prepared objects where there were matches. 
To solve for this I used a ternary statement that checked the skills array, if it had a length of 0 then I passed the original unfiltered jobs object.

The skills rows need to collapse first at lower resolutions
After wasting a lot of time thinking that I need to inject <div> tags so that I could collapse the skills I realised that all I needed was to add a flex-wrap wrap to the container property.