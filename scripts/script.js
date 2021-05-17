// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

let container;
let i = 0;
// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      container = entries;
      entries.forEach((entry, index) => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        // Event listener for single page
        newPost.addEventListener('click', ()=>{
          var p = "https://t2wang.github.io/#entry" + (index + 1);
          var title = "Entry " + (index + 1);
          push(i, p);
          i = i + 1;
          //history.pushState(title, null, p);
          document.querySelector('h1').innerHTML = title;
          document.body.setAttribute('class',"single-entry");

          let sinPost = document.createElement('entry-page');
          sinPost.entry = entry;
          document.querySelector('entry-page').remove();
          document.body.appendChild(sinPost);
        });
      });
    });
});

// Event listner for settings
document.querySelector('img').addEventListener('click', () => {
  push(i, "https://t2wang.github.io/#settings");
  i = i + 1;
  //history.pushState("settings", null, "https://t2wang.github.io/#settings");
  document.querySelector('h1').innerHTML = "Settings";
  document.body.setAttribute('class',"settings");
});

//Back and forward button
window.onpopstate = function(e){

};


//Event listener for title
document.querySelector('h1').addEventListener('click', ()=>{
  push(i, "https://t2wang.github.io/Lab7");
  i = i + 1;
  //history.pushState("index",null,"https://t2wang.github.io/Lab7");
  document.body.setAttribute('class',"");
  document.querySelector('h1').innerHTML = "Journal Entries";
});

function push(index, url){
  history.pushState(index, null, url);
}
