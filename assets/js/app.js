/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.scss';
import {Dropdown} from "bootstrap";

document.addEventListener('DOMContentLoaded', () => {
  //alert('new App');
    new App();
});

class App {
  constructor() {
    //alert('constructor');
    this.enableDropdowns();
    this.handleCommentForm();
  }

  enableDropdowns() {
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl);
    });
  }

  handleCommentForm() {

    const commentForm = document.querySelector('form.comment-form') ;
    //alert(commentForm.innerHTML);
    if(null == commentForm ){     
      return;
    }

    commentForm.addEventListener('submit', async(e) => {
        e.preventDefault();
       console.log(e.target);
        // alert(e.target);
        // XB : Il y a un problème ici 
        // No route found for "GET http://localhost:8000/ajax/comments": Method Not Allowed (Allow: POST)
        // Pourquoi c'est en GET à cet endroit alors que dans app.js c'est en POST ?
        const response = await fetch('/ajax/comments', {
          method: 'POST',
          body: new FormData(e.target)
        });

      
      if(!response.ok){
        // il n'y  a as de reponse
        alert('pas de reponse\n No route found for "GET http://localhost:8000/ajax/comments": Method Not Allowed (Allow: POST)');
        return;
      }
      

      const json = await response.json();
      //alert(json);
      //console.log(json);

      if( json.code == 'COMMENT_ADDED_SUCCESSFULLY'){
        const commentList = document.querySelector('.comment-list');
        const commentCount = document.querySelector('.comment-count');
        const commentContent = document.querySelector('{#comment_content');
        commentList.insertAdjacentHTML('beforeend', json.message);
        commentList.lastElementChild.scrollIntoView();
        commentCount.innerText = json.numberOfComments;
        commentContent.value = '';
      }


    });

  }

}

