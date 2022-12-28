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
    enableDropdowns();
} );


const enableDropdowns = () => {
    
    //alert("js");
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
    dropdownElementList.map(function (dropdownToggleEl) {
      return new Dropdown(dropdownToggleEl);
    });
 
    /*
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
      const dropdownList = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))
    */
}
