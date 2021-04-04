/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
   let search = await axios.get('http://api.tvmaze.com/search/shows', {'params': {'q': query}});
   let shows = search.data;
   let showList = [];
   for(let showData of shows){
     if(showData.show.image){
       if(showData.show.image.medium){
        let show = {'id': showData.show.id, 'name': showData.show.name, 'summary': showData.show.summary, 'image': showData.show.image.medium};
        showList.push(show);
       }
       else{
         let show = {'id': showData.show.id, 'name': showData.show.name, 'summary': showData.show.summary, 'image': 'https://github.com/jinniaflyer450/Jins-Unit-14.3-Exercises-Part-2/blob/master/no_image.png?raw=true'};
         showList.push(show);
       }

     }
     else{
       let show = {'id': showData.show.id, 'name': showData.show.name, 'summary': showData.show.summary, 'image': 'https://github.com/jinniaflyer450/Jins-Unit-14.3-Exercises-Part-2/blob/master/no_image.png?raw=true'}
       showList.push(show);
     }
   }
   return showList;
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
           <img class = "card-img-top" src = "${show.image}">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  let episodes = await axios.get(`http://api.tvmaze.com/shows/${id}/episodes`)
  let episodeList = [];
  for(episode of episodes.data){
    let episodeData = {'id': episode.id, 'name': episode.name, 'season': episode.season, 'number': episode.number};
    episodeList.push(episodeData);
  }
  return episodeList;
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
}
