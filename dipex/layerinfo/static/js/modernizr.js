// Give Modernizr.load a string, an object, or an array of strings and objects
Modernizr.load([
  // Presentational polyfills
  {
    // Logical list of things we would normally need
    test : Modernizr.borderradius && Modernizr.opacity,
    // Modernizr.load loads css and javascript by default
    nope : ['static/js/modernizr_failwarn.js']
  }
]);