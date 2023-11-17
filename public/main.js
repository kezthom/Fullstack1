var trash = document.getElementsByClassName("fa-trash-o"); // create variable from the trash class
var stats = document.getElementsByClassName("status"); // create variable from status class, for the status button

Array.from(trash).forEach(function(element) { // Get all elements with the trash class 
  element.addEventListener('click', function(){ // and listen to all the trash buttons
    // Get the name and description of the task from the parent elements
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText

    fetch('messages', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name, // name goes to name
        'msg': msg // msg goes to msg
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

Array.from(stats).forEach(function(element) { // for each element with the class of status
    element.addEventListener('click', function() { // listen for the click of the status button
        const statusElement = this; // variable statusElement has the value of the object that is currently being accessed
        const statusText = statusElement.innerText.trim(); // and statusText has the value of the innter text of the object and .trim() removes the whitespace. could be removed ig but keeping it to be safe

        let newStatus = 'Not Started'; // default status is not started

        // Changing the status of task
        if (statusText === 'Not Started') { // after ns change status to ip
            newStatus = 'In Progress'; 
        } else if (statusText === 'In Progress') { // after ip change status to completed
            newStatus = 'Completed';
        } else if (statusText === 'Completed') { // if its already completed then back to ns
            newStatus = 'Not Started';
        }

        console.log(newStatus) // console.log the status. !! Remove this before pushing to github

        // ge the namw ans description of the task
        const name = this.parentNode.parentNode.childNodes[1].innerText;//this is the status b, parentNode 1 is the li, parent node 2 is the ul, the child node[1] is the first span in the li aka the second child node of the ul, child node[3] is the sppan in the second li so the fourth child node of the ul. 
        const msg = this.parentNode.parentNode.childNodes[3].innerText;

        // Send a PUT request to update the task status
        fetch('messages', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'name': name,
                'msg': msg,

            })
        })
        .then(response => {
            if (response.ok) return response.json(); // self explanatory
        })
        .then(data => {
            console.log(data);
            statusElement.innerText = newStatus; // Update the status 
        })
        .catch(error => {
            console.error('Error:', error); // log the errors if any
        });
    });
});

// t1 t4 ns // t1 t3 ip // t1 t2 completed // t1 t4 status
// click the delete and it is 