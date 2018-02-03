import $ from 'jquery';

$(document).ready(() => {
  $('.navbar-fostrap').click(() => {
    $('.nav-fostrap').toggleClass('visible');
    $('body').toggleClass('cover-bg');
  });
});
