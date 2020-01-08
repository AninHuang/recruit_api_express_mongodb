/**
 * 
 */
function handleCard(pi_sID) {
    console.log(`${document.URL}/${pi_sID}`);
    
    fetch(`${document.URL}/${pi_sID}`, {method: 'GET'})
        .then(function(response) {
            if(response.ok) {
                console.log('Click was recorded');
                return;
            }
            throw new Error('Request failed.');
        })
        .catch(function(error) {
            console.log(error);
        });
}